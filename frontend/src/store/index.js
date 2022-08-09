import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth"
import calendar from "./calendar"
import wallet from "./wallet"
import record from "./record"
import search from "./search"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth: auth,
        calendar: calendar,
        wallet: wallet,
        record: record,
        search: search
    }
})
