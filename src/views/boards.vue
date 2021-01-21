<template>
  <v-main>
    <v-container class="mt-4">
      <v-card flat>
        <v-card-title>
          <v-spacer />
          <h2 class="text-uppercase primary--text">{{homePageTitle}}</h2>
          <v-spacer />
        </v-card-title>
      </v-card>
        <v-divider ></v-divider>
        <v-container fluid class="mt-2">
          <v-row cols="12">
            <v-col cols="4"
              v-for="board in boards"
              :key="board.title"
            >
              <router-link
                :to="{
                  name: 'boardDetails', 
                  params: {
                    id: board.id
                  }
                }"
              >
                <v-card 
                height="11rem"
                dark
                :color="`${board.color}`"
                >
                  <v-card-title>
                    {{board.title}}
                    <v-icon right>{{board.icon}}</v-icon>
                  </v-card-title>
                  <v-card-subtitle class="pt-2">
                    {{board.description}}
                  </v-card-subtitle>
                  <v-row cols="12" 
                        dense 
                        align="center" 
                        class="pa-3"
                        v-if="board.team"
                  >
                    <v-col cols="auto">
                      <v-card-text>
                        <h3>Team</h3>
                      </v-card-text>
                    </v-col>
                    <v-divider inset vertical class="my-3"></v-divider>
                    <v-col>
                      <v-avatar size="35" class="red ml-2 white--text">AJ</v-avatar>
                    </v-col>
                  </v-row>
                </v-card>
              </router-link>
            </v-col>
            <v-col cols="4">
              <v-card dark 
                      height="11rem" 
                      color="primary lighten-2"
                      @click="createBoard"
              >
                <v-container fill-height>
                  <v-spacer />
                  <h2>{{newBoardBtn.title}}</h2>
                  <v-icon right>{{newBoardBtn.icon}}</v-icon>
                  <v-spacer />
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </v-container>
  </v-main>
</template>

<script>

export default {
  components: {
    
  },
  data() {
    return {
      homePageTitle: "My boards",
      newBoardBtn: {
        title: 'Create new board',
        icon: 'mdi-view-grid-plus'
      }
    }
  },
  methods: {
    createBoard() {
      console.log('board created')
    }
  },
  computed: {
    boards() {
      return this.$store.state.boards
    }
  }
}

</script>
