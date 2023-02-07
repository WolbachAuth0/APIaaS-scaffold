<template>
  <v-dialog v-model="show"
            width="60%"
            transition="dialog-bottom-transition"
  >
    <v-card>
      <v-progress-linear :indeterminate="progress.indeterminate" value="100" height="20" class="primary--text"></v-progress-linear>

      <v-card-title>
        Create New Client
      </v-card-title>

      <v-card-text>
        This will create a new set of client credentials which will permit the current user ({{ user.name }}) to access the api at the selected tier.
      </v-card-text>

      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols=6 class="px-8">
              <v-text-field
                v-model="form.name.value"
                label="Client Name"
                hint="Give the new credential set a name"
                outlined
              ></v-text-field>            
            </v-col>

            <v-col cols=6 class="px-8">
              <v-select
                v-model="form.tier.value" 
                :items="form.tier.options"
                label="Access Tier"
                outlined
              >
              </v-select>              
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="secondary" @click="close()">
          Close
        </v-btn>
        <v-btn class="primary" @click="submit()">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from './../helpers/eventBus.js'

export default {
  name: 'ClientDialog',
  data () {
    return {
      progress: {
        indeterminate: false
      },
      form: {
        name: {
          value: ''
        },
        tier: {
          value: 'freemium',
          options: [
            'freemium',
            'bronze',
            'silver',
            'gold'
          ]
        }
      },
      client: {

      }
    }
  },
  props: {
    show: Boolean,
  },
  computed: {
    user () {
      return this.$auth.user
    } 
  },
  methods: {
    close () {
      EventBus.$emit('hideClientDialog', null)
    },
    async submit () {
      this.progress.indeterminate = true
      const body = {
        user_id: this.$auth.user.sub,
        name: this.form.name.value,
        tier: this.form.tier.value
      }

      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).post(`/admin/clients`, body)
      
      console.log(response.data)
      this.client = response.data
      const announcement = {
        text: response.data.message,
        type: response.data.success ? 'success' : 'error',
        top: true,
        right: true,
        left: false
      }
      EventBus.$emit('announce', announcement)
      EventBus.$emit('hideClientDialog', true)
    }
  }
}
</script>
