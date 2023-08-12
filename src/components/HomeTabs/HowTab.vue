<template>
  <v-card>
    <v-card-title>
      Authorizing Your API with OAuth2 Client Credentials
    </v-card-title>

    <v-row>
      <v-col cols=4>

      </v-col>

      <v-col cols=8>
        <v-img :src="diagram" contain class="mx-6 my-6"/>
      </v-col>
    </v-row>
        
  </v-card>
</template>

<script>
import diagram from '../../assets/client-cred-flow.png'

export default {
  data () {
    return {
      diagram
    }
  }
}
</script>
