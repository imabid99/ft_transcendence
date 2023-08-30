
import {getLocalStorageItem } from '@/utils/localStorage';
import jwt_decode from "jwt-decode";

export const getUserInfo = (): any | null => {
    const value = getLocalStorageItem("Token");
    if (!value || value === 'undefined') {
        return null;
    }
    const decoded: any = jwt_decode(value);

    return decoded ;
}