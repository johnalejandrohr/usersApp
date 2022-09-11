import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import WelcomeComponent from './../Components/WelcomeComponent';

export default function Welcome(props) {
    return (
        <>
            <Head title="Home" />
            <WelcomeComponent isLogued={props.auth.user} />
        </>
    );
}
