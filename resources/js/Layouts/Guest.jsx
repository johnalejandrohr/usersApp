import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <>
            <div className="header">
                <Link href={route('login')} className="link header__link">
                    <i class="bi bi-door-open-fill"></i> Ingresar
                </Link>

                <Link href={route('register')} className="link header__link">
                    <i class="bi bi-pen-fill"></i> Registrarme
                </Link>
            </div>
            {children}
        </>
    );
}
