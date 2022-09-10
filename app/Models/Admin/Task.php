<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\BaseModel;

class Task extends BaseModel
{
    use HasFactory;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    public $timestamps = true;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'status', 'priority_level', 'completion_date', 'completion_time', 'dedicated_time', 'real_time',
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
            'name' => 'required',
            'status' => 'required',
            'priority_level' => 'required',
        ];
        $request->validate($rules);
        return true;
    }

}
