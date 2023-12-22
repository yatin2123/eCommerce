import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Layout from '../admin/layout/Layout';
// import Shop from '../admin/container/Shop/Shop'
import Layout from '../admin/latout/Layout';
import Shop from '../admin/container/Shop/Shop'

function Adminroute(props) {
    return (
        <div>
            <Layout>
                <Routes>

                    <Route exact path="/shop" element={<Shop/>} />
                </Routes>
            </Layout>
        </div>
    );
}

export default Adminroute;
