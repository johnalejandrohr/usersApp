<?php

namespace App\Http\Controllers;

use App\Models\Admin\Tarea;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB, Log;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tareas = Tarea::where('user_id', auth()->user()->id)->orderBy('id', 'desc')->get();
        return Inertia::render('Tareas/Index', ['tareas' => $tareas]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $tareas = Tarea::where('user_id', auth()->user()->id)->orderBy('id', 'desc')->get();
        return Inertia::render('Tareas/Create', ['tareas' => $tareas]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $tarea = new Tarea;
        if ($tarea->isValid($request, $data)) {
            DB::beginTransaction();
            try {
                $tarea->fill($data);
                $tarea->user_id = auth()->user()->id;
                $tarea->save();
                DB::commit();
                return redirect()->route('tareas.create');
            } catch (\Exception $e) {
                DB::rollback();
                Log::error($e->getMessage());
                dd($e->getMessage());
                return response()->json(['success' => false, 'errors' => 'Ha ocurrido un error inesperado']);
            }
        }
        return abort(500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Admin\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function show(Tarea $tarea)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Admin\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function edit(Tarea $tarea)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Admin\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tarea $tarea)
    {
        $data = $request->all();
        //if ($tarea->isValid($request, $data)) {
        DB::beginTransaction();
        try {
            $tarea->status = $data['status'];
            $tarea->save();
            DB::commit();
            return redirect()->route('tareas.create');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());
            dd($e->getMessage());
            return response()->json(['success' => false, 'errors' => 'Ha ocurrido un error inesperado']);
        }
        //}
        dd('error');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tarea $tarea)
    {
        $tarea->delete();
        return redirect()->route('tareas.create');
    }
}
