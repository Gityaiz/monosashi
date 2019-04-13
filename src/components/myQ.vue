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
      <v-btn block @click='delete_question();confirm_dialog=false'>
        はい
      </v-btn>
      <v-btn block @click='delete_question();confirm_dialog=false'>
        いいえ
      </v-btn>
    </v-dialog>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card>
              <v-btn color="pink accent-3" @click='delete_question()'>delete</v-btn>
            </v-card>
            <v-data-table
              v-model="selected"
              :headers="this.headers"
              :items="this.myquestions"
              class="elevation-1"
              select-all
              :expand="expand"
              :pagination.sync="pagination"
            >
              <!-- <template v-slot:headers="props">
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
              </template> -->
              <template v-slot:items="props">
                <tr @click="props.expanded = !props.expanded">
                  <td>
                    <v-checkbox
                      :input-value="props.selected"
                      primary
                      hide-details
                      @change="toggleOne(props.item.id)"
                    ></v-checkbox>
                  </td>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.good }}</td>
                  <td>{{ props.item.bad }}</td>
                </tr>
              </template>
              <template v-slot:expand="props">
                <v-card flat>
                  <v-card-text>Peek-a-boo!</v-card-text>
                </v-card>
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
      expand: false,
      dialog: false,
      confirm_dialog: false,
      delete_tempid: '',
      question: {
        title: '',
        body: '',
        timestamp: ''
      },
      checked: [],
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
          width: '60%'
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
  },
  methods: {
    toggleAll () {
      if (this.selected.length) {
        this.selected = []
      } else {
        this.myquestions.forEach((item, index) => {
          this.selected.push(item.id)
        })
      }
    },
    toggleOne (target) {
      // NULLだったら新規追加
      if (!this.checked) {
        this.checked.unshift(target)
        return
      }
      // 指定済み配列からidを削除
      for (var i = 0; i < this.checked.length; i++) {
        if (this.checked[i] === target) {
          this.checked.splice(i, 1)
          return
        }
      }
      // 指定済み配列に追加
      this.checked.unshift(target)
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
    delete_question () {
      console.log(this.checked)
      this.database = firebase.firestore()
      for (var i = 0; i < this.checked.length; i++) {
        this.database.collection('topics').doc(this.checked[i]).delete()
          .then(function () {
          })
        // 本来ここは成功したときのみ行うべきなので直前のカッコ内で行うべき。カッコ内でメンバ変数に参照する方法を確認する
        for (var j = 0; j < this.myquestions.length; j++) {
          if (this.checked[i] === this.myquestions[j].id) {
            this.myquestions.splice(j, 1)
          }
        }
      }
    }
  }
}
</script>

<style>

</style>