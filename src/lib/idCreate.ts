let id: number = parseInt(window.localStorage.getItem("_idMax") || "0") 

const idCreate = () => { 
  id += 1
window.localStorage.setItem("_idMax", JSON.stringify(id))
  return id
}
export default idCreate