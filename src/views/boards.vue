<template>
  <v-main>
    
    <v-btn
      fab
      absolute
      right
      dark
      color="primary lighten-3"
    >
      <v-icon large>mdi-plus</v-icon>
    </v-btn>
    <v-container class="mt-4">
      <!-- title -->
      <v-card flat>
        <v-card-title>
          <v-spacer />
          <h2 class="text-uppercase primary--text">{{homePageTitle}}</h2>
          <v-spacer />
        </v-card-title>
      </v-card>

      
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
              height="auto"
              dark
              :color="`${board.color}`"
              >
                <v-container>
                  <v-row cols="12">
                    <v-col cols="10">
                      <v-card-title>
                        {{board.title}}
                      </v-card-title>
                    </v-col>
                    <v-col cols="1">
                      <v-icon right>{{board.icon}}</v-icon>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card-text class="pt-2">
                      {{board.description}}
                      </v-card-text>
                    </v-col>
                  </v-row>
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
                </v-container>
              </v-card>
            </router-link>
          </v-col>

          <!-- new board card -->
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
                          :rules="[ newBoardData.rules.exists, newBoardData.rules.required ]"
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
        boardName: '',
        description: '',
        teamMembers: [],
        rules: {
          exists: value => !this.boardsTitles.includes(value) || 'Board title already exists',
          required: value => !!value || 'Required'
        }
      }
    }
  },
  methods: {
    createNewBoard() {
      if (!this.boardsTitles.includes(this.newBoardData.boardName) &&
          this.newBoardData.boardName.length) {
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
        this.$store.dispatch('addNewBoard', board)
        this.newBoardBtn.dialog = false
        this.newBoardData.boardName = ''
        this.newBoardData.description = '',
         this.newBoardData.teamMembers = []
      } 
    }
  },
  computed: {
    boards() {
      return this.$store.state.boards
    },
    boardsTitles() {
      return this.boards.map(board => board.title)
    },
  },
}

</script>
