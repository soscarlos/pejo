import {useLocation, Navigate, Outlet} from 'react-router-dom';
import useAuthorization from '../../hooks/useAuthorization';

function RequireAuthorization() {
  const {authorization} = useAuthorization();
  const storedToken = localStorage.getItem('token');
  const isLoggedIn = storedToken != null || authorization != null;
  
  const location = useLocation();

  return (
    isLoggedIn ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />
  );
}

export default RequireAuthorization;