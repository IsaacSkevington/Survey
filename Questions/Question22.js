QUESTION =     
new QuestionParams(
    new RankGroup(
        22,
        "Of the languages you have learnt, do you think your time was well spent learning them?",
        "",
        [],
        ["Yes", "No", "Not Sure"],
        true
    ),
    function(questions){
        return (questions[1].question.answer.length + questions[5].question.answer.length + questions[9].question.answer.length) == 0
    },
    function(question, questions){
        question.setPrompts(intersection(intersection(questions[1].question.answer, questions[5].question.answer),  questions[9].question.answer))
    }
)
SURVEY.addQuestion(QUESTION)