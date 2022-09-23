import React, { useEffect, useState } from 'react';
import Comment from '../Comment/Comment';

const FeedBack = () => {
    const [FeedBack, setFeedBack] = useState([])
    useEffect(() => {
        fetch('https://boiling-everglades-64438.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setFeedBack(data))
    }, [])
    return (
        <div className='container my-5 pb-5'>
            <h2 className="text-brand">Clients <span>Feedback</span></h2>
            <div className="d-flex flex-wrap pt-5">
                {
                    FeedBack.map(service => <Comment service={service} key={service.id} />)
                }
            </div>
        </div>
    );
};

export default FeedBack;