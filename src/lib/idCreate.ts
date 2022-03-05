let id :number =parseInt(window.localStorage.getItem("idMax")||"0") || 0
export default function idCreate () { 
  id++
  return id
}