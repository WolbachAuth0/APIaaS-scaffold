<template>
  <v-card>

    <v-card class="pa-6" color="surface">
      <v-row>
        <v-col cols=12>
          <v-card>
            <v-card-title>
              <h1>{{ title }}</h1>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols=12>
          <v-card>
            <v-tabs v-model="tab">
              <v-tab>About</v-tab>
              <v-tab>OAuth2</v-tab>
              <v-tab>How it Works</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item><about-tab /></v-tab-item>
              <v-tab-item><purpose-tab /></v-tab-item>
              <v-tab-item><how-tab /></v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>

    </v-card>
  </v-card>
</template>

<script>
import AboutTab from './../components/HomeTabs/AboutTab.vue'
import PurposeTab from './../components/HomeTabs/PurposeTab.vue'
import HowTab from './../components/HomeTabs/HowTab.vue'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Welcome',
  },
  components: {
    AboutTab,
    PurposeTab,
    HowTab
  },
  data () {
    return {
      title: 'Welcome!',
      tab: 0,
      main: {
        title: 'Register for API Credentials',
        paragraphs: [
          {
            subtitle: 'Purpose',
            texts: [
              `This application is intended as a demonstration of how to use the Okta CIC platform
              to manage API access for external facing REST APIs with OAuth 2.X.`,
            ]
          }
        ]
      },
      secondary: {
        title: 'About the pages in this application',
        text: 'Here is a quick mapping between the pages of this application and the use cases you have told us about.',
        paragraphs: [
          {
            subtitle: 'Profile',
            text: 'Use the "Profile" page to update the information about the currently logged in user.'
          }
        ]
      }
    }
  },
  methods: {}
}
</script>