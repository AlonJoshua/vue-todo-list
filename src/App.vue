<template>
  <v-app>
    <the-header v-if="$route.path !== homeRoute.path" />
    <v-main class="primary">
      <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>

<script>

import theHeader from './components/the-header';

export default {
  name: 'App',
  date() {
    return {
    }
  },
  components: {
      theHeader,
  },
  computed: {
    homeRoute() {
      return this.$router.options.routes.find(route => route.name === 'home')
    }
  }
};
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>