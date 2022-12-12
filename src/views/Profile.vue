<template>
  <v-card>
    <v-card class="pa-6" color="surface">
      <v-row>
        <v-col cols=6>
          <v-card>
            <v-card-title>
              <h1>Access the API</h1>
            </v-card-title>
            <v-card-text>

              <v-card-title class="primary--text">Get Your API Credentials!</v-card-title>
              <v-card-text>
                Click some buttons to get your personal API access.
              </v-card-text>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols=6>
          <v-card>
            <v-progress-linear :indeterminate="progress.indeterminate" value="100" height="20" class="primary--text"></v-progress-linear>
            
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

        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import EventBus from './../helpers/eventBus.js'

export default {
  name: 'Profile',
  metaInfo: {
    title: 'User Profile',
  },
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
      return this.$auth.user?.sub?.split('|')[0] || 'auth0'
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
      const userId = this.$auth.user.sub
      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/admin/profile/${userId}`)
      return response.data
    },
    async updateProfile () {
      this.progress.indeterminate = true
      const accesstoken = await this.$auth.getTokenSilently()
      const body = {
        given_name: this.profile.given_name,
        family_name: this.profile.family_name,
        nickname: this.profile.nickname,
        name: this.profile.name,
        picture: this.profile.picture,
        user_metadata: {
          enableMFA: this.profile.enableMFA
        }
      }
      const response = await this.$http(accesstoken).patch(`/users/${this.$auth.user.sub}`, body)
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
