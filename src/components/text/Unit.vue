<template>
  <div>
    <p class="title">Text</p>
    <p class="subtitle is-7">{{ this.description }}</p>
    <div class="tabs is-small">
      <ul>
        <li v-bind:class="[this.path === '/text' ? 'is-active' : '']">
          <router-link to="/text">Main</router-link>
        </li>
        <li v-bind:class="[this.path === '/text/phrase' ? 'is-active' : '']">
          <router-link to="/text/phrase">定型文</router-link>
        </li>
        <li v-bind:class="[this.path === '/text/rss' ? 'is-active' : '']">
          <router-link to="/text/rss">RSS</router-link>
        </li>
      </ul>
    </div>
    <div class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <div class="level-item">
          <input type="button" class="button is-small" v-on:click="settingsShow" value="Settings">
          <modal name="settings-panel" width="90%" height="auto">
            <div class="modal-body">
              <div class="section">
                <h3 class="title">Text Settings</h3>
                <label for="speed" class="label">Speed</label> {{ updateSpeed }}
                <input type="range" name='speed' min='1' max='100' v-model="speed" value="30">
                <label for="font" class="label">Font</label>
                <div class="select">
                  <select name="font" id="">
                    <option value="ufo">UFO</option>
                  </select>
                </div>
                <label for="loop" class="label">Loop</label>
                <label for="color" class="label">Color</label>
                <chrome-picker v-model="colors" :disableAlpha="true"></chrome-picker>
                <input type="button" class="button is-primary is-small" v-on:click="sendDisplayChangeColor" value="送信">
              </div>
            </div>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Chrome} from 'vue-color'
let defaultProps = {
  hex: '#194d33e6',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 0.9
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 0.9
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 0.9
  },
  a: 1
}
export default {
  props: ['description'],
  components: {
    'chrome-picker': Chrome
  },
  data: () => ({
    colors: defaultProps,
    path: '',
    speed: ''
  }),
  methods: {
    settingsShow: function () {
      this.$modal.show('settings-panel')
      console.log(this.colors.rgba.r)
      console.log(this.colors.rgba.g)
      console.log(this.colors.rgba.b)
    },
    settingsClose: function () {
      this.$modal.hide('settings-panel')
    },

    sendDisplayChangeColor: function () {
      console.log('Press')
      console.log(this.colors)
      console.log(this.speed)
    }
  },
  mounted () {
    this.path = this.$route.path
  },
  computed: {
    updateSpeed: function () {
      return this.speed
    }
  },
  watch: {
    speed: function () {
      console.log(this.speed)
      this.axios.post('/api/update/speed', {
        speed: this.speed
      })
        .then((res) => console.log('Done' + res.data))
        .catch((e) => alert(e))
    },
    colors: function () {
      console.log(this.colors.rgba.r)
      console.log(this.colors.rgba.g)
      console.log(this.colors.rgba.b)
      this.axios.post('/api/update/colors', {
        colors: this.colors.rgba
      })
        .then((res) => console.log('DoneColor: ' + res.data))
        .catch((e) => alert(e))
    }
  }
}
</script>
