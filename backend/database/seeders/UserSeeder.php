<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        \App\Models\User::create([
            'name' => 'Administrator',
            'email' => 'admin@metzli.com',
            'password' => bcrypt('password'),
            'role_id' => 1, // admin role
        ]);

        // Regular user
        \App\Models\User::create([
            'name' => 'Usuario Normal',
            'email' => 'user@metzli.com',
            'password' => bcrypt('password'),
            'role_id' => 2, // user role
        ]);
    }
}
