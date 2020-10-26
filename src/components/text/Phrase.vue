<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <article class="tile is-child notification is-light">
          <Unit description="定型文から選択して表示します。"/>
          <div class="tile is-child notification is-info is-light">
            <p class="is-5">定型文から選択する</p>
            <div class="level">
              <div class="level-left"></div>
              <div class="levle-right">
                <div class="level-item">
                  <input type="button" class="button is-small" value="Add">
                </div>
              </div>
            </div>
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Phrase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Hello</th>
                </tr>
              </tbody>
            </table>
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
  }
}
</script>
