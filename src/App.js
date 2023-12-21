import logo from './logo.svg';
import './App.css';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Index from './container/Index/Index';
import Shop from './container/Shop/Shop';
import Why from './container/Why/Why';
import Testimonial from './container/Testimonial/Testimonial';
import Contact from './container/Contact/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() {
  return (


    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route exact path='/' element={<Index />} />
          <Route exact path='shop' element={<Shop />} />
          <Route exact path='testimonial' element={<Testimonial />} />
          <Route exact path='why' element={<Why />} />
          <Route exact path='contact' element={<Contact />} />
        </Routes>
        <Index />
        <Shop></Shop>
        <Why />
        <Testimonial />
        <Contact />
        <Footer />
      </Provider>
    </>


  );
}

export default App;
