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
import { persistor, store } from './redux/store';
import Userroute from './routes/Userroute';
import Adminroute from './routes/Adminroute'
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';
import Alert from './component/Alert/Alert';

function App() {
  return (
    <>
      <SnackbarProvider>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Alert/>
          <Routes>
            <Route exact path="/*" element={<Userroute />} />
            <Route exact path="/admin/*" element={<Adminroute />} />
          </Routes>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </>
  );
}

export default App;
