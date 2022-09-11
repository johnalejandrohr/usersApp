import React from 'react';
import swal from 'sweetalert';

export default function ValidationErrors({ errors }) {
    // if (Object.keys(errors).length > 0) {
    //     swal("Ha ocurrido un error inesperado", {
    //         icon: "warning",
    //         timer: 1500,
    //         text: "Testno  sporocilo za objekt: <b>test</b>",
    //     });
    // }
    return (
        Object.keys(errors).length > 0 && (

            <div style={{backgroundColor:'rebeccapurple'}}>
                <div className="container">
                    <div className="card shadow-2-strong bg-red-300" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center">
                            <h3 className="mb-5">¡Vaya! Algo salió mal.</h3>
                            <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                                {Object.keys(errors).map(function (key, index) {
                                    return <li key={index}>{errors[key]}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
