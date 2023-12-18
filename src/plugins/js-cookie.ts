import Cookies from "js-cookie";

export const TOKEN_KEY = 'NOW_TOKEN';

export const setToken = (name: string, value: any, cookieExpires: number = 1) => {
    Cookies.set(name, JSON.stringify(value), { expires: cookieExpires || 1 });
}

export const getToken = (name: string) => {
    const val = Cookies.get(name);
    try {
        return val;
    } catch (err) {
        return undefined;
    }
}

export const delToken = (name: any) => {
    Cookies.remove(name);
}

export const getRole = (name: string) => {
    const val: any = Cookies.get(name);
    try {
        return JSON.parse(val).roleMgrMappings[0].roleName;
    } catch (err) {
        return undefined;
    }
}