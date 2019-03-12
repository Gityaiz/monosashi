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
      <v-container>
        <v-layout>
          <v-flex>
            <v-data-table
              v-model="selected"
              :headers="this.headers"
              :items="this.myquestions"
              class="elevation-1"
              select-all
              :pagination.sync="pagination"
            >
            <template v-slot:headers="props">
              <tr>
                <th>
                  <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    hide-details
                    @click.stop="toggleAll"
                  ></v-checkbox>
                </th>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon small>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
              </tr>
            </template>
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    :input-value="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.good }}</td>
                <td>{{ props.item.bad }}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn fab large color="cyan" right fixed @click="dialog=true">
        <v-icon dark>edit</v-icon>
      </v-btn>
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
      pagination: {
      },
      loading: 'false',
      text: '投稿しました',
      myquestions: [],
      selected: [],
      headers: [
        {
          text: 'タイトル',
          value: 'title',
          align: 'left',
          sortable: false,
          width: '50%'
        },
        {
          text: 'good',
          value: 'good',
          width: '20%'
        },
        {
          text: 'bad',
          value: 'bad',
          width: '20%'
        }
      ]
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
        return 0
      }
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  created () {
    this.loading = 'true'
    this.database = firebase.firestore()
    this.database.collection('topics').where('author', '==', this.$store.auth.getters.fireid)
      .orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        this.myquestions = querySnapshot.docs.map(elem => elem.data())
        for (var i = 0; i < this.myquestions.length; i++) {
          this.myquestions[i].id = querySnapshot.docs[i].id
        }
      })
    this.loading = 'false'
  },
  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.desserts.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
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
        good: 0,
        bad: 0
      }).then(function (docRef) {
        documentid = docRef.id
      })
      if (documentid != null) {
        // ここでリロードせずに配列に追加したい
        this.myquestions.unshift({'good': 0, 'bad': 0})
        this.myquestions[0].title = this.question.title
        this.myquestions[0].body = this.question.body
        this.myquestions[0].timestamp = this.question.timestamp
        this.myquestions[0].id = documentid
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