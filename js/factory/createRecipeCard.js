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
        let allRecipeIngredients = []
        createIngredientsList.forEach((ingredient) => {
            allRecipeIngredients.push(ingredient.ingredient)
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

        // Ajoute tous les ingrédients de la recette dans data-ingredients
        article.setAttribute("data-ingredients", allRecipeIngredients)
        
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
    let allIngredientsArray = []
    let allAppliancesArray = []
    let allUtensilsArray = []
    recipes.forEach(recipe => {
        let populateGlobalIngredientsList = new Filters(recipe, ingredientsFilterExpanded, allIngredientsArray)
        populateGlobalIngredientsList.ingredientsFilter()

        let populateGlobalDevicesList = new Filters(recipe, devicesFilterExpanded, allAppliancesArray)
        populateGlobalDevicesList.devicesFilter()

        let populateGlobalUtensilsList = new Filters(recipe, utensilsFilterExpanded, allUtensilsArray)
        populateGlobalUtensilsList.utensilsFilter()
        
    })
}



