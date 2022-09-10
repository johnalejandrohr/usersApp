import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head, useForm } from '@inertiajs/inertia-react';

export default function Create(props) {
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nombre: '',
        status: 'Pendiente',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        post(route('tareas.store'));
    };
    const update = async (event, id) => {
        event.preventDefault();
        put(route("tareas.update", id));
    };
    const eliminar = (id) => {
        // if (confirm("Are you sure you want to delete this user?")) {
        destroy(route("tareas.destroy", id));
        // }
    }
    console.log(processing);
    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Crear Tarea'}
        >
            <Head title="Tareas" />
            <div className="container mt-3">
                <div className="card mt-3">
                    <div className={`${processing ? 'loading' : ''}`}>
                        <div className={`${processing ? 'spinner-border' : ''}`}></div>
                    </div>
                    <div className="card-header">
                        <Link href={route('tareas.index')} className="underline text-sm text-gray-600 hover:text-gray-900">
                            Lista de Tareas
                        </Link>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="nombre" className="form-label">Tarea</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        onChange={onHandleChange}
                                    ></input>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="status" className="form-label">Estado</label>
                                    <select className="form-select" name="status"
                                        onChange={onHandleChange}
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Iniciado">Iniciado</option>
                                        <option value="Finalizado">Finalizado</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Registrar tarea</button>
                        </form>
                    </div>
                </div>
                <div className='card mt-2'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Tarea</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.tareas.map((tarea) => {
                                    return (
                                        <tr key={tarea.id} className={tarea.status === 'Pendiente' ? 'bg-warning' : ''}>
                                            <td scope="col">{tarea.id}</td>
                                            <td scope="col">{tarea.nombre}</td>
                                            <td scope="col">
                                                <select className="form-select" name={`status`}
                                                    onChange={onHandleChange}
                                                    defaultValue={tarea.status}
                                                >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="Iniciado">Iniciado</option>
                                                    <option value="Finalizado">Finalizado</option>
                                                </select>
                                            </td>
                                            <td scope="col">
                                                <button
                                                    onClick={() => eliminar(tarea.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Destruir
                                                </button>
                                                <button
                                                    onClick={(e) => update(e, tarea.id)}
                                                    className="btn btn-sm btn-success"
                                                >
                                                    Actualizar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Admin>
    );
}
