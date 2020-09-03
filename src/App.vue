<template>
  <v-app>
    <router-view></router-view>
    <Navigation />
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  name: "App",
  components: {
    Navigation
  },
  data() {
    return {};
  },
  methods: {}
};
</script>