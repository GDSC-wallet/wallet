import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { Touch } from 'vuetify/lib/directives'  

Vue.use(Vuetify, {
  directives: {
    Touch
  },
})

const opts = {
  theme: {
    themes: {
      light: {
        income: "#ffae00",
        expense: "#198c51",
      },
    },
  },
}

export default new Vuetify(opts)