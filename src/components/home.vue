<template>
  <v-card>
    <v-container
      fluid
      grid-list-lg
    >
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
          </v-card>
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
      topics: []
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
  }
}
</script>

<style scoped>

</style>