<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <router-link tag="v-list-item-title" to="/" class="title" link>
          led-matrix
          </router-link>
          <v-list-item-subtitle>
            ドットマトリクスLED制御のWebフロントエンド
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <router-link tag="v-list-item" to="/text" link>
          <v-list-item-content>
            <v-list-item-title>Text</v-list-item-title>
          </v-list-item-content>
        </router-link>
        <router-link tag="v-list-item" to="/image" link>
          <v-list-item-content>
            <v-list-item-title>Image</v-list-item-title>
          </v-list-item-content>
        </router-link>
        <router-link tag="v-list-item" to="/video" link>
          <v-list-item-content>
            <v-list-item-title>Video</v-list-item-title>
          </v-list-item-content>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: 'Header',
    drawer: null
  })
}
</script>
