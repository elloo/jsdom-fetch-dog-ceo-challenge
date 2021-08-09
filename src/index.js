window.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(res => res.json())
        .then(json => {
            const imgContainer = document.getElementById("dog-image-container")
            const imgArray = json.message
            imgArray.forEach(url => {
                const imgTag = document.createElement("img")
                const imgSrc = document.createAttribute("src")
                imgSrc.value = url
                imgTag.setAttributeNode(imgSrc)
                imgContainer.appendChild(imgTag)
            })
        })

    function displayBreeds(object) {
        Object.keys(object).forEach(breed => {
            const breedLi = document.createElement("li")
            const breedText = document.createTextNode(breed)
            breedLi.appendChild(breedText)
            breedUl.appendChild(breedLi)
        })
    }

    function displaySubBreeds(object) {
        let subBreedPosition = 1
        Object.values(object).forEach(subBreedArray => {
            if (subBreedArray.length >= 1){
                subBreedArray.forEach(subBreed => {
                    const breedPosition = document.querySelector(`#dog-breeds li:nth-child(${subBreedPosition})`)
                    const subBreedUl = document.createElement("ul")
                    const subBreedLi = document.createElement("li")
                    const subBreedText = document.createTextNode(subBreed)
                    subBreedLi.appendChild(subBreedText)
                    subBreedUl.appendChild(subBreedLi)
                    breedPosition.appendChild(subBreedUl)
                })
            }
            subBreedPosition++
        })
    }

    function display(object){
        displayBreeds(object)
        displaySubBreeds(object)
    }

    const breedUl = document.getElementById("dog-breeds")
    let breedObj 
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(res => res.json())
        .then(json => {breedObj = json.message, display(breedObj)})

    breedUl.addEventListener("click", event => event.target.setAttribute("style", "color: steelblue"))

    filterDrop = document.getElementById("breed-dropdown")
    filterDrop.addEventListener("change", e => {
        breedUl.innerHTML = ""
        const filteredBreeds = Object.keys(breedObj)
            .filter(breed => breed[0] === e.target.value)
            .reduce((obj, breed) => {
                obj[breed] = breedObj[breed]
                return obj
            }, {})
        display(filteredBreeds)
    })
})
