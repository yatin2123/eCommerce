import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./Slider1.css"
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';
import { getproduct } from '../../../container/slice/product.slice';
import Slider from "react-slick";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
function Slider1(props) {
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    const dispatch = useDispatch()
    const product = useSelector((state => state.product));
    console.log(product);

    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);


    return (
        <section id="product_section" className="product_section">
            <div className="container">
                <div className='cat_box'>Trending Product</div>
                <div className='one'><p>hgeruigyhegihegiegoeghgheogjheogjoghekvfbveibrigbryugbrgyurbgu</p></div>
                <div className="slider-container">

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
                        {

                            product.product.map((v) => {
                                console.log(v);
                                return (
                                    <SwiperSlide>
                                        <Link to={`/${v.id}`}>
                                            <div key={v.id}>
                                                <div className='design-cat'>
                                                    <Card
                                                        style={{
                                                            width: '18rem'
                                                        }}
                                                    >
                                                        <div className='slider-one'>
                                                            <img
                                                                alt="Sample"
                                                                src={v.file}
                                                            />
                                                        </div>
                                                        <CardBody>
                                                            <CardTitle tag="h5">
                                                                {v.pro_name}
                                                            </CardTitle>
                                                            <CardSubtitle
                                                                className="mb-2 text-muted"
                                                                tag="h6"
                                                            >
                                                                {v.pro_price}
                                                            </CardSubtitle>
                                                            <Button>
                                                                <div className='s_btn'>
                                                                    Shop
                                                                </div>
                                                            </Button>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default Slider1;


