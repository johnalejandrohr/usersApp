import React from 'react';
import Admin from '@/Layouts/Admin';
import { Link, Head, useForm, usePage } from '@inertiajs/inertia-react';

export default function Edit(props) {
    const { user } = usePage().props;
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        key_telegram: user.key_telegram || "",
        chatid_telegram: user.chatid_telegram || "",
        email_verified_at: user.email_verified_at || null,
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        put(route("profile.update", props.user.id));
    };
    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
            header={'Actualizar Perfíl'}
        >
            <Head title="Perfil" />
            <form onSubmit={submit}>
                <div className="container mt-3">
                    <div className="card mt-3 row">
                        <div className={`${processing ? 'loading' : ''}`}>
                            <div className={`${processing ? 'spinner-border' : ''}`}></div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="mb-3 offset-md-2 col-md-8">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={data.name}
                                        onChange={onHandleChange}
                                    ></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 offset-md-2 col-md-8">
                                    <label htmlFor="email" className="form-label">Correo electronico</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={data.email}
                                        onChange={onHandleChange}
                                    ></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 offset-md-2 col-md-4">
                                    <label htmlFor="key_telegram" className="form-label">Key Telegram</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="key_telegram"
                                        placeholder="XXXXXXXXXX:000000000000000"
                                        value={data.key_telegram}
                                        onChange={onHandleChange}
                                    ></input>
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="chatid_telegram" className="form-label">Chat ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="chatid_telegram"
                                        placeholder='0000000000'
                                        value={data.chatid_telegram}
                                        onChange={onHandleChange}
                                    ></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 offset-md-2 col-md-8">
                                    <button type="submit" className="btn btn-dark">Actualizar pefil</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Admin>
    );
}
