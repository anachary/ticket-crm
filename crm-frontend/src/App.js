import './App.css';
import { Button } from "react-bootstrap"
import { LandingPage } from './pages/LandingPage/LandingPage.page';
import { Registration } from './pages/registration/Registration.page';
import { createBrowserHistory } from 'history'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import {PrivateRoute} from './components/private-router/PrivateRoute.comp'
function App() {
  const history = createBrowserHistory()
  return (
    <div className="App">
      <Router history={history} >
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path ="/registration" element ={<Registration />} />
          {/* PrivateRoutes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute><div>Dashboard Component will be Coming Soon </div></PrivateRoute>
              } />
            <Route
              path="/company"
              element={
                <PrivateRoute><div>Company Component will be Coming Soon </div></PrivateRoute>
                } />  
            <Route
              path="/tickets"
              element={
                <PrivateRoute><div>Tickets Component will be Coming Soon </div></PrivateRoute>
              } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
