<template>
  <v-card height="200px" flat id='bottom-nav'>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="Recent"
      >
        <span>Å</span>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
      >
        <span>B</span>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span>C</span>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
<style scoped>
#bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
}
</style>
