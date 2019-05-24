import Vue from 'vue'
import Vuex from 'vuex'

import cyStore from './store/cy-store'
import zyhStore from './store/zyh-store'
import lcStore from './store/lc-store'

Vue.use(Vuex);

export default new Vuex.Store({
    state: Object.assign(cyStore.state, zyhStore.state, lcStore.state),

    mutations: Object.assign(cyStore.mutations, zyhStore.mutations, lcStore.mutations),

    actions: Object.assign(cyStore.actions, zyhStore.actions, lcStore.actions),
})
