<!--
<template>
  <div id="app" class="has-background-white">
    <div class="container">
      <Header/>
      <router-view/>
    </div>
  </div>
</template>
-->
<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Title 1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Title 1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Title 1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="light-blue darken-4" app>
      <!-- -->
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
@import "./mystyles.css";
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
