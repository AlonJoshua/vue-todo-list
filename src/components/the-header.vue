<template>
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
        <!-- <v-list-item v-for="link in links" 
                     :key=link.text
                     router
                     :to="link.route"
        >
          <v-list-action>
            <v-icon>{{link.icon}}</v-icon>
            <v-list-item-content>
              <v-list-item-text>
                {{link.text}}
              </v-list-item-text>
            </v-list-item-content>
          </v-list-action>
        </v-list-item> -->
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
  }
}


}
</script>

<style lang="scss">
</style>