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
        <v-data-table
          :headers="this.headers"
          :items="this.myquestions"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.body }}</td>
          </template>
        </v-data-table>
        <!-- <div class= "text-xs-center pt-2">
          <v-pagination v-model="pagination.page" : length="pages"></v-pagination>
        </div> -->
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
      text: '投稿しました',
      timestamp: '',
      myquestions: [],
      pagination: {},
      headers: [
        {
          text: 'myquestions',
          align: 'left',
          sortable: false,
          value: name
        },
        {text: 'title', value: 'title'},
        {text: 'field', value: 'field'}
      ]
    }
  },
  // computed () {
  //   if (this.pagination.rowsPerPage == null ||
  //         this.pagination.totalItems == null
  //       ) return 0

  //       return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
  // },
  created () {
    this.database = firebase.firestore()
    this.database.collection('topics').where('author', '==', this.$store.auth.getters.fireid)
      .get()
      .then((querySnapshot) => {
        this.myquestions = querySnapshot.docs.map(elem => elem.data())
      })
  },
  methods: {
    submit_question () {
      if (this.question_title === '' || this.question_body === '' || this.$store.auth.getters.isLoggedIn === false) {
        return
      }
      this.database.collection('topics').add({
        title: this.question_title,
        body: this.question_body,
        author: this.$store.auth.getters.fireid,
        created: firebase.firestore.FieldValue.serverTimestamp()
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