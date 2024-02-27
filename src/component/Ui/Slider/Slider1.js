import React, { useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./Slider1.css"
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';
import { getproduct } from '../../../container/slice/product.slice';
function Slider1(props) {
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    const dispatch = useDispatch()
    const product = useSelector((state => state.product));
    console.log(product);

    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);

    return (
        <div>
            <section id="product_section" className="product_section">
                <div className="container">
                    <div className='cat_box'> Product</div>
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
                        {product.product.map((v, index) => (

                            <SwiperSlide key={index}>
                                <Link to={`/shop/${v.id}`}>
                                    <>
                                        <Card
                                            style={{
                                                width: '18rem'
                                            }}
                                        >
                                            <img
                                                alt="Sample"    
                                                src={v.file_name}
                                            />
                                            <CardBody>
                                                <CardTitle tag="h5">
                                                    {v.pro_name}
                                                </CardTitle>
                                                <CardSubtitle
                                                    className="mb-2 text-muted"
                                                    tag="h6"
                                                >
                                                    {v.pro_des}
                                                </CardSubtitle>
        
                                                <Button>
                                                    <div className='s_btn'>
                                                    Button
                                                    </div>
                                                </Button>
                                            </CardBody>
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

export default Slider1;