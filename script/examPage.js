class exam {
    constructor() {
        this.questionsData = [];
        this.examContant = document.querySelector(".exam-contant");
        this.nextBtn = document.querySelector(".next-btn");
        this.prevBtn = document.querySelector(".previous-btn");
        this.index = 0;
        this.loading = 0;
        this.loadContainer = document.querySelector(".loading");
        this.loadingStyle = document.createElement("div");
        this.loadingStyle.innerText = `${this.loading}%`;
        this.loadContainer.appendChild(this.loadingStyle);
        this.score = 0;
        this.submit = document.getElementById("submit");
        this.timerElement = document.querySelector(".timer");
        this.timeRemaining = 0.5 * 60; // 5 minutes in seconds
        this.fetchData();
        this.startTimer(); // Start the timer
    }
    async fetchData() {
        try {
            const request = await fetch(`/questionsData.json`);
            if (!request.ok) throw new Error("can't get data")
            const data = await request.json();
            this.questionsData = this.shuffle(data.questions).slice(0, 10);

            this.displayExamQuestions();
            this.nextButton();
            this.prevButton();

        } catch (err) {
            console.error(err.massage);
        }
    }
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    startTimer() {
        const updateTimer = () => {
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;

            // Update the timer display
            this.timerElement.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            localStorage.setItem("finalScore", this.score);

            // Check if the timer has reached zero
            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                window.location.replace("timeOutPage.html");
            } else {
                this.timeRemaining--;
            }
        };

        // Call updateTimer every second
        updateTimer(); // Update immediately so the timer shows 05:00 at start
        this.timerInterval = setInterval(updateTimer, 1000);
    }

    async displayExamQuestions() {
        const question = this.questionsData[this.index];
        this.examContant.innerHTML = "";
        const div = document.createElement("div");
        this.currentQuestionAnswered = false;

        div.innerHTML = `
                <div class="question"> 
                    <h4>Question ${this.index + 1} :</h4>
                    <h3> ${question.question}</h3>
                </div>
                <div class="answers">     
                    <div class="answer-A"><button  id="btn-ans-1" class="answerBtn">${question.options.A}</button>  </div>
                    <div class="answer-B"> <button id="btn-ans-2" class="answerBtn">${question.options.B}</button>  </div>
                    <div class="answer-C"><button id="btn-ans-3" class="answerBtn">${question.options.C}</button>  </div>
                    <div class="answer-D"> <button id="btn-ans-4" class="answerBtn">${question.options.D}</button>    </div>
                </div> 
                `;

        this.examContant.appendChild(div);
        const selectAnswerBnt = div.querySelectorAll(".answerBtn");
        const savedAnswer = localStorage.getItem(`question-${this.index}`);
        const savedAnswerBackground = localStorage.getItem(`question-${this.index}-color`);



        selectAnswerBnt.forEach((button) => {
            if (button.innerHTML === savedAnswer && savedAnswerBackground) {
                button.style.backgroundColor = savedAnswerBackground;
            }
            button.addEventListener("click", (event) => {
                selectAnswerBnt.forEach((btn) => {
                    btn.style.backgroundColor = "";
                });

                const backgroundColorBtn = " rgb(222, 222, 222)";
                event.target.style.backgroundColor = backgroundColorBtn;
                localStorage.setItem(`question-${this.index}`, event.target.innerText);
                localStorage.setItem(`question-${this.index}-color`, backgroundColorBtn);
                this.calcResult(button.innerHTML, question.correctAnswer);

                this.loading = this.loading + 10;
                this.loadingStyle.style.cssText = ` float: left;width:${this.loading}%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;`;
                this.loadingStyle.innerText = `${this.loading}%`;

                this.loadContainer.appendChild(this.loadingStyle);

                if (this.loading > 100) {

                    this.loading = 0;
                    this.loadingStyle.innerText = `${this.loading}%`;
                    this.loadingStyle.style.cssText = "none";

                }

            });

        });


        this.submit.addEventListener("click", () => {
            localStorage.setItem("finalScore", this.score);
            if (this.score < 10) {
                window.location.replace("badScorePage.html");

            }
            else if (this.score === 10) {
                window.location.replace("fulMarkScore.html");
            }

        });


        if (this.index == 0) {
            this.prevBtn.style.display = "none";

        } if (this.index == this.questionsData.length - 1) {
            this.nextBtn.style.display = "none";

        }

    }
    nextButton() {

        this.nextBtn.addEventListener("click", () => {
            this.prevBtn.style.cssText = 'display:block;';

            this.index++;

            if (this.index < this.questionsData.length) {


                this.prevBtn.style.cssText = 'display:block;';
                this.displayExamQuestions();


            } else {
                this.nextBtn.style.cssText = 'display :none; ';
                this.prevBtn.style.cssText = 'display:block;';

            }

        });


    }
    prevButton() {

        this.prevBtn.addEventListener("click", () => {

            this.nextBtn.style.cssText = 'display :block; ';

            if (this.index > 0) {

                this.index--;
                this.nextBtn.style.cssText = "display :block; ";
                this.displayExamQuestions();

            } else {
                this.nextBtn.style.cssText = 'display :block; ';

                this.prevBtn.style.cssText = 'display:none;';

            }

        });

    }


    calcResult(choseenAnswer, correctAnswer) {
        if (choseenAnswer == correctAnswer) {
            this.score++;
        }

        return this.score;
    }

}

let quizApp = new exam();
