import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Layout from '../admin/layout/Layout';
// import Shop from '../admin/container/Shop/Shop'
import Layout from '../admin/latout/Layout';
// import { Shop } from '@mui/icons-material';
// import Shop from '../admin/container/Shop/Shop'
import Shop from '../admin/container/Shop/Shop'
import Subcategory from '../admin/container/Subcategory';

function Adminroute(props) {
    return (
        <div>
            <Layout>
                <Routes>

                    <Route exact path="/shop" element={<Shop/>} />
                    <Route exact path="/subcategory" element={<Subcategory/>} />
                </Routes>
            </Layout>
        </div>
    );
}

export default Adminroute;
