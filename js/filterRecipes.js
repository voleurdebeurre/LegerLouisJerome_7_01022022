function searchRecipe(event) {
    event.preventDefault()
    let searchedValue = document.querySelector("#search-recipe").value.toLowerCase()
    console.log(searchedValue)
    if(searchedValue.length < 3) {

    }
    else{
        let foundItems = [] 
        for(let i = 0; i < recipes.length; i++){
            let getRecipeName = recipes[i].name.toLowerCase()
            let getRecipeAppliance = recipes[i].appliance.toLowerCase()
            // let getRecipeUtensils = recipes[i].ustensils.toLowerCase()
            
            if(getRecipeName.includes(searchedValue) || getRecipeAppliance.includes(searchedValue)){
                foundItems.push(recipes[i])
            }else{
                // console.log("pas trouvé")
            }
        }
        showHideResultItem(foundItems)
    }
}

function showHideResultItem(foundItems){
    document.querySelectorAll("article").forEach(recipe => recipe.classList.add("recipe-hidden"))
    foundItems.forEach((foundItem) =>{
        document.querySelector("article[data-id='" + foundItem.id + "']").classList.remove("recipe-hidden")
    })
}

function openClickedFilter(filter){
    if(filter.parentElement.nextElementSibling.classList.contains("expanded")){
        filter.parentElement.nextElementSibling.classList.remove("expanded")
    }else{
        filter.parentElement.nextElementSibling.classList.add("expanded")
    }
}

function filterSuggestions(event){
    event.preventDefault()
    if(event.target.id == "search-ingredients"){
        let inputValue = document.querySelector("#search-ingredients").value.toLowerCase()
        let ingredientsFilterContainer = document.querySelector(".searchfilter-contents.ingredients")
        ingredientsFilterContainer.classList.add("expanded")
        let targetFilterArray = document.querySelectorAll("[data-type='ingredients']")
        searchInFilters(targetFilterArray, inputValue)
    }else if(event.target.id == "search-devices"){
        let inputValue = document.querySelector("#search-devices").value.toLowerCase()
        let devicesFilterContainer = document.querySelector(".searchfilter-contents.devices")
        devicesFilterContainer.classList.add("expanded")
        let targetFilterArray = document.querySelectorAll("[data-type='devices']")
        searchInFilters(targetFilterArray, inputValue)
    }else if(event.target.id == "search-utensils"){
        let inputValue = document.querySelector("#search-utensils").value.toLowerCase()
        let devicesFilterContainer = document.querySelector(".searchfilter-contents.utensils")
        devicesFilterContainer.classList.add("expanded")
        let targetFilterArray = document.querySelectorAll("[data-type='utensils']")
        searchInFilters(targetFilterArray, inputValue)
    }
}

function searchInFilters(targetFilterArray, inputValue){
    for(let i = 0; i < targetFilterArray.length; i++){
        let elementInFilterArray = targetFilterArray[i]
        let elementInFilterArrayToLowerCase = elementInFilterArray.text.toLowerCase()
        if(!elementInFilterArrayToLowerCase.includes(inputValue)){
            elementInFilterArray.parentElement.classList.add("element-hidden")
        }else{
            elementInFilterArray.parentElement.classList.remove("element-hidden")
        }
    }
}

document.querySelectorAll(".searchfilters-wrapper ul li a").forEach(filterElement => {
    filterElement.addEventListener("click", function(){
        let clickedFilterElementText = filterElement.text
        let clickedFilterElementType = filterElement.getAttribute("data-type")
        createNewTag(clickedFilterElementText, clickedFilterElementType)
    })
})

function createNewTag(clickedFilterElementText, clickedFilterElementType){
    let tagsContainer = document.querySelector(".searchtags-wrapper")
    let createNewTag = document.createElement("div")
    let createNewTagTextWrapper = document.createElement("span")
    createNewTag.setAttribute("class", clickedFilterElementType)
    createNewTagTextWrapper.innerHTML = clickedFilterElementText
    createNewTag.appendChild(createNewTagTextWrapper)

    let svgLinkWrapper = document.createElement("a")
    svgLinkWrapper.setAttribute("href", "#")
    svgLinkWrapper.setAttribute("onClick", "removeclickedTag(this)")
    let tagRemoveSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tagRemoveSVG.setAttribute("width", "24")
    tagRemoveSVG.setAttribute("height", "24")
    tagRemoveSVG.setAttribute("viewBox", "0 0 24 24")
    let tagRemoveSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
    tagRemoveSVGPath.setAttribute("d", "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z");
    tagRemoveSVG.appendChild(tagRemoveSVGPath)
    svgLinkWrapper.appendChild(tagRemoveSVG)
    createNewTag.appendChild(svgLinkWrapper)

    tagsContainer.appendChild(createNewTag)
}

function removeclickedTag(clickedTag){
    clickedTag.parentNode.remove()
}
