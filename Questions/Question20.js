QUESTION =     
new QuestionParams(
    new RankGroup(
        20,
        "How has using these frameworks affected the speed of your workflow?",
        "New speed of workflow",
        [],
        ["Much slower", "Slower", "No Change", "Faster", "Much Faster"],
        true
    ),
    function(questions){
        return questions[15].question.answer.length == 0
    },
    function(question, questions){
        question.setPrompts(questions[15].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)