createRecipe()
createFilters()

function createRecipe(){
    const mainContainer = document.querySelector("main")
    recipes.forEach((recipe) =>{
        // Crée une fiche recette
        // Crée un article
        let article = document.createElement("article")
        article.setAttribute("data-id", recipe.id)
        article.setAttribute("data-appliance", recipe.appliance)
        article.setAttribute("data-utensils", recipe.ustensils)
        mainContainer.appendChild(article)

        // Crée le bloc d'image d'une recette
        let figure = document.createElement("figure")
        // Crée le caption du bloc d'image d'une recette
        let figcaption = document.createElement("figcaption")
        figcaption.setAttribute("class", "sr-only")
        figcaption.innerHTML += recipe.name

        article.appendChild(figure)
        article.appendChild(figcaption)

        // Crée le container d'une recette
        let recipeContentWrapper = document.createElement("div")
        recipeContentWrapper.setAttribute("class", "recipe-content")
        article.appendChild(recipeContentWrapper)

        // Crée le header d'une recette
        let recipeHeader = document.createElement("section")
        recipeHeader.setAttribute("class", "recipe-header")

        // Crée le contenu du header d'une recette
        let recipeHeaderTitle = document.createElement("h2")
        recipeHeaderTitle.innerHTML += recipe.name
        let recipeHeaderTimeWrapper = document.createElement("aside")
        // Crée le SVG à côté du temps de la recette
        let recipeHeaderSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        recipeHeaderSVG.setAttribute("width", "24")
        recipeHeaderSVG.setAttribute("height", "24")
        recipeHeaderSVG.setAttribute("viewBox", "0 0 24 24")
        let recipeHeaderSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
        recipeHeaderSVGPath.setAttribute("d", "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z");
        recipeHeaderSVG.appendChild(recipeHeaderSVGPath)
        // Crée le temps de la recette
        let recipeHeaderTime = document.createElement("p")
        recipeHeaderTime.innerHTML += recipe.time + " min"

        recipeHeaderTimeWrapper.appendChild(recipeHeaderSVG)
        recipeHeaderTimeWrapper.appendChild(recipeHeaderTime)

        recipeHeader.appendChild(recipeHeaderTitle)
        recipeHeader.appendChild(recipeHeaderTimeWrapper)
        recipeContentWrapper.appendChild(recipeHeader)

        // Crée le container du contenu de la recette
        let recipeMetaWrapper = document.createElement("section")
        recipeMetaWrapper.setAttribute("class", "recipe-meta")
        recipeContentWrapper.appendChild(recipeMetaWrapper)

        // Crée le conteneur de la liste des ingrédients
        let recipeIngredientsWrapper = document.createElement("div")
        recipeIngredientsWrapper.setAttribute("class", "recipe-ingredients")
        recipeMetaWrapper.appendChild(recipeIngredientsWrapper)
        // Crée la liste des ingrédients
        let recipeIngredientsList = document.createElement("ul")
        let createIngredientsList = recipe.ingredients
        createIngredientsList.forEach((ingredient) => {
            //Crée la liste des ingrédients d'une recette
            let createIngredient = document.createElement("li")
            if(ingredient.quantity || ingredient.unit){
                createIngredient.innerHTML += ingredient.ingredient + ": " 
                let createIngredientQuantity = document.createElement("span")
                createIngredientQuantity.setAttribute("class", "quantity")
                if(ingredient.unit){
                    createIngredientQuantity.innerHTML += ingredient.quantity + " " + ingredient.unit
                }else{
                    createIngredientQuantity.innerHTML += ingredient.quantity
                }
                createIngredient.appendChild(createIngredientQuantity)
                recipeIngredientsList.appendChild(createIngredient)
            }else{
                createIngredient.innerHTML += ingredient.ingredient
                recipeIngredientsList.appendChild(createIngredient)
            }
        })
        recipeIngredientsWrapper.appendChild(recipeIngredientsList)
        
        //Crée les instructions de la recette
        let recipeInstructionsWrapper = document.createElement("div")
        recipeInstructionsWrapper.setAttribute("class", "recipe-instructions")
        let recipeInstructions = document.createElement("p")
        recipeInstructions.innerHTML += recipe.description
        recipeInstructionsWrapper.appendChild(recipeInstructions)
        recipeMetaWrapper.appendChild(recipeInstructionsWrapper)
    })
}


function createFilters(){
    // Filtres
    let ingredientsFilterExpanded = document.querySelector(".searchfilter-contents.ingredients ul")
    let devicesFilterExpanded = document.querySelector(".searchfilter-contents.devices ul")
    let utensilsFilterExpanded = document.querySelector(".searchfilter-contents.utensils ul")

    // Paramètres de la fonction de récupération des ingrédients pour servir la création:
    // De la liste globale des ingrédients
    let allIngredientsArray = []
    // De la liste globale des instruments
    let allAppliancesArray = []
    // De la liste globale des ustensiles
    let allUtensilsArray = []

    recipes.forEach((recipe) =>{
        recipe.ingredients.forEach((ingredient) => {
            ingredient.ingredient = ingredient.ingredient.toLowerCase()
            ingredient.ingredient = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)
            if(!allIngredientsArray.includes(ingredient.ingredient)){
                allIngredientsArray.push(ingredient.ingredient)
                let ingredientInFilter = document.createElement("li")
                ingredientInFilter.setAttribute("data-type-value", ingredient.ingredient)
                let ingredientInFilterLink = document.createElement("a")
                ingredientInFilterLink.setAttribute("href", "#")
                ingredientInFilterLink.setAttribute("data-type", "ingredients")
                ingredientInFilter.appendChild(ingredientInFilterLink)
                ingredientInFilterLink.innerHTML += ingredient.ingredient
                ingredientsFilterExpanded.appendChild(ingredientInFilter)
            }
        })
        recipe.appliance = recipe.appliance.toLowerCase()
        recipe.appliance = recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1)
        if(!allAppliancesArray.includes(recipe.appliance)){
            allAppliancesArray.push(recipe.appliance)
            let applianceInFilter = document.createElement("li")
            applianceInFilter.setAttribute("data-type-value", recipe.appliance)
            let applianceInFilterLink = document.createElement("a")
            applianceInFilterLink.setAttribute("href", "#")
            applianceInFilterLink.setAttribute("data-type", "devices")
            applianceInFilter.appendChild(applianceInFilterLink)
            applianceInFilterLink.innerHTML += recipe.appliance
            devicesFilterExpanded.appendChild(applianceInFilter)
        }

        
        recipe.ustensils.forEach((ustensil) => {
            ustensil = ustensil.toLowerCase()
            ustensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
            if(!allUtensilsArray.includes(ustensil)){
                allUtensilsArray.push(ustensil)
                let utensilInFilter = document.createElement("li")
                utensilInFilter.setAttribute("data-type-value", ustensil)
                let utensilInFilterLink = document.createElement("a")
                utensilInFilterLink.setAttribute("href", "#")
                utensilInFilterLink.setAttribute("data-type", "utensils")
                utensilInFilter.appendChild(utensilInFilterLink)
                utensilInFilterLink.innerHTML += ustensil
                utensilsFilterExpanded.appendChild(utensilInFilter)
            }
        })
    })

    // console.log(allIngredientsArray)
}



