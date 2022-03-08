class RankQuestion{
    constructor(prompt, ranks, required = false, extraPrompt = ""){
        this.prompt = prompt;
        this.extraPrompt = extraPrompt;
        this.ranks = ranks;
        this.id = IDManager.getID()
        this.ranks = [];
        this.radioGroup = new RadioGroup(ranks, required, this.id, "tr", "RankQuestion", true)
    }


    setIncomplete(){
        this.promptDisplay.style.color = "red"
    }

    setComplete(){
        this.promptDisplay.style.color = "black"
    }


    display(parent){
        this.promptDisplay = document.createElement("RankPrompt");
        this.promptDisplay.innerHTML = this.prompt + " " + this.extraPrompt;
        this.radioGroup.display(parent, ["td", "RankQuestionRadio"]);
        this.radioGroup.group.insertBefore(this.promptDisplay, this.radioGroup.group.childNodes[0]);
    }

    validateAnswer(){
        return this.radioGroup.getSelected() != null
    }

    getAnswer(){
        return this.radioGroup.getSelected()
    }


}