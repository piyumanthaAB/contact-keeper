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
import Admin from './components/pages/Admin';
import Manager from './components/pages/Manager';
import Supervisor from './components/pages/Supervisor';
import RequireAuth from './components/routing/RequireAuth';
import Unauthorized from './components/pages/Unauthorized';
import ManagerHome from './components/pages/ManagerHome';
import AdminHomee from './components/pages/AdminHome';
import SupervisorHome from './components/pages/SupervisorHome';
import AddUser from './components/pages/admin/AddUser';
import ViewUsers from './components/pages/admin/ViewUsers';
import EditUsers from './components/pages/manager/EditUsers';
import DeleteUsers from './components/pages/manager/DeleteUsers';
import UserQueries from './components/pages/supervisor/UserQueries';
import UserSuggestions from './components/pages/supervisor/UserSuggestions';

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
                  {/* <Route exact path='/' element={<PrivateRoute/>}>
                    <Route exact path='/' element={<Home />} />
                  </Route> */}

                  <Route element={<RequireAuth allowedRoles={['admin','manager','supervisor']} />}>
                    <Route exact path='/' element={<Home />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={['admin']}/>} >
                    <Route exact path='/admin' element={<Admin />}  />
                    <Route exact path='/adminHomee' element={<Admin />} />
                    <Route exact path='/addUser' element={<AddUser/>} />
                    <Route exact path='/viewUsers' element={<ViewUsers/>} />
                    
                  </Route>

                  <Route element={<RequireAuth allowedRoles={['manager']}/>}>
                    <Route exact path='/manager' element={<Manager  />} />
                    <Route exact path='/managerHome' element={<ManagerHome/>} />
                    <Route exact path='/editUsers' element={<EditUsers/>} />
                    <Route exact path='/deleteUsers' element={<DeleteUsers/>} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={['supervisor']}/>}>
                    <Route exact path='/supervisor' element={<Supervisor  />} />
                    <Route exact path='/supervisorHome' element={<SupervisorHome  />} />
                    <Route exact path='/queries' element={<UserQueries  />} />
                    <Route exact path='/suggestions' element={<UserSuggestions  />} />
                  </Route>

                  <Route exact path='/unauth' element={<Unauthorized />} />
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
