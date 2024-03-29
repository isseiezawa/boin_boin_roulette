import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlay, faUser, faAt, faKey, faAnglesLeft, faAnglesRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCirclePlay, faUser, faAt, faKey, faTwitter, faAnglesLeft, faAnglesRight, faCircleQuestion)

Vue.component('font-awesome-icon', FontAwesomeIcon)