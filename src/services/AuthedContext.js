import { createContext} from 'react';
import { isLoggedIn } from './axiosClient';


export const AuthContext = createContext({
    isAuthenticated: isLoggedIn(),
    dispatch: () => {}
});