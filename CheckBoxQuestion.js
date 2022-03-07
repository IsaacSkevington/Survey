CHECKBOXQUESTION = "CHECKBOXQUESTION"


class CheckBoxQuestion extends Question{

    constructor(prompt, options, required = false){
        super(prompt, required);
        this.options = options;
    }



    displayContent(parent){
        var checkboxWindow = document.createElement("CheckBoxQuestion");
        this.checkBoxes = [];
        this.options.forEach(option => {
            var checkBox = createInput(option, IDManager.getID(), "CheckBox", "checkbox", false, false);
            this.checkBoxes.push(checkBox);
            checkboxWindow.appendChild(checkBox);
        });
        parent.appendChild(checkboxWindow);
    }

    validateAnswer(){
        if(!this.required){
            return true;
        }
        var oneChecked = false;
        for(var i = 0; i < this.checkBoxes.length; i++){
            if(this.checkBoxes[i].childNodes[0].checked){
                oneChecked = true;
                break;
            }
        }
        return oneChecked;
    }

    getAnswer(){
        if(!this.validateAnswer){
            return null;
        }
        var answer = [];
        for(var i = 0; i < this.checkBoxes.length; i++){
            if(this.checkBoxes[i].childNodes[0].checked){
                answer.push(this.options[i]);
            }
        }
        return answer
    }

    toString(){
        var text = this.prompt + QUESTIONDELIM
        for(var i = 0; i < this.answer.length - 1; i++){
            text += this.answer[i] + DATADELIM
        }
        text += this.answer[this.answer.length - 1]

        return text
    }

}
