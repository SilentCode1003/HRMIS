function returnText(){
    let input = document.getElementById("attuserInput").value;
    alert(input)
}
let input = localStorage.getItem('attinput')

function returnText() {
  input = document.getElementById("attuserInput").value
  localStorage.setItem('attinput', input)
  alert(input)
}

console.log(input)