
import idCreate from "@/lib/idCreate"
const localStorageKeyName = "tagList"
type tag = {
  id: string
  name:string
}
type tagListName = {
  data:tag[]
  fetch: () => tag[]
  create: (name: string) => "success" | "duplicated"
  save: () => void
  update: (id: string, name: string) => "success" | "no found" 
  remove:(id: string)=>boolean
}
const modelTags :tagListName = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") 
    return this.data 
  },
  create(name) { 
    const names= this.data.map(item=>item.name)
    if (names.indexOf(name) >= 0) {
      return  "duplicated"
    }
    const id =idCreate().toString()
    this.data.push({ id, name: name })
    console.log("create",this.data);
    
    this.save()
    return "success"
  },
  update(id:string,name:string ) {
    const idList = this.data.map(t => t.id)

    if (idList.indexOf(id)>=0) { 
        const tag = this.data.filter(t => id === t.id)[0]
        tag.name = name
      this.save()
        return "success"
      
    }  
     return "no found"
  },
  remove(id) {
    let index=-1
    for (let i = 0; i <= this.data.length;i++) { 
      if (this.data[i].id === id) {
        index = 1
        break
       }
    }
    this.data.splice(index, 1) 
    this.save()
   return true
   },
  save() { 
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
  }

export default modelTags

