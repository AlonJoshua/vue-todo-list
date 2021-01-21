<template>
  <v-app>
    <the-header v-if="$route.path !== '/' " />
    <v-main class="primary">
      <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>

<script>

import theHeader from './components/the-header';
// import home from './views/home';
// import dashboardView from './views/dashboard-view'

export default {
  name: 'App',
  date() {
    return {
    }
  },
  components: {
      theHeader,
      // home,
      // dashboardView
  }
};
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>