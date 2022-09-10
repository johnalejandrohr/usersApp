<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\Task;
use Inertia\Inertia;
use DB, Log;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::orderBy('id', 'desc')->get();
        return Inertia::render('Tasks/Index', ['tasks' => $tasks]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Tasks/Create');
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
        $task = new Task;
        if ($task->isValid($request, $data)) {
            DB::beginTransaction();
            try {
                $task->fill($data);
                $task->user_id = auth()->user()->id;
                $task->save();
                DB::commit();
                if ($request->create_new_register) {
                    return redirect()->route('tasks.create');
                }
                return redirect()->route('tasks.index');
            } catch (\Exception $e) {
                DB::rollback();
                Log::error($e->getMessage());
                return redirect()->route('tasks.create');
            }
        }
        return abort(500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $task = Task::find($id);
        return Inertia::render('Tasks/Edit', ['task' => $task]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $task = Task::find($id);
        if ($task->isValid($request, $data)) {
            DB::beginTransaction();
            try {
                $task->fill($data);
                $task->save();
                DB::commit();
                return redirect()->route('tasks.index');
            } catch (\Exception $e) {
                DB::rollback();
                Log::error($e->getMessage());
                return Inertia::render('Tasks/Edit', ['task' => $task]);
            }
        }
        return abort(500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
        return redirect()->route('tasks.index');
    }
}
