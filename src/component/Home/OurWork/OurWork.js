import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './OurWork.css'
import { carouselData } from '../../../ServiceData'
export default class OurWork extends Component {


    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        };
        return (
            <div className="ourWork py-5">
                <h2 className="text-brand py-5 text-white">Here are some of <span>our works</span></h2>
                <Slider ref={slider => (this.slider = slider)} {...settings} className='pb-5 carousel-margin'>
                    {
                        carouselData.map(data => <img src={data.img} alt='' className="pe-5 mb-5 previewImg" />)
                    }
                </Slider>

            </div>
        );
    }
}