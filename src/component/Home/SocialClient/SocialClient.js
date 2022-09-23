import React from 'react';
import { SocialProvider } from '../../../ServiceData';

const SocialClient = () => {
    return (
        <div className='d-flex justify-content-center flex-wrap'>
            {
                SocialProvider.map(provider => <img src={provider.img} className='px-3 mb-4' alt="provider" key={provider.id} width='160px' height='45px' />)
            }

        </div>
    );
};

export default SocialClient;