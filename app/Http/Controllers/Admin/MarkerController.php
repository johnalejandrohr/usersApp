<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin\Marker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use DB, Log;

class MarkerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $markers = Marker::with('detail')->orderBy('id', 'desc')->get();
        return Inertia::render('Markers/Index', ['markers' => $markers]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Markers/Create');
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
        $marker = new Marker;
        if ($marker->isValid($request, $data)) {
            DB::beginTransaction();
            try {
                $marker->fill($data);
                $marker->user_id = auth()->user()->id;
                $marker->save();
                DB::commit();
                if ($request->create_new_register) {
                    return redirect()->route('markers.create');
                }
                return redirect()->route('markers.index');
            } catch (\Exception $e) {
                DB::rollback();
                Log::error($e->getMessage());
                return redirect()->route('markers.create');
            }
        }
        return abort(500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Admin\Marker  $marker
     * @return \Illuminate\Http\Response
     */
    public function show(Marker $marker)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Admin\Marker  $marker
     * @return \Illuminate\Http\Response
     */
    public function edit(Marker $marker)
    {
        return Inertia::render('Markers/Edit', ['marker' => $marker]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Admin\Marker  $marker
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Marker $marker)
    {
        $data = $request->all();
        if ($marker->isValid($request, $data)) {
            DB::beginTransaction();
            try {
                $marker->fill($data);
                $marker->save();
                DB::commit();
                if ($request->create_new_register) {
                    return redirect()->route('markers.create');
                }
                return redirect()->route('markers.index');
            } catch (\Exception $e) {
                DB::rollback();
                Log::error($e->getMessage());
                return redirect()->route('markers.create');
            }
        }
        return abort(500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin\Marker  $marker
     * @return \Illuminate\Http\Response
     */
    public function destroy(Marker $marker)
    {
        $marker->load('detail');
        if(!count($marker->detail)) {
            $marker->delete();
        }
        
        return redirect()->route('markers.index');
    }
}
