<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'names' => 'required|string|max:100|min:5',
            'surnames' => 'required|string|max:100|min:5',
            'surnames' => 'required|string|max:100|min:5',
            'country' => 'required|max:255|string',
            'email' => 'required|string|email|max:150|unique:users',
            'cedula' => 'required|string|max:15|unique:users',
            'addres' => 'required|string|max:180',
            'cellphone' => 'required|string|max:10',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'names' => $request->names,
            'surnames' => $request->surnames,
            'cedula' => $request->cedula,
            'email' => $request->email,
            'country' => $request->country,
            'addres' => $request->addres,
            'cellphone' => $request->cellphone,
            'password' => Hash::make($request->password),
        ]);


        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
