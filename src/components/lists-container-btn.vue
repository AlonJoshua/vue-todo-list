<template>
  <v-btn text dark block @click="addListBtnClick">
      <v-icon dense>mdi-plus</v-icon>
      {{btn.title}}
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      btn: {
        title: 'Add another list'
      }
    }
  },
  methods: {
    addListBtnClick() {
      this.$store.dispatch('addList');
    }
  }
}
</script>

<style>

</style>