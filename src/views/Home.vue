<template>
  <v-card>

    <v-card class="pa-6" color="surface">
      <v-row>
        <v-col cols=6>
          <v-card>
            <v-progress-linear value="100" height="20" class="primary--text"></v-progress-linear>
            <v-card-title>
              <h1>{{ main.title }}</h1>
            </v-card-title>
            <v-card-text v-for="(para, i) of main.paragraphs" :key="i">
              
              <v-card-title class="primary--text">{{ para.subtitle }}</v-card-title>
              <div v-for="(text, j) of para.texts" :key="j">
                <v-card-text>
                  {{ text }}
                </v-card-text>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols=6>
          <v-card>
            <v-progress-linear value="100" height="20" class="primary--text"></v-progress-linear>
            <v-card-title>
              {{ secondary.title }}
            </v-card-title>

            <v-card-text>{{ secondary.text }}</v-card-text>
            
            <v-card-text v-for="(para, i) of secondary.paragraphs" :key="i">             
              <v-card-title class="primary--text">{{ para.subtitle }}</v-card-title>
              <v-card-text>{{ para.text }}</v-card-text>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: 'Welcome',
  },
  data () {
    return {
      title: 'Welcome!',
      main: {
        title: 'Welcome!',
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