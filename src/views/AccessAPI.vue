<template>
 <v-card>
    <v-card class="pa-6" color="surface">
      <v-row>
        <v-col cols=12>
          <v-card>
            <v-card-title>
              <h1>Access the API</h1>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols=12>
          <v-card>
            <v-progress-linear 
              :indeterminate="progress.indeterminate" 
              value="100" 
              height="20" 
              class="primary--text"
              :color="progress.indeterminate ? 'accent' : 'secondary'"
            >
            </v-progress-linear>
            
            <v-stepper v-model="stepper.active" vertical>
              <v-stepper-step color="accent" v-for="item in stepper.items" :key="`step-${item.number}`" :complete="stepper.active > item.number" :step="item.number">
                {{ item.name }}
              </v-stepper-step>
              
              <v-stepper-content v-for="item in stepper.items" :key="`content-${item.number}`" :step="item.number">
                
                <v-card class="mb-5 surface" elevation="5" outlined >
                  <v-card-title>Step {{ item.number }}</v-card-title>
                  <v-card-subtitle>{{ item.description }}</v-card-subtitle>
                  
                    <v-card v-if="stepper.active == 1" class="ma-5 pa-5">
                      <v-row>
                        <v-col cols="6">
                          <v-radio-group v-model="credentials.selected">
                            <v-radio v-for="client in credentials.list"
                              :key="client.client_id"
                              :label="client.name"
                              :value="client.client_id"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            v-model="selectedClient.client_id"
                            label="Client ID"
                            disabled
                          ></v-text-field>

                          <v-text-field
                            v-model="selectedClient.client_secret"
                            label="Client Secret"
                            :append-icon="showSecret ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showSecret ? 'text' : 'password'"
                            disabled
                          ></v-text-field>

                          <v-text-field
                            v-model="selectedClient.tier"
                            label="tier"
                            disabled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card v-if="stepper.active == 2" class="ma-5 pa-5">
                      <v-row>
                        <v-col cols=12>

                          <v-card-subtitle>POST {{ audience }}/oauth/token</v-card-subtitle>
                          <v-card-subtitle>Request Body</v-card-subtitle>
                          <pre v-if="tokenRequestBody"><code class="language-javascript">{{ tokenRequestBody | pretty }}</code></pre>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card v-if="stepper.active == 3" class="ma-5 pa-5">
                      <v-row>
                        <v-col cols=12>
                          
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card v-if="stepper.active == 4" class="ma-5 pa-5">
                    </v-card>

                    <v-card v-if="stepper.active == 5" class="ma-5 pa-5">
                    </v-card>
                    
                </v-card>

                <v-btn color="accent" @click="continueClick(item)">
                  Continue
                </v-btn>

                <v-btn text @click="cancelClick(item)">
                  Cancel
                </v-btn>
              </v-stepper-content>
            </v-stepper>
            
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

export default {
  data () {
    return {
      progress: {
        indeterminate: false
      },
      stepper: {
        active: 1,
        items: [
          {
            name: 'Choose Client',
            number: 1,
            description: 'Select which of the user\'s registered client credentials to use for this test.'
          },
          {
            name: 'Request Access Token',
            number: 2,
            description: 'Use the selected client credentials to request an access token for the API.'
          },
          {
            name: 'Select API Endpoint',
            number: 3,
            description: 'Decide which API endpoint you want to access for this test.'
          },
          {
            name: 'Make Request',
            number: 4,
            description: 'Call the selected endpoint with the current access token.'
          },
          {
            name: 'View Result',
            number: 5,
            description: 'Look at the response from the API endpoint.'
          }
        ]
      },
      credentials: {
        selected: null,
        list: []
      },
      showSecret: false,
      accessToken: {
        raw: {}
      },
      endpoint: {
        url: ''
      },
      response: {}
    }
  },
  filters: {
    pretty: function(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  },
  computed: {
    audience () {
      return process.env.VUE_APP_AUTH0_AUDIENCE
    },
    selectedClient () {
      const client_id = this.credentials.selected
      const client = this.credentials.list.find(x => x.client_id == client_id)

      return {
        client_id: client?.client_id || '',
        client_secret: client?.client_secret || '',
        tier: client?.client_metadata?.tier || '',
      }
    },
    tokenRequestBody () {
      const client = this.selectedClient
      if (client) {
        return JSON.stringify({
          client_id: client.client_id,
          client_secret: client.client_secret,
          audience: process.env.VUE_APP_AUTH0_AUDIENCE
        }).trim()
      } else {
        return JSON.stringify({}).trim()
      }
    },
    nextStep () {
      return this.stepper.active == 5 ? 1 : this.stepper.active + 1
    },
    previousStep () {
      return this.stepper.active == 1 ? 1 : this.stepper.active - 1
    }
  },
  async mounted () {
    this.progress.indeterminate = true
    const clients = await this.fetchClients()
    console.log(clients)
    this.credentials.list = clients.data
    this.progress.indeterminate = false

    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    Prism.highlightAll();
  },
  methods: {
    async fetchClients () {
      const per_page = 10
      const page = 0

      const accesstoken = await this.$auth.getTokenSilently()
      const uri = encodeURI(`/admin/clients?per_page=${per_page}&page=${page}`)
      const response = await this.$http(accesstoken).get(uri)
      return response.data
    },
    async getAccessToken () {},
    async doStep (stepNumber) {
      switch (stepNumber) {
        case 1:
          // select which client credential to use
          break
        case 2:
          
          break
        case 3:
          // select an API endpoint to access
          break
        case 4:
          // issue the http request
          break
        case 5:
          // show result
          break
        default: 
      }
    },
    async continueClick (step) {
      await this.doStep(step.number)
      this.stepper.active = this.nextStep
    },
    async cancelClick (step) {
      this.stepper.active = this.previousStep
    }
  }
}
</script>

<style scoped>
  /* pre.json {
    font-family: monospace, monospace;
    display: block;
    overflow: scroll;
    color: white;
    background: #282a36;
  } */
</style>