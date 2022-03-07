let QUESTION =     
new QuestionParams(
    new RankGroup(
        5,
        "How useful have these frameworks been in your career",
        "Usefulness",
        [],
        ["Not at all useful", "Rarely useful", "Sometimes Useful", "Very Useful", "Indispensible"],
        true
    ),
    null,
    function(question, questions){
        question.setPrompts(questions[3].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)