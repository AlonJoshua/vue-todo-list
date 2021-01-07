<template>
  <v-app class="gtd">
    <the-header></the-header>
  </v-app>
</template>

<script>

import theHeader from './components/the-header';

export default {
  name: 'App',

  components: {
      theHeader
  },

  data: () => ({
    
  }),
};
</script>
