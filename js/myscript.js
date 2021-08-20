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