import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import swal from 'sweetalert';

export default function Createdetail(props) {
    const { marker } = props
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        url: '',
        marker_id: marker,
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        post(route('markers.details.store'));
        swal("¡Registro salvado con exito!", {
            icon: "success",
            timer: 1500,
        });
    };
    return (
        <div className="card mt-3">
            <div className="card-header">
                Detalle
            </div>
            <div className="card-body">
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={data.name}
                                onChange={onHandleChange}
                            ></input>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={data.description}
                                onChange={onHandleChange}
                            ></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-12">
                            <label htmlFor="url" className="form-label">URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="url"
                                value={data.url}
                                onChange={onHandleChange}
                            ></input>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark">Guardar</button>
                </form>
            </div>
        </div>
    );
}
