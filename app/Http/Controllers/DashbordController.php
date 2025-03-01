<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashbordController extends Controller
{
    public function index()
    {

        $user_id = Auth::id();

        $totalTodayExpenses = Expense::where('user_id', $user_id)
            ->where('date', '=', date('Y-m-d'))
            ->sum('amount');

        $totalMonthExpenses = Expense::where('user_id', $user_id)
            ->whereMonth('date', Carbon::now()->month)
            ->whereYear('date', Carbon::now()->year)
            ->sum('amount');

        $categoryWiseExpenses = DB::table('expenses')
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->selectRaw('categories.name, sum(amount) as total')
            ->where('user_id', $user_id)
            ->groupBy('categories.name')
            ->get();

        $expensesMonthlyTrend = Expense::where('user_id', $user_id)
            ->selectRaw('MONTHNAME(date) as month ,MONTH(date) as month_number,sum(amount) as expenses')
            ->groupBy('month', 'month_number')
            ->orderBy('month_number')
            ->limit(6)
            ->get()
            ->map(function ($item) {
                unset($item['month_number']);
                return $item;
            })
            ->toArray();


        $recentExpenses = Expense::where('user_id', $user_id)
            ->with('category:id,name')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        $recentExpenses = $recentExpenses->map(function ($expense) {
            return [
                'id' => $expense->id,
                'amount' => $expense->amount,
                'description' => $expense->description,
                'date' => $expense->date,
                'category' => $expense->category ? $expense->category->name : null,
            ];
        });

        $topCategories = Expense::selectRaw('category_id, SUM(amount) as total_spent')
            ->where('user_id', $user_id)
            ->groupBy('category_id')
            ->orderBy('total_spent', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($expense) {

                $category = Category::find($expense->category_id);
                return [
                    'category_name' => $category ? $category->name : 'Unknown',
                    'total_spent' => $expense->total_spent,
                ];
            });

        // todo :savings

        return Inertia::render('Dashboard', [
            'totalTodayExpenses' => $totalTodayExpenses,
            'totalMonthExpenses' => $totalMonthExpenses,
            'categoryWiseExpenses' => $categoryWiseExpenses,
            'expensesMonthlyTrend' => $expensesMonthlyTrend,
            'recentExpenses' => $recentExpenses,
            'topCategories' => $topCategories
        ]);
    }
}
