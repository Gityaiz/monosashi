<template>
  <v-card flat id='bottom-nav'>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        @click='routePage("home")'
      >
        <span>ホーム</span>
      </v-btn>

      <v-btn
        color="teal"
        flat
        @click='routePage("myQuestions")'
      >
        <span>自分の質問</span>
      </v-btn>

      <v-btn
        color="teal"
        flat
        @click='routePage("mypage")'
      >
        <span>マイページ</span>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      bottomNav: 'recent'
    }
  },
  methods: {
    routePage (_nextPage) {
      if (_nextPage === 'home') {
        this.$router.push({path: '/'})
      } else if (_nextPage === 'myQuestions') {
      } else if (_nextPage === 'mypage') {
        this.$router.push({path: '/mypage'})
      }
    }
  }
}
</script>
<style scoped>
#bottom-nav {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>
