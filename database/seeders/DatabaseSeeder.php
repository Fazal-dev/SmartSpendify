<?php

namespace Database\Seeders;

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
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'fazal',
            'email' => 'mfazal404@gmail.com',
            'password' => Hash::make('fazal123'),
        ]);

        // i need to run seeder categpry seeder class in this

        $this->call(CategorySeeder::class);
    }
}
