import { logDOM } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Details(props) {

    const [prodata, setProdata] = useState([])
    const product = useSelector(state => state.product)
    console.log(product);

    // const subcategory = useSelector(state => state.sbucategory)
    // console.log(subcategory);

    const { id } = useParams()
    console.log(id);

    useEffect(() => {
        // Ensure product data is available before filtering
        if (product.product.length > 0) {
            const filteredData = product.product.filter((v) => v.sub_id == id);
            console.log(filteredData);
            setProdata(filteredData);
        }
    }, [id, product.product])


    return (
        <div>
            <div className="card-wrapper">
                <div className="card">
                    {
                        prodata.map((v) => {
                            console.log(v.file);
                            return (
                                <>
                                    <div className="product-imgs">
                                        <div className="img-display">
                                            <div className="img-showcase">
                                            {/* <ImageField source={v.file_name} title="image" /> */}
                                                <img src={v.file} alt="product image" />
                                                {/* {v.additional_images.map((img, index) => (
                                                    <img key={index} src={img} alt={`additional product image ${index + 1}`} />
                                                ))} */}
                                                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt="shoe image" />
                                                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt="shoe image" />
                                                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt="shoe image" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="product-content">
                                        <h2 className="product-title">{v.pro_name}</h2>
                                        <a href="#" className="product-link">visit nike store</a>
                                        <div className="product-rating">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star-half-alt" />
                                            <span>4.7(21)</span>
                                        </div>
                                        <div className="product-price">
                                            <p className="last-price">Old Price: <span>$857.00</span></p>
                                            <p className="new-price">New Price: <span>${v.pro_price}</span></p>
                                        </div>
                                        <div className="product-detail">
                                            <h2>about this item: </h2>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                                            <ul>
                                                <li>Color: <span>Black</span></li>
                                                <li>Available: <span>in stock</span></li>
                                                <li>Category: <span>Shoes</span></li>
                                                <li>Shipping Area: <span>All over the world</span></li>
                                                <li>Shipping Fee: <span>Free</span></li>
                                            </ul>
                                        </div>
                                        <div className="purchase-info">
                                            <input type="number" min={0} defaultValue={1} />
                                            <button type="button" className="btn">
                                                Add to Cart <i className="fas fa-shopping-cart" />
                                            </button>
                                            <button type="button" className="btn">Compare</button>
                                        </div>
                                        <div className="social-links">
                                            <p>Share At: </p>
                                            <a href="#">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-instagram" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-whatsapp" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-pinterest" />
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    );
}

export default Details;