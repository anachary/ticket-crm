import './App.css';
import { Button } from "react-bootstrap"
import { LandingPage } from './pages/LandingPage/LandingPage.page';
import { DefaultLayout } from './components/layout/DefaultLayout.comp'
import { Registration } from './pages/registration/Registration.page';
import { createBrowserHistory } from 'history'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  const history = createBrowserHistory()
  return (
    <div className="App">
      <Router history={history} >
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path ="/registration" element ={<Registration />} />
          <Route
            path="/dashboard"
            element={
              <DefaultLayout>Dashboard Component will be Coming Soon </DefaultLayout>
              } />
            <Route
              path="/company"
              element={
                <DefaultLayout>Company Component will be Coming Soon </DefaultLayout>
                } />  
            <Route
              path="/tickets"
              element={
                <DefaultLayout > Tickets will be comming soon</DefaultLayout>
              } />
              <Route
              path="/logout"
              element={
                <DefaultLayout>logout</DefaultLayout>
              } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
