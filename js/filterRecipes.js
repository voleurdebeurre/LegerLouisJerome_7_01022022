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