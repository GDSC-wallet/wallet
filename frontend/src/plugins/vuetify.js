import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { Touch } from 'vuetify/lib/directives'  

Vue.use(Vuetify, {
  directives: {
    Touch
  }
})

const opts = {}

export default new Vuetify(opts)