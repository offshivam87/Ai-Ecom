import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import Nav from './Routes/Nav'
import NavigationBar from './NavigationBar/NavigationBar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadUser } from './redux/features/UserSlice'
  import { ToastContainer, toast } from 'react-toastify';
import Footer from './otherComponent/Footer'

const App = () => {

  const { isverified, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const rehydrateUser = async () => {
      try {
        const res = await axios.get(
          "https://dleapkart.onrender.com/api/auth/getUserDetails",
          { withCredentials: true } // 🔥 MUST
        );

        dispatch(loadUser(res.data.user));
        navigate("/");
      } catch (err) {
        // token invalid / expired → ignore
      }
    };

    rehydrateUser();
  }, [dispatch]);


  useEffect(() => {
    const email = localStorage.getItem("verifyEmail");
    if (!email) {
      navigate("/register");
    }
  }, []);

  return (
    <div>
      <NavigationBar />
      
        <Nav />
        <Footer/>
      
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
