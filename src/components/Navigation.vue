<template>
	<div>
		<!-- Application bar -->
		<v-app-bar
			app
			clipped-left
			absolute 
			:dark="isDark"
			:light="!isDark"
			class="primary accent-3"
		>
			<a id="logo" :href="oktahomeURL" target="__blank">
				<v-img :src="auth0" contain max-height="64" max-width="200"></v-img>
			</a>
			<!-- <a id="logo" :href="oktahomeURL" target="__blank">
				<v-img :src="logo" contain max-height="40" max-width="175"></v-img>
			</a> -->
			
      <v-toolbar-title :class="{ 'white--text': !isDark }">
				{{ appTitle }}
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-toolbar-title>
				<a id="auth0docs" href="https://auth0.com/docs" target="__blank">
					<v-img :src="auth0docs" contain max-height="64"></v-img>
				</a>
			</v-toolbar-title>
		</v-app-bar>

		<drawer></drawer>

	</div>
</template>

<script>
import Drawer from '@/components/Drawer.vue'

export default {
	name: 'Navigation',
	components: {
		Drawer
	},
	data: () => ({
		auth0docs: require('../assets/auth0docs.svg'),
		oktahomeURL: 'https://www.okta.com/',
		auth0docsURL: 'https://auth0.com/docs',
		auth0: require('../assets/auth0-by-okta-white.svg')
	}),
	props: {
		appTitle: String 
	}
}
</script>
