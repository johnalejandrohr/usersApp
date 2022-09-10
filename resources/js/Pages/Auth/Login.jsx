import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
                <form onSubmit={submit}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                                    <div className="card-body p-5 text-center">

                                        <h3 className="mb-5">Ingresar</h3>
                                        <div>
                                            <Label forInput="email" value="Email" />

                                            <Input
                                                type="text"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                isFocused={true}
                                                handleChange={onHandleChange}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <Label forInput="password" value="Password" />

                                            <Input
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
                                                handleChange={onHandleChange}
                                            />
                                        </div>

                                        <div className="flex items-center justify-end mt-4">
                                            {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            )}

                                            <br></br>
                                            <Button className="ml-4 btn btn-sm btn-primary" processing={processing}>
                                                Log in
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </Guest>
    );
}
