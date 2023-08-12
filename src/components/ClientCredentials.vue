<template>
  <v-card>
    <v-progress-linear :indeterminate="progress.indeterminate" value="100" height="20" class="primary--text"></v-progress-linear>
    
    <v-card-title class="primary--text">Your API Credentials</v-card-title>

    <v-data-table
      :headers="headers"
      :items="clients"
      item-key="client_id"
      class="elevation-1"
      :loading="progress.indeterminate"
      loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.client_id`]="{ item }">       
        <v-btn class="mx-2" dark small color="error">
          <v-icon dark @click="areYouSure(item.client_id)">
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

    <v-dialog v-model="confirmation" width="60%" transition="dialog-bottom-transition">
      <v-card>
        <v-progress-linear :indeterminate="progress.indeterminate" value="100" height="20" class="primary--text"></v-progress-linear>
        
        <v-card-title>
          Are you sure?
        </v-card-title>

        <v-card-text>
          You are about to delete the following client credentials.
        </v-card-text>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Tier
                </th>
                <th class="text-left">
                  Client ID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ activeClient.name }}</td>
                <td>{{ activeClient.client_metadata.tier }}</td>
                <td>{{ activeClient.client_id }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="secondary" @click="confirmation=false">
            Nevermind
          </v-btn>
          <v-btn class="primary" @click="removeClient(activeClient.client_id)">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      confirmation: false,
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
          text: 'Client ID',
          value: 'id'
        },
        {
          text: '',
          value: 'client_id'
        }
      ],
      clients: [],
      activeClient: null
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
      this.clients = clients.data.map(x => {
        x.id = x.client_id
        return x
      })
      this.progress.indeterminate = false
    },
    async fetchClients () {
      const userId = this.$auth.user.sub
      const per_page = 10
      const page = 0

      const accesstoken = await this.$auth.getTokenSilently()
      const uri = encodeURI(`/admin/clients?per_page=${per_page}&page=${page}`)
      const response = await this.$http(accesstoken).get(uri)
      return response.data
    },
    areYouSure (id) {
      this.activeClient = this.clients.find(x => x.client_id == id)
      this.confirmation = true
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
      this.activeClient = null
      this.confirmation = false
      await this.refreshTable()
    },
    hideDialog () {
      this.showDialog = false
      this.refreshTable()
    }
  }
}
</script>
