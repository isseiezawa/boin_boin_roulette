<template>
  <div id="word-box">
    <ul>
      <li
        v-for="(selectedWord, index) in selectedWords"
        :key="index"
        :class="pickedUpNumbers.includes(index) ? 'selected-word' : '' "
      >
        <span class="perfect-circle">
          <span class="circle">{{ selectedWord }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    selectedWords: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('randomPickedUp', ['pickedUpNumbers'])
  }
};
</script>

<style scoped>
ul {
  /* flexboxで等間隔に並べる*/
  display: flex;
  flex-wrap: wrap;

  text-align: center;
  padding: 0;
  margin: 10px;
}

li {
  /* 枠線をつけて1列に5つ並べる */
  border-radius: 100%;
  width: 10%;
  /* 正方形にするのに必要な部分 */
  height: auto;
  position: relative;
  list-style: none;
  font-size: 40%;
  background: radial-gradient(#ffffff, #f7b072);
}
li:before {
  content: "";
  display: block;
  padding-top: 100%; /* ここを100％にすることで正方形になる */
}
li span.perfect-circle {
  /* 正方形にするのに必要な部分 */
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 中央寄せ */
  text-align: center;
  padding: 2px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}
/* 高さの中央揃えに必要な部分 */
li span.perfect-circle:before {
  content: "";
  height: 100%;
  vertical-align: middle;
  width: 0px;
  display: inline-block;
}
.circle {
  border: solid 3px rgb(249, 206, 213);
  border-radius: 100%;
  background-color: rgb(237, 127, 145);
}
.selected-word {
  background: radial-gradient(#fea0a0, #ff0000);
}
</style>