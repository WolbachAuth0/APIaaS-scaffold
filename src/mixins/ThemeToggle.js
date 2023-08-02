import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([ 'isDark' ]),
    ...mapGetters({
      isDark: 'Theme/isDark',
      aura: 'Theme/aura',
      logo: 'Theme/logo',
      otherLogo: 'Theme/otherLogo'
    }),
  },
  methods: {
    ...mapMutations({
      setTheme: 'setTheme'
    })
  }
}