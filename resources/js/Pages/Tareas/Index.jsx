import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link } from '@inertiajs/inertia-react';
import { Head } from '@inertiajs/inertia-react';

export default function Create(props) {
    const { tareas } = props
    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Tareas'}
        >
            <Head title="Tareas" />

            <div className="container mt-3">
                <div className="card mt-3">
                    <div className='card-header'>
                        <Link href={route('tareas.create')} className="underline text-sm text-gray-600 hover:text-gray-900">
                            Crear tarea
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className='row'>
                            {
                                tareas.map((tarea) => {
                                    return (
                                        <div class="card col-3 m-1" key={tarea.id}>
                                            <div class="card-body">
                                                <h5 class="card-title">{tarea.id}. {tarea.nombre}</h5>
                                                {
                                                    tarea.status === 'Pendiente' ? 
                                                    <span class="badge bg-warning text-bg-success">{tarea.status}</span>
                                                    :
                                                    <span class="badge bg-light text-dark">{tarea.status}</span>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    );
}
