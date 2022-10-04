# Songbird Quiz Application

Welcome to Songbird, a quiz application designed for bird recognition based on their voices. This application comprises three main pages:

1.  **Home Page**: Sets the overall impression of the application with artistic design, animations, background video, and other attention-grabbing effects. It includes a header with the application logo and navigation links to the home page and quiz page. The footer contains a link to the author's GitHub, the year of creation, and the course logo with a link to the course.
    
2.  **Quiz Page**: Consists of four main sections:
    
    -   Upper Panel: Displays the list of questions and the current game score.
    -   Current Question Block: Includes an audio player with the bird's voice recording and placeholders for the bird's name and image. When the player selects the correct answer, the bird's name and image are displayed.
    -   Answer Options Block: Contains a list of names of six different birds.
    -   Bird Description Block: Encourages listening to the player and choosing a bird from the list. When the player selects an answer option, information about the selected bird is displayed: image, Russian and Latin name, audio recording of the voice, and brief information.
3.  **Results Page**: Appears after completing the quiz, showing the points earned during the game. If the maximum possible number of points is not achieved, the player is prompted to retry the quiz. There is a button redirecting to the start of the game. If the maximum possible number of points is achieved, a congratulatory message and a notification of the end of the game are displayed.
    

## Gameplay Mechanism

-   A bird in the question block is randomly selected.
-   When clicking on an answer option with the bird's name, information about it is displayed in the bird description block.
-   If the player selects the correct answer, the bird's name and image are displayed in the question block.
-   At the beginning of the game, the score is 0. If the player gives the correct answer on the first attempt, their score increases by 5 points. Each subsequent attempt awards one fewer point, with the player receiving 0 points if the correct answer is only given on the sixth attempt. Points for all questions are summed up.
-   Sound and color indicators are used for correct and incorrect player answers.
-   When the player gives the correct answer, the "Next" button is activated, allowing them to move to the next question.
-   After the last question, the results page is displayed.