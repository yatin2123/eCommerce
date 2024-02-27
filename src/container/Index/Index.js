import React from 'react';
import Slider from '../../component/Ui/Slider/Slider';

import { useSelector } from "react-redux";
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import Slider1 from '../../component/Ui/Slider/Slider1';

function Index(props) {

    const product = useSelector((state => state.product));
    console.log(product);
    return (
        <>
        
            <section className="slider_section">
                <div className="slider_container">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="detail-box">
                                                <h1>
                                                    Welcome To Our <br /><br />
                                                    Gift Shop
                                                </h1>
                                                <p>
                                                    Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non necessitatibus error distinctio mollitia suscipit. Nostrum fugit doloribus consequatur distinctio esse, possimus maiores aliquid repellat beatae cum, perspiciatis enim, accusantium perferendis.
                                                </p>
                                                <a href>
                                                    Contact Us
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-5 ">
                                            <div className="img-box">
                                                <img src="%PUBLIC_URL%/agency-img.jpg" alt />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Slider>


            </Slider>

           <Slider1>

           </Slider1>
        </>
    );
}

export default Index;