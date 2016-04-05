import Vue from 'vue'
import App from './App.vue'
var stats = [
  { label: 'A', value: 100 },
  { label: 'B', value: 100 },
  { label: 'C', value: 100 },
  { label: 'D', value: 100 },
  { label: 'E', value: 100 },
  { label: 'F', value: 100 }
]
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  data: {stats: stats}
})
