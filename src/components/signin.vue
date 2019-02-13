<template>
  <v-app>
    <v-layout>
      <v-flex xs8 offset-xs2 mt-5 align-self-center>
        <v-card flat>
          <v-tabs fixed-tabs>
            <v-tab @click="changeTab('mail')">メール認証</v-tab>
            <v-tab @click="changeTab('google')">google認証</v-tab>
          </v-tabs>

          <form
            v-if="mailAuth"
          >
            <v-text-field
              v-model="username"
              label="E-mail Address"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              required
            >
            </v-text-field>
          </form>
          <v-btn
            v-if="mailAuth"
          >
          Signin
          </v-btn>
          <p v-if="mailAuth">You don't have an account?</p>

          <div v-if="googleAuth" id="googleAuthbtn">
            <v-btn color="info" @click='signin()'>Googleアカウントでログイン</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      username: '',
      password: '',
      mailAuth: true,
      googleAuth: false
    }
  },
  methods: {
    signin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(data => {
          alert('login success')
          console.log(data)
        })
        .catch(error => alert(error.message))
    },
    changeTab (mode) {
      this.mailAuth = false
      this.googleAuth = false
      if (mode === 'mail') {
        this.mailAuth = true
      } else if (mode === 'google') {
        this.googleAuth = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
#googleAuthbtn {
  height: 100px;
  display: flex;
  flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
}
</style>