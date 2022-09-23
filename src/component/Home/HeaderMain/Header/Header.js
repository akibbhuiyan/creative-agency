import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import Navbar from '../Navbar/Navbar';

const Header = () => {
    return (
        <div className='header-bg'>
            <div className="pb-5">
                <Navbar />
                <HeroSection />
            </div>
        </div >
    );
};

export default Header;