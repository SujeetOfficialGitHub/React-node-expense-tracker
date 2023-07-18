import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header';
import Router from './routes/router';
import {decodeToken} from 'react-jwt'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/features/authSlice';
function App() {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

  //   // Auto logout when token is expired 
    useEffect(() => {
        const checkTokenExpiration = () => {
            if (isTokenExpired(token)) {
                dispatch(logout());
            }
        };

        const expirationCheckInterval = setInterval(checkTokenExpiration, 2000);

        return () => {
            clearInterval(expirationCheckInterval);
        };
    }, [dispatch, token]);

    const isTokenExpired = (token) => {
      if (!token) return true;

      const decodedToken = decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
    //   console.log(decodedToken.exp < currentTime)
      return decodedToken.exp < currentTime;
  };

  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;
