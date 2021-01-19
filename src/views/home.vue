<template>
  <v-main class="primary">
    <v-container fluid fill-height>
        <v-row>
          <v-spacer />
          <v-col class="text-center">
            <v-card dark 
                    flat 
                    color="rgba(255, 255, 255, 0.2)"
                    height="15rem"
                    class="pt-4"
            >
              <h1>{{homeTitle}}</h1>
              <v-card-subtitle class="pa-1">
                {{homeSubtitles}}
              </v-card-subtitle>
              <v-row class="mt-4">
                <v-spacer />
                <v-btn color="blue lighten-3" class="ma-3">{{homeBtns.signIn.text}}</v-btn>
                <v-btn color="blue lighten-3" class="ma-3">{{homeBtns.register.text}}</v-btn>
              <v-spacer />
              </v-row>
            </v-card>
          </v-col>
          <v-spacer />
        </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  data() {
    return {
      homeTitle: 'Welcome to GTD',
      homeSubtitles: 'Organize and Optimize your workflow',
      homeBtns: {
        signIn: {
          text: 'Sign In'
        },
        register: {
          text: 'Register'
        },
      }
    }
  },
  methods: {
    click() {
      console.log('card click')
    }
  }
}

</script>
