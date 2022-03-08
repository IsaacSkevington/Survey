class Survey{

    constructor(totalQuestions){
        this.totalQuestions = totalQuestions;
        this.questions = [];
        this.questionNumber = 0;
    }

    addQuestion(q){
        this.questions.push(q)
    }

    loadQuestions(displayWindow){
        this.displayWindow = displayWindow
        this.loadQuestion(1, this.totalQuestions + 1);
    }

    onQuestionsLoaded(){
        for(var i = 0; i < this.totalQuestions; i++){
            this.questions[i].question.setFinishFunction(()=>(this.onsubmit()))
        }
        this.display(this.displayWindow);
    }

    loadQuestion(questionNumber, end){
        if(questionNumber != end){
            var qScript = document.createElement("script");
            qScript.src = "Questions/Question" + questionNumber + ".js";
            qScript.onload = ()=>(this.loadQuestion(questionNumber + 1, end))
            document.head.appendChild(qScript);
        }
        else{
            this.onQuestionsLoaded();
        }
    }




    display(parent){
        this.progressDisplay = document.createElement("progress")
        this.progressDisplay.className = "ProgressBar"
        this.progressDisplay.max = this.questions.length
        this.progressDisplay.value = 0
        var id = IDManager.getID()
        this.progressDisplay.id = id
        this.progressLabel = document.createElement("label")
        this.progressLabel.className = "ProgressBar"
        this.progressLabel.for = id 
        var progressWindow = document.createElement("ProgressWindow")
        progressWindow.appendChild(this.progressLabel)
        progressWindow.appendChild(this.progressDisplay)        
        parent.appendChild(progressWindow)
        this.questionFrame = document.createElement("Survey")
        parent.appendChild(this.questionFrame);
        this.displayQuestion();
    }

    displayQuestion(){
        this.progressDisplay.value++
        this.progressLabel.innerHTML = "Question " + this.progressDisplay.value + " of " + this.questions.length
        try{
            this.questions[this.questionNumber - 1].question.destroy();
        }
        catch{}
        if(this.questionNumber == this.questions.length){
            this.submit()
        }
        else{
            if(this.questions[this.questionNumber].excludeFunction == null || !this.questions[this.questionNumber].excludeFunction(this.questions)){
                if(this.questions[this.questionNumber].changeFunction != null){
                    this.questions[this.questionNumber].changeFunction(this.questions[this.questionNumber].question, this.questions);
                }
                this.questions[this.questionNumber].question.display(this.questionFrame);
            }
            else{
                this.onsubmit();
            }
        }
        
    }

    submit(){
        var text = ""
        for(var i = 0; i < this.questions.length - 1; i++){
            text += this.questions[i].question.asString() + "\n"
        }
        text += this.questions[this.questions.length - 1].question.asString()
        uploadAnswer(getUUID(), text)
        alert("Thank you for completing the survey, you may now close the window")
    }

    onsubmit(){
        this.questionNumber++;
        this.displayQuestion();
    }



}