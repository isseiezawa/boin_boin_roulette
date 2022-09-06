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
    <div class="container-fluid pt-2 pb-2 mt-3 mb-3 shadow rounded position-relative">
      <div class="box">
        <word-box :selected-words="selectedWords" />
      </div>
      <div class="mx-auto text-center">
        <transition name="fade">
          <div
            v-if="pickedUpWords"
            class="stylish-box"
          >
            <div
              class="h3"
              :class="fontRainbow ? 'rainbow fw-bold fs-1' : ''"
            >
              <span
                v-if="fontRainbow"
                class="rainbow-flash rainbow fs-4"
              >MAXボイン</span>
              <span>{{ freeMode ? pickedUpWords.join(" ") : pickedUpWords.join("") }}</span>
              <span
                v-if="fontRainbow"
                class="rainbow-flash rainbow fs-4"
              >ボインMAX</span>
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
          @input="$emit('input', $event)"
        />
        <button
          class="btn btn-pink-moon"
          :disabled="disabledButton || !selectTheNumberOfPickups.length"
          @click="startOrStop ? startLoop(100) : slowLoop()"
        >
          {{ startOrStopButton }}
        </button>
        <transition name="fade">
          <div
            v-if="pickedUpWords"
            class="mt-2"
          >
            <div v-if="isSmartPhone">
              <span class="small text-danger text-decoration-underline fst-italic">※iPhone/iPad/Androidの場合一度読み上げボタンを押すと読み上げるようになります。</span>
            </div>
            <button
              :disabled="!startOrStop"
              class="btn btn-neumorphism"
              @click="getVoice()"
            >
              読み上げ
            </button>
          </div>
        </transition>
        <transition name="fade">
          <video-modal
            v-if="!freeMode && videoModal"
            :boin-status="boinStatus"
            @close-modal="handleCloseModal"
            @push-allow="checkAllow = $event"
          />
        </transition>
      </div>
      <div
        v-if="!freeMode && isSmartPhone"
        class="position-absolute bottom-0 end-0"
      >
        <div class="small arrow-box shadow">
          演出時音声
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input sound-check"
            type="checkbox"
            :disabled="checkAllow && audioInstance != ''"
            :checked="checkAllow"
            @change.once="newAudioInstance"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WordBox from "./WordBox.vue";
import SelectTheNumberOfPickupsBox from "../components/selectTheNumberOfPickupsBox.vue";
import VideoModal from "../components/VideoModal.vue"
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    WordBox,
    SelectTheNumberOfPickupsBox,
    VideoModal
  },
  props: {
    selectedWords: {
      type: Array,
      required: true
    },
    freeMode: {
      type: Boolean,
      required: true
    },
    selectTheNumberOfPickups: {
      type: Array,
      required: true
    },
    selectedPickupNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      intervId: null,
      startOrStop: true,
      disabledButton: false,
      videoModal: false,
      boinStatus: null,
      checkAllow: false,
      fontRainbow: false
    };
  },
  computed: {
    ...mapGetters("users", ["authUser"]),
    ...mapGetters("randomPickedUp", ["pickedUpWords"]),
    ...mapGetters("performance", ["audioInstance"]),
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
      if(navigator.userAgent.toLowerCase().match(/iphone|ipad|android|macintosh/) && 'ontouchend' in document) {
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
    ...mapActions("performance", ["createAudioInstance"]),
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
        this.fontRainbow = false;
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
      await this.boinStatusJudge();
      try {
        if(!this.freeMode && this.authUser) await this.handleSaveWord(this.boinStatus);
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
    },
    handleCloseModal() {
      this.videoModal = false
      this.boinStatus = null
    },
    boinStatusJudge() {      
      const vowelOrConsonant = this.vowelOrConsonantJudgement.join("")
      if (vowelOrConsonant == "母音母音") {
        this.videoModal = true
        this.fontRainbow = true
        this.boinStatus = 0
      } else if (vowelOrConsonant == "母音母音母音") {
        this.videoModal = true
        this.fontRainbow = true
        this.boinStatus = 1
      } else if (vowelOrConsonant == "母音母音母音母音") {
        this.videoModal = true
        this.fontRainbow = true
        this.boinStatus = 2
      } else if (vowelOrConsonant == "母音母音母音母音母音") {
        this.videoModal = true
        this.fontRainbow = true
        this.boinStatus = 3
      } else if (vowelOrConsonant == "母音母音母音母音母音母音") {
        this.videoModal = true
        this.fontRainbow = true
        this.boinStatus = 4
      } else {
        this.boinStatus = null
      }
    },
    newAudioInstance() {
      this.checkAllow = true
      this.createAudioInstance()
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
.rainbow-flash{
  animation: flash 0.3s linear infinite;
}
@keyframes flash {
  0%,100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
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
.sound-check {
  width: 10vh !important;
}
.arrow-box {
	position: relative;
	background: #93e8f5;
  border-radius: 20%;
  margin-left: .5rem;
  margin-right: .5rem;
}
.arrow-box:after, .arrow-box:before {
	top: 100%;
	left: 50%;
	border: solid transparent;
	content: "";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}
.arrow-box:after {
	border-color: rgba(100, 198, 213, 0);
	border-top-color: #93e8f5;
	border-width: 3px;
	margin-left: -3px;
}
.arrow-box:before {
	border-color: rgba(137, 245, 227, 0);
	border-top-color: #93e8f5;
	border-width: 3px;
	margin-left: -3px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>