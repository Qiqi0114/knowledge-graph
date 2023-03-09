import {AccountState, RootState} from "./types";
import {Module} from "vueX";
import { loginAPI } from '../api/login';
import { getToken, setToken } from '../lib/util';
import { ElMessage } from 'element-plus';
import router from '../router';
import { TOKEN_KEY } from "@/lib/util";
const menu: Module<AccountState, RootState> = {
    state: {
        token: getToken(),
    },
    getters: {
        gettoken: (state) => state.token,
    },
    mutations: {
        SET_TOKEN(state, {token}) {
            setToken(token);
            state.token = token;
        },
        CLEAR_LOGIN_INFO(state) {
            state.token = undefined;
            setToken();
        },
    },
    actions: {
        async appLogin(
            {dispatch, commit},
            payload: {
                userPhone: string;
                passWord: string;
                type: string;
            }
        ) {
            const userPhone = payload.userPhone.trim();
            const passWord = payload.passWord;
            const type = payload.type;
            const {data} = await loginAPI({userPhone, passWord});        
            if(data.code == '200'){
                router.push({ path: "/home/userManagement", query: {} })
                ElMessage.success({
                  message: data.msg,
                  type: 'success',
                })
              }else {
                await router.push({name: 'login'});
                ElMessage.error(data.msg)
              }
            commit("SET_TOKEN", {
                token: data.data ? data.data : 'test_token',
                remember: true,
            });
            
            //添加动态菜单
/*             commit("SET_ROUTES",data.data.orgBusionessListDTOS) */
            return data;
        },
        async clearLoginInfo({commit}, redirect?: string): Promise<void> {
            commit("CLEAR_LOGIN_INFO");      
                await router.push({
                    name: "login",
                    query: {redirect},
                });
        },
    },
};

export default menu;
