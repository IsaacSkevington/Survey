let QUESTION5 =     
new QuestionParams(
    new RankGroup(
        "How useful have these frameworks been in your career (0-5)",
        "Usefulness",
        function(questions){
            return questions[3].question.answer
        },
        ["Not at all useful", "Rarely useful", "Sometimes Useful", "Very Useful", "Indispensible"],
        true
    ),
    null,
    function(question5, questions){
        question5.getPrompts(questions)
    }
)
SURVEY.addQuestion(QUESTION5)