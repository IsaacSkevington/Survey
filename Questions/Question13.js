let QUESTION =     
new QuestionParams(
    new RankGroup(
        11,
        "What percentage of this time was during work hours",
        "Percentage",
        [],
        ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"],
        true
    ),
    null,
    function(question, questions){
        question.setPrompts(questions[9].question.answer + "(% of " + questions[12].answer[0] + " hours)")
    }
)
SURVEY.addQuestion(QUESTION)