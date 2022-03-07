let QUESTION =     
new QuestionParams(
    new CheckBoxQuestion(
        6,
        "Which of the following languages did you learn during your degree?",
        [],
        true
    ),
    null,
    function(question, questions){
        question.options = difference(LANGUAGES, questions[1].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)