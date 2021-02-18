<template>
    <v-container class="mt-6">
      <v-row cols="12">
        <v-spacer></v-spacer>
        <v-col cols="7">
          <v-card class="text-center">
            <pre>
            <span class="subtitle-3">
{{aboutText}}
            </span>
            </pre>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      aboutText: 
      `GTD helps maintain smooth workflow with team-shared project boards.

Every board has a default categoriezed lists 
that can be customized to fit for your or your team's needs.

You can easily control items content and order, 
adding labels and more...

With the GTD app, no project is too big to handle.`
    }
  }
}
</script>