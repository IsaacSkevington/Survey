QUESTION =     
new QuestionParams(
    new MultipleChoiceQuestion(
        1,
        "What subject did you study at university?",
        [
            "Computer Science/Software Engineering",
            "Maths/Physics/Chemistry/Biology",
            "Other science degree",
            "Other non-science degree",
            "None of the above"
        ],
        true
    )
)
SURVEY.addQuestion(QUESTION)
