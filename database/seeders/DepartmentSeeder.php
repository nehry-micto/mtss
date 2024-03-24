<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Municipal Information Communication Technology Office',
                'abbr' => 'MICTO',
            ],
            [
                'name' => 'Municipal Human Resource Office',
                'abbr' => 'MHO',
            ],
            [
                'name' => 'Municipal Budget Office',
                'abbr' => 'MBO',
            ],
            [
                'name' => 'Municipal Treasury Office',
                'abbr' => 'MTO',
            ]
        ];

        \App\Models\Department::insert($departments);
    }
}
