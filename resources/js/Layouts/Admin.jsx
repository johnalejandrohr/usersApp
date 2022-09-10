import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Admin({ auth, header, children, errors }) {
    console.log(errors);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-white bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-dark" href="#">Tareas</a>
                    <button className="bg-warning navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href={route('tasks.index')} active={route().current('tasks*')}>
                                    Tareas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href={route('markers.index')} active={route().current('markers*')}>
                                    Marcadores
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href={route('tareas.index')} active={route().current('tareas*')}>
                                    Tasks
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                        <li className="nav-item dropdown">
                            <a className="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {auth.user.name}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href={route('profile.edit', auth.user.id)} method="get">Perfil</a></li>
                                <li><a className="dropdown-item" href={route('logout')} method="post">Salir</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* {
                auth.user.email_verified_at === null ?
                    (<div className="alert alert-success" role="alert">
                        ¡Correo sin verificar!
                    </div>) : null
            } */}

            {header && (
                <div className='mt-3'>
                    <div className='container'>
                        <nav aria-label="breadcrumb container">
                            <ol className="breadcrumb bg-white p-3">
                                <li className="breadcrumb-item" aria-current="page">Home</li>
                                <li className="breadcrumb-item active" aria-current="page">{header}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            )}

            <main>{children}</main>
        </>
    );
}
