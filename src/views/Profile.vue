<template>
  <v-card>
    <v-card class="pa-6" color="surface">
      <v-row>
        <v-col cols=12>
          <v-card>
            <v-card-title>
              <h1>Get API Credentials</h1>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols=6>
          <user-profile></user-profile>
        </v-col>

        <v-col cols=6>
          <client-credentials></client-credentials>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import UserProfile from './../components/UserProfile.vue'
import ClientCredentials from './../components/ClientCredentials.vue'

export default {
  name: 'Profile',
  metaInfo: {
    title: 'User Profile',
  },
  components: {
    UserProfile,
    ClientCredentials
  },
  data () {
    return {}
  }
}
</script>
