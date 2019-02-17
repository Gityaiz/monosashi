<template>
  <div>
    <p v-for="(topic, index) in topics" :key="index">{{topic.id}}</p>
  </div>
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
      .then(querySnapshot => {
        this.topics = querySnapshot.docs
        console.log(querySnapshot.docs)
      })
  }
}
</script>