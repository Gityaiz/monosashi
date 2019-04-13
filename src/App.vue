<template>
  <v-layout>
    <v-flex>
      <v-snackbar v-model="snackbar" top>
        {{ this.snackbarMessage }}
      </v-snackbar>
      <topHeader/>
      <router-view/>
      <bottomHeader/>
    </v-flex>
  </v-layout>
</template>

<script>
import topHeader from './components/topheader'
import bottomHeader from './components/bottomheader'
export default {
  name: 'app',
  components: {
    bottomHeader,
    topHeader
  },
  data () {
    return {
      snackbarMessage: '',
      snackbar: false
    }
  }
}
</script>

<style>

</style>
