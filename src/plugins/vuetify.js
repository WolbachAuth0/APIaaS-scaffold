import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)
const okta = {
  blue: {
    dark: {},
    light: {
      surface: colors.blue.lighten5,
      primary: '#151a66',
      secondary: colors.blue.darken4,
      info: '#2958ac',
      accent: colors.blue.base,
      lightgrey: colors.grey.lighten2,
      darkgrey: colors.grey.darken2
    }
  },
  black: {
    dark: {},
    light: {
      surface: colors.grey.base,
      primary: colors.grey.darken4, // okta black
      secondary: '#20313b',
      info: '#2958ac',
      accent: colors.blue.base,
      lightgrey: colors.grey.lighten2,
      darkgrey: '#191919'
    }
  }
}


export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        surface: colors.grey.darken2,
        primary: colors.blue.lighten3,
        secondary: colors.blueGrey.darken4,
        info: colors.blueGrey.lighten3,
        accent: colors.cyan.accent4,
        success: colors.green.darken1,
        warning: colors.yellow.lighten4,
        error: colors.red.lighten4,
      },
      light: okta.black.light
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  },
});
