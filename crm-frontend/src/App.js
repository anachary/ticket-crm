import './App.css';
import {Button} from "react-bootstrap"
import { LandingPage } from './pages/LandingPage/LandingPage.page';
import {DefaultLayout} from './components/Layout/DefaultLayout.comp'
function App() {
  return (
    <div className="App">
      {/* <LandingPage /> */}
      <DefaultLayout>
        test
      </DefaultLayout>
     </div>
  );
}

export default App;
