import modelTags from "@/models/modelTags";
import recordListModel from "@/models/recordListModel";

const store={
//record store
recordList:recordListModel.fetch(),
createRecord:(record:RecordItem) =>  recordListModel.create(record),

//tag store
tagList:modelTags.fetch(),
createTag:(name:string)=> {
      const message = modelTags.create(name);
      if (message === "duplicated") {
        window.alert("标签重复了");
      } else if (message === "success") {
        window.alert("添加标签成功");
      }
},
findTag(id:string ){
   return this.tagList.filter((t) => t.id === id)[0];
 },
removeTag : (id:string) => { 
 return modelTags.remove(id)
},
updateTag : (id:string,name:string) => { 
 return modelTags.update(id, name);
}
}
 export default store