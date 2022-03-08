QUESTION =     
new QuestionParams(
    new RankGroup(
        17,
        "How useful have these frameworks been in your career",
        "Usefulness",
        [],
        ["Not at all useful", "Rarely useful", "Sometimes Useful", "Very Useful", "Indispensible"],
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