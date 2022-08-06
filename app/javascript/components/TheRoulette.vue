<template>
  <div id="the-roulette">
    <div class="mt-4">
      <div class="font-gold">
        ボインボインルーレット
      </div>
      <template>
        <slot name="sub-title" />
      </template>
    </div>
    <div class="container-fluid pt-2 pb-2 mt-3 mb-3 shadow rounded">
      <div class="box">
        <word-box :selected-words="selectedWords" />
      </div>
      <div class="mx-auto text-center">
        <transition name="fade">
          <div
            v-if="pickedUpWords"
            class="stylish-box"
          >
            <div class="h3">
              {{ freeMode ? pickedUpWords.join(" ") : pickedUpWords.join("") }}
            </div>
            <div
              v-if="!freeMode"
              class="judge-box"
            >
              <span
                v-for="(vowelOrConsonant, index) in vowelOrConsonantJudgement"
                :key="index"
                :style="
                  vowelOrConsonant == '母音' ? 'color: red;' : 'font-size: 10px'
                "
              >{{ vowelOrConsonant }}</span>
            </div>
          </div>
        </transition>
        <select-the-number-of-pickups-box
          :select-the-number-of-pickups="selectTheNumberOfPickups"
          :selected-pickup-number="selectedPickupNumber"
          @input="selectedPickupNumber = $event"
        />
        <button
          class="btn btn-pink-moon"
          :disabled="disabledButton"
          @click="startOrStop ? startLoop(100) : slowLoop()"
        >
          {{ startOrStopButton }}
        </button>
        <transition name="fade">
          <div
            v-if="pickedUpWords"
            class="mt-2"
          >
            <p v-if=" isSmartPhone">
              <span class="text-danger text-decoration-underline fst-italic">※スマートフォンの場合、一度読み上げボタンを押すと読み上げるようになります。</span>
            </p>
            <button
              :disabled="!startOrStop"
              class="btn btn-neumorphism"
              @click="getVoice()"
            >
              読み上げ
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import WordBox from "./WordBox.vue";
import SelectTheNumberOfPickupsBox from "../components/selectTheNumberOfPickupsBox.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    WordBox,
    SelectTheNumberOfPickupsBox,
  },
  props: {
    selectedWords: {
      type: Array,
      required: true
    },
    freeMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      intervId: null,
      startOrStop: true,
      disabledButton: false,
      selectedPickupNumber: 2,
      selectTheNumberOfPickups: [
        { text: "2個", value: 2 },
        { text: "3個", value: 3 },
        { text: "4個", value: 4 },
        { text: "5個", value: 5 },
        { text: "6個", value: 6 },
      ],
    };
  },
  computed: {
    ...mapGetters("users", ["authUser"]),
    ...mapGetters("randomPickedUp", ["pickedUpWords"]),
    ...mapGetters("voiceSetting", [
      "selectVoice",
      "volumeLevel",
      "speedSetting",
      "pitchSetting",
    ]),
    startOrStopButton() {
      return this.startOrStop ? "スタート" : "ストップ";
    },
    vowelOrConsonantJudgement() {
      const vowels = "あいうえおゐゑ";
      var judgementResult = [];
      for (var i = 0; i < this.pickedUpWords.length; i++) {
        if (vowels.includes(this.pickedUpWords[i])) {
          judgementResult.push("母音");
        } else {
          judgementResult.push("子音");
        }
      }
      return judgementResult;
    },
    isSmartPhone() {
      if(navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    speechSynthesis.getVoices();
  },
  methods: {
    ...mapActions("randomPickedUp", [
      "randomPickedUpNumbers",
      "saveWord"
      ]),
    ...mapActions("voiceSetting", ["setVoiceList"]),
    ...mapActions("bgm", [
      "playBgm",
      "slowBgm",
      "stopBgm"
    ]),
    startLoop(time) {
      if (!this.intervId) {
        this.intervId = setInterval(
          this.randomPickedUpNumbers,
          time,
          { 
            selectedWords: this.selectedWords,
            selectedPickupNumber: this.selectedPickupNumber
          }
        );
        this.startOrStop = false;
        this.playBgm()
      }
    },
    slowLoop() {
      this.disabledButton = true
      clearInterval(this.intervId);
      this.intervId = null;
      this.startLoop(500);
      this.slowBgm();
      setTimeout(this.stopLoop, 3.0 * 1000);
    },
    async stopLoop() {
      clearInterval(this.intervId);
      this.intervId = null;
      this.startOrStop = true;
      this.stopBgm();
      this.getVoice();
      try {
        if(!this.freeMode && this.authUser) await this.handleSaveWord(this.pickedUpWords);
        this.disabledButton = false
      } catch (error) {
        console.log(error)
      }
    },
    getVoice() {
      const speechOption = new SpeechSynthesisUtterance();
      const voice = speechSynthesis.getVoices();
      this.setVoiceList(voice);
      speechOption.voice = voice[this.selectVoice];
      speechOption.volume = this.volumeLevel;
      speechOption.rate = this.speedSetting;
      speechOption.pitch = this.pitchSetting;
      speechOption.text = this.pickedUpWords.join("");
      speechSynthesis.cancel();
      speechSynthesis.speak(speechOption);
    },
    async handleSaveWord(word) {
      try {
        await this.saveWord(word)
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style scoped>
.font-gold {
	font-size: 8vw;
	text-align: center;
	line-height: 0.95em;
	font-weight: bold;
	color: transparent;
	background: repeating-linear-gradient(0deg, #B67B03 0.1em, #DAAF08 0.2em, #FEE9A0 0.3em, #DAAF08 0.4em, #B67B03 0.5em); 
	background-clip: text;
  -webkit-background-clip: text;
}
.container-fluid {
  background: radial-gradient(#ffffff, #fde9ff);
}
.stylish-box {
  padding-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
  background-color: #f0f0f3;
  display: block;
  box-shadow: 1.5px 1.5px 2px rgba(174, 174, 192, 0.4), -1px -1px 3px #fff;
}
.judge-box {
  height: 2rem;
}
.btn-pink-moon {
  background: #ff8ad0;
  background: -webkit-linear-gradient(to top, #fc7a7a, #fc81cb);
  background: linear-gradient(to top, #fc7a7a, #fc81cb);
  color: #fff;
  border: 3px solid #eee;
  border-radius: 15px;
}
.btn-pink-moon:active {
  color: #ff0000;
}
.btn-neumorphism {
  border-radius: 20%;
  background: #EBECF0;
  box-shadow:  2px 2px 10px #c8c9cc, 
              -2px -2px 10px #ffffff;
  transition: 0.3s;
}
.btn-neumorphism:hover {
  color: #ff0000;
}
.btn-neumorphism:active {
  border-radius: 20%;
  background: #EBECF0;
  box-shadow: inset 5px 5px 20px #c8c9cc, 
              inset -5px -5px 20px #ffffff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>