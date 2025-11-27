<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Admin dashboard
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();
        
        // Verify user is admin
        if (!$user->isAdmin()) {
            return response()->json([
                'message' => 'No autorizado'
            ], 403);
        }

        // Get statistics for admin dashboard
        $stats = [
            'total_users' => \App\Models\User::count(),
            'total_admins' => \App\Models\User::whereHas('role', function($q) {
                $q->where('slug', 'admin');
            })->count(),
            'total_regular_users' => \App\Models\User::whereHas('role', function($q) {
                $q->where('slug', 'user');
            })->count(),
        ];

        return response()->json([
            'message' => 'Bienvenido al panel de administrador',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'stats' => $stats,
        ]);
    }
}
