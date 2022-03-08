QUESTION =     
new QuestionParams(
    new RankGroup(
        14,
        "How has using these languages affected the speed of your workflow?",
        "New speed of workflow",
        [],
        ["Much slower", "Slower", "No Change", "Faster", "Much Faster"],
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