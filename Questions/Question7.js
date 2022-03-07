let QUESTION7 =     
new QuestionParams(
    new RankGroup(
        7,
        "How useful have these languages been in your career",
        "Usefulness",
        [],
        ["Not at all useful", "Rarely useful", "Sometimes Useful", "Very Useful", "Indispensible"],
        true
    ),
    null,
    function(question7, questions){
        question7.setPrompts(questions[5].question.answer)
    }
)
SURVEY.addQuestion(QUESTION7)