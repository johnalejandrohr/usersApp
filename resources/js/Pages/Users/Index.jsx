import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";
import swal from 'sweetalert';

export default function Create(props) {
    const { users } = props

    function destroy(id, names) {
        swal({
            title: `Esta seguro de eliminar el usuario ${id} - ${names}?`,
            text: "Una vez eliminado, ¡no podrá recuperar este registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Inertia.delete(route("users.destroy", id));
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

    const formatDate = (current_datetime) => {
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        return formatted_date;
    }

    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Users'}
        >
            <Head title="Users" />

            <div className="container mt-3">
                <div className="card mt-3">
                    <div className='card-header bg-primary'>
                        <Link href={route('users.create')} className="btn btn-sm btn-dark">
                            Nuevo
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className='row'>
                            <table className="table" style={{whiteSpace:'nowrap'}}>
                                <thead>
                                    <tr>
                                        <th scope="col">Código</th>
                                        <th scope="col">Nombres</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Fecha creacion</th>
                                        <th scope="col">Fecha ultima actualización</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length > 0 ?
                                            users.map((user) => {
                                                return (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td scope="row" className='text-capitalize'>{user.names}</td>
                                                        <td scope="row" className='text-capitalize'>{user.surnames}</td>
                                                        <td scope="row">{user.email}</td>
                                                        <td>{formatDate(new Date(user.created_at))}</td>
                                                        <td>{formatDate(new Date(user.updated_at))}</td>
                                                        <td>
                                                            <div className='d-flex justify-content-around'>
                                                                <Link href={route('users.edit', user.id)} data-bs-toggle="tooltip" data-bs-placement="top" title="Editar">
                                                                    <i className="text-primary bi bi-pencil-square"></i>
                                                                </Link>
                                                                <Link data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar tarea">
                                                                    <i class="text-success bi bi-eye-fill"></i>
                                                                </Link>
                                                                <Link onClick={() => destroy(user.id, user.names)} data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar tarea">
                                                                    <i className="text-danger bi bi-x-circle-fill"></i>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <th className='text-center text-white bg-dark' colSpan={7}>No hay datos</th>
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
