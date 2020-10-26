<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <article class="tile is-child notification is-light">
          <Unit description="テキストを表示します。"/>
          <div class="tile is-child notification is-info is-light">
            <p class="is-5">表示する文字を入力</p>
            <input type="text" class="input" name="textbox">
            <p class="is-7">history</p>
            <span class="tag">Hello</span>
            <span class="tag">Hello</span>
            <span class="tag">Hello</span>
            <nav class="level">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <p class="button is-small is-7">reset</p>
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
export default {
  name: 'Text',
  components: {
    Unit
  },
  methods: {
    sendDisplayRequest: function () {
      this.axios.get('/api')
        .then((res) => alert(res.data))
        .catch((e) => alert(e))
    }
  }
}
</script>
