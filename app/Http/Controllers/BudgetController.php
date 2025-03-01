<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function checkBudget()
    {
        $userId = Auth::id();

        $budget = Budget::where('user_id', $userId)
            ->whereYear('date', now()->year)
            ->whereMonth('date', now()->month)
            ->first();

        if ($budget) {
            return response()->json(['budget' => $budget->balance]);
        }
        return response()->json(['budget' => null]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = Auth::id();

        $date = now();

        $budget = $request->validate([
            'budget' => 'required|numeric'
        ]);

        $budget = Budget::where('user_id', $userId)
            ->whereYear('date', $date->year)
            ->whereMonth('date', $date->month)
            ->first();

        if ($budget == null) {
            Budget::create([
                'user_id' => $userId,
                'budget' => $request->budget,
                'balance' => $request->budget,
                'date' => $date
            ]);
        }

        return redirect()->route('expenses.index')->with('success', 'Budget added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Budget $budget)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Budget $budget)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Budget $budget)
    {
        //
    }
}
