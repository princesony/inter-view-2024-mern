import React,{useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import PageRender from "./PageRender";
import Alert from './components/alert/Alert';
import Home from "./pages/home";
import NotFound from "./components/NotFound";
import Register from './pages/register'
import Login from "./pages/login"
import {refreshToken} from './redux/actions/authAction'
import { getPosts } from './redux/actions/productAction';



export default function App() {

  const { auth, status, call } = useSelector(state => state);
  const dispatch = useDispatch()


  ///// refresh token
  useEffect(() => {
    dispatch(refreshToken())
 
 
  },[dispatch])
//// get ptoduct
  useEffect(() => {
    dispatch(getPosts());
   }, [dispatch]);

  const Layout = () => {
    return (
      <div>
        <Alert/>
       
            <Routes>
              <Route path="/" element={auth.token ?<Home />:<Login/>} />
              <Route path="/:page" element={auth.token ?<PageRender />:<Login/>} />
              <Route path="/:page/:id" element={auth.token ?<PageRender />:<Login/>} />
              <Route path="*" element={<NotFound />} />
              <Route path="register" element={<Register/>}/>
            </Routes>
      
      </div>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}
