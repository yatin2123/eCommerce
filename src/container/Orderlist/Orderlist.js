import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Orderlist(props) {
    const order = useSelector(state => state.order);
    console.log(order);
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth);
    console.log(auth);
   

    const handleClick = () => {
        navigate('/orderdata', { orderData: v })
    }
    return (
        <div>
            {
                order.order.map((v) => {
                    if(v.uid === auth.user.uid){
                        return(
                      
                            <h1 onClick={() => handleClick()}>order list</h1>
                           
                        )
                    }
                    
                })
            }
        </div>
    );
}

export default Orderlist;