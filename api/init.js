import cookies from 'js-cookie';
import {setAuthToken, resetAuthToken} from '~/utils/auth';

const token = cookies.get('x-access-token');
if (token) { 
    setAuthToken(token);
} else {
    resetAuthToken();
}