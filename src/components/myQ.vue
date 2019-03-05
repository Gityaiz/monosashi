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
          v-model='question.title'
          padding-right="10px"
        >
        </v-text-field>

        <v-textarea
          label="本文"
          v-model="question.body"
        >
        </v-textarea>
      </v-card>
      <v-btn block @click='submit_question();dialog=false'>
        質問を投稿する
      </v-btn>
    </v-dialog>
    <v-dialog v-model="confirm_dialog" width="500">
      <v-card
        color="white"
        class="black--text"
      >
        <p>この操作は元に戻すことはできません。</p>
        <p>本当に削除してもよろしいですか？</p>
      </v-card>
      <v-btn block @click='delete_question(delete_temp);confirm_dialog=false'>
        はい
      </v-btn>
      <v-btn block @click='delete_question(delete_temp);confirm_dialog=false'>
        いいえ
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
            <td>{{ props.item.body }}</td>
            <td>{{ props.item.urayama }}</td>
            <td>{{ props.item.kawaiso }}</td>
            <v-btn flat icon color="indigo" @click='confirm_dialog=true;delete_temp=props.item'>×</v-btn>

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
      confirm_dialog: false,
      delete_tempid: '',
      question: {
        title: '',
        body: '',
        timestamp: ''
      },
      text: '投稿しました',
      myquestions: [],
      pagination: {},
      headers: [
        {
          text: 'タイトル',
          sortable: false,
          value: 'title'
        },
        {
          text: '内容',
          value: 'body'
        },
        {
          text: 'うらやましい',
          value: 'urayama'
        },
        {
          text: 'かわいそう',
          value: 'kawaiso'
        }
      ]
    }
  },
  created () {
    this.database = firebase.firestore()
    this.database.collection('topics').where('author', '==', this.$store.auth.getters.fireid)
      .get()
      .then((querySnapshot) => {
        this.myquestions = querySnapshot.docs.map(elem => elem.data())
        for (var i = 0; i < this.myquestions.length; i++) {
          this.myquestions[i].id = querySnapshot.docs[i].id
        }
      })
  },
  methods: {
    submit_question () {
      if (this.question.title === '' || this.question.body === '' || this.$store.auth.getters.isLoggedIn === false) {
        return
      }
      let documentid = ''
      this.database.collection('topics').add({
        title: this.question.title,
        body: this.question.body,
        author: this.$store.auth.getters.fireid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        urayama: 0,
        kawaiso: 0
      }).then(function (docRef) {
        documentid = docRef.id
      })
      if (documentid != null) {
        // ここでリロードせずに配列に追加したい
        // console.log('>>', this.myquestions)
        this.myquestions.push({'urayama': 0, 'kawaiso': 0})
        // console.log('>>', this.myquestions[this.myquestions.length] - 1)
        this.myquestions[this.myquestions.length - 1].title = this.question.title
        this.myquestions[this.myquestions.length - 1].body = this.question.body
        this.myquestions[this.myquestions.length - 1].timestamp = this.question.timestamp
        this.myquestions[this.myquestions.length - 1].id = documentid
        this.question.title = ''
        this.question.body = ''
        this.$parent.snackbarMessage = '投稿しました'
        this.$parent.snackbar = true
      }
    },
    delete_question (question) {
      this.database = firebase.firestore()
      this.database.collection('topics').doc(question.id).delete()
        .then(function () {
          console.log('delete question')
          console.log('deleted question', '=>', question)
        })
      // 本来ここは成功したときのみ行うべきなので直前のカッコ内で行うべき。カッコ内でメンバ変数に参照する方法を確認する
      for (var i = 0; i < this.myquestions.length; i++) {
        if (question.id === this.myquestions[i].id) {
          this.myquestions.splice(i, 1)
        }
      }
      console.log('myquestions', '=>', this.myquestions)
    }
  }
}
</script>

<style>

</style>