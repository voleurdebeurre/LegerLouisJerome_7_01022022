class Filters{
    constructor(recipe, container, arrayWithoutDupes){
        this.recipe = recipe
        this.container = container
        this.arrayWithoutDupes = arrayWithoutDupes
    }

    ingredientsFilter(){
        // Paramètres de la fonction de récupération des ingrédients pour servir la création:
        // De la liste globale des ingrédients
    
        this.recipe.ingredients.forEach((ingredient) => {
            ingredient.ingredient = ingredient.ingredient.toLowerCase()
            ingredient.ingredient = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)
            if(!this.arrayWithoutDupes.includes(ingredient.ingredient)){
                this.arrayWithoutDupes.push(ingredient.ingredient)
                let ingredientInFilter = document.createElement("li")
                ingredientInFilter.setAttribute("data-type-value", ingredient.ingredient)
                let ingredientInFilterLink = document.createElement("a")
                ingredientInFilterLink.setAttribute("href", "#")
                ingredientInFilterLink.setAttribute("onClick", "createNewTag(this)")
                ingredientInFilterLink.setAttribute("data-type", "ingredients")
                ingredientInFilter.appendChild(ingredientInFilterLink)
                ingredientInFilterLink.innerHTML += ingredient.ingredient
                this.container.appendChild(ingredientInFilter)
            }
        })
        return this.container
    }

    devicesFilter(){
        // Paramètres de la fonction de récupération des ingrédients pour servir la création:
        // De la liste globale des instruments

        this.recipe.appliance = this.recipe.appliance.toLowerCase()
        this.recipe.appliance = this.recipe.appliance.charAt(0).toUpperCase() + this.recipe.appliance.slice(1)
        if(!this.arrayWithoutDupes.includes(this.recipe.appliance)){
            this.arrayWithoutDupes.push(this.recipe.appliance)
            let applianceInFilter = document.createElement("li")
            applianceInFilter.setAttribute("data-type-value", this.recipe.appliance)
            let applianceInFilterLink = document.createElement("a")
            applianceInFilterLink.setAttribute("href", "#")
            applianceInFilterLink.setAttribute("onClick", "createNewTag(this)")
            applianceInFilterLink.setAttribute("data-type", "devices")
            applianceInFilter.appendChild(applianceInFilterLink)
            applianceInFilterLink.innerHTML += this.recipe.appliance
            this.container.appendChild(applianceInFilter)
        }
        return this.container
    }
        

    utensilsFilter(){
        // Paramètres de la fonction de récupération des ingrédients pour servir la création:
        // De la liste globale des ustensiles
        this.recipe.ustensils.forEach((ustensil) => {
            ustensil = ustensil.toLowerCase()
            ustensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
            if(!this.arrayWithoutDupes.includes(ustensil)){
                this.arrayWithoutDupes.push(ustensil)
                let utensilInFilter = document.createElement("li")
                utensilInFilter.setAttribute("data-type-value", ustensil)
                let utensilInFilterLink = document.createElement("a")
                utensilInFilterLink.setAttribute("href", "#")
                utensilInFilterLink.setAttribute("onClick", "createNewTag(this)")
                utensilInFilterLink.setAttribute("data-type", "utensils")
                utensilInFilter.appendChild(utensilInFilterLink)
                utensilInFilterLink.innerHTML += ustensil
                this.container.appendChild(utensilInFilter)
            }
        })
    } 
}