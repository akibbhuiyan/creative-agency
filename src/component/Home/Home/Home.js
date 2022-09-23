import React from 'react';
import FeedBack from '../FeedBack/FeedBack/FeedBack';
import Footer from '../Footer/Footer';
import Header from '../HeaderMain/Header/Header';
import OurWork from '../OurWork/OurWork';
import SocialClient from '../SocialClient/SocialClient';
import Services from '../Services/Services/Services'
import './Home.css'

const Home = () => {
    return (
        <>
            <Header />
            <SocialClient />
            <Services />
            <OurWork />
            <FeedBack />
            <Footer />
        </>

    );
};

export default Home;