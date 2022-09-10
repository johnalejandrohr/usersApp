import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import MarkerDetails from '@/Pages/Markers/Components/MarkerDetails/Index';
import Createdetail from '@/Pages/Markers/Createdetail';

export default function Create(props) {
    const { marker } = props;

    const { data, setData, put, processing, errors, reset } = useForm({
        name: marker.name || '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        put(route("markers.update", marker.id));
    };
    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={`Marker / Edit / ${marker.id}`}
        >
            <Head title="Markers" />
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
                            <div className="row">
                                <div className="mb-3 col-md-12">
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
                            </div>
                            <button type="submit" className="btn btn-dark">Guardar</button>
                        </form>
                    </div>
                </div>
                {/* Create detail */}
                <Createdetail marker={marker.id} />
            </div>
        </Admin>
    );
}
