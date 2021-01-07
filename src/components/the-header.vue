<template>

<!-- <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awsome! You added a new project.</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-app-bar flat app class="grey lighten-4">
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>Todo</span>
        <span class="font-weight-bold">Ninja</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="grey" v-bind="attrs" v-on="on">
            <v-icon left>mdi-chevron-down</v-icon>
            <span>Manu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="indigo">
      <v-row justify="center">
        <v-col cols="auto" align-self="center">
          <v-flex class="mt-5 text-center">
            <v-avatar size="100">
              <img src="/avatar-1.png" />
            </v-avatar>
            <p class="white--text subheading mt-1">The Net Ninja</p>
          </v-flex>
          <v-flex class="mt-4 mb-3">
            <popup @projectAdded="snackbar = true"></popup>
          </v-flex>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav> -->

  <nav>
    <v-app-bar flat app class="text-center primary">
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>
      <v-btn text  class="white--text">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn text class="white--text primary">
        <v-icon left> mdi-clipboard-list-outline </v-icon>
        <v-toolbar-title>
          {{ appName }}
        </v-toolbar-title>
        </v-btn>
      <v-spacer />
      <v-avatar class="red white--text">AJ</v-avatar>
    </v-app-bar>
    <v-navigation-drawer app hide-overlay v-model="drawer" class="red lighten-2">
      <v-list>
        <v-list-item v-for="link in links" :key=link.text>
          <v-list-action>
            <v-icon>{{link.icon}}</v-icon>
            <v-list-item-content>
              <v-list-item-text>
                {{link.text}}
              </v-list-item-text>
            </v-list-item-content>
          </v-list-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>

export default {

data() {
  return {
    appName: "Get Things Done",
    drawer: false,
    links: [
      {text: 'Dashboards', icon: 'mdi-view-dashboard-outline'},
      {}
    ]
  }
}


}
</script>

<style lang="scss">
</style>