<template>
  <v-main class="primary">
    <v-toolbar flat dark class="primary lighten-2">
      <v-card flat class="primary lighten-1 pa-2">
        <v-toolbar-title>
          {{boardTitle}}
        </v-toolbar-title>
      </v-card>
      <v-divider vertical class="ml-3"></v-divider>
      <v-avatar size="2.4rem" class="red mx-2">
        AJ
      </v-avatar>
      <v-spacer />
        <v-menu class="mr-2">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="primary lighten-1">
              menu
            </v-btn>
          </template>
          <v-list>
          <v-list-item>
            change background
          </v-list-item>
        </v-list>
        </v-menu>
        
    </v-toolbar>
    <v-container fluid>
      <v-row cols="12">
        <v-col cols="12">
          <v-card min-height="80vh" class="primary lighten-2">
            <lists-container></lists-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import listsContainer from '../components/lists-container'

export default {
  components: {
    listsContainer
  },
  data() {
    return {
      boardTitle: 'Board Project Example',
      teamTitle: 'Team: '
    }
  }
}

</script>
