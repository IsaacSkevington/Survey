import xlsxwriter
import os

QUESTIONDELIM = "$$$"
DATADELIM = "$$"
MAPDELIM = ":::"

OPTION = 0
QUANTITY = 1

NONEOFABOVE = "None of the above"

questions = {}


class QuestionData:
    def __init__(self, questionTitle, type):
        self.questionTitle = questionTitle
        self.columnHeadings = {}
        self.data = {}
        self.type = type

    def writeQuestion(self, workbook, number):
        sheet = newSheet(workbook, "Question " + str(number))
        sheet.write(0, 0, self.questionTitle)
        row = 1
        column = 0
        for rowValue in sorted(self.data[OPTION]):
            row += 1
            sheet.write(row, column, self.data[OPTION][rowValue])
        sheet.write(row + 1, column, "Total")

        row = 1
        column += 1

        for columnNumber in sorted(self.columnHeadings.keys()):
            if columnNumber != OPTION:
                total = 0
                sheet.write(row, column, self.columnHeadings[columnNumber])
                for rowValue in sorted(self.data[columnNumber].keys()):
                    row += 1
                    sheet.write(row, column, self.data[columnNumber][rowValue])
                    total += self.data[columnNumber][rowValue]
                sheet.write(row + 1, column, total)
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


def checkBoxQuestionProcess(id, raw):
    if OPTION not in questions[id].data:
        questions[id].data[OPTION] = {}
        questions[id].columnHeadings[OPTION] = "Option"
        questions[id].data[QUANTITY] = {}
        questions[id].columnHeadings[QUANTITY] = "Quantity"
    selectedOptions = raw.split(DATADELIM)
    if selectedOptions == ['']:
        if(NONEOFABOVE not in questions[id].data[OPTION]):
            questions[id].data[OPTION][NONEOFABOVE] = NONEOFABOVE
            questions[id].data[QUANTITY][NONEOFABOVE] = 0
        questions[id].data[QUANTITY][NONEOFABOVE] += 1
        return 0
    for option in selectedOptions:
        if option not in questions[id].data[OPTION]:
            questions[id].data[OPTION][option] = option
            questions[id].data[QUANTITY][option] = 0
        questions[id].data[QUANTITY][option] += 1


def multipleChoiceQuestionProcess(id, raw):
    if OPTION not in questions[id].data:
        questions[id].data[OPTION] = {}
        questions[id].columnHeadings[OPTION] = "Option"
        questions[id].data[QUANTITY] = {}
        questions[id].columnHeadings[QUANTITY] = "Quantity"
    option = raw
    if option not in questions[id].data[OPTION]:
        questions[id].data[OPTION][option] = option
        questions[id].data[QUANTITY][option] = 0
    questions[id].data[QUANTITY][option] += 1


def rankGroupQuestionProcess(id, raw):
    if OPTION not in questions[id].data:
        questions[id].data[OPTION] = {}
        questions[id].columnHeadings[OPTION] = "Option"
    options = raw.split(DATADELIM)
    if options == ['']:
        return 0
    for option in options:
        optionData = option.split(MAPDELIM)
        rowHeading = optionData[0]
        columnNumber = int(optionData[1]) + 1
        columnHeading = optionData[2]
        if rowHeading not in questions[id].data[OPTION]:
            questions[id].data[OPTION][rowHeading] = rowHeading
            for otherColumnHeading in questions[id].data:
                if otherColumnHeading != OPTION:
                    questions[id].data[otherColumnHeading][rowHeading] = 0
        if columnNumber not in questions[id].data:
            questions[id].data[columnNumber] = {}
            questions[id].columnHeadings[columnNumber] = columnHeading
            for otherRowHeading in questions[id].data[OPTION]:
                questions[id].data[columnNumber][otherRowHeading] = 0  
        questions[id].data[columnNumber][rowHeading] += 1


def processLine(line):
    lineData = line.split(QUESTIONDELIM)
    if lineData[0] not in questions:
        questions[lineData[0]] = QuestionData(lineData[2], lineData[1])
    processingMap[lineData[1]](lineData[0], lineData[3])

def process(file):
    with open(file, 'r') as f:
        lines = f.read().splitlines()
        for line in lines:
            processLine(line)

    


processingMap = {"CHECKBOXQUESTION" : checkBoxQuestionProcess, "MULTIPLECHOICEQUESTION" : multipleChoiceQuestionProcess, "RANKGROUPQUESTION" : rankGroupQuestionProcess}
def main():
    try:
        os.remove("Survey.xlsx")
    except:
        pass
    answerFiles = os.listdir("Answers")
    for answerFile in answerFiles:
        process("Answers/" + answerFile)
    writeWorkbook("Survey.xlsx", questions)

if __name__ == "__main__":
    main()






    
