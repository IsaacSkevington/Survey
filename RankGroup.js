class RankGroup extends Question{

    constructor(prompt, prompts, start, end, finishFunction){
        super(prompt, finishFunction, true);
        this.questions = []
        for(var i = 0; i < prompts.length; i++){
            this.questions.push(new RankQuestion(prompts[i], start, end));
        }
    }

    display(parent){

        this.groupDisplay = document.createElement("RankGroupSection")
        
        for(var i = 0; i < this.questions.length; i++){
            this.questions[i].display(parent);
        }

    }


    validateAnswer(){

    }

}