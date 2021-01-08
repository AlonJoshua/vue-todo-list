<template>
  <v-container fluid class="home">
    <v-row cols="12" class="">
      <v-col cols="12">
        <v-card height="80vh" class="primary lighten-2">
          <lists-container></lists-container>
        </v-card>
      </v-col>
     
    </v-row>
  </v-container>
</template>

<script>
import listsContainer from '../components/lists-container'

export default {
  components: {
    listsContainer
  }
}

</script>
