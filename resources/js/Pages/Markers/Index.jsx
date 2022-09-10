import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";
import swal from 'sweetalert';
import MarkerDetails from '@/Pages/Markers/Components/MarkerDetails/Index'

export default function Create(props) {
    const { markers } = props

    function destroy(id) {
        swal({
            title: `Esta seguro de eliminar el marcador ${id}?`,
            text: "Una vez eliminado, ¡no podrá recuperar este registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Inertia.delete(route("markers.destroy", id));
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
            header={'Markers'}
        >
            <Head title="Markers" />

            <div className="container mt-3">
                <div className="card mt-3">
                    <div className='card-header bg-primary'>
                        <Link href={route('markers.create')} className="btn btn-sm btn-dark">
                            Nuevo
                        </Link>
                    </div>
                    <div className="card-body">
                        {
                            markers.map((marker) => {
                                return (
                                    <div className='row' key={marker.id}>
                                        <p>
                                            <a className="text-decoration-none text-dark" data-bs-toggle="collapse" href={`#marketCollapse${marker.id}`} role="button" aria-expanded="true" aria-controls={`marketCollapse${marker.id}`}>
                                                {marker.name} &nbsp;
                                                <span className='badge bg-primary'>{marker.detail.length}</span>
                                            </a> &nbsp; &nbsp;
                                            <Link href={route('markers.edit', marker.id)} data-bs-toggle="tooltip" data-bs-placement="top" title="Editar">
                                                <i className="text-primary bi bi-pencil-square"></i>
                                            </Link>  &nbsp; &nbsp;
                                            <Link onClick={() => destroy(marker.id)} data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar tarea">
                                                <i className="text-danger bi bi-x-circle-fill"></i>
                                            </Link>
                                        </p>
                                        <div className={`collapse ${marker.detail.length === 0 ? '' : 'show'}`} id={`marketCollapse${marker.id}`}>
                                            <MarkerDetails
                                                detail={marker.detail}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </Admin>
    );
}
