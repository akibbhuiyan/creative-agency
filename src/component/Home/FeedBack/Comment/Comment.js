import React from 'react';

const Comment = ({ service }) => {
    return (

        <div className="card d-flex justify-content-center border mx-3 py-4 px-2 service ps-4 mb-4" >
            <div className="d-flex align-items-center mb-3">
                <img src={service.photourl} alt={service.name} width='50px' style={{ borderRadius: '50%' }} />
                <div className="pt-2">
                    <h6 className='ms-3'>{service.name}</h6>
                    <h6 className='text-start ms-3'>{service.designation}</h6>
                </div>
            </div>

            <p>{service.description}</p>
        </div>
    );
};

export default Comment;