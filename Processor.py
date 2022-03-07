import xlsxwriter
import os

QUESTIONDELIM = "$$$"
DATADELIM = "$$"
MAPDELIM = ":::"

questions = {}


class QuestionData:
    def __init__(self, questionTitle, type):
        self.questionTitle = questionTitle
        self.data = {}
        self.type = type

    def writeQuestion(self, workbook, number):
        sheet = newSheet(workbook, "Question " + str(number))
        sheet.write(0, 0, self.questionTitle)
        row = 1
        column = 0
        for columnTitle in self.data:
            if(self.type == "RANKGROUPQUESTION"):
                if(columnTitle != "Option"):
                    columnTitle = columnTitle[1:]
            sheet.write(row, column, columnTitle)
            for rowValue in self.data[columnTitle]:
                row += 1
                sheet.write(row, column, self.data[columnTitle][rowValue])
            row = 1
            column += 1

    


def newSheet(workbook, name):
   return workbook.add_worksheet(name)





def writeWorkbook(name, questions):
    workbook = xlsxwriter.Workbook(name)
    num = 1
    for question in questions:
        questions[question].writeQuestion(workbook, num)
        num += 1
    workbook.close()


def checkBoxQuestionProcess(title, raw):
    if "Option" not in questions[title].data:
        questions[title].data["Option"] = {}
        questions[title].data["Quantity"] = {}
    selectedOptions = raw.split(DATADELIM)
    for option in selectedOptions:
        if option not in questions[title].data["Option"]:
            questions[title].data["Option"][option] = option
            questions[title].data["Quantity"][option] = 0
        questions[title].data["Quantity"][option] += 1


def multipleChoiceQuestionProcess(title, raw):
    if "Option" not in questions[title].data:
        questions[title].data["Option"] = {}
        questions[title].data["Quantity"] = {}
    option = raw
    if option not in questions[title].data["Option"]:
        questions[title].data["Option"][option] = option
        questions[title].data["Quantity"][option] = 0
    questions[title].data["Quantity"][option] += 1


def rankGroupQuestionProcess(title, raw):
    if "Option" not in questions[title].data:
        questions[title].data["Option"] = {}
    options = raw.split(DATADELIM)
    for option in options:
        optionData = option.split(MAPDELIM)
        rowHeading = optionData[0]
        columnHeading = optionData[1]
        if rowHeading not in questions[title].data["Option"]:
            questions[title].data["Option"][rowHeading] = rowHeading
            for otherColumnHeading in questions[title].data:
                if otherColumnHeading != "Option":
                    questions[title].data[otherColumnHeading][rowHeading] = 0
        if columnHeading not in questions[title].data:
            questions[title].data[columnHeading] = {}
            for otherRowHeading in questions[title].data["Option"]:
                questions[title].data[columnHeading][otherRowHeading] = 0  
        questions[title].data[columnHeading][rowHeading] += 1


def processLine(line):
    lineData = line.split(QUESTIONDELIM)
    if lineData[1] not in questions:
        questions[lineData[1]] = QuestionData(lineData[1], lineData[0])
    processingMap[lineData[0]](lineData[1], lineData[2])

def process(file):
    with open(file, 'r') as f:
        lines = f.read().splitlines()
        for line in lines:
            processLine(line)

    


processingMap = {"CHECKBOXQUESTION" : checkBoxQuestionProcess, "MULTIPLECHOICEQUESTION" : multipleChoiceQuestionProcess, "RANKGROUPQUESTION" : rankGroupQuestionProcess}
def main():
    answerFiles = os.listdir("Answers")
    for answerFile in answerFiles:
        process("Answers/" + answerFile)
    writeWorkbook("Survey.xlsx", questions)

if __name__ == "__main__":
    main()






    
