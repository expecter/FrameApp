// 扩展 Vue 得到一个可复用的构造函数
Vue.component('my-component', {
  template: '<p>111A custom component!</p>'
})
var MyComponent = Vue.extend({
  template: '<p>A custom component!</p>'
})