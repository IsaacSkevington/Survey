QUESTION =     
new QuestionParams(
    new CheckBoxQuestion(
        8,
        "Which of the following frameworks did you learn during your degree?",
        [],
        true
    ),
    null,
    function(question, questions){
        question.options = difference(FRAMEWORKS, questions[3].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)