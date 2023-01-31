<template>
  <v-card>
    <v-progress-linear :indeterminate="progress.indeterminate" value="100" height="20" class="primary--text"></v-progress-linear>
    
    <v-card-title class="primary--text">Your API Credentials</v-card-title>
    <v-card-text>
      Click some buttons to get your personal API access.
    </v-card-text>
    
  </v-card>
</template>

<script>
export default {
  name: 'ClientCredentials',
  data () {
    return {
      progress: {
        indeterminate: false
      }
    }
  },
  async mounted () {
    const clients = await this.fetchClients()
    console.log(clients)
  },
  methods: {
    async fetchClients () {
      this.progress.indeterminate = true
      const userId = this.$auth.user.sub
      const per_page = 10
      const page = 0

      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/admin/clients?user_id=${userId}&per_page=${per_page}&page=${page}`)
      this.progress.indeterminate = false
      return response.data
    },
  }
}
</script>
