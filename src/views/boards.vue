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
            <v-card
              block
              dark 
              height="11rem" 
              color="primary lighten-2"
              @click="createNewBoard"
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
import { bus } from '../main'
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
    }
  },
  methods: {
    createNewBoard() {
      bus.$emit('create-new-board')
    },
  },
  computed: {
    boards() {
      return this.$store.state.boards
    }
  }
}

</script>