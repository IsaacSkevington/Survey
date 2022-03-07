import xlsxwriter
import os

QUESTIONDELIM = "$$$"
DATADELIM = "$$"
MAPDELIM = ":::"

questions = {}


class QuestionData:
    def __init__(self, questionTitle):
        self.questionTitle = questionTitle
        self.data = {}

    def writeQuestion(self, workbook):
        sheet = newSheet(workbook)
        sheet.write(0, 0, self.questionTitle)
        row = 1
        column = 0
        for columnTitle in self.data:
            sheet.write(row, column, columnTitle)
            for rowValue in self.data[columnTitle]:
                row += 1
                sheet.write(row, column, rowValue)
            row = 1
            column += 1

    


def newSheet(workbook, name):
   return workbook.add_worksheet(name)





def writeWorkbook(name, questions):
    workbook = xlsxwriter.Workbook(name)
    for question in questions:
        questions[question].writeQuestion(workbook)
    workbook.close()


def checkBoxQuestionProcess(title, raw):
    if "Option" not in questions[title].data:
        questions[title].data["Option"] = {}
        questions[title].data["Quantity"] = {}
    selectedOptions = DATADELIM.split(raw)
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
    options = DATADELIM.split(raw)
    for option in options:
        optionData = MAPDELIM.split(option)
        subquestion = optionData[0]
        selected = optionData[1]
        if subquestion not in questions[title].data["Option"]:
            questions[title].data["Option"][option] = option
        if selected not in questions[title].data:
            questions[title].data[selected] = {}
        if subquestion not in questions[title].data[selected]:
            questions[title].data[selected][subquestion] = 0    
        questions[title].data[selected][subquestion] += 1


def processLine(line):
    lineData = QUESTIONDELIM.split(line)
    if lineData[0] not in questions:
        questions[lineData[0]] = QuestionData(lineData[0])
    processingMap[lineData[1]](lineData[0], lineData[2])

def process(file):
    with open(file, 'r') as f:
        lines = f.readlines
        for line in lines:
            processLine(line)

    


processingMap = {"CHECKBOXQUESTION" : checkBoxQuestionProcess, "MULTIPLECHOICEQUESTION" : multipleChoiceQuestionProcess, "RANKGROUPQUESTION" : rankGroupQuestionProcess}
def main():
    answerFiles = os.listdir()
    for answerFile in answerFiles:
        process(answerFile)
    writeWorkbook("Survey.xlsx", questions)

if __name__ == "__main__":
    main()






    
