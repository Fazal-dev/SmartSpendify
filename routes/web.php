<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\DashbordController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashbordController::class, 'index'])->name('dashboard');

    Route::get('/checkBudget', [BudgetController::class, 'checkBudget']);

    Route::resource('expenses', ExpenseController::class)->only(['index', 'store', 'destroy', 'update']);

    Route::get('/exportPdf', [ExpenseController::class, 'exportPdf'])->name("expenses.export");

    Route::resource('budget', BudgetController::class)->only(['store']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
