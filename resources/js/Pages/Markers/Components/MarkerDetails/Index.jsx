import React from 'react';

export default function Create({ detail }) {
    return (
        <>
            {
                detail.length > 0 ?
                    <div>
                        <table className="table" style={{ whiteSpace: 'nowrap' }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={2}>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detail.map((item) =>
                                    (<tr key={item.id}>
                                        <td><i class="bi bi-bookmark-fill"></i></td>
                                        <td style={{ cursor: 'pointer' }}>
                                            <a className="text-decoration-none text-capitalize" href={item.url}>{item.name}</a>
                                        </td>
                                    </tr>)
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <span className='badge bg-warning'>No hay marcadores</span>
            }

        </>
    );
}
