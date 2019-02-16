<template>
<v-app>
  <v-layout>
    <v-flex>
      <v-btn @click="logout()">
        ログアウト
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
          this.$store.auth.dispatch('setLogOut')
          this.$store.auth.dispatch('setUserID', '')
          this.$router.push({path: '/signin'})
        })
    }
  }
}
</script>