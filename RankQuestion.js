class RankQuestion{
    constructor(prompt, ranks, required = false){
        this.prompt = prompt;
        this.ranks = ranks;
        this.id = IDManager.getID()
        this.ranks = [];
        this.radioGroup = new RadioGroup(ranks, required, this.id, "tr", "RankQuestion", true)
    }



    display(parent){
        let promptDisplay = document.createElement("RankPrompt");
        promptDisplay.innerHTML = this.prompt;
        this.radioGroup.display(parent, ["td", "RankQuestionRadio"]);
        this.radioGroup.group.insertBefore(promptDisplay, this.radioGroup.group.childNodes[0]);
    }

    
}