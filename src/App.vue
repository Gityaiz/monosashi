<template>
  <v-layout>
    <v-flex>
      <router-view/>
      <bottomHeader/>
    </v-flex>
  </v-layout>
</template>

<script>
import bottomHeader from './components/header'
import homePage from './components/home'
export default {
  name: 'app',
  components: {
    bottomHeader,
    homePage
  }
}
</script>

<style>

</style>
