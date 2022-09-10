<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin\Marker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Admin\MarkerDetail;
use Inertia\Inertia;
use DB, Log;

class MarkerDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $markerDetails = MarkerDetail::orderBy('id', 'desc')->get();
        return Inertia::render('Markers/Index', ['markerDetails' => $markerDetails]);
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
        $markerDetail = new MarkerDetail;
        if ($markerDetail->isValid($request, $data)) {
            DB::beginTransaction();
            try {
                $markerDetail->fill($data);
                $markerDetail->marker_id = $request->marker_id;
                $markerDetail->save();
                DB::commit();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin\Marker  $marker
     * @return \Illuminate\Http\Response
     */
    public function destroy(Marker $marker)
    {
        //
    }
}
