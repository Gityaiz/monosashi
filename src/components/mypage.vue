<template>
<v-app>
  <v-layout>
    <v-flex>
      <v-btn @click="logout()">
        ログアウト
      </v-btn>
      <v-btn @click="deleteUser()">
        退会
      </v-btn>
    </v-flex>
  </v-layout>
</v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      test: ''
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(data => {
          this.$parent.snackbarMessage = 'ログアウトしました'
          this.$parent.snackbar = true
          this.$store.auth.dispatch('setLogOut')
          this.$store.auth.dispatch('setEmail', '')
          this.$router.push({path: '/signin'})
        })
    },
    deleteUser () {
      const deleteMe = firebase.auth().currentUser
      deleteMe.delete().then((result) => {
        this.$parent.snackbarMessage = '退会しました'
        this.$parent.snackbar = true
        this.$store.auth.dispatch('setLogOut')
        this.$store.auth.dispatch('setEmail', '')
        this.$router.push({path: '/'})
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>