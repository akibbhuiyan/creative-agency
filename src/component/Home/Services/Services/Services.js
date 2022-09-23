import React, { useEffect, useState } from 'react';
import { serviceData } from '../../../../ServiceData';
import Service from '../Service/Service';
const Services = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        fetch('https://boiling-everglades-64438.herokuapp.com/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div className='container mt-5 pt-5'>
            <h2 className='text-brand pb-5'>Provide awesome <span>services</span></h2>
            <div className="d-flex flex-wrap mb-5">
                {
                    services.map(service => <Service service={service} key={service.id} />)
                }
            </div>
        </div>
    );
};

export default Services;