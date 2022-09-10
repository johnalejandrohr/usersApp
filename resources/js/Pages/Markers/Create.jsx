import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import swal from 'sweetalert';

export default function Create(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        create_new_register: false,
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        post(route('markers.store'));
        swal("¡Registro salvado con exito!", {
            icon: "success",
            timer: 1500,
        });
    };
    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Markers / Create'}
        >
            <Head title="Tasks" />
            <div className="container mt-3">
                <div className="card mt-3">
                    <div className={`${processing ? 'loading' : ''}`}>
                        <div className={`${processing ? 'spinner-border' : ''}`}></div>
                    </div>
                    <div className="card-header">
                        <Link href={route('markers.index')} className="underline text-sm text-gray-600 hover:text-gray-900">
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
                                    <label htmlFor="name" className="form-label">Nombre Marcador</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={data.name}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
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
