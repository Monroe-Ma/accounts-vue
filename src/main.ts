import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import modelTags from './models/modelTags';
import recordListModel from './models/recordListModel'
Vue.config.productionTip = false
Vue.component("Nav", Nav)
Vue.component("Layout", Layout)
Vue.component("Icon", Icon)
//record store
window.recordList = recordListModel.fetch();
window.createRecord = (record:RecordItem) =>  recordListModel.create(record);

//tag store
window.tagList = modelTags.fetch()
window.createTag=(name:string)=> {
      const message = modelTags.create(name);
      if (message === "duplicated") {
        window.alert("标签重复了");
      } else if (message === "success") {
        window.alert("添加标签成功");
      }
}
window.findTag = (id:string ) => {
   return  window.tagList.filter((t) => t.id === id)[0];
 }
window.removeTag = (id:string) => { 
 return modelTags.remove(id)
}
window.updateTag = (id:string,name:string) => { 
 return modelTags.update(id, name);
}
new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')
