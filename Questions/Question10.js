QUESTION =     
new QuestionParams(
    new CheckBoxQuestion(
        10,
        "Which of the following languages did you learn as part of your job?",
        [],
        true
    ),
    null,
    function(question, questions){
        question.options = difference(difference(LANGUAGES, questions[1].question.answer), questions[5].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)