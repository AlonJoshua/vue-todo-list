<template>
  <v-main>
    <v-container class="mt-4">

      <!-- title -->
      <v-card flat>
        <v-card-title>
          <v-spacer />
          <h2 class="text-uppercase primary--text">{{homePageTitle}}</h2>
          <v-spacer />
        </v-card-title>
      </v-card>
        <v-divider ></v-divider>

        <!-- boards cards -->
        <v-container fluid class="mt-2">
          <v-row cols="12">
            <v-col cols="4"
              v-for="board in boards"
              :key="board.id"
            >
              <router-link
                :to="{
                  name: 'boardDetails', 
                  params: {
                    boardId: board.id
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

            <!-- new board card -->
            </v-col>
            <v-col cols="4">
              <v-dialog v-model="newBoardBtn.dialog" max-width="30vw">

                <template v-slot:activator="{on, attrs}">
                  <v-card dark 
                          height="11rem" 
                          color="primary lighten-2"
                          v-bind="attrs"
                          v-on="on"
                  >
                    <v-container fill-height>
                      <v-spacer />
                        <h2>{{newBoardBtn.title}}</h2>
                        <v-icon right>{{newBoardBtn.icon}}</v-icon>
                      <v-spacer />
                    </v-container>
                  </v-card>
                </template>

                <v-form>
                  <v-card max-width="30vw">
                    <v-container>
                      <v-row>
                        <v-col class="text-center">
                          <v-text-field
                            label="Board Name"
                            v-model="newBoardData.boardName"
                            type="text"
                            prepend-icon="mdi-clipboard-multiple-outline"
                          >
                          </v-text-field>
                          <v-text-field
                            label="Description"
                            v-model="newBoardData.description"
                            type="text"
                            prepend-icon="mdi-text"
                          >
                          </v-text-field>
                          <v-text-field
                            label="Add Team Members"
                            v-model="newBoardData.teamNembers"
                            type="text"
                            prepend-icon="mdi-account"
                          >
                          </v-text-field>
                          <v-btn
                            @click="createNewBoard"
                          >
                            {{newBoardBtn.submitText}}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-form>

              </v-dialog>
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
        dialog: false,
        title: 'Create new board',
        icon: 'mdi-view-grid-plus',
        submitText: 'Create Board'
      },
      newBoardData: {
        boardName: null,
        description: null,
        teamMembers: []
      }
    }
  },
  methods: {
    createNewBoard() {
      const board = {
          title: this.newBoardData.boardName,
          id: Date.now(),
          description: this.newBoardData.description,
          team: this.newBoardData.teamMembers,
          icon: 'mdi-poll',
          color: 'primary lighten-1',
          lists: [
              { title: 'To Do', items: [] },
              { title: 'Doing', items: [] },
              { title: 'Done', items: [] },
          ]
      }
      console.log(board)
      this.$store.dispatch('addNewBoard', board)
      this.newBoardBtn.dialog = false
    }
  },
  computed: {
    boards() {
      return this.$store.state.boards
    }
  },
  watch: {
    newBoardBtn: function() {
      console.log(this.newBoardData.boardName)
    }
  }
}

</script>
