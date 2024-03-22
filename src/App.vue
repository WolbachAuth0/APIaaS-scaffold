<template>
	<v-app id="app">
		<navigation :appTitle="appTitle"></navigation>
		
		<announcer :visible="alert.visible"
							 :text="alert.text"
							 :type="alert.type"
							 :top="alert.top"
							 :right="alert.right"
							 :left="alert.left"
							 @show="showAnnouncer"
							 @hide="hideAnnouncer"
		></announcer>

		<github-ribbon :url="github"/>
		
		<v-fade-transition mode="out-in" duration type="animation">
			<v-main light>	
				<v-container fluid>
					<v-layout align-center justify-center>
						<v-flex>
        			<router-view :key="$route.fullPath"></router-view>
						</v-flex>
					</v-layout>
				</v-container>
			</v-main>
		</v-fade-transition>
		
		<v-footer app>
			<span></span>
		</v-footer>
	</v-app>
</template>

<script>
import Announcer from './components/Announcer.vue'
import GithubRibbon from './components/GithubRibbon.vue'
import Navigation from './components/Navigation.vue'
import EventBus from './helpers/eventBus.js'

export default {
	name: 'app',
	components: {
		Announcer,
		Navigation,
		GithubRibbon
	},
	metaInfo: {
		titleTemplate: 'API Authorization Demo | %s'
	},
	data() {
		return {
			appTitle: `External API Authorization Demo`,
			github: 'https://github.com/WolbachAuth0/APIaaS-scaffold',
			alert: {
        visible: false,
        text: '',
        type: 'success',
				top: true,
				right: true,
				left: false
      }
		}
	},
	async mounted() {
		if (process.env.VUE_APP_MODE === 'development') {
			console.log('node_env: ', process.env.NODE_ENV)
			console.log('clientid: ', process.env.VUE_APP_AUTH0_CLIENT_ID)
			console.log('auth0 domain: ', process.env.VUE_APP_AUTH0_DOMAIN)
			console.log('vue app api host: ', process.env.VUE_APP_API_HOST)
			console.log('vue app domain: ', process.env.VUE_APP_DOMAIN)
			console.log('vue app audience: ', process.env.VUE_APP_AUTH0_AUDIENCE)
		}
		EventBus.$on('announce', this.makeAnnouncement)
  },
	methods: {
		makeAnnouncement ({ text='announcement text', type='success', top=true, right=true, left=false }) {
			this.alert.text = text
			this.alert.type = type
			this.alert.top = top
			this.alert.right = right
			this.alert.left = left

			this.alert.visible = true

			if (process.env.VUE_APP_MODE === 'development') {
				console.log('announcer event: payload = ', this.alert)
			}
		},
		showAnnouncer () {
			this.alert.visible = true
		},
		hideAnnouncer () {
			this.alert.visible = false
		}
	}
}
</script>

<style scoped>
	main {
		
		/* background-image: url('https://cdn.govexec.com/media/featured/okta_slate_bg_only.png'); */
		/* background-image: url('https://images.ctfassets.net/23aumh6u8s0i/6yR7mLYRgJotnAKSDEt2J8/4984fa1f78c40db99683405db7becf27/auth0_okta_hero.png'); */
		background-image: url('https://images.squarespace-cdn.com/content/v1/57d9e959d482e972e8434364/1635861082044-08BJQX7SG4ABF95K497R/shutterstock_1080548216.jpg?format=2000w');
		/* background-image: url('https://cdn.govexec.com/media/featured/okta_background_accelerate.jpg'); */
		/* background-image: url('https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/purple-dots-2.jpeg'); */
		background-size: cover;
	}
</style>