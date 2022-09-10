@extends('welcome')

@section('title', 'Sales')

@section('content')

    <div class="container mt-3">
        <div class="card">
            <div class="card-body">
                <a href="{{ route('tareas.index') }}">Index</a>
                <form method="POST" action={{ route('tareas.store') }}>
                    @csrf
                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label for="nombre" class="form-label">Tarea</label>
                            <input type="text" class="form-control" id="nombre" name="nombre">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="status" class="form-label">Estado</label>
                            <select class="form-select" aria-label="Default select example" name="status" id="status">
                                <option value="Pendiente">Pendiente</option>
                                <option value="Iniciado">Iniciado</option>
                                <option value="Finalizado">Finalizado</option>
                              </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Registrar tarea</button>
                </form>
            </div>
        </div>
        <div class="card mt-3">
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Tarea</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($tareas as $key => $item)
                            <tr>
                                <td>{{ $key + 1 }}</td>
                                <td>{{ $item->nombre }}</td>
                                <td>{{ $item->status }}</td>
                                <td>
                                    <form action="{{ route('tareas.destroy', $item->id)}}" method="post">
                                        @csrf
                                        @method('DELETE')
                                        <button class="btn btn-danger btn-sm" type="submit">Delete</button>
                                      </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

@endsection
