<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Barryvdh\DomPDF\Facade\Pdf;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {

        $userId = Auth::id();

        $startDate = $request->query('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->query('end_date', Carbon::now()->endOfMonth()->toDateString());
        $category = $request->query('category');

        $expenses = Expense::where('user_id', $userId)
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('date', [$startDate, $endDate]);
            })
            ->when($category, function ($query) use ($category) {
                return $query->where('category_id', $category);
            })
            ->with('category:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        $totalAmount = $expenses->sum('amount');

        $categories = Category::select('name', 'id')->get();

        return Inertia::render('Expenses', [
            "expenses" => $expenses,
            "totalAmount" => $totalAmount,
            "categories" => $categories,
        ]);
    }


    public function exportPdf(Request $request)
    {
        $userId = Auth::id();

        $startDate = $request->query('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->query('end_date', Carbon::now()->endOfMonth()->toDateString());
        $category = $request->query('category');

        $expenses = Expense::where('user_id', $userId)
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('date', [$startDate, $endDate]);
            })
            ->when($category, function ($query) use ($category) {
                return $query->where('category_id', $category);
            })
            ->with('category:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        $totalAmount = $expenses->sum('amount');

        $data = [
            'expenses' => $expenses,
            'totalAmount' => $totalAmount,
        ];

        $pdf = Pdf::loadView('pdf.expenses', $data);

        return $pdf->download('filtered_expenses.pdf');
    }

    public function updateBalance($date)
    {
        $userId = Auth::id();

        $budget = Budget::where('user_id', $userId)
            ->whereMonth('date', Carbon::parse($date)->format('m'))
            ->whereYear('date', Carbon::parse($date)->format('Y'))
            ->first();

        $expenses = Expense::where('user_id', $userId)
            ->whereMonth('date', Carbon::parse($date)->format('m'))
            ->whereYear('date', Carbon::parse($date)->format('Y'))->get();

        $totalAmount = $expenses->sum('amount');

        if ($budget) {
            $budget->update([
                'balance' => $budget->budget - $totalAmount,
            ]);

            return true;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'date' => 'required',
            'amount' => 'required',
            'category_id' => 'required',
        ]);

        // create expense belongs to user
        $request->user()->expense()->create(
            [
                'description' => $validated["description"],
                'date' => $validated["date"],
                'amount' => $validated["amount"],
                'category_id' => $validated["category_id"],
            ]
        );

        $date = $validated["date"];

        if ($this->updateBalance($date)) {
            return redirect()->route('expenses.index')->with('success', 'Expense added successfully!');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {

        $validated = $request->validate([
            'description' => 'required',
            'amount' => 'required',
            'date' => 'required',
            'category_id' => 'required',
        ]);

        $expense->update($validated);

        $date = $validated["date"];

        if ($this->updateBalance($date)) {
            return redirect()->route('expenses.index')->with('success', 'Expense updated successfully!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $userId = Auth::id();

        if ($userId == $expense->user_id) {
            $expense->delete();
            $date = $expense->date;

            if ($this->updateBalance($date)) {
                return redirect()->route('expenses.index')->with('success', 'Expense Deleted successfully!');
            }
        }
        return redirect()->route('expenses.index')->with('success', 'You dont have access to delete');
    }
}
