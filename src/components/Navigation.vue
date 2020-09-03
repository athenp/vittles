<template>
  <v-app-bar
    app
    bottom
    dense
    flat
    :style="{background: $vuetify.theme.themes[theme].accent}"
  >
    <v-toolbar-title @click="$router.push({path: '/'})" class="title_font">VITTLES</v-toolbar-title>
    <v-toolbar-items>
      <v-btn @click="$router.push({path: '/recipes'})" text class="ml-3">BROWSE RECIPES</v-btn>
      <v-btn text class="pl-3">DECIDER TOOL</v-btn>
      <v-btn text class="pl-3">MEAL PLANNING</v-btn>
      <v-btn text class="pl-3">PARTNER PROGRAM</v-btn>
      <v-btn text class="pl-3">API</v-btn>
      <v-btn text class="pl-3">CONTACT US</v-btn>
    </v-toolbar-items>
    <div class="flex-grow-1"></div>
    <v-toolbar-items>
      <v-btn text class="pl-3">LOG IN</v-btn>
      <v-btn text class="pl-3">GO PREMIUM</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Navigation',
    computed:{
      theme(){
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      }
    }
  }
</script>
