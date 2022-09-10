<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tareas';

    public $timestamps = true;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre', 'status'
    ];

    /**
     * The attributes that are mass boolean assignable.
     *
     * @var array
     */
    protected $boolean = [
        //
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        //
    ];



    /**
     * Function for validate data.
     */
    public function isValid($request, $data)
    {
        $rules = [
            'nombre' => 'required',
            'status' => 'required',
        ];
        $request->validate($rules);
        return true;
    }

    /**
     * Get all sellers for the customer
     */

    // public function sellers()
    // {
    //     return $this->belongsToMany('App\Models\Admin\Seller', 'customers_sellers', 'customer_id', 'seller_id');
    // }
}
