class exam {
    constructor() {
        this.questionsData = [];
        this.examContant = document.querySelector(".exam-contant");
        this.nextBtn = document.querySelector(".next-btn");
        this.prevBtn = document.querySelector(".previous-btn");
        this.index = 0;
        this.loading = 0;
        this.fetchData();
        this.loadContainer = document.querySelector(".loading");
        this.loadingStyle = document.createElement("div");
        this.loadingStyle.innerHTML = `${this.loading}%`;

        this.loadContainer.appendChild(this.loadingStyle);
        this.currentQuestionAnswered = false;

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

        selectAnswerBnt.forEach((button) => {
            button.addEventListener("click", (event) => {

                selectAnswerBnt.forEach((btn) => btn.classList.remove('active'));

                event.target.classList.add("active");
                // Check if the question is already answered
                if (this.currentQuestionAnswered) return;

                // Mark this question as answered
                this.currentQuestionAnswered = true;
                this.loading = this.loading + 10;
                this.loadingStyle.style.cssText = ` float: left;width:${this.loading}%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;`;
                this.loadingStyle.innerHTML = `${this.loading}%`;

                this.loadContainer.appendChild(this.loadingStyle);

                if (this.loading > 100) {

                    this.loading = 0;
                    this.loadingStyle.innerHTML = `${this.loading}%`;
                    this.loadingStyle.style.cssText = "none";

                }

            });


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
            this.restoreButtonStyles();

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
            this.restoreButtonStyles();

        });

    }


}

let quizApp = new exam();








// checkCorrectAnswer(question) {
//     const btnA = document.getElementById("btn-ans-1");
//     const btnB = document.getElementById("btn-ans-2");
//     const btnC = document.getElementById("btn-ans-3");
//     const btnD = document.getElementById("btn-ans-4");
//     const a = Object.keys(question.options);

//     btnA.addEventListener("click", () => {
//         this.updateButtonStyles(btnA, [btnB, btnC, btnD]);
//         this.handleAnswer(a[0], question.correctAnswer);

//     });
//     btnB.addEventListener("click", () => {
//         this.updateButtonStyles(btnB, [btnA, btnC, btnD]);
//         this.handleAnswer(a[1], question.correctAnswer);
//         this.updateLoadingStyles();

//     });
//     btnC.addEventListener("click", () => {
//         this.updateButtonStyles(btnC, [btnA, btnB, btnD]);
//         this.handleAnswer(a[2], question.correctAnswer);

//     });
//     btnD.addEventListener("click", () => {
//         this.updateButtonStyles(btnD, [btnA, btnB, btnC]);
//         this.handleAnswer(a[3], question.correctAnswer);
//     });
//     this.updateLoadingStyles(this.index);






// }








// handleAnswer(selectedOption, correctAnswer) {


//     if (selectedOption === correctAnswer) {
//         console.log(`Correct answer: ${correctAnswer}`);
//         this.totalAnswers++;
//     } else {
//         console.log(`Incorrect answer.`);
//     }

// }