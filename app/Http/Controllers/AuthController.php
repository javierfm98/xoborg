<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $rules = [
            'email' => 'required|email|unique:users',
            'name' => 'required',
        ];

        $this->validate($request, $rules);

        $password = $request->password;

         $user = User::create(
            $request->only('name', 'email')
            + [
                'password' => bcrypt($password),
            ]
        ); 
        $success = true;
        return compact('success');
    }
}
