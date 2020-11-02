<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <article class="tile is-child notification is-light">
          <Unit description="RSS"/>
          <div class="tile is-child notification is-info is-light">
            <p class="is-5">RSSから情報を取得する </p>
            <div class="level">
              <div class="level-left"></div>
              <div class="levle-right">
                <div class="level-item">
                  <input type="button" class="button is-small" v-on:click="rssSourceShow" value="Add">
                  <modal name="rsssource-panel" height="auto">
                    <div class="modal-body">
                      <div class="section">
                        <h3 class="title">Add RSS Source</h3>
                        <input type="text" class="input" name='name' v-model="name" placeholder="Enter URL">
                        <input type="text" class="input" name='url' v-model="url" placeholder="Enter URL">
                        <div class="level">
                          <div class="level-left"></div>
                          <div class="level-right">
                            <input type="button" class="button is-small" name="add-url" v-on:click="registerNewFeed" value="Add">
                          </div>
                        </div>
                      </div>
                    </div>
                  </modal>
                </div>
              </div>
            </div>
            <div class="select">
              <select name="rss-source" id="" v-model="selected">
                <option v-for="feed in this.feeds" v-bind:key = feed.id v-bind:value="feed.name">{{feed.name}}</option>
              </select>
            </div>
            <nav class="level">
              <div class="level-left"></div>
              <div class="level-right">
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
let feeds
export default {
  name: 'Text',
  components: {
    Unit
  },
  data: () => ({
    feeds: feeds,
    name: '',
    url: ''
  }),
  methods: {
    rssSourceShow: function () {
      this.$modal.show('rsssource-panel')
    },
    rssSourceClose: function () {
      this.$modal.hide('rsssource-panel')
    },
    registerNewFeed: function () {
      let name = this.name
      let url = this.url
      this.axios.post('/api/add/feed', {
        name: name,
        url: url
      })
        .then((res) => alert('登録完了: ' + name))
        .catch((e) => alert(e))
    },
    sendDisplayRequest: function () {
      let selected = this.selected
      // alert(selected)
      this.axios.post('/api/show/news', {
        name: selected
      })
        .then((res) => alert('ニュース配信開始: ' + selected))
        .catch((e) => alert(e))
    }
  },
  created () {
    this.axios.get('/api/feed')
      .then((res) => {
        feeds = res.data
        feeds = feeds.feeds
        console.log(feeds)
      })
  }
}
</script>
