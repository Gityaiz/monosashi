<template>
  <v-app>
    <v-layout>
      <v-flex xs8 offset-xs2 mt-5>
        <v-card flat>
          <form>
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
          <button @click='signin'>Signin</button>
          <p>You don't have an account? 
            <router-link to="/signup">create account now!!</router-link>
          </p>
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
      password: ''
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
</style>