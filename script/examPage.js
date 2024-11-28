class exam {
    constructor() {
        this.questionsData = [];
        this.examContant = document.querySelector(".exam-contant");
        this.nextBtn = document.querySelector(".next-btn");
        this.prevBtn = document.querySelector(".previous-btn");
        this.answerBtn = document.querySelector(".answerBtn");
        this.index = 0;
        this.totalAnswers = 0;
        this.loading = 0;
        this.load = document.querySelector(".loading");
        this.p = document.createElement("p");
        this.loadDiv = document.createElement("div");
        this.load.appendChild(this.loadDiv);
        this.fetchData();
        this.userSide = document.querySelector(".user");

        // this.flagBtn = document.querySelector(".flag");

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
        // this.userSide.appendChild(this.questionFlagDiv);
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

        // this.flagBtn.addEventListener("click", () => {

        //     if (this.questionFlagDiv.style.cssText = "none") {
        //         this.questionFlagDiv.style.cssText = "background-Color:#858585 ;width: 100px;height: 30px;border: none;color: white;font-size: medium;font-weight: bold;border-radius: 8px;cursor: pointer;box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); display: flex;align-items: center;justify-content: center; margin-Bottom:20px; "
        //         this.questionFlagDiv.innerHTML = `<p>Question ${this.index + 1}</p>`;
        //     }
        //     if ()

        // });
        this.examContant.appendChild(div);
        if (this.index == 0) {
            this.prevBtn.style.display = "none";

        } if (this.index == this.questionsData.length - 1) {
            this.nextBtn.style.display = "none";

        }

        this.checkCorrectAnswer(question);
        this.p.textContent = `${this.loading} %`;
        this.load.appendChild(this.p);
        this.p.style.cssText = "font-Weight:50px;position: fixed;font-Size:small; padding:3px  ";

    }

    checkCorrectAnswer(question) {
        const btnA = document.getElementById("btn-ans-1");
        const btnB = document.getElementById("btn-ans-2");
        const btnC = document.getElementById("btn-ans-3");
        const btnD = document.getElementById("btn-ans-4");
        const a = Object.keys(question.options);

        btnA.addEventListener("click", () => {
            this.updateButtonStyles(btnA, [btnB, btnC, btnD]);
            this.handleAnswer(a[0], question.correctAnswer);
            this.updateLoadingStyles();
        });
        btnB.addEventListener("click", () => {
            this.updateButtonStyles(btnB, [btnA, btnC, btnD]);
            this.handleAnswer(a[1], question.correctAnswer);
            this.updateLoadingStyles();
        });
        btnC.addEventListener("click", () => {
            this.updateButtonStyles(btnC, [btnA, btnB, btnD]);
            this.handleAnswer(a[2], question.correctAnswer);
            this.updateLoadingStyles();

        });
        btnD.addEventListener("click", () => {
            this.updateButtonStyles(btnD, [btnA, btnB, btnC]);
            this.handleAnswer(a[3], question.correctAnswer);
            this.updateLoadingStyles();

        });


    }
    updateButtonStyles(selectedBtn, otherBtns) {
        selectedBtn.style.backgroundColor = "rgb(212, 212, 212)";

        otherBtns.forEach(btn => btn.style.backgroundColor = "aliceblue");

        sessionStorage.setItem(`selectedBtn_${this.index}`, selectedBtn.id);
        sessionStorage.setItem(`selectedBtnStyle_${this.index}`, "rgb(212, 212, 212)");

        otherBtns.forEach(btn => {
            sessionStorage.setItem(`btn_${btn.id}_style_${this.index}`, "aliceblue");
        });
    }

    restoreButtonStyles() {
        const selectedBtnId = sessionStorage.getItem(`selectedBtn_${this.index}`);
        const selectedBtnStyle = sessionStorage.getItem(`selectedBtnStyle_${this.index}`);

        if (selectedBtnId && selectedBtnStyle) {
            const selectedBtn = document.getElementById(selectedBtnId);
            if (selectedBtn) {
                selectedBtn.style.backgroundColor = selectedBtnStyle;
            }
        }

        window.querySelectorAll('.answerBtn').forEach(btn => {
            const btnStyle = sessionStorage.getItem(`btn_${btn.id}_style_${this.index}`);
            if (btnStyle) {
                btn.style.backgroundColor = btnStyle;
            }
        });
    }
    updateLoadingStyles() {
        if (this.loading == 10) {
            this.loadDiv.style.cssText = " float: left;width: 10%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";

        } else if (this.loading == 20) {
            this.loadDiv.style.cssText = " float: left;width: 20%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";

        } else if (this.loading == 30) {
            this.loadDiv.style.cssText = " float: left;width: 30%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";


        } else if (this.loading == 40) {
            this.loadDiv.style.cssText = " float: left;width: 40%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";


        } else if (this.loading == 50) {
            this.loadDiv.style.cssText = " float: left;width: 50%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";


        } else if (this.loading == 60) {
            this.loadDiv.style.cssText = " float: left;width: 60%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";


        } else if (this.loading == 70) {
            this.loadDiv.style.cssText = " float: left;width: 70%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";


        } else if (this.loading == 80) {
            this.loadDiv.style.cssText = " float: left;width: 80%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";


        } else if (this.loading == 90) {
            this.loadDiv.style.cssText = " float: left;width: 90%;height: 18px;background-color:  rgb(222, 222, 222);border-radius: 25px;position: relative;";


        } else if (this.loading == 100) {
            this.loadDiv.style.cssText = " float: left;width: 100%;height: 18px;background-color: rgb(222, 222, 222);border-radius: 25px;position: relative;";
            this.loading = 0;


        }

    }

    handleAnswer(selectedOption, correctAnswer) {
        this.loading += 10;

        this.p.textContent = `${this.loading} %`;
        this.load.appendChild(this.p);
        this.p.style.cssText = "font-Weight:50px;position: fixed;font-Size:small; padding:3px  ";

        if (selectedOption === correctAnswer) {
            console.log(`Correct answer: ${correctAnswer}`);
            this.totalAnswers++;
        } else {
            console.log(`Incorrect answer.`);
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




