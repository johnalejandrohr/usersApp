import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";
import swal from 'sweetalert';

export default function Create(props) {
    const { tasks } = props

    function destroy(id) {
        swal({
            title: `Esta seguro de eliminar la tarea ${id}?`,
            text: "Una vez eliminado, ¡no podrá recuperar este registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Inertia.delete(route("tasks.destroy", id));
                    swal("¡Tu registro ha sido eliminado!", {
                        icon: "success",
                        timer: 1500,
                    });
                } else {
                    swal("¡Tu registro está a salvo!", {
                        icon: "warning",
                        timer: 1500,
                    });
                }
            });

    }

    const status = ({ status }) => {
        if (status === 'PENDING') {
            return (<span className='badge bg-warning text-dark text-uppercase'>pendiente</span>);
        }
        if (status === 'STARTED') {
            return (<span className='badge bg-success text-uppercase'>iniciado</span>);
        }
        if (status === 'FINISHED') {
            return (<span className='badge bg-secondary text-uppercase'>finalizado</span>);
        }
    }
    const priority = ({ priority_level }) => {
        if (priority_level === 'LOW') {
            return (<span className='p-2 badge bg-success text-white text-uppercase'>bajo</span>);
        }
        if (priority_level === 'NORMAL') {
            return (<span className='p-2 badge bg-primary text-uppercase'>normal</span>);
        }
        if (priority_level === 'HIGH') {
            return (<span className='p-2 badge bg-warning text-dark text-uppercase'>alto</span>);
        }
        if (priority_level === 'URGENT') {
            return (<span className='p-2 badge bg-danger text-uppercase'>urgente</span>);
        }
    }
    const formatDate = (current_datetime) => {
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        return formatted_date;
    }

    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Tasks'}
        >
            <Head title="Tasks" />

            <div className="container mt-3">
                <div className="card mt-3">
                    <div className='card-header bg-primary'>
                        <Link href={route('tasks.create')} className="btn btn-sm btn-dark">
                            Nuevo
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className='row'>
                            <table className="table" style={{whiteSpace:'nowrap'}}>
                                <thead>
                                    <tr>
                                        <th scope="col">Código</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Prioridad</th>
                                        <th scope="col">Fecha creacion</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.length > 0 ?
                                            tasks.map((task) => {
                                                return (
                                                    <tr key={task.id}>
                                                        <td>{task.id}</td>
                                                        <td scope="row" className='text-capitalize'>{task.name}</td>
                                                        <td>{status(task)}</td>
                                                        <td>{priority(task)}</td>
                                                        <td>{formatDate(new Date(task.created_at))}</td>
                                                        <td>
                                                            <div className='d-flex justify-content-around'>
                                                                <Link href={route('tasks.edit', task.id)} data-bs-toggle="tooltip" data-bs-placement="top" title="Editar">
                                                                    <i className="text-primary bi bi-pencil-square"></i>
                                                                </Link>
                                                                <Link data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar tarea">
                                                                    <i class="text-success bi bi-eye-fill"></i>
                                                                </Link>
                                                                <Link onClick={() => destroy(task.id)} data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar tarea">
                                                                    <i className="text-danger bi bi-x-circle-fill"></i>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <th className='text-center text-white bg-secondary' colSpan={6}>No hay datos</th>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    );
}
