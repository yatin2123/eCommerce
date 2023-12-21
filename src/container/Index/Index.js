import React from 'react';

function Index(props) {
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
                                                <img src="images/slider-img.png" alt />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
}

export default Index;