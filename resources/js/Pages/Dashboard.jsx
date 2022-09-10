import React from 'react';
import Admin from '@/Layouts/Admin';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Dashboard'}
        >
            <Head title="Dashboard" />

           
        </Admin>
    );
}
