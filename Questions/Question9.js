QUESTION =     
new QuestionParams(
    new RankGroup(
        9,
        "How useful have these frameworks been in your career?",
        "Usefulness",
        [],
        ["Not at all useful", "Rarely useful", "Sometimes Useful", "Very Useful", "Indispensible"],
        true
    ),
    function(questions){
        return questions[7].question.answer.length == 0
    },
    function(question, questions){
        question.setPrompts(questions[7].question.answer)
    }
)
SURVEY.addQuestion(QUESTION)