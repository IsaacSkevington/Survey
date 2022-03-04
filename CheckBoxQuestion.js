class CheckBoxQuestion extends Question{

    constructor(prompt, finishFunction, options, required = false){
        super(prompt, finishFunction, required);
        this.options = options;
    }


    displayContent(parent){
        checkboxWindow = document.createElement("CheckBoxSection");
        this.checkBoxes = [];
        options.forEach(option => {
            var checkBox = getCheckBox(option);
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
            if(this.checkBoxes[i].checked){
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
            if(this.checkBoxes[i].checked){
                answer.push(this.options[i]);
            }
        }
        return answer
    }
}
