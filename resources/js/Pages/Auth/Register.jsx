import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        names: '',
        surnames: '',
        cedula: '',
        email: '',
        country: '',
        addres: '',
        cellphone: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Guest>
            <Head title="Register" />
            <section className="sectionLogin">
                <form onSubmit={submit} className="container">
                    <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center">
                            <h3 className="mb-5">Registrarme</h3>
                            <div className="flex row">
                                <div className='col-md-6'>
                                    <Label forInput="names" value="Nombres" />
                                    <Input
                                        type="text"
                                        name="names"
                                        value={data.names}
                                        className="mt-1 block w-full"
                                        autoComplete="names"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <Label forInput="names" value="Apellidos" />
                                    <Input
                                        type="text"
                                        name="surnames"
                                        value={data.surnames}
                                        className="mt-1 block w-full"
                                        autoComplete="surnames"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <Label forInput="cedula" value="Cédula" />
                                    <Input
                                        type="text"
                                        name="cedula"
                                        value={data.cedula}
                                        className="mt-1 block w-full"
                                        autoComplete="cedula"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <Label forInput="email" value="Correo electronico" />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        handleChange={onHandleChange}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <Label forInput="country" value="Pais" />
                                    <Input
                                        type="text"
                                        name="country"
                                        value={data.country}
                                        className="mt-1 block w-full"
                                        autoComplete="country"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <Label forInput="addres" value="Dirección" />
                                    <Input
                                        type="text"
                                        name="addres"
                                        value={data.addres}
                                        className="mt-1 block w-full"
                                        autoComplete="addres"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <Label forInput="cellphone" value="Celular" />
                                    <Input
                                        type="text"
                                        name="cellphone"
                                        value={data.cellphone}
                                        className="mt-1 block w-full"
                                        autoComplete="cellphone"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <Label forInput="password" value="Contraseña" />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        handleChange={onHandleChange}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <Label forInput="password_confirmation" value="Confirme Contraseña" />
                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />
                                </div>
                            </div>
                            <ValidationErrors errors={errors} />
                            <div className="flex items-center justify-end mt-4">
                                <Button className="btn bn-sm btn-primary col-md-3" processing={processing}>
                                    Registrarme
                                </Button>
                                <br></br><br></br>
                                <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Ya estoy registrado
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </Guest>
    );
}
