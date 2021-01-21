<template>
  <nav>
    <v-app-bar flat app color="rgba(0, 0, 0, .15)" class="text-center primary">
      <v-app-bar-nav-icon  @click.stop="drawer.state = !drawer.state" class="white--text" />
      <v-spacer />
        <v-btn text rounded class="white--text">
          <v-icon left> {{drawer.icon}} </v-icon>
          <v-toolbar-title>
            {{ appName }}
          </v-toolbar-title>
        </v-btn>
      <v-spacer />
      <v-avatar size="40" class="red white--text">AJ</v-avatar>
    </v-app-bar>
  
    <v-navigation-drawer 
      app 
      hide-overlay 
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