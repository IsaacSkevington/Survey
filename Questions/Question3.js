let QUESTION3 =     
new QuestionParams(
    new RankGroup(
        "How useful have these languages been in your career (0-5)",
        "Usefulness",
        function(questions){
            return questions[1].question.answer
        },
        ["Not at all useful", "Rarely useful", "Sometimes Useful", "Very Useful", "Indispensible"],
        true
    ),
    null,
    function(question3, questions){
        question3.getPrompts(questions)
    }
)
SURVEY.addQuestion(QUESTION3)