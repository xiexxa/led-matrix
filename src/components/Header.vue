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
        <v-list-group :value="true" no-action prepend-icon="mdi-format-text">
          <template v-slot:activator>
            <v-list-item-title>Text</v-list-item-title>
          </template>
          <router-link tag="v-list-item" to="/text" link>
            <v-list-item-content>
              <v-list-item-title>Text</v-list-item-title>
            </v-list-item-content>
          </router-link>
          <router-link tag="v-list-item" to="/text/phrase" link>
            <v-list-item-content>
              <v-list-item-title>Phrase</v-list-item-title>
            </v-list-item-content>
          </router-link>
          <router-link tag="v-list-item" to="/text/rss" link>
            <v-list-item-content>
              <v-list-item-title>RSS</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-group>
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
      <v-toolbar-title>{{this.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="pause" icon>
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn  @click="stop" icon>
        <v-icon>mdi-stop</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data: () => ({
    name: 'Header',
    drawer: null
  }),
  methods: {
    pause: function () {
      console.log('PAUSE')
      this.axios.post('/api/update/pause', {
        pause: true
      })
        .then((res) => console.log(res.data))
        .catch((e) => alert('AAA' + e.response.status))
    },
    stop: function () {
      console.log('STOP')
      this.axios.post('/api/update/stop', {
        stop: true
      })
        .then((res) => console.log(res.data))
        .catch((e) => alert('AAA' + e.response.status))
    }
  }
}
</script>
