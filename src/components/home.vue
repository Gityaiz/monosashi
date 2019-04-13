<template>
  <div>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <v-data-table
              :headers="this.headers"
              :items="this.topics"
              :expand="expand"
              class="elevation-1"
              item-key="title"
            >
              <template v-slot:items="props">
                <tr @click="props.expanded = !props.expanded">
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
    </v-card>
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  data () {
    return {
      expand: false,
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
          value: 'good'
        },
        {
          text: 'bad!',
          value: 'bad'
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