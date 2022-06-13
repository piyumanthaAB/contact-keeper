import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import PrivateRoute from './components/routing/PrivateRoute';

import { Navbar } from './components/layout/Navbar';
import Home from './components/pages/Home.jsx';
import About from './components/pages/About.jsx';
import Register from './components/auth/Register';

import ContactState from './context/contacts/contactState';
import AuthState from './context/auth/AuthState';
import Login from './components/auth/Login';
import AlertState from './context/alerts/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts />
              <div className="container">
                <Routes>
                  <Route exact path='/' element={<PrivateRoute/>}>
                    <Route exact path='/' element={<Home />} />
                  </Route>
                  <Route exact path='/about' element={<About />} />
                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/login' element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
