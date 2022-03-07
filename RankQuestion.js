class RankQuestion{
    constructor(prompt, ranks, required = false, extraPrompt = ""){
        this.prompt = prompt;
        this.extraPrompt = extraPrompt;
        this.ranks = ranks;
        this.id = IDManager.getID()
        this.ranks = [];
        this.radioGroup = new RadioGroup(ranks, required, this.id, "tr", "RankQuestion", true)
    }



    display(parent){
        let promptDisplay = document.createElement("RankPrompt");
        promptDisplay.innerHTML = this.prompt + " " + this.extraPrompt;
        this.radioGroup.display(parent, ["td", "RankQuestionRadio"]);
        this.radioGroup.group.insertBefore(promptDisplay, this.radioGroup.group.childNodes[0]);
    }

    validateAnswer(){
        return this.radioGroup.getSelected() != null
    }

    getAnswer(){
        return this.radioGroup.getSelected()
    }

}