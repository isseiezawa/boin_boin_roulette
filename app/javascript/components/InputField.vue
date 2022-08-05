<template>
  <div
    id="input-free-words"
    class="container setting-box pt-2 pb-2"
  >
    <label for="input-words">入力欄</label>
    <div class="description text-muted">
      文字を入力してスペースで区切ってください
    </div>
    <textarea
      id="input-words"
      name="input-words"
      class="form-control mb-3"
      rows="5"
      placeholder="(例)あ い う え お"
      :value="freeWords.join(' ')"
      @input="changeWords($event.target.value)"
      @change="saveWords"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('users', ['authUser']),
    ...mapGetters('freeChoiceWords', ['freeWords'])
  },
  created() {
    if(this.authUser)this.fetchWords()
  },
  methods: {
    ...mapActions('freeChoiceWords', [
      'fetchWords',
      'changeWords'
      ]
    ),
    saveWords() {
      if(this.authUser) {
        this.$axios.patch('settings', {
        word: this.freeWords
        })
        .catch(err => {
        console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped>
.setting-box {
  width: 50%;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 2%;
  box-shadow: -20px -10px 50px 5px rgb(3, 150, 155) inset;
}
.description{
  font-size: 1px;
}
</style>