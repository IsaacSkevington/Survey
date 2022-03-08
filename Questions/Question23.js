QUESTION =     
new QuestionParams(
    new RankGroup(
        23,
        "Of the frameworks you have learnt, do you think your time was well spent learning them?",
        "",
        [],
        ["Yes", "No", "Not Sure"],
        true
    ),
    function(questions){
        return (questions[3].question.answer.length + questions[7].question.answer.length + questions[15].question.answer.length) == 0
    },
    function(question, questions){
        question.setPrompts(intersection(intersection(questions[3].question.answer, questions[7].question.answer),  questions[15].question.answer))
    }
)
SURVEY.addQuestion(QUESTION)