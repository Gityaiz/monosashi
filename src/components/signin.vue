<template>
  <v-app>
    <v-layout>
      <v-flex xs8 offset-xs2 align-self-center>
        <v-card flat>
          <v-tabs fixed-tabs>
            <v-tab @click="changeTab('mail')">メール認証</v-tab>
            <v-tab @click="changeTab('google')">google認証</v-tab>
          </v-tabs>

          <form
            v-if="$isTextfield"
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
          <div id="mailAuthbtn">
            <v-btn
              v-if="mailAuth"
              center
              @click="signinWithEmail()"
            >
            ログイン
            </v-btn>
          </div>

          <div id="mailAuthbtn">
            <v-btn
              v-if="createAccount"
              center
              @click="signupWithEmail()"
            >
            アカウントを作成
            </v-btn>
          </div>

          <p
            v-if="mailAuth"
            @click="changeTab('signup')"
            id="Link"
          >
          アカウントを作成
          </p>
          <p
            v-if="createAccount"
            @click="changeTab('mail')"
            id="Link"
          >
          ログインフォームに戻る
          </p>

          <div v-if="googleAuth" id="googleAuthbtn">
            <v-btn color="info" @click='signinWithGoogle()'>Googleアカウントでログイン</v-btn>
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
      googleAuth: false,
      createAccount: false
    }
  },
  computed: {
    $isTextfield: function () {
      return this.mailAuth || this.createAccount
    }
  },
  methods: {
    signinWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(data => {
          this.$store.auth.dispatch('setLoggedIn')
          this.$store.auth.dispatch('setUserID', data.user.email)
          this.$router.push({path: '/'})
        })
        .catch(error => {
          console.log(error)
        })
    },
    signupWithEmail () {
      if (this.username === '' || this.password === '') {
        return
      }
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(data => {
          console.log('success email login')
        }).catch(function (error) {
          console.log(error.code)
        })
    },
    signinWithEmail () {
      if (this.username === '' || this.password === '') {
        return
      }
      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
        .then(function (data) {
          console.log('success email login')
        }).catch(function (error) {
          console.log(error.code)
        })
    },
    changeTab (mode) {
      this.mailAuth = false
      this.googleAuth = false
      this.createAccount = false
      if (mode === 'mail') {
        this.mailAuth = true
      } else if (mode === 'google') {
        this.googleAuth = true
      } else if (mode === 'signup') {
        this.createAccount = true
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
  height: 200px;
  display: flex;
  flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
}
#mailAuthbtn {
  display: flex;
  flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
}
#Link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>