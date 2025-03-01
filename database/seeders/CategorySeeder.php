<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Food & Groceries', 'Rent & Utilities', 'Transportation', 'Healthcare', 'Entertainment', 'Shoping', 'Education', 'Bills & Subscriptions', 'Savings & Investments', 'others'];
        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
