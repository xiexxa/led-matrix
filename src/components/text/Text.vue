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
              <div class="tag" v-for="his in this.histories" v-bind:key = his.id v-on:click="historyChoose" ref="hist">{{his.body}}</div>
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
let histories
export default {
  name: 'Text',
  components: {
    Unit
  },
  data: () => ({
    histories: histories,
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8
    ]
  }),
  methods: {
    sendDisplayRequest: function () {
      let textbox = this.textbox
      this.axios.post('/api', {
        text: textbox
      })
        .then((res) => alert(res.data))
        .catch((e) => alert(e))
    },
    textBoxReset: function () {
      this.textbox = ''
    },
    historyChoose: function () {
      console.log(this.$refs.hist)
    }
  },
  created () {
    console.log('history post request error')
    this.axios.get('/api/history')
      .then((res) => {
        histories = res.data
        histories = histories.histories
        console.log(histories)
      })
  }
}
</script>
