<template>
    <v-container fill-height>
        <v-col align-self="start">
          <v-card class="pa-3">
            <p class="subtitle-1">
              {{aboutText}}
            </p>
          </v-card>
        </v-col>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      aboutText: `GTD helps maintain smooth workflow with a team shared projects boards.
          Every board holds default categorized items lists that can be customized
          to fit for you or your team's goals.
          You can easily control items content and order, through drag and 
          them, adding labels and ect...

          With GTD app, no project is too big to handle.`
    }
  }
}
</script>