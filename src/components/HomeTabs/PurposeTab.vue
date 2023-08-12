<template>
  <v-card>
    <v-card-title>
      What is OAuth2?
    </v-card-title>

    <v-card-text>
      The OAuth 2.0 specification defines an authorization protocol (a protocol that is focused on what actors have access to 
      — not who the actor is). This is specifically geared towards allowing a resource owner (user, most likely) to grant 
      third-party applications and websites access to resources (which could be just about anything). Think of use cases such 
      as a mobile app that can post pictures to Facebook where you authorize the app access to Facebook once and, from that 
      point onward you can simply post pictures from the app to Facebook. As an authorization protocol, the details of how 
      authentications works are largely undefined; in fact, in some cases the details of how the credentials are passed from 
      the Client or User to Identity Provider aren’t specifically defined (that leaves a lot of room for things to get a 
      little weird or, at least, custom). The OAuth2 spec defines four actors: 
    </v-card-text>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Resource Owner:</v-list-item-title>
        <v-list-item-subtitle>
          Usually a user. But abstractly, any entity that is capable of granting access to a Resource. 
          This could be a person (referred to as the end-user in the spec) or a variety of other things. 
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Client:</v-list-item-title>
        <v-list-item-subtitle>
          The application that wants access to the Resource. This could be a Mobile App, Single Page Application (SPA), 
          traditional server-side Web Application component or a desktop application.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Authorization Server:</v-list-item-title>
        <v-list-item-subtitle>
          The server which validates that generates the access tokens.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Resources Server:</v-list-item-title>
        <v-list-item-subtitle>
          Contains the Resource that the Client wants to access (again, an API, web server, etc).
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

  </v-card>
</template>