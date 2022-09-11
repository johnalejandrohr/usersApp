import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function WelcomeComponent({isLogued}) {
    return (
        <>
        <div className="header">
            {!isLogued ? (
                <>
                    <Link href={route('login')} className="link header__link">
                        <i class="bi bi-door-open-fill"></i> Ingresar
                    </Link>

                    <Link href={route('register')} className="link header__link">
                        <i class="bi bi-pen-fill"></i> Registrarme
                    </Link>
                </>
            ) : (
                <>
                    <Link href={route('dashboard')} className="link text-dark">
                        Panel de Administración - Aun sigues logueado
                    </Link>        
                </>
            )}
        </div>
        <div className="welcome">
            {/* Pagina de bienvenida */}
            <h1 style={{fontSize:'64px', color:'rebeccapurple'}}>Bienvenido!!</h1>
        </div>
        </>
    );
}
