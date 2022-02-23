class Tags{
    constructor(textOfTag, typeOfTag, container){
        this.textOfTag = textOfTag
        this.typeOfTag = typeOfTag
        this.container = container
    }

    createTag(){
        let createNewTag = document.createElement("div")
        let createNewTagTextWrapper = document.createElement("span")
        createNewTag.setAttribute("class", this.typeOfTag)
        createNewTagTextWrapper.innerHTML = this.textOfTag
        createNewTag.appendChild(createNewTagTextWrapper)

        let svgLinkWrapper = document.createElement("a")
        svgLinkWrapper.setAttribute("href", "#")
        svgLinkWrapper.setAttribute("onClick", "removeClickedTag(this)")
        let tagRemoveSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        tagRemoveSVG.setAttribute("width", "24")
        tagRemoveSVG.setAttribute("height", "24")
        tagRemoveSVG.setAttribute("viewBox", "0 0 24 24")
        let tagRemoveSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
        tagRemoveSVGPath.setAttribute("d", "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z");
        tagRemoveSVG.appendChild(tagRemoveSVGPath)
        svgLinkWrapper.appendChild(tagRemoveSVG)
        createNewTag.appendChild(svgLinkWrapper)

        this.container.appendChild(createNewTag)
    }
}