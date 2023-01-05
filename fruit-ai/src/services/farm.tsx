import Cookies from 'universal-cookie';
import { IFarmData } from '../types/farm';

const keyStorageCurrentFarm = 'currentFarm';
const cookies = new Cookies();

export default {
    getCurrentFarm(): IFarmData {
        return cookies.get(keyStorageCurrentFarm);
    },
    setCurrentFarm(currentFarm: IFarmData) {
        cookies.set(keyStorageCurrentFarm, currentFarm)
    },
    removeCurrentFarm(): any {
        cookies.remove(keyStorageCurrentFarm)
    }
}