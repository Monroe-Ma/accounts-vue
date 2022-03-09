
import idCreate from "@/lib/idCreate"
const localStorageKeyName = "tagList"
const tagStore= {
  tagList: [] as Tag[],
  fetchTag() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") 
    return this.tagList 
  },
  createTag(name: string){
     const names= this.tagList.map(item=>item.name)
    if (names.indexOf(name) >= 0) {
       window.alert("标签重复了");
      return  "duplicated"
    }
    const id =idCreate().toString()
    // this.tagList.push({ id, name: name })
    this.saveTag()
    window.alert("添加标签成功");
    return "success"
  },
  
findTag(id:string ){
   return this.tagList.filter((t) => t.id === id)[0];
  },
 
removeTag (id: string){ 
      let index=-1
    for (let i = 0; i <= this.tagList.length;i++) { 
      if (this.tagList[i].id === id) {
        index = 1
        break
       }
    }
    this.tagList.splice(index, 1) 
    this.saveTag()
   return true
   },


updateTag (id:string,name:string) { 
     const idList = this.tagList.map(t => t.id)
    if (idList.indexOf(id)>=0) { 
        const tag = this.tagList.filter(t => id === t.id)[0]
        tag.name = name
      this.saveTag()
        return "success"
    }  
     return "no found"
},
  saveTag() { 
   window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
}
}
tagStore.fetchTag()
export default tagStore