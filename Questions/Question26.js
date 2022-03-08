QUESTION =     
new QuestionParams(
    new RankGroup(
        26,
        "What is your opinion on the following statements about learning languages and frameworks?",
        "Opinion",
        [
            "My team's dynamic is negatively affected by learning a new technology",
            "Learning a new technology as a team is easier than learning it alone",
            "All members of my team gain an equal amount from learning a new technology",
            "My team invests a significant amount of money into learning new technologies",
            "New team members are more likely to be hired if they know the technology the team currently uses"
        ],
        ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        true
    ),
    function(questions){
        return questions[24].question.answer == "No"
    },
    null
)
SURVEY.addQuestion(QUESTION)