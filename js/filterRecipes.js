function searchRecipe(event) {
    event.preventDefault()
    let searchedValue = document.querySelector("#search-recipe").value.toLowerCase()
    
    console.log(searchedValue)
    
    if(searchedValue.length < 3) {
    }else{
        let foundItems = [] 
    
        // PARAMETRES DE LA RECHERCHE
        // CRÉE UN ARRAY DE TOUS LES INGREDIENTS
        for(let i = 0; i < recipes.length; i++){
            // Tous les ingrédients parmi toutes les recettes
            let recipeIngredientsArray = []
            for(j = 0; j < recipes[i].ingredients.length; j++){
                recipeIngredientsArray.push(recipes[i].ingredients[j].ingredient.toLowerCase())
            }

            /// Tous les noms de recettes
            let getRecipeName = recipes[i].name.toLowerCase()
            // Toutes les descriptions des recettes
            let getRecipeDesc = recipes[i].description.toLowerCase()
            
            // RECHERCHE
            // Cherche dans les noms / description et ingrédients si l'input match
            if(getRecipeName.includes(searchedValue)){
                // Crée un array des matchs
                foundItems.push(recipes[i])
            }else{
                if(getRecipeDesc.includes(searchedValue)){
                    foundItems.push(recipes[i])
                }else{
                    if(recipeIngredientsArray.includes(searchedValue)){
                        foundItems.push(recipes[i])
                    }
                }
            }
        }
        
        if(foundItems.length != 0){
            console.log("trouvé des recettes: ", foundItems)
            // document.querySelector(".no-recipe-match").classList.remove("element-hidden")
        }else{
            console.log("pas trouvé des recettes: ", foundItems)
            // document.querySelector(".no-recipe-match").classList.add("element-hidden")
            // MESSAGE DE PAS DE RECETTES TROUVÉES
        }
        updateFilters(foundItems)
        showHideResultItem(foundItems)
    }
    
}

function updateFilters(foundItems){
    let allFiltersContainers = document.querySelectorAll(".searchfilter-contents ul")
    allFiltersContainers.forEach(filterContainer =>{
        filterContainer.innerHTML = ""
    })

    let filtersIngredientsContainer = document.querySelector(".searchfilter-contents.ingredients ul")
    let filtersDevicesContainer = document.querySelector(".searchfilter-contents.devices ul")
    let filtersUtensilsContainer = document.querySelector(".searchfilter-contents.utensils ul")
    let allIngredientsArray = []
    let allAppliancesArray = []
    let allUtensilsArray = []
    foundItems.forEach(foundRecipe =>{
        let updateIngredientsFilter = new Filters(foundRecipe, filtersIngredientsContainer, allIngredientsArray)
        updateIngredientsFilter.ingredientsFilter()

        let updateDevicesFilter = new Filters(foundRecipe, filtersDevicesContainer, allAppliancesArray)
        updateDevicesFilter.devicesFilter()

        let updateUtensilsFilter = new Filters(foundRecipe, filtersUtensilsContainer, allUtensilsArray)
        updateUtensilsFilter.utensilsFilter()
    })
}

function showHideResultItem(foundItems){
    
    document.querySelectorAll("article").forEach(article =>{
        article.classList.add("recipe-hidden")
    })
    foundItems.forEach((foundItem) =>{
        document.querySelector("[data-id='" + foundItem.id +"']").classList.remove("recipe-hidden")
    })

    let checkActiveRecipes = document.querySelectorAll("article:not(.recipe-hidden)")
    if(checkActiveRecipes.length == 0){
        document.querySelector(".no-recipe-match").classList.remove("element-hidden")
    }else{
        document.querySelector(".no-recipe-match").classList.add("element-hidden")
    }
}

function checkActiveTags(){
    // Récupère les tags actifs s'il y en a
    let activeTags = document.querySelectorAll(".searchtags-wrapper div span")
    let allActiveTags = []
    activeTags.forEach(activeTag =>{
        allActiveTags.push(activeTag.innerText.toLowerCase())
    })
    
    // Récupère toutes les méta des recettes
    let activeRecipes = document.querySelectorAll("article")
    activeRecipes.forEach(activeRecipe =>{
        let recipeIngredients = activeRecipe.getAttribute("data-ingredients")
        let recipeAppliance = activeRecipe.getAttribute("data-appliance")
        let recipeUtensils = activeRecipe.getAttribute("data-utensils")
        let activeRecipeIngredientsArray = recipeIngredients.toLowerCase().split(",")
        let activeRecipeUtensilsArray = recipeUtensils.toLowerCase().split(",")
        let allMetaToFilter = [].concat(activeRecipeIngredientsArray, recipeAppliance, activeRecipeUtensilsArray)

        if(allActiveTags.length != 0){
            filterByActiveTag(allActiveTags, activeRecipe, allMetaToFilter)
        }else{
            activeRecipe.classList.remove("recipe-hidden")
        }
    })
}

function filterByActiveTag(allActiveTags, activeRecipe, allMetaToFilter){
    let allTagsContained = allActiveTags.every(tag =>{
        return allMetaToFilter.includes(tag)
    })

    if(allTagsContained){
        activeRecipe.classList.remove("recipe-hidden")
    }else{
        activeRecipe.classList.add("recipe-hidden")
    }
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

function createNewTag(clickedTag){
    let clickedFilterElementText = clickedTag.text
    let clickedFilterElementType = clickedTag.getAttribute("data-type")

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

    checkActiveTags()
}

function removeclickedTag(clickedTag){
    clickedTag.parentNode.remove()
    checkActiveTags()
}
