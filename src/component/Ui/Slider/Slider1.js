import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./Slider1.css"
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';
import { getproduct } from '../../../container/slice/product.slice';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Slider1(props) {
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    const dispatch = useDispatch()
    const product = useSelector((state => state.product));
    console.log(product);

    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <section id="product_section" className="product_section">
            <div className="container">
                <div className='cat_box'>Trending Product</div>
                <div className="slider-container">

                    <Slider {...settings}>
                        {
                            product.product.map((v) => {
                                console.log(v);
                                return (  // <- Add this return statement
                                    <Link to={`/shop/${v.id}`}>
                                        <div key={v.id}> {/* Add a key prop for each mapped item */}
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
                                                        {v.pro_des}
                                                    </CardSubtitle>

                                                    <Button>
                                                        <div className='s_btn'>
                                                            Shop
                                                        </div>
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </Link>
                                );
                            })
                        }
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default Slider1;