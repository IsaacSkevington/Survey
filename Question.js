class Question{
    constructor(prompt, finishFunction, required = false){
        this.prompt = prompt;
        this.next = finishFunction;
        this.required = required;
    }



    displayTitle(parent){
        this.questionDisplay = document.createElement("QuestionPrompt")
        this.questionDisplay.innerHTML = this.prompt;
        parent.appendChild(this.questionDisplay);
    }

    displayContent(parent){
        this.answerBox = createInput()
        parent.appendChild(this.answerBox);
    }

    displaySubmit(parent){
        this.submitButton = new Button("Next");
        this.submitButton.onclick = ()=>(this.submit());
        parent.appendChild(this.submitButton.export())
    }


    display(parent){
        
        this.displayTitle(parent);
        this.displayContent(parent);
        this.displaySubmit(parent);

    }

    validateAnswer(){
        if(!this.required){
            return true;
        }
        return this.answerBox.innerHTML != "";
    }

    getAnswer(){
        if(!validateAnswer){
            return null;
        }
        return this.answerBox.innerHTML;
        
    }

    submit(){
        this.answer = getAnswer();
        if(this.answer != null){
            finishFunction();
        }
    }




}