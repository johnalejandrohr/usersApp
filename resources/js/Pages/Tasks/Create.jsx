import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import swal from 'sweetalert';

export default function Create(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        status: '',
        priority_level: '',
        create_new_register: false,
        count: 0,
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
        swal("¡Registro salvado con exito!", {
            icon: "success",
            timer: 1500,
        });
    };
    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Create'}
        >
            <Head title="Tasks" />
            <div className="container mt-3">
                <div className="card mt-3">
                    <div className={`${processing ? 'loading' : ''}`}>
                        <div className={`${processing ? 'spinner-border' : ''}`}></div>
                    </div>
                    <div className="card-header">
                        <Link href={route('tasks.index')} className="underline text-sm text-gray-600 hover:text-gray-900">
                            Atrás
                        </Link>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <p>Crear varios registros</p>
                                </div>
                                <div className='col-md-1'>
                                <div className='switch__div'>
                                    <input type="checkbox" id="toggle1" class="offscreen" name='create_new_register'
                                    value={data.create_new_register}
                                    onChange={onHandleChange}
                                    />
                                    <label for="toggle1" class="switch">1 &nbsp; 0</label>
                                </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="name" className="form-label">Nombre Tarea</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={data.name}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="status" className="form-label">Estado</label>
                                    <select className="form-select" name="status"
                                        defaultValue={data.status}
                                        onChange={onHandleChange}
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="PENDING">PENDIENTE</option>
                                        <option value="STARTED">INICIADO</option>
                                        <option value="FINISHED">FINALIZADO</option>
                                    </select>
                                    {errors.status && <div className="text-danger">{errors.status}</div>}
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="priority_level" className="form-label">PRIORIDAD</label>
                                    <select className="form-select" name="priority_level"
                                        defaultValue={data.priority_level}
                                        onChange={onHandleChange}
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="LOW">BAJO</option>
                                        <option value="NORMAL">NORMAL</option>
                                        <option value="HIGH">ALTO</option>
                                        <option value="URGENT">URGENTE</option>
                                    </select>
                                    {errors.priority_level && <div className="text-danger">{errors.priority_level}</div>}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-dark">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </Admin>
    );
}
