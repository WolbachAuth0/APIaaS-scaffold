<template>
  <v-card>
    <v-progress-linear :indeterminate="progress.indeterminate" value="100" height="20" class="primary--text"></v-progress-linear>
    
    <v-card-title class="primary--text">Your API Credentials</v-card-title>

    <v-data-table
      :headers="headers"
      :items="clients"
      item-key="name"
      class="elevation-1"
      :loading="progress.indeterminate"
      loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.client_id`]="{ item }">
        <v-btn class="mx-2" dark small color="primary">
          <v-icon dark @click="clientDetail(item.client_id)">
            {{ icons.mdiNotificationClearAll }}
          </v-icon>
        </v-btn>
        
        <v-btn class="mx-2" dark small color="error">
          <v-icon dark @click="removeClient(item.client_id)">
            {{ icons.mdiTrashCanOutline }}
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-card-actions>
      <v-btn class="primary" block @click="showDialog = true">
        Create New Client Credential
      </v-btn>
    </v-card-actions>
    
    <client-dialog :show="showDialog"></client-dialog>
  </v-card>
</template>

<script>
import EventBus from './../helpers/eventBus.js'
import ClientDialog from './ClientDialog.vue'
import { mdiTrashCanOutline, mdiNotificationClearAll } from '@mdi/js'

export default {
  name: 'ClientCredentials',
  components: {
    ClientDialog
  },
  data () {
    return {
      showDialog: false,
      icons: {
        mdiTrashCanOutline, mdiNotificationClearAll
      },
      progress: {
        indeterminate: false
      },
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Tier',
          value: 'client_metadata.tier'
        },
        {
          text: '',
          value: 'client_id'
        }
      ],
      clients: []
    }
  },
  async mounted () {
    await this.refreshTable()
    EventBus.$on('hideClientDialog', this.hideDialog)
  },
  methods: {
    async refreshTable () {
      this.progress.indeterminate = true
      const clients = await this.fetchClients()
      console.log(clients)
      this.clients = clients.data
      this.progress.indeterminate = false
    },
    async fetchClients () {
      const userId = this.$auth.user.sub
      const per_page = 10
      const page = 0

      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/admin/clients?user_id=${userId}&per_page=${per_page}&page=${page}`)
      return response.data
    },
    async removeClient (id) {
      this.progress.indeterminate = true

      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).delete(`/admin/clients/${id}`)

      const announcement = {
        text: response.data.message,
        type: response.data.success ? 'success' : 'error',
        top: true,
        right: true,
        left: false
      }
      EventBus.$emit('announce', announcement)

      await this.refreshTable()
    },
    hideDialog () {
      this.showDialog = false
      this.refreshTable()
    }
  }
}
</script>
