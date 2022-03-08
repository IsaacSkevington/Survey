QUESTION =     
new QuestionParams(
    new RankGroup(
        18,
        "How much time did you spend learning these frameworks (hours)",
        "Hours",
        [],
        ["0-10", "11-50", "51-100", "101-200", "201-500", "500+"],
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