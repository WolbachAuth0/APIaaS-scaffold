export default {
  namespaced: true,
  state: {
    isDark: true,
    theme: {
      dark: {
        aura: require('../assets/okta-aura-white.png'),
        logo: require('../assets/okta-logo-white.svg'),
        auth0ByOkta: require('../assets/auth0-by-okta-white.svg')
      },
      light: {
        aura: require('../assets/okta-aura-black.png'),
        logo: require('../assets/okta-logo-blue.svg'),
        auth0ByOkta: require('../assets/auth0-by-okta-black.svg')
      }
    }
  },
  getters: {
    isDark (state) {
      return state.isDark
    },
    logo (state) {
      return state.isDark ? state.theme.dark.logo : state.theme.light.logo
    },
    aura (state) {
      return state.isDark ? state.theme.dark.aura : state.theme.light.aura
    },
    auth0ByOkta (state) {
      return state.isDark ? state.theme.dark.auth0ByOkta : state.theme.light.auth0ByOkta
    },
    otherLogo (state) {
      return state.isDark ? state.theme.light.logo : state.theme.dark.logo
    }
  },
  mutations: {
    setTheme (state, theme) {
      if (typeof theme === 'string' || theme instanceof String) {
        state.isDark = theme === 'dark' ? true : false
      } else if (typeof theme === 'boolean') {
        state.isDark = theme
      } else {
        state.isDark = !!theme
      }
    }
  },
  // actions: {
  //   example ({ state, commit, rootState }) {
  //     // state is the modules local state
  //     // rootState is the global state
  //   }
  // },
}