QUESTION =     
new QuestionParams(
    new RankGroup(
        3,
        "How useful have these languages been in your career",
        "Usefulness",
        [],
        ["Not at all useful", "Rarely useful", "Sometimes Useful", "Very Useful", "Indispensible"],
        true
    ),
    null,
    function(question, questions){
        question.setPrompts(questions[1].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)