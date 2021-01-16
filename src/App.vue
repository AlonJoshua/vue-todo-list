<template>
  <v-app class="gtd">
    <the-header />
        <dashboard-view />
  </v-app>
</template>

<script>

import theHeader from './components/the-header';
// import home from './views/home';
import dashboardView from './views/dashboard-view'

export default {
  name: 'App',

  components: {
      theHeader,
      // home,
      dashboardView
  }
};
</script>
