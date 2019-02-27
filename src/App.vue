<template>
  <v-layout>
    <v-flex>
      <v-snackbar v-model="snackbar" top>
        {{ this.snackbarMessage }}
      </v-snackbar>
      <router-view/>
      <bottomHeader/>
    </v-flex>
  </v-layout>
</template>

<script>
import bottomHeader from './components/bottomheader'
export default {
  name: 'app',
  components: {
    bottomHeader
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
