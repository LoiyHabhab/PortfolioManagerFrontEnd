// simple model values
let n = 1
let complicated = {id:3, address:'here', array:[4,3,2], signed_in:false}

const fn = (x, y,)=>{return x+y}

n = fn(4,2)
console.log(n, complicated)
// here we inject new content into the web page
// we use back-ticks for string interpolation
let some_text = `Address: ${complicated.address} ${complicated.array[2]}`
content.innerHTML = some_text
// add an event listener to the button
const handleButton = ()=>{console.log('clicked!')}
btnDoStuff.addEventListener('click', handleButton)

// fetching data from an API end point
const getData = ()=>{}

btnGetAPI.addEventListener('click', getData)