QUESTION =     
new QuestionParams(
    new RankGroup(
        19,
        "What percentage of this time was during work hours?",
        "Percentage",
        [],
        ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"],
        true
    ),
    function(questions){
        return questions[15].question.answer.length == 0
    },
    function(question, questions){
        var extraPrompts = []
        for(var i = 0; i < questions[17].question.answer.length; i++){
            extraPrompts.push("(% of " + questions[17].question.answer[i][0] + " hours)")
        }
        question.setPrompts(questions[15].question.answer)
        question.setExtraPrompts(extraPrompts)
    }
)
SURVEY.addQuestion(QUESTION)