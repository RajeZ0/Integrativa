<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * User dashboard
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();
        $user->load('role');

        return response()->json([
            'message' => 'Bienvenido a tu panel de usuario',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => [
                    'id' => $user->role->id,
                    'name' => $user->role->name,
                    'slug' => $user->role->slug,
                ],
            ],
        ]);
    }
}
