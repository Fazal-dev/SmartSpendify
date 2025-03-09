<?php

namespace Database\Seeders;

use App\Models\Budget;
use App\Models\Expense;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $user = User::factory()->create([
            'name' => 'fazal',
            'email' => 'mfazal404@gmail.com',
            'password' => Hash::make('fazal123'),
        ]);

        $this->call(CategorySeeder::class);

        // Create 6 months of budgets
        for ($i = 0; $i < 6; $i++) {
            Budget::factory()->create([
                'user_id' => $user->id,
                'date' => now()->subMonths($i)->format('Y-m-d'),
            ]);
        }

        Expense::factory(30)->create(['user_id' => $user->id]);
    }
}
