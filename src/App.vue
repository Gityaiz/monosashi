<template>
  <v-layout>
    <v-flex>
      <v-snackbar v-model="snackbar" top>
        {{ text }}
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
      text: 'aa',
      snackbar: false
    }
  }
}
</script>

<style>

</style>
