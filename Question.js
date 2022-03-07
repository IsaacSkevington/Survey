class Question{
    constructor(prompt, required = false){
        this.prompt = prompt;
        this.required = required;
    }

    setFinishFunction(f){
        this.finishFunction = f
    }



    displayTitle(parent){
        this.questionDisplay = document.createElement("QuestionPrompt")
        this.questionDisplay.innerHTML = this.prompt;
        parent.appendChild(this.questionDisplay);
    }

    displayContent(parent){
        this.answerBox = createInput("", "answerBox", "AnswerBoxStyle", "text", this.required)
        parent.appendChild(this.answerBox);
    }

    displaySubmit(parent){
        this.submitButton = new Button("Next", parent, "SubmitButton", ()=>(this.submit()));
        parent.appendChild(this.submitButton.export())
    }


    display(parent){
        this.window = document.createElement("Question");
        this.displayTitle(this.window);
        this.displayContent(this.window);
        this.displaySubmit(this.window);

        parent.appendChild(this.window);

    }

    destroy(){
        this.window.parentElement.removeChild(this.window);
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
        this.answer = this.getAnswer();
        if(this.answer != null){
            this.finishFunction();
        }
    }


    asString(){

    }




}