<template>
		<v-navigation-drawer app floating clipped dark permanent class="dark primary">

      <!-- user avatar -->
      <v-list nav>							
				<!-- The user avatar, or empty avatar with login  -->
				<v-list-item v-if="$auth.isAuthenticated" class="px-2" link to="/profile">
					<v-list-item-avatar>
						<img :src="$auth.user.picture" :alt="$auth.user.name">
					</v-list-item-avatar>					
					<v-list-item-content v-if="$auth.isAuthenticated">
						<v-list-item-title class="text-h6">
							{{ $auth.user.name }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ $auth.user.email}}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

        <v-list-item v-else class="px-2 primary" link @click="authenticate()">
					<v-list-item-avatar color="blue darken-3">
						<v-icon x-large>{{ icons.mdiAccountCircle }}</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="text-h6">
							Login
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>

      <v-divider></v-divider>

      <!-- user specific navigation -->
      <v-list dense nav>

        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiHomeCircle }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              About
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="$auth.isAuthenticated" to="/profile">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiAccountDetails }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              My Profile
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :href="apiSpecURL">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiApi }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Documentation
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="$auth.isAuthenticated" @click="logout()" class="px-2 primary">
					<v-list-item-icon>
						<v-icon>{{ icons.mdiLogoutVariant }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Log Out</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

        <v-list-item v-if="!$auth.isAuthenticated" @click="authenticate()" class="px-2 primary">
					<v-list-item-icon>
						<v-icon>{{ icons.mdiLoginVariant }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Login</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

      </v-list>
    </v-navigation-drawer>  
</template>

<script>
import {
  mdiHomeCircle,
  mdiAccountCircle,
  mdiAccountDetails,
  mdiShieldHome,
  mdiMonitorDashboard,
  mdiApplicationCog,
  mdiDeveloperBoard,
  mdiCogOutline,
  mdiApi,
  mdiLogoutVariant,
  mdiLoginVariant
} from '@mdi/js'

export default {
  name: 'Drawer',
  data () {
    return {
      icons: {
        mdiHomeCircle,
        mdiAccountDetails,
        mdiAccountCircle,
        mdiShieldHome,
        mdiMonitorDashboard,
        mdiApplicationCog,
        mdiDeveloperBoard,
        mdiCogOutline,
        mdiApi,
        mdiLogoutVariant,
        mdiLoginVariant
      }
    }
  },
  computed: {
    roles () {
      const clientID = process.env.VUE_APP_AUTH0_CLIENT_ID
			const data = this.$auth.isAuthenticated ? this.$auth.user[`${clientID}/data`] : { }
			const roles = data?.roles || []
      return roles
    },
    apiSpecURL () {
      return `${process.env.VUE_APP_API_HOST}/specification`
    }
  },
  methods: {
    // https://auth0.com/blog/complete-guide-to-vue-user-authentication/#Add-User-Authentication
		async authenticate () {
			if (!this.$auth.isAuthenticated) {
				this.login()
			}
		},
		async login () {
			// https://auth0.github.io/auth0-spa-js/interfaces/redirectloginoptions.html
			if (!this.$auth.isAuthenticated) {
				const options = {
					scope: 'openid profile email',
				}
				this.$auth.loginWithRedirect(options)
        // this.$auth.loginWithPopup(options)
			}
		},
		async logout () {
			if (this.$auth.isAuthenticated) {
				// https://auth0.github.io/auth0-spa-js/interfaces/logoutoptions.html
				this.$auth.logout({ returnTo: process.env.VUE_APP_DOMAIN })
        this.$router.push({ path: '/' })
			}
		},
    hasRole (rolename) {
			if (!this.$auth.isAuthenticated) {
				return false
			}
			return this.roles.includes(rolename)
		},
    isType (typestring) {
      return String(typestring).trim().toLowerCase() == String(this.orgType).trim().toLowerCase()
    }
  }
}
</script>
