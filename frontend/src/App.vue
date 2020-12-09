<template>
  <div class="app">
    hello {{vue}}
    <v-btn dark>Button</v-btn>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      vue: 'This is vue'
    }
  }
}
</script>

<style scoped>
.app {
  font-size: 40px;
  color: blue;
}
</style>