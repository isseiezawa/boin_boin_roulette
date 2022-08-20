import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend
} from 'vee-validate'
import {
  email,
  required
} from 'vee-validate/dist/rules'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

extend('email', {
  ...email,
  message: '{_field_}の形式で入力してください'
});

extend('required', {
  ...required,
  message: '{_field_}は必須項目です'
});

extend('min', {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ['length'],
  message: '{_field_}は{length}文字以上で入力してください'
});

extend('max', {
  validate(value, { length }) {
    return value.length <= length;
  },
  params: ['length'],
  message: '{_field_}は{length}文字以下で入力してください'
});

extend('password_confirmed', {
  validate(value, { target }) {
    return value == target;
  },
  params: ['target'],
  message: 'パスワードと一致しません'
})

extend("gif_image", {
  validate(value) {
    let fileName = value[0].name
    return fileName.toUpperCase().match(/\.(GIF)$/i)
  },
  message: 'この画像はGIF画像ではありません'
})