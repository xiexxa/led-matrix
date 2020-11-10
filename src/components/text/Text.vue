<!--
<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <article class="tile is-child notification is-light">
          <Unit description="テキストを表示します。"/>
          <div class="tile is-child notification is-info is-light">
            <p class="is-5">表示する文字を入力</p>
            <input type="text" class="input" name="textbox" v-model="textbox">
            <p class="is-7">history</p>
            <div class="tags are-midium">
              <p v-show="loading">Loading...</p>
              <div v-show="!loading" v-bind:class="[{tag: isHover!=his.id}, {'tag is-info': isHover==his.id}]" v-for="his in this.histories" v-bind:key = his.id v-on:click="historyChoose(his.body)" v-on:mouseover="overHistory(his.id)" v-on:mouseleave="leaveHistory(his.id)">{{his.body | truncate}}</div>
            </div>
            <nav class="level">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <p class="button is-small is-7" v-on:click="textBoxReset">reset</p>
                </div>
                <div class="level-item">
                  <p class="button is-small is-warning" v-on:click="sendDisplayRequest">Send</p>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
-->
<template>
  <v-container>
    <v-form>
      <v-row justify="center">
        <v-col>
          <v-autocomplete v-model="this.textbox" :items="this.histories" item-text="body" placeholder="表示したい文字列を入力" filled @click:clear="textBoxReset" clear-icon="mdi-close-circle" @click:append-outer="sendDisplayRequest" append-outer-icon="mdi-send" clearable solo hide-details hide-no-data>
          </v-autocomplete>
          <v-card class="mx-auto my-12">
            <v-card-title>Settings</v-card-title>
            <v-card-text>
              <v-toolbar-title>
                <span class="subheading">Speed</span>
                <v-spacer></v-spacer>
              </v-toolbar-title>
              <v-row align="center" class="mx-0">
                <span class="display-3 font-weight-light" v-text="speed"></span>
              </v-row>
              <v-row>
                <v-slider min="1" max="100" v-model="speed">
                  <template v-slot:prepend>
                    <v-icon @click="decrement">mdi-tortoise</v-icon>
                  </template>
                  <template v-slot:append>
                    <v-icon @click="increment">mdi-rabbit</v-icon>
                  </template>
                </v-slider>
              </v-row>
              <v-toolbar-title>
                <span class="subheading">Color</span>
                <v-spacer></v-spacer>
              </v-toolbar-title>
              <v-row align="center" class="mx-0">
                <v-color-picker dot-size="25" canvas-height="300" swatches-max-height="200" v-model="rgb" show-swatches></v-color-picker>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
// let histories
export default {
  name: 'Text',
  components: {
  },
  data: () => ({
    histories: [],
    isLoading: false,
    textbox: 'aaa',
    speed: '',
    types: ['hex', 'rgb', 'hsl', 'hsv'],
    type: 'hex',
    rgb: { r: 0, g: 0, b: 255 }
  }),
  methods: {
    sendDisplayRequest: function () {
      let textbox = this.textbox
      alert(textbox)
      this.axios.post('/api/show/text', {
        text: textbox
      })
        .then((res) => alert(res.data))
        .catch((e) => alert('AAA' + e.response.status))
    },
    textBoxReset: function () {
      this.textbox = ''
    },
    historyChoose: function (body) {
      console.log(this.$refs.hist)
      console.log(body)
      this.textbox = body
    },
    overHistory: function (id) {
      console.log(id)
      // this.isHover = !this.isHover
      this.isHover = id
    },
    leaveHistory: function (id) {
      this.isHover = -1
    },
    decrement: function () {
      this.speed--
    },
    increment: function () {
      this.speed++
    }
  },
  async mounted () {
    console.log('mounted')
    await this.axios.get('/api/get/history')
      .then(res => {
        console.log(res.data.histories)
        console.log(res.status)
        this.histories = res.data.histories
      })
    this.loading = false
  },
  filters: {
    truncate: function (value) {
      let length = 20
      let ommision = '...'
      if (value.length <= length) {
        return value
      }
      return value.substring(0, length) + ommision
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
    rgb: function () {
      console.log('rgb: ' + this.rgb.r)
      console.log('rgb: ' + this.rgb.g)
      console.log('rgb: ' + this.rgb.b)
      this.axios.post('/api/update/colors', {
        colors: this.rgb
      })
        .then((res) => console.log('DoneColor: ' + res.data))
        .catch((e) => alert(e))
    }
  },
  computed: {
    color: {
      get () {
        return this[this.type]
      },
      set (v) {
        this[this.type] = v
      }
    }
  }
}
</script>
