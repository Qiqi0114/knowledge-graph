import { createStore } from "vueX";
import account from "./account";
const store = createStore({
    state: {
        version: "1.0.0",
      },
      mutations: {},
      actions: {},
      modules: { account },
})
export default store