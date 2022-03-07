let QUESTION =     
new QuestionParams(
    new RankGroup(
        11,
        "How much time did you spend learning these languages (hours)",
        "Hours",
        [],
        ["0-10", "11-50", "51-100", "101-200", "201-500", "500+"],
        true
    ),
    null,
    function(question, questions){
        question.setPrompts(questions[9].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)