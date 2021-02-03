<template>
  <nav>
    <v-app-bar flat app color="rgba(0, 0, 0, .15)" class="text-center primary">
      <v-app-bar-nav-icon  @click.stop="drawer.state = !drawer.state" class="white--text" />
        <v-btn text rounded :ripple="false" class="white--text ml-4">
          <v-icon left> {{drawer.icon}} </v-icon>
          <v-toolbar-title>
            {{ appName }}
          </v-toolbar-title>
        </v-btn>
      <v-spacer />
        <v-btn
          fab
          dark
          color="primary lighten-3 mr-4 mt-3"
          @click="createNewBoard"
        >
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
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
            title: 'Statistics', 
            icon: 'mdi-chart-bar',
            route: {name: 'statistics'} 
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
  methods: {
    createNewBoard() {
      bus.$emit('create-new-board')
    },
    toRoute(route) {
      route.name === this.$route.name ? '' : this.$router.push(route)
    }
  },
}
</script>

<style lang="scss" scoped>
  #app a {
    text-decoration: none;
    color: white;
  }
</style>