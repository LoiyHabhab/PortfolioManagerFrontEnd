let n = 1
const LOGGED_IN = true

const fn = (x, y) => { return x + y }

n = fn(4, 2)

const myCallback = () => {
    myContent.innerHTML = `${n} ${LOGGED_IN}`
    console.log(`Event originated here:${event.target.id}`)
}

const handleCookieButton = () => {
    // cookieAgree.setAttribute('style', 'display:none')
    cookieAgree.remove()
}

const callRemoteAPI = () => {
    // prevent the form from submitting!!
    event.preventDefault()

    // grab the form field values
    let category = txtCategory.value
    let id = txtID.value

    // assemble a URL for the remote API
    let apiUrl = `https://swapi.dev/api/${category}/${id}`
    let name = ''
    let results = {}
    // make a 'fetch' call to the API
    fetch(apiUrl)
        // .then.then
        .then(response => response.json())
        .then(data => {
            console.log(data)
            results = data
            name = data.name
            apiResults.setAttribute('style', 'display:block')
            returnedName.innerHTML = name
            resultsView.innerHTML = JSON.stringify(results)
        })
}

const toggleViews = (e)=>{
    htmlView.setAttribute('style', 'display:none')
    cssView.setAttribute('style', 'display:none')
    esView.setAttribute('style', 'display:none')
    formsView.setAttribute('style', 'display:none')
    chartView.setAttribute('style', 'display:none')
    if(e){
        let whichSection = e.target.id
        switch(whichSection){
            case 'btnShowHTML': {
                htmlView.setAttribute('style', 'display:block')
                break
            }
            case 'btnShowCSS': {
                cssView.setAttribute('style', 'display:block')
                break

            }
            case 'btnShowES': {
                esView.setAttribute('style', 'display:block')
                break

            }
            case 'btnShowForms': {
                formsView.setAttribute('style', 'display:block')
                break

            }
            case 'btnShowChart': {
                chartView.setAttribute('style', 'display:block')
                break

            }
        } 
        // document.getElementById(e?.target.id).setAttribute('style', 'display:block')
        console.log(e?.target.id)
    }
}

btnGo.addEventListener('click', myCallback)
btnCookies.addEventListener('click', handleCookieButton)
btnSubmitForm.addEventListener('click', callRemoteAPI)

btnShowHTML.addEventListener('click', toggleViews)
btnShowCSS.addEventListener('click', toggleViews)
btnShowES.addEventListener('click', toggleViews)
btnShowForms.addEventListener('click', toggleViews)
btnShowChart.addEventListener('click', toggleViews)

toggleViews()