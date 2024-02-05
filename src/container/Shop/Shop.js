import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getsubcategory } from '../slice/subcategory.slice';
import { useParams } from 'react-router-dom';

function Shop(props) {

    const [finaldata, setFinaldata] = useState([])
    const dispatch = useDispatch()
    const subcategory = useSelector(state => state.sbucategory);
    console.log(subcategory);

    const { id } = useParams()
    console.log(id);
    useEffect(()=>{
        dispatch(getsubcategory())

        const categorydata = subcategory.subcategory.filter((v) => v.id == id)
        console.log(categorydata);
        
    },[])
    

    return (
        <div>
            <section className="shop_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Latest Products
                        </h2>
                    </div>
                    <div className="row">
                        {
                            subcategory.subcategory.map((v) => {
                                return (
                                    <>
                                        <div className="col-sm-6 col-md-4 col-lg-3">
                                            <div className="box">
                                                <a href>
                                                    <div className="img-box">
                                                        <img src={v.file}alt />
                                                    </div>
                                                    <div className="detail-box">
                                                        <h6>
                                                            {v.sub_name}
                                                        </h6>
                                                        <h6>
                                                            Price
                                                            <span>
                                                                $200
                                                            </span>
                                                        </h6>
                                                    </div>
                                                    <div className="new">
                                                        <span>
                                                            New
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                    </>
                                )
                            })
                        }

                    </div>
                    <div className="btn-box">
                        <a href>
                            View All Products
                        </a>
                    </div>
                </div>
            </section >
        </div >

    );
}

export default Shop;