@extends('welcome')

@section('title', 'Sales')

@section('content')

    <div class="container mt-3">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Tarea</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
                @foreach ($tareas as $item)
                <tr>
                    <th>{{ $item->nombre }}</th>
                    <th>{{ $item->status }}</th>
                  </tr>
                @endforeach
            </tbody>
          </table>
    </div>

@endsection
