MULTIPLECHOICEQUESTION = "MULTIPLECHOICEQUESTION"



class MultipleChoiceQuestion extends Question{
    constructor(prompt, options, required = false){
        super(prompt, required);
        this.options = options;
    }




    displayContent(parent){
        let q = document.createElement("MultipleChoiceQuestion")
        this.radioGroup = new RadioGroup(this.options, this.required, IDManager.getID(), "MultipleChoiceQuestionRadioGroup");
        this.radioGroup.display(q);
        parent.appendChild(q);
        
    }

    validateAnswer(){
        if(!this.required){
            return true;
        }
        return this.radioGroup.complete();
        
    }

    getAnswer(){
        if(!this.validateAnswer){
            return null;
        }
        return this.radioGroup.getSelected();
    }

    toString(){
        return this.prompt + QUESTIONDELIM + this.answer
    }
}