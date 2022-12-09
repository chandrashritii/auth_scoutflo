import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import {Routes,Route} from "react-router-dom"
import PrivateRoutes from './utils/PrivateRoute';

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route element={<PrivateRoutes />}>
      <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  </>
  );
}

export default App;
