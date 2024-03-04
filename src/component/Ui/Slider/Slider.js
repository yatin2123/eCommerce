import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Slider.css';
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col, CardImgOverlay } from 'reactstrap';
import Slider1 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { hover } from '@testing-library/user-event/dist/hover';
// import 'swiper/css/scrollbar';



// function Arrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block", background: "black" }}
//             onClick={onClick}
//         />
//     );
// }

function Slider(props) {
    const category = useSelector(state => state.shop);
    console.log(category);


    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     // autoplay: true,
    //     // speed: 2000,
    //     // autoplaySpeed: 2000,
    //     // cssEase: "linear",
    //     nextArrow: <Arrow />,
    //     prevArrow: <Arrow />,

    // };

    // return (
    //     <section id="category_section" className="category_section">
    //         <div className="container">
    //             <div className='cat_box' > Trending Category's</div>
    //             <div className='one'><p>hgeruigyhegihegiegoeghgheogjheogjoghekvfbveibrigbryugbrgyurbgu</p></div>
    //             <div className="slider-container">
    //                 <Slider1 {...settings}>
    //                     {category.shop.map((v, index) => (
    //                         console.log(v),

    //                         <Link to={`/shop/${v.id}`}>
    //                             <Card
    //                                 style={{
    //                                     width: '18rem'
    //                                 }}
    //                             >

    //                                 <img
    //                                     alt="Sample"
    //                                     src={v.file}
    //                                     height={"300px"}
    //                                     width={"285px"}
    //                                 />
    //                                 <div className='imge-overly'>
    //                                     <div className='contact'>
    //                                         <CardBody>
    //                                             <CardTitle tag="h5">
    //                                                 {v.cat_name}
    //                                             </CardTitle>
    //                                         </CardBody>
    //                                     </div>
    //                                 </div>
    //                             </Card>
    //                         </Link>

    //                     ))}
    //                 </Slider1>
    //             </div>
    //         </div>
    //     </section>
    // );

    return (
        <div>
            <section id="category_section" className="category_section">
                <div className="container">
                    <div className='cat_box' >Trending Category's</div>
                    <div className='one'><p>hgeruigyhegihegiegoeghgheogjheogjoghekvfbveibrigbryugbrgyurbgu</p></div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        //    scrollbar={{ draggable: true }}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            '@0.75': {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            '@1.00': {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            '@1.50': {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }}
                    >
                        {category.shop.map((v, index) => (
                            console.log(v),
                            <SwiperSlide key={index}>
                                <Link to={`/shop/${v.id}`}>
                                    
                                    <div className={`box-one one ${v.id}`} > 
                                        <Card
                                            style={{
                                                width: '18rem'
                                            }}
                                        >
                                            <img 
                                                alt="Sample"
                                                src={v.file}
                                                height={"300px"}
                                                width={"285px"}
                                            />

                                            <div className='box'>
                                                <div className='imge-overly'>
                                                    <div className='contact'>
                                                        <CardBody>
                                                            <CardTitle tag="h5">
                                                                {v.cat_name}
                                                            </CardTitle>
                                                        </CardBody>
                                                    </div>
                                                </div>
                                            </div>

                                        </Card>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
}

export default Slider;