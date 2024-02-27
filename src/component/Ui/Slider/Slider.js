import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Slider.css';
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';

function Slider(props) {
    const category = useSelector(state => state.shop);
    console.log(category);


    return (
        <div>
            <section id="category_section" className="category_section">
                <div className="container">
                    <div className='cat_box' > Category's</div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
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

                            <SwiperSlide key={index}>
                                <Link to={`/shop/${v.id}`}>
                                    <>
                                        <Card body>
                                            <CardTitle tag="h5">
                                                {v.cat_name}
                                            </CardTitle>

                                            <Button>
                                                Go somewhere
                                            </Button>
                                        </Card>
                                    </>

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