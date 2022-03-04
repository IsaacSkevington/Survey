class MultipleChoiceQuestion extends Question{
    constructor(prompt, finishFunction, options, required = false){
        super(prompt, finishFunction, required);
        this.options = options;
    }


    displayContent(parent){
        this.radioGroup = createRadioGroup(options);
        parent.appendChild(this.radioGroup.export());
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
}