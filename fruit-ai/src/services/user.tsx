import Cookies from 'universal-cookie';
import { ILoginUser } from '../pages/Login/auth.types';

const keyStorageUser = 'userStorageCookies';
const cookies = new Cookies();

export default {
    get(): ILoginUser {
        return cookies.get(keyStorageUser);
    },
    set(user: ILoginUser) {
        cookies.set(keyStorageUser, user, { path: '/' })
    },
    logout(): any {
        cookies.remove(keyStorageUser, { path: '/' })
    }
}