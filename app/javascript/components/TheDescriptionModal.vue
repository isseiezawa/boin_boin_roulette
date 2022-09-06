<template>
  <div
    class="backdrop"
    @click.self="$emit('close-description-modal')"
  >
    <div class="popup overflow-auto shadow-lg rounded-3">
      <div class="container-fluid  text-center">
        <div class="h1">
          <b>使い方</b>
        </div><hr>
        <div class="popup-body lh-lg">
          <div class="description-box">
            <div class="h4 text-dark">
              ~ボインボインルーレット~
            </div>
            <word-box :selected-words="['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ']" />
            ピックアップする文字の数を決めます<br>
            ルーレットを回します<br>
            すべての文字が母音になると<br>
            <b class="rainbow">MAX母音</b><br>
            になり、いい感じの<b class="rainbow">演出</b>が出ます。<br>
            <b>ログイン</b>していれば選ばれた文字が保存されます。
          </div>
          <div class="description-box">
            <div class="h4 text-dark">
              ~フリールーレット~
            </div>
            <word-box :selected-words="['！', 'フ', 'リ', 'ー', 'ル', 'ー', 'レ', 'ッ', 'ト', '！']" />
            入力欄に文字を入れます<br>
            選びたい文字の間にスペースを入れます<br>
            <i>(例)林檎 蜜柑 苺 檸檬</i><br>
            ルーレットを回します<br>
            <b>ログイン</b>していれば、入力欄の状態が保存されます。
          </div>
          <div class="description-box">
            <div class="h4 text-dark">
              ~集めた言葉~
            </div>
            ルーレットで選ばれた文字が一覧で表示されます。<br>
            再生ボタン<font-awesome-icon :icon="['fas', 'circle-play']" />を押すと読み上げられます。
          </div>
          <div class="description-box">
            <div class="h4 text-dark">
              ~読み上げ機能&音声~
            </div>
            ルーレットで選ばれた文字を読み上げます。<br>
            読み上げる声は日本語対応していない方がいらっしゃいます。<br>
            <b>ログイン</b>していれば読み上げ設定を保存できます。
            <div class="text-muted small">
              ※iPhone/iPad/Androidではページを読み込むたび、音声の再生を許可していただく必要がある為<br>
              <button class="btn btn-neumorphism">
                読み上げ
              </button>
              <div class="shadow rounded-pill w-50 mx-auto">
                <div class="text-dark pt-1 mt-2">
                  演出時音声
                </div>
                <div class="float-none form-check form-switch">
                  <input
                    class="float-none form-check-input"
                    type="checkbox"
                  >
                </div>
              </div>
              を押下してください。
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="$emit('close-description-modal')"
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import WordBox from './WordBox.vue'

export default {
  components: {
    WordBox
  }
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.popup {
  position: fixed;
  inset: 0;
  background-color: azure;
  margin: 1rem;
  padding: 1rem;
}
.h4 {
  margin-bottom: 0.5rem;
}
.description-box {
  padding: 0.5em 1em;
  margin: 2em 0;
  color: #5989cf;
  background: #c6e4ff;
  border-bottom: solid 6px #aac5de;
  border-radius: 9px;
}
.rainbow {
	background: linear-gradient(to right, orange , rgb(223, 223, 0), rgb(0, 211, 0), cyan, blue, violet);
	background: -webkit-linear-gradient(left, orange , rgb(223, 223, 0), rgb(0, 211, 0), cyan, blue, violet);
	background: -o-linear-gradient(right, orange , rgb(223, 223, 0), rgb(0, 211, 0), cyan, blue, violet);
	background: -moz-linear-gradient(right, orange , rgb(223, 223, 0), rgb(0, 211, 0), cyan, blue, violet);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
  display: inline-block;
}
.btn-neumorphism {
  border-radius: 20%;
  background: #EBECF0;
  box-shadow:  2px 2px 10px #c8c9cc, 
              -2px -2px 10px #ffffff;
}
</style>