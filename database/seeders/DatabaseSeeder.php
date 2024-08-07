<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Employee;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::create(
            [
                'name' => 'Admin',
                'email' => 'admin@mtss.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'email_verified_at' => now(),
                'remember_token' => \Illuminate\Support\Str::random(10),
            ]
        );

        $this->call([
            DepartmentSeeder::class,
            EmployeeSeeder::class
        ]);
    }
}
