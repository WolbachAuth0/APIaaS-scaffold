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
				<v-img :src="logo" contain max-height="50" max-width="225"></v-img>
			</a>
			
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
import {
	mdiLogoutVariant,
	mdiLoginVariant,
	mdiAccountCircle, 
} from '@mdi/js'


export default {
	name: 'Navigation',
	components: {
		Drawer
	},
	data: () => ({
		auth0docs: require('../assets/auth0docs.svg'),
		oktahomeURL: 'https://www.okta.com/',
		auth0docsURL: 'https://auth0.com/docs',
	}),
	props: {
		appTitle: String 
	}
}
</script>
