<template>
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
                <v-btn 
                  color="blue lighten-3" 
                  class="ma-3"
                  @click="homeBtns.signIn.signInForm = !homeBtns.signIn.signInForm"
                >
                  {{homeBtns.signIn.text}}
                </v-btn>
                <v-overlay 
                  :value="homeBtns.signIn.signInForm"
                >
                  <v-form>
                    <v-card class="pa-4">
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-btn text icon @click="homeBtns.signIn.signInForm = false">
                          <v-icon>{{homeBtns.exitFormIcon}}</v-icon>
                        </v-btn>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Email"
                            type="email"                          
                          ></v-text-field>
                          <v-text-field
                            label="Password"
                            type="password"                          
                          ></v-text-field>
                          <v-btn type="submit" @click="validateSignin">{{homeBtns.signinFormSubmit.text}}</v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-form>
                </v-overlay>
                <v-btn 
                  color="blue lighten-3" 
                  class="ma-3"
                  @click="homeBtns.register.registerForm = !homeBtns.register.registerForm"
                >
                  {{homeBtns.register.text}}
                </v-btn>
                <v-overlay 
                  :value="homeBtns.register.registerForm"
                >
                  <v-form>
                    <v-card class="pa-4">
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-btn text icon @click="homeBtns.register.registerForm = false">
                          <v-icon>{{homeBtns.exitFormIcon}}</v-icon>
                        </v-btn>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="First name"                          
                          ></v-text-field>
                          <v-text-field
                            label="Last name"                          
                          ></v-text-field>
                          <v-text-field
                            label="email"
                            type="email"                          
                          ></v-text-field>
                          <v-text-field
                            type="password"
                            label="Password"                          
                          ></v-text-field>
                          <v-btn type="submit" @click="validateRegister">{{homeBtns.registerFormSubmit.text}}</v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-form>
                </v-overlay>
              <v-spacer />
              </v-row>
            </v-card>
          </v-col>
          <v-spacer />
        </v-row>
    </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      homeTitle: 'Welcome to GTD',
      homeSubtitles: 'Organize projects and Optimize your workflow',
      homeBtns: {
        signIn: {
          text: 'Sign In',
          signInForm: false,
        
        },
        register: {
          text: 'Register',
          registerForm: false,
          registerFormSubmit: false
        },
        exitFormIcon: 'mdi-arrow-left-circle',
        signinFormSubmit: {
          text: 'sign in',
          isSubmited: false,
        },
        registerFormSubmit: {
          text: 'register',
          isSubmited: false,
        },
      }
    }
  },
  methods: {
    validateSignin() {
      // validate
      this.login()
    },
    validateRegister() {
      // validate
      this.login()
    },
    login() {
      this.$router.push({name: 'boards'})
        .then(() => console.log('resolved'))
        .catch(e => console.log('error: ', e))
    }
  }
}

</script>
