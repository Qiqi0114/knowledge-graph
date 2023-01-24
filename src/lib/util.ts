import Cookies from "js-cookie";
// cookie保存的天数
/* import { EventBus } from "./event-bus";
import { EVENT_LOCAL_LOGOUT } from "../constant/events"; */

export const TOKEN_KEY = "token";
export const REMEMBER_KEY = "ZG_OA_REMEMBER_KEY";
export const REMEMBER_USERNAME_KEY = "ZG_OA_REMEMBER_USERNAME_KEY";

export const setToken = (token?: string) => {
  if (token != null) {
    sessionStorage.setItem(TOKEN_KEY, token); 
  } else {
    Cookies.remove(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  }
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  const sessionToken = sessionStorage.getItem(TOKEN_KEY);
  if (sessionToken === null) {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
    return token;
  } else if (sessionToken !== token) {
    /** 不允许多账户一起登录
     * 直接退出之前账户登录
     */
/*     EventBus.emit(EVENT_LOCAL_LOGOUT); */
    return undefined;
  } else {
    return token;
  }
};
// export const getToken = () => {
//   const sessionToken = sessionStorage.getItem(TOKEN_KEY);
//   if (sessionToken === null) {
//     EventBus.emit(EVENT_LOCAL_LOGOUT);
//     return undefined;
//   } else {
//     return sessionToken;
//   }
// };
