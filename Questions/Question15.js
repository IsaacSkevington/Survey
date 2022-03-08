QUESTION =     
new QuestionParams(
    new RankGroup(
        15,
        "How has using these languages affected the accuracy (number of bugs) of your workflow?",
        "Accuracy",
        [],
        ["Much less accurate", "Less accurate", "No Change", "More accurate", "Much more accurate"],
        true
    ),
    function(questions){
        return questions[9].question.answer.length == 0
    },
    function(question, questions){
        question.setPrompts(questions[9].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)