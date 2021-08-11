import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "@/store/mutations"
import actions from "@/store/actions"
import state from "@/store/state"

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions
})
