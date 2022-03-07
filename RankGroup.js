RANKGROUPQUESTION = "RANKGROUPQUESTION"



class RankGroup extends Question{

    constructor(number, prompt, title, prompts, ranks, required = true){
        super(number, prompt, required);
        this.ranks = ranks
        this.title = title;
        this.questions = []
        this.prompts = prompts
        this.extraPrompts = []

    }

    setPrompts(prompts){
        this.prompts = prompts
        this.questions = []
        for(var i = 0; i < this.prompts.length; i++){
            this.questions.push(new RankQuestion(this.prompts[i], this.ranks, this.required));
        }
    }

    
    setExtraPrompts(prompts){
        this.extraPrompts = prompts
        this.questions = []
        for(var i = 0; i < this.prompts.length; i++){
            this.questions.push(new RankQuestion(this.prompts[i], this.ranks, this.required, this.extraPrompts[i]));
        }
    }


    displayContent(parent){
        

        this.groupDisplay = document.createElement("table")
        this.groupDisplay.className = "RankGroup"

        var titleBar = document.createElement("tr");
        titleBar.className = "RankGroupTitleBar"
        var title = document.createElement("th")
        title.className = "RankGroupTitle"
        title.innerHTML = this.title;
        titleBar.appendChild(title);

        this.ranks.forEach(rank => {
            var rankHeading = document.createElement("th")
            rankHeading.className = "RankHeading"
            rankHeading.innerHTML = rank;
            titleBar.appendChild(rankHeading);
        });
        this.groupDisplay.appendChild(titleBar);

        
        
        for(var i = 0; i < this.questions.length; i++){
            this.questions[i].display(this.groupDisplay);
        }

        parent.appendChild(this.groupDisplay);

    }


    validateAnswer(){
        var success = true;
        this.questions.forEach(question => {
            if(!question.validateAnswer()){
                success = false;
            }
        });
        return success;
    }

    getAnswer(){
        if(!this.validateAnswer()){
            return null;
        }
        var result = []
        this.questions.forEach(question => {
            result.push(question.getAnswer());
        });
        return result;
    }

    asString(){
        var text = this.number + QUESTIONDELIM + RANKGROUPQUESTION + QUESTIONDELIM + this.prompt + QUESTIONDELIM
        for(var i = 0; i < this.answer.length - 1; i++){
            text += this.questions[i].prompt + MAPDELIM + this.answer[i][1] + MAPDELIM + this.answer[i][0] + DATADELIM
        }
        text += this.questions[this.answer.length - 1].prompt + MAPDELIM + this.answer[this.answer.length - 1][1] + MAPDELIM + this.answer[this.answer.length - 1][0]
        return text
    }

}