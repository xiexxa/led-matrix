<template>
  <v-container>
    <v-form>
      <v-row justify="center">
        <v-col>
          <v-autocomplete v-model="this.textbox" :items="this.histories" item-text="body" placeholder="表示したい文字列を入力" filled @click:clear="textBoxReset" clear-icon="mdi-close-circle" @click:append-outer="sendDisplayRequest" append-outer-icon="mdi-send" :search-input.sync="search" clearable solo hide-details hide-no-data>
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
                <span class="subheading">Loop</span>
              </v-toolbar-title>
              <v-row align="center" class="mx-0">
                <v-switch v-model="loopFlag"></v-switch>
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
    textbox: '',
    speed: '',
    types: ['hex', 'rgb', 'hsl', 'hsv'],
    type: 'hex',
    rgb: { r: 0, g: 0, b: 255 },
    search: '',
    loogFlag: false,
    status: ''
  }),
  methods: {
    sendDisplayRequest: function () {
      let textbox = this.search
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
    await this.axios.get('/api/get/status')
      .then(res => {
        console.log(res.data)
        this.status = res.data
        console.log('すぴ' + this.status.speed)
        this.speed = 100 - this.status.speed
        this.rgb = this.status.colors
      })
    this.$watch('speed', function () {
      this.axios.post('/api/update/speed', {
        speed: this.speed
      })
        .then((res) => console.log('Done' + res.data))
        .catch((e) => alert(e))
    })
    this.$watch('rgb', function () {
      this.axios.post('/api/update/colors', {
        colors: this.rgb
      })
        .then((res) => console.log('DoneColor: ' + res.data))
        .catch((e) => alert(e))
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
