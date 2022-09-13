<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'names',
        'surnames',
        'cedula',
        'email',
        'country',
        'addres',
        'cellphone',
        'isAdmin',
        'password',
        'category_id',
    ];
    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Function for validate data.
     */
    public function isValid($request, $data)
    {
        $rules = [
            'names' => 'required|string|max:100|min:5',
            'surnames' => 'required|string|max:100|min:5',
            'surnames' => 'required|string|max:100|min:5',
            'country' => 'required|max:255|string',
            'email' => 'required|string|email|max:150|unique:users',
            'cedula' => 'required|string|max:15|unique:users',
            'addres' => 'required|string|max:180',
            'cellphone' => 'required|string|max:10',
        ];
        $request->validate($rules);
        return true;
    }
}
