<template>
  <v-card>
    <v-progress-linear :indeterminate="progress.indeterminate" value="100" height="20" class="primary--text"></v-progress-linear>
    
    <v-card-title class="primary--text">
      User Profile
    </v-card-title>

    <v-list-item class="px-2">
      <v-list-item-avatar>
        <img :src="profile.picture" :alt="profile.name">
      </v-list-item-avatar>
      <v-list-item-title>
        {{ profile.email }}
      </v-list-item-title>
    </v-list-item>

    <v-card-text>
      Manage your personal, contact, and security information.
    </v-card-text>

    <v-form>
      <v-container fluid>
        <v-row>
          <v-col cols=6 class="px-8">
            <v-text-field
              v-model="profile.given_name"
              label="First Name"
              :disabled="isDisabled"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="profile.email"
              label="Email"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols=6 class="px-8">
            <v-text-field
              v-model="profile.family_name"
              label="Last Name"
              :disabled="isDisabled"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="profile.nickname"
              label="Nickname"
              :disabled="isDisabled"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="12" class="px-8">

            <v-text-field
              v-model="profile.picture"
              label="Picture URL"
              :disabled="isDisabled"
              outlined
            ></v-text-field>

            <!-- <v-checkbox
              v-model="profile.enableMFA"
              label="Enable MFA"
            ></v-checkbox> -->
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      <v-container>
        <v-row>
          <v-col cols=12>
            <v-btn class="primary" block @click="updateProfile">
              Save Changes
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import EventBus from './../helpers/eventBus.js'

export default {
  name: 'UserProfile',
  data () {
    return {
      profile: {
        email: '',
        given_name: '',
        family_name: '',
        nickname: '',
        name: '',
        picture: '',
        enableMFA: false
      },
      progress: {
        indeterminate: false
      }
    }
  },
  computed: {
    isDisabled () {
      if (!this.connection) { return false }
      return !['auth0', 'email', 'sms'].includes(this.connection)
    },
    connection () {
      const connection = this.$auth.user?.sub?.split('|')[0] || 'auth0'
      console.log(connection)
      return connection
    },
  },
  async mounted () {
    const profile = await this.fetchProfile()
    this.profile.email = profile.data.email,
    this.profile.given_name = profile.data.given_name,
    this.profile.family_name = profile.data.family_name,
    this.profile.nickname = profile.data.nickname,
    this.profile.name = profile.data.name,
    this.profile.picture = profile.data.picture
  },
  methods: {
    async fetchProfile () {
      this.progress.indeterminate = true
      const userId = this.$auth.user.sub
      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/admin/profile/${userId}`)
      this.progress.indeterminate = false
      return response.data
    },
    async updateProfile () {
      this.progress.indeterminate = true
      const userId = this.$auth.user.sub
      const accesstoken = await this.$auth.getTokenSilently()
      const body = {
        given_name: this.profile.given_name,
        family_name: this.profile.family_name,
        nickname: this.profile.nickname,
        name: this.profile.name,
        picture: this.profile.picture,
        user_metadata: {
        }
      }
      const response = await this.$http(accesstoken).patch(`/admin/profile/${userId}`, body)
      const announcement = {
        text: response.data.message,
        type: response.data.success ? 'success' : 'error',
        top: true,
        right: true,
        left: false
      }
      EventBus.$emit('announce', announcement)
      this.progress.indeterminate = false
      return response.data
    }
  }
}
</script>

