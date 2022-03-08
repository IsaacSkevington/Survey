QUESTION =     
new QuestionParams(
    new CheckBoxQuestion(
        16,
        "Which of the following frameworks did you learn as part of your job?",
        [],
        true,
        true
    ),
    null,
    function(question, questions){
        question.options = difference(difference(FRAMEWORKS, questions[3].question.answer), questions[7].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)