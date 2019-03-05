<template>
  <v-card>
    <v-flex>
      <v-data-table
        :headers="this.headers"
        :items="this.topics"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.body }}</td>
          <td>{{ props.item.urayama }}</td>
          <td>{{ props.item.kawaiso }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-card>
</template>

<script>
import firebase from '../firebase'
export default {
  data () {
    return {
      database: [],
      topics: [],
      headers: [
        {
          text: 'タイトル',
          value: 'title',
          sortable: false
        },
        {
          text: '内容',
          value: 'body'
        },
        {
          text: 'better',
          value: 'urayama'
        },
        {
          text: 'worse',
          value: 'kawaiso'
        }
      ]
    }
  },
  created () {
    this.database = firebase.firestore()
    this.database.collection('topics').get()
      .then((querySnapshot) => {
        this.topics = querySnapshot.docs.map(elem => elem.data())
      })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>