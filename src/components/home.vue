<template>
  <v-card>
    <v-container
      fluid
      grid-list-lg
    >
      <!-- <v-layout>
        <v-flex xs12>
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
          <v-btn block @click='submit_question'>
            質問を投稿する
          </v-btn>
        </v-flex>
      </v-layout> -->

      <v-layout row wrap>
        <v-flex xs12>
          <v-card
            class="black--text"
            v-for='(topic, index) in topics' :key="index"
          >
            <v-card-title primary-title>
              <div>
                <span>{{ topic.data().title }}</span>
              </div>
            </v-card-title>
            <!-- <v-card-text>
              <span>{{ topic.data().body }}</span>
            </v-card-text> -->
          </v-card>
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import firebase from '../firebase'
export default {
  data () {
    return {
      database: [],
      topics: [],
      question_title: '',
      question_body: '',
      text: '投稿しました'
    }
  },
  created () {
    this.database = firebase.firestore()
    this.database.collection('topics').get()
      .then((querySnapshot) => {
        this.topics = querySnapshot.docs
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
        user: this.$store.auth.getters.fireid
      })
      this.question_body = ''
      this.question_body = ''
    }
  }
}
</script>

<style>
.initial-box {
    padding: 30px;
    margin: 1px;
    background: #f0f7ff;
    border: dashed 2px #b9c5d4;/*点線*/
}
</style>