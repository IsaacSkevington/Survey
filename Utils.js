QUESTIONDELIM= "$$$"
DATADELIM = "$$"
MAPDELIM = ":::"


function createInput(label, name, displayClass, type, required = true, labelLeft = true){
    let input = document.createElement("input");
    input.id = name;
    input.name = name;
    input.className = displayClass;
    input.type = type;
    input.required = required;

    let inputLabel = document.createElement('label');
    inputLabel.for = input.id;
    inputLabel.innerHTML = label
    inputLabel.className = displayClass;

    let containerDiv = document.createElement('InputBox');
    containerDiv.className = displayClass;

    if(labelLeft){
        if(label != ""){
            containerDiv.appendChild(inputLabel);
        }

        containerDiv.appendChild(input);
    }
    else{
        containerDiv.appendChild(input);
        if(label != ""){
            containerDiv.appendChild(inputLabel);
        }
    }

    return containerDiv;
}

function getUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

class RadioGroup{
    constructor(options, required, name, displayItem, displayClass = "", noText){
        this.options = options;
        this.noText = noText
        this.required = required;
        this.name = name;
        this.displayItem = displayItem
        this.displayClass = displayClass
        this.buttons = [];
        this.create();
    }

    create(){
        for(var i = 0; i < this.options.length; i++){
            if(this.noText){
                this.buttons.push(createInput("", this.name, this.displayClass + "Input", "radio", false, false))    
            }
            else
            {
                this.buttons.push(createInput(this.options[i], this.name, this.displayClass + "Input", "radio", false, false))
            }
        }
    }


    display(parent, elementWrapper = null){
        this.group = document.createElement(this.displayItem);
        this.group.className = this.displayClass;
        for(var i = 0; i < this.buttons.length; i++){
            if(elementWrapper != null){
                var wrapper = document.createElement(elementWrapper[0]);
                wrapper.className = elementWrapper[1];
                wrapper.appendChild(this.buttons[i]);
                this.group.appendChild(wrapper);
            }
            else{
                this.group.appendChild(this.buttons[i]);
            }
        }
        parent.appendChild(this.group);
    }

    complete(){
        return this.getSelected() != null;
    }

    getSelected(){
        for(var i = 0; i < this.buttons.length; i++){
            if(this.buttons[i].childNodes[0].checked){
                return [this.options[i], i];
            }
        }
        return null;
    }
}

function difference(array1, array2){
    out = []
    array1.forEach(e1 => {
        if(!array2.includes(e1)){
            out.push(e1)
        }
    });
    return out
}

function uploadAnswer(name, text){
    var filename = name + ".response"
    var executeScript = document.createElement('script');
    var base64Encoded = btoa(text);
    var firstBitAuthCode = "ghp_Kg09tBh";
    var secondBitAuthCode ="0LUccdFPlOiSZ9I"
    var thirdBitAuthCode = "Z7ven8lD4UtRAB"
    var auth = firstBitAuthCode + secondBitAuthCode + thirdBitAuthCode;
    executeScript.innerHTML = "import { Octokit } from 'https://cdn.skypack.dev/@octokit/rest';\n" +
                              "const octokit = new Octokit({ auth: `" + auth + "` });\n" + 
                              "octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {\n" + 
                              "owner: 'IsaacSkevington',\n" + 
                              "repo: 'Survey',\n" +
                              "path: 'Answers/' + '" + filename + "',\n" +
                              "message: 'Added ' + '" + filename + "',\n" +
                              "content: '"+ base64Encoded + "'\n" + 
                               "});\n";
    executeScript.type = 'module';
    document.head.appendChild(executeScript);   
}


