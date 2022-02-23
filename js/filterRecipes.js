function getUserInput(event) {
    event.preventDefault()
    let searchedValue = document.querySelector("#search-recipe").value.toLowerCase()
    
    if(searchedValue.length >= 3) {
        filterRecipes(searchedValue)
    }else{
        let searchedValue = ""
        filterRecipes(searchedValue)
    }
}

function filterRecipes(searchedValue){
    // Récupère les tags actifs s'il y en a
    let activeTags = document.querySelectorAll(".searchtags-wrapper div span")
    let allActiveTags = []
    if(activeTags.length != 0){
        activeTags.forEach(activeTag =>{
            allActiveTags.push(activeTag.innerText.toLowerCase())
        })
    }
    
    let filteredRecipes = []
    
    // Récupère toutes les infos des recettes trouvées
    recipes.forEach(recipe =>{
        // Les ingrédients
        let recipeIngredients = []
        recipe.ingredients.forEach(ingredient => {
            recipeIngredients.push(ingredient.ingredient.toLowerCase())
        })
        // Les devices
        let recipeAppliance = recipe.appliance.toLowerCase()
        // Les ustensils
        let recipeUtensils = []
        recipe.ustensils.forEach(utensil =>{
            recipeUtensils.push(utensil.toLowerCase())
        })
        let allMetaToFilter = [].concat(recipeIngredients, recipeAppliance, recipeUtensils)
        let allOtherComps = [].concat(recipe.name.toLowerCase(), recipe.description.toLowerCase())

        // Regarde si les tags sont contenus dans les ingrédients/devices/ustensils
        let allTagsContained = allActiveTags.every(tag =>{
            return allMetaToFilter.includes(tag)
        })
        
        // Regarde si la valeur recherchée est dans le nom ou la description 
        let searchedValueContained = allOtherComps.some(otherComp =>{
            return otherComp.includes(searchedValue)
        })

        // Si des tags sont actifs
        if(allActiveTags.length != 0){
            // Si tous les tags sont contenus dans la recette
            if(allTagsContained){
                // Si la recherche est superieure a 3 caractères
                if(searchedValue.length >= 3){
                    if(searchedValueContained){
                        filteredRecipes.push(recipe)
                    }else{
                        
                    }
                }else{
                    filteredRecipes.push(recipe)
                    // Affiche la recette / Ajoute la recette à recipes
                }
            }else{
                // Cache la recette
            }
        }else{
            if(searchedValue.length >= 3){
                if(searchedValueContained){
                    filteredRecipes.push(recipe)
                }else{
                    
                }
            }else{
                filteredRecipes.push(recipe)
                // Affiche la recette / Ajoute la recette à recipes
            }
        }
    })

    // Si aucune recette n'a été trouvée
    if(filteredRecipes.length == 0){
        document.querySelector(".no-recipe-match").classList.remove("element-hidden")
        // Cache toutes les recettes
        document.querySelectorAll("article").forEach(article =>{
            article.classList.add("recipe-hidden")
        })
    }else{
        document.querySelector(".no-recipe-match").classList.add("element-hidden")
        updateFilters(filteredRecipes)
        showHideResultItem(filteredRecipes)
    }
}

function updateFilters(filteredRecipes){
    // Vide le contenu des filtres
    let allFiltersContainers = document.querySelectorAll(".searchfilter-contents ul")
    allFiltersContainers.forEach(filterContainer =>{
        filterContainer.innerHTML = ""
    })

    // Génère les ingrédients/devices/ustensiles des recettes trouvées
    let filtersIngredientsContainer = document.querySelector(".searchfilter-contents.ingredients ul")
    let filtersDevicesContainer = document.querySelector(".searchfilter-contents.devices ul")
    let filtersUtensilsContainer = document.querySelector(".searchfilter-contents.utensils ul")
    let allIngredientsArray = []
    let allAppliancesArray = []
    let allUtensilsArray = []
    filteredRecipes.forEach(filteredRecipe =>{
        let updateIngredientsFilter = new Filters(filteredRecipe, filtersIngredientsContainer, allIngredientsArray)
        updateIngredientsFilter.ingredientsFilter()

        let updateDevicesFilter = new Filters(filteredRecipe, filtersDevicesContainer, allAppliancesArray)
        updateDevicesFilter.devicesFilter()

        let updateUtensilsFilter = new Filters(filteredRecipe, filtersUtensilsContainer, allUtensilsArray)
        updateUtensilsFilter.utensilsFilter()
    })
}

function showHideResultItem(filteredRecipes){
    // Cache toutes les recettes
    document.querySelectorAll("article").forEach(article =>{
        article.classList.add("recipe-hidden")
    })
    // Affiche les recettes trouvées
    filteredRecipes.forEach((filteredRecipe) =>{
        document.querySelector("[data-id='" + filteredRecipe.id +"']").classList.remove("recipe-hidden")
    })
}

function createNewTag(clickedTag){
    let clickedFilterElementText = clickedTag.text
    let clickedFilterElementType = clickedTag.getAttribute("data-type")
    let tagsContainer = document.querySelector(".searchtags-wrapper")
    // Invoque la classe pour créer l'élément
    let createTag = new Tags(clickedFilterElementText, clickedFilterElementType, tagsContainer)
        createTag.createTag()

    let searchedValue = document.querySelector("#search-recipe").value.toLowerCase()
    filterRecipes(searchedValue)
}

function removeClickedTag(clickedTag){
    clickedTag.parentNode.remove()

    let searchedValue = document.querySelector("#search-recipe").value.toLowerCase()
    filterRecipes(searchedValue)
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