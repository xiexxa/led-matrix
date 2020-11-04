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
              <div v-show="loading">Loading...</div>
              <div v-show="!loading">Done</div>
              <div v-for="item in todos" v-bind:key="item.id">{{items}}</div>
              <div v-bind:class="[{tag: isHover!=his.id}, {'tag is-info': isHover==his.id}]" v-for="his in this.histories" v-bind:key = his.id v-on:click="historyChoose(his.body)" v-on:mouseover="overHistory(his.id)" v-on:mouseleave="leaveHistory(his.id)">{{his.body | truncate}}</div>
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

<script>
import Unit from './Unit'
// let histories
export default {
  name: 'Text',
  components: {
    Unit
  },
  data: () => ({
    histories: [],
    loading: true,
    textbox: '',
    isHover: -1,
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8
    ]
  }),
  methods: {
    sendDisplayRequest: function () {
      let textbox = this.textbox
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
    getHistories: function () {
      // this.todos = 'ssssssss'
      /*
      try {
        let histories = await this.axios.get('/api/get/history')
        console.log('histories')
        histories = histories.data.histories
        console.log(histories)
      } catch (error) {
        console.log('error')
      }
      */
    },
    sleep: async function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  async mounted () {
    console.log('mounted')
    await this.axios.get('/api/get/history')
      .then(res => {
        console.log(res.data)
        console.log(res.status)
        this.histories = res.data.histories
      })
    // await this.sleep(3000)
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
  }
}
</script>
