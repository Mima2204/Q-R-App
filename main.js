// Select Element
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".spans");
let quizArea = document.querySelector(".quiz-area");
let AnswersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resulsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;

function getQuestions(){

        let myRequest = new XMLHttpRequest();

        myRequest.onreadystatechange = function() {

            if (this.readyState === 4 && this.status === 200){

                let questionsObject = JSON.parse(this.responseText);
                let qCount = questionsObject.length;
                console.log(qCount);
                // creat bullets + set questionsObjectquestions count
                createBbullets(qCount);
                // Add Question Data
                addQuestionData(questionsObject[currentIndex], qCount);

                // start CountDown
                countDown(5, qCount);

                submitButton.style.width = "100%";
                // Click On Submit
                submitButton.onclick = function() {

                    // Get Right Answer
                let theRightAnswer = questionsObject[currentIndex].right_inswer;
                

                // index 
                currentIndex++;
                // Check The Reponse
                checkAnswer(theRightAnswer, qCount);

                // Remove Previous Question
                quizArea.innerHTML = "";
                AnswersArea.innerHTML = "";

                // Add Question Data
                addQuestionData(questionsObject[currentIndex], qCount);

                // Handle Bullets Class
                handleBullets();

                // start CountDown
                clearInterval(countDownInterval);
                countDown(5, qCount);

                // Show Resultas
                showResultats(qCount);


                };

            }
        };

        myRequest.open("GET","html_questions.json", true);
        myRequest.send();
    }

    getQuestions();

    function createBbullets(num) {

        countSpan.innerHTML = num;
    console.log(num);
                //create spans 

        for (let i = 0; i < num; i++){
                // create span
        let theBullet = document.createElement("span");

                // check of is First SpanS
        if (i === 0){
            theBullet.className = 'on';
        }
        // Append Bullets to Main Bullets container 

        bulletsSpanContainer.appendChild(theBullet);
    }

    }

    //
    //

    function   addQuestionData(obj, count){

    // Creat H2 Questions titel
                if (currentIndex < count){

                    let questionTitle = document.createElement("h2");

    // create question  Text 
    let questionText = document.createTextNode(obj['title']);

        // Append Text To Heading
        questionTitle.appendChild(questionText);

        // Append The H2 To Quiz Area 
        quizArea.appendChild(questionTitle);

        // Create the Answers

        for (let i = 1; i <= 4; i++){
        
            // Creat answers div
            let mainDiv = document.createElement("div");

            // Add class to div
            mainDiv.className = 'answer';

            // Creat Radion Input
            let radioInput = document.createElement("input");

            // Add Type + Name + Id + Data -Attribute
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // Make First option Selected
            if (i ===1 ){

                radioInput.checked = true;
            }

            // Creat Label
            let theLabel = document.createElement("label");

            // Add For Attribute
            theLabel.htmlFor = `answer_${i}`;

            // Creat lebal text 
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);

            // Add The Text To Label'
            theLabel.appendChild(theLabelText);

            // Add Input  + Label to Main Div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);

            // Append All Divs  to Answers Area
            AnswersArea.appendChild(mainDiv);

    }


                }

        }

    function  checkAnswer(rAnswer, count) {

                let answers = document.getElementsByName("question");
                let theChoosenAnswer;

                for (let i = 0; i< answers.length; i++){
                    if (answers[i].checked){
                        
                        // choosing Answer
                        theChoosenAnswer = answers[i].dataset.answer;
                    }

                }

                
                if  (rAnswer === theChoosenAnswer){

                    rightAnswers++;
                    console.log("goed Answer");

                }
        
                

    }

    function  handleBullets(){
        let bulletSpans = document.querySelectorAll(".bullets .spans span");
        let arrayOfSpans = Array.from( bulletSpans);
        arrayOfSpans.forEach((span, index) => {
            if (currentIndex === index) {
                span.className = "on";
            }
        })
    }

    function showResultats(count){
            let theResults;
            if (currentIndex === count){

            quizArea.remove();
            AnswersArea.remove();
            submitButton.remove();
            bullets.remove();

            if (rightAnswers > (count / 2) && rightAnswers < count ) {

                theResults = `<span class="goed">Good</span>, <span>${rightAnswers}</span> From <span>${count}</sapn> Is Good.`;

            }else if (rightAnswers === count){

                theResults = `<span class="perfect">Perfect</span>, All Answers Is Good.`;

            }else {

                theResults = `<span class="bad">Bad</span>, See Tutorials Educative. You Have  :<span>${rightAnswers}</span> From <span>${count}\</span>`;
            }
            
            resulsContainer.innerHTML = theResults;
            resulsContainer.style.padding = "10px";
            resulsContainer.style.backgroundColor = "white";
            resulsContainer.style.marginTop = "10px";
    }
    }

    function countDown(duration, count){

        if (currentIndex < count){

            let minute, seconds;
            countDownInterval = setInterval(function () { 
            minute = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minute = minute < 10 ? `0${minute}` : minute ;
            seconds = seconds < 10 ? `0${seconds}`:seconds;

            countdownElement.innerHTML = `${minute}:${seconds}`;

            if (--duration < 0) {

                clearInterval(countDownInterval);
                submitButton.click();
            }
            },1000);

    }
    }