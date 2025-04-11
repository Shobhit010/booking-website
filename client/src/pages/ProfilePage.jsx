import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import { useEffect } from 'react';
import AccountNav from '../AccountNav';

export default function ProfilePage() {
    const [redirect,setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const { subpage } = useParams();

    const currentSubPage = subpage || 'profile';

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
      return 'Loading...';
    }

    if (ready && !user && !redirect) {
      return <Navigate to={'/login'} />;
    }

    if (redirect) {
      return <Navigate to={redirect} />;
    }

    return (
      <div>
        <AccountNav />
        {currentSubPage === 'profile' && (
          <div className='text-center max-w-lg mx-auto'>
            Logged in as {user.name} ({user.email})
            <br />
            <button onClick={logout} className='bg-[#E43A5E] p-2 w-full text-white rounded-2xl max-w-sm mt-2'>Logout</button>
          </div>
        )}
        {currentSubPage === 'places' && (
          <div>
            <PlacesPage />
          </div>
        )}
      </div>
    );
}
