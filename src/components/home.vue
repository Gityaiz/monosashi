<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-data-table
            :headers="this.headers"
            :items="this.topics"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.urayama }}</td>
              <td>{{ props.item.kawaiso }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
          align: 'left',
          sortable: false
        },
        {
          text: 'good!',
          value: 'urayama'
        },
        {
          text: 'bad!',
          value: 'kawaiso'
        }
      ]
    }
  },
  created () {
    this.database = firebase.firestore()
    this.database.collection('topics').orderBy('created', 'desc').get()
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