import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import newsData from './modules/tinymce'
import postNewsQuery from './modules/postNewsQuery'
import commentQuery from './modules/commentQuery'
import bindQuery from './modules/bindQuery'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    newsData,
    postNewsQuery,
    commentQuery,
    bindQuery
  },
  getters
})

export default store
