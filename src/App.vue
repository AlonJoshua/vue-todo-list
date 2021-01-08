<template>
  <v-app class="gtd">
    <the-header />
    <v-main>
        <home />
    </v-main>
  </v-app>
</template>

<script>

import theHeader from './components/the-header';
import home from './views/home';

export default {
  name: 'App',

  components: {
      theHeader,
      home
  }
};
</script>
