import React from 'react';
import SideBar from '../SideBar/SideBar';
import ReviewForm from './ReviewForm';

const Review = () => {
    return (
        <div className='row'>
            <SideBar />
            <div className="col-md-9">
                <ReviewForm />
            </div>
        </div>
    );
};

export default Review;