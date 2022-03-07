CHECKBOXQUESTION = "CHECKBOXQUESTION"


class CheckBoxQuestion extends Question{

    constructor(number, prompt, options, required = false, noneOfAbove = false){
        super(number, prompt, required);
        this.options = options;
        this.answer = []
        this.noneOfAbove = noneOfAbove
        this.optionsCheckedBefore = []
    }

    onCheck(){
        if(this.noneOfAboveCheckBox != null){
            if(this.noneOfAboveCheckBox.childNodes[0].checked){
                this.noneOfAboveCheckBox.childNodes[0].checked = false
                this.onNoneOfAboveClick()
            }
        }
    }

    
    onNoneOfAboveClick(){
        if(this.noneOfAboveCheckBox.childNodes[0].checked){
            this.optionsCheckedBefore = []
            for(var i = 0; i < this.checkBoxes.length - 1; i++){
                if(this.checkBoxes[i].childNodes[0].checked){
                    this.optionsCheckedBefore.push(i);
                    this.checkBoxes[i].childNodes[0].checked = false
                }
            }
        }
        else{
            this.optionsCheckedBefore.forEach(option => {
                this.checkBoxes[option].childNodes[0].checked = true
            });
        }
    }

    displayContent(parent){
        var checkboxWindow = document.createElement("CheckBoxQuestion");
        this.checkBoxes = [];
        this.options.forEach(option => {
            var checkBox = createInput(option, IDManager.getID(), "CheckBox", "checkbox", false, false, ()=>(this.onCheck()));
            this.checkBoxes.push(checkBox);
            checkboxWindow.appendChild(checkBox);
        });
        if(this.noneOfAbove){
            this.noneOfAboveCheckBox = createInput("None of the Above", IDManager.getID(), "CheckBox", "checkbox", false, false, ()=>(this.onNoneOfAboveClick()));
            this.checkBoxes.push(this.noneOfAboveCheckBox);
            checkboxWindow.appendChild(this.noneOfAboveCheckBox);
        }

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

        if(this.noneOfAboveCheckBox == null || !this.noneOfAboveCheckBox.childNodes[0].checked){
            for(var i = 0; i < this.checkBoxes.length; i++){
                if(this.checkBoxes[i].childNodes[0].checked){
                    answer.push(this.options[i]);
                }
            }
        }
        return answer
    }

    asString(){
        var text = this.number + QUESTIONDELIM + CHECKBOXQUESTION + QUESTIONDELIM + this.prompt + QUESTIONDELIM
        for(var i = 0; i < this.answer.length - 1; i++){
            text += this.answer[i] + DATADELIM
        }
        if(this.answer.length != 0){
            text += this.answer[this.answer.length - 1]
        }

        return text
    }

}
