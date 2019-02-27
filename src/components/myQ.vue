<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <v-card
        color="white"
        class="black--text"
      >
        <v-text-field
          counter="100"
          label="タイトル"
          v-model='question_title'
          padding-right="10px"
        >
        </v-text-field>

        <v-textarea
          label="本文"
          v-model="question_body"
        >
        </v-textarea>
      </v-card>
      <v-btn block @click='submit_question();dialog=false'>
        質問を投稿する
      </v-btn>
    </v-dialog>
    <v-card>
      <v-flex>
        <v-btn fab large color="cyan" right fixed @click="dialog=true">
          <v-icon dark>edit</v-icon>
        </v-btn>
      </v-flex>
    </v-card>
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  data () {
    return {
      dialog: false,
      question_title: '',
      question_body: '',
      text: '投稿しました'
    }
  },
  created () {
    this.database = firebase.firestore()
  },
  methods: {
    submit_question () {
      if (this.question_title === '' || this.question_body === '' || this.$store.auth.getters.isLoggedIn === false) {
        return
      }
      this.database.collection('topics').add({
        title: this.question_title,
        body: this.question_body,
        user: this.$store.auth.getters.fireid
      })
      this.question_title = ''
      this.question_body = ''
      this.$parent.snackbarMessage = '投稿しました'
      this.$parent.snackbar = true
    }
  }
}
</script>

<style>

</style>