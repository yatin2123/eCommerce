import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import './ProductList.css'
function ProductList(props) {

    const [finalcategory, setFinalcategory] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('')
    const { catName, id } = useParams();
    console.log(catName, id);
    const product = useSelector(state => state.product);
    console.log(product);

    useEffect(() => {
        const data = product.product.filter((v) => v.cart_id == id || v.sub_id == id);
        console.log(data);
        setFinalcategory(data);

    }, [id, product.product]);

    console.log(finalcategory);

    // useEffect(() => {
    //     const Ddata = finalcategory.filter((v) =>
    //         v.pro_name.toLowerCase().includes(search.toLowerCase()) ||
    //         v.pro_price.toString().includes(search.toString())
    //     );
    //     setFinalcategory(Ddata)
    //         // Ddata = Ddata.sort((a, b) => {
    //         //     if (sort === 'az') {
    //         //         return a.pro_name.localeCompare(b.pro_name)
    //         //     } else if (sort === 'za') {
    //         //         return b.pro_name.localeCompare(a.pro_name)
    //         //     }
    //         // })
    // }, [search])

    const handleSearch = () => {
        console.log(search);
        let Ddata = finalcategory.filter((v) => {
            return (
                v.pro_name.toLowerCase().includes(search.toLowerCase()) ||
                v.pro_price.toString().includes(search.toString())
            )
        });

        Ddata = Ddata.sort((a, b) => {
            if (sort === 'az') {
                return a.pro_name.localeCompare(b.pro_name)
            }else if(sort == 'za'){
                return b.pro_name.localeCompare(a.pro_name)
            }else if(sort === 'low'){
                return a.pro_price - b.pro_price
            }else if(sort === 'high'){
                return b.pro_price - a.pro_price
            }
        })

        return Ddata;
    }

    const Ddata = handleSearch()

    return (
        <div>
            <section className="shop_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>Latest Products</h2>
                    </div>
                    <div>
                        <input placeholder='Search.....' onChange={(event) => setSearch(event.target.value)}></input>

                        <select onChange={(e) => setSort(e.target.value)}>
                            <option value='0'>--select--</option>
                            <option value='low'>Low price</option>
                            <option value='high'>high price</option>
                            <option value='a'>A to Z</option>
                            <option value='z'>Z to A</option>
                        </select>
                    </div>
                    <div className="row">
                        {Ddata.map((v) => {


                            return (
                                <div key={v.id} className="col-sm-6 col-md-4 col-lg-3">
                                    <NavLink className="nav-link scrollto" to={`/${v.id}`}>
                                        <div className="box">
                                            <a href="#">
                                                <div className="img-box">
                                                    <img src={v.file} alt={v.pro_name} />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="detail-box">
                                            <h6>{v.pro_name}</h6>
                                            <h6>Price <span>{v.pro_price}</span></h6>
                                            <h6>Stock: <span>{v.pro_stock}</span></h6>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
                    <div className="btn-box">
                        <NavLink to={`/view/shop/${id}`}>
                            View All
                        </NavLink>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default ProductList;