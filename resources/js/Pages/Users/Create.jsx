import React, { useEffect, useState } from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import swal from 'sweetalert';

export default function Create(props) {
    const { categories } = props;
    console.log(categories, 'categories');
    const { data, setData, post, processing, errors, reset } = useForm({
        names: '',
        surnames: '',
        cedula: '',
        email: '',
        country: '',
        addres: '',
        cellphone: '',
        password: '',
        country_id: '',
    });
    const [countries, setCountries] = useState({});
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'));
        // swal("¡Registro salvado con exito!", {
        //     icon: "success",
        //     timer: 1500,
        // });
    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://api.first.org/data/v1/countries?region=South%20America');
            // convert data to json
            const json = await data.json();
            setCountries(json);
            console.log(countries);
            console.log(json.data);
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);

    }, [])
    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Create'}
        >
            <Head title="Users" />
            <div className="container mt-3">
                <div className="card mt-3">
                    <div className={`${processing ? 'loading' : ''}`}>
                        <div className={`${processing ? 'spinner-border' : ''}`}></div>
                    </div>
                    <div className="card-header">
                        <Link href={route('users.index')} className="underline text-sm text-gray-600 hover:text-gray-900">
                            Atrás
                        </Link>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="names" className="form-label">Nombres</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="names"
                                        value={data.names}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.names && <div className="text-danger">{errors.names}</div>}
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="country" className="form-label">Pais</label>
                                    <select className="form-select" name="country"
                                        defaultValue={data.country}
                                        onChange={onHandleChange}
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="PENDING">COLOMBIA</option>
                                        <option value="STARTED">BRAZIL</option>
                                        <option value="FINISHED">MEXICO</option>
                                    </select>
                                    {errors.country && <div className="text-danger">{errors.country}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="surnames" className="form-label">Apellidos</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="surnames"
                                        value={data.surnames}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.surnames && <div className="text-danger">{errors.surnames}</div>}
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="cedula" className="form-label">Cedula</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cedula"
                                        value={data.cedula}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.cedula && <div className="text-danger">{errors.cedula}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={data.email}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="addres" className="form-label">Dirección</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="addres"
                                        value={data.addres}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.addres && <div className="text-danger">{errors.addres}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="cellphone" className="form-label">Celular</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cellphone"
                                        value={data.cellphone}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.cellphone && <div className="text-danger">{errors.cellphone}</div>}
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="country_id" className="form-label">Categoria</label>
                                    <select className="form-select" name="country_id"
                                        defaultValue={data.country_id}
                                        onChange={onHandleChange}
                                    >
                                        <option value="">Seleccione</option>
                                        {categories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                                    </select>
                                    {errors.country_id && <div className="text-danger">{errors.country_id}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="password"
                                        value={data.password}
                                        onChange={onHandleChange}
                                    ></input>
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-dark">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </Admin>
    );
}
