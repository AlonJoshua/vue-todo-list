<template>
  <nav>
    <v-app-bar flat app color="rgba(0, 0, 0, .15)" class="text-center primary">
      <v-app-bar-nav-icon  @click.stop="drawer.state = !drawer.state" class="white--text" />
        <v-btn 
          text 
          rounded 
          :ripple="false" 
          class="white--text ml-4"
          @click="routeHome"
        
        >
          <v-icon left> {{drawer.icon}} </v-icon>
          <v-toolbar-title>
            {{ appName }}
          </v-toolbar-title>
        </v-btn>
      <v-spacer />
      <v-dialog v-model="newBoardBtn.dialog" max-width="30vw">
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            dark
            color="primary lighten-3 mr-4 mt-3"
            v-on="on"
          >
            <v-icon large>mdi-plus</v-icon>
          </v-btn>
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

      <v-btn fab dark class="red mr-4 mt-3">
        <h4>AJ</h4>
      </v-btn>
    </v-app-bar>
  
    <v-navigation-drawer 
      app 
      temporary
      v-model="drawer.state"
      class="primary lighten-3"
    >
      <v-list>
        <v-list-item-group dark>
          <v-list-item 
            v-for="item in drawer.drawerItems" 
            :key="item.title"
            @click="toRoute(item.route)"
          >
            <v-icon left>{{item.icon}}</v-icon>
              {{item.title}}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { bus } from '../main'
export default {
  data() {
    return {
      appName: "Get Things Done",
      newBoardBtn: {
        dialog: false,
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
      },
      drawer: {
        state: false,
        icon: 'mdi-clipboard-list-outline',
        drawerItems: [
          { 
            title: 'Boards', 
            icon: 'mdi-view-dashboard-outline',
            route: {name: 'boards'}
          },
          { 
            title: 'About', 
            icon: 'mdi-information-outline',
            route: {name: 'about'}
          },
          { 
            title: 'Sign out', 
            icon: 'mdi-logout-variant',
            route: {name: 'home'}
          }
        ]
      },
    }
  },
  methods: {createNewBoard() {
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
        this.newBoardData.teamMembers = [],
        this.$router.push({
          name: 'boardDetails', 
          params: {
            boardId: board.id
          }
        })
      } 
    },
    toRoute(route) {
      route.name === this.$route.name ? '' : this.$router.push(route)
    },
    routeHome() {
      this.$router.push({name: 'boards'})
        .then(() => console.log('resolved'))
        .catch(e => console.log('error: ', e))
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
  mounted() {
    bus.$on('create-new-board', () => this.newBoardBtn.dialog = !this.newBoardBtn.dialog)
  }
}
</script>

<style lang="scss" scoped>
  #app a {
    text-decoration: none;
    color: white;
  }
</style>