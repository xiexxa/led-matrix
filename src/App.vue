<template>
  <v-app>
    <Header v-bind:title="this.title"></Header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  data: () => ({
    title: ''
  }),
  mounted () {
    console.log(this.$route.path)
    this.title = this.$route.path
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    Meiryo,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
