function checkAnswers() {
    let score = 0;
    let totalQuestions = document.querySelectorAll('[id^="card"]').length;
    let quizId = null;
    let heading2 = document.querySelector('h2');
    let heading1 = document.querySelector('h1');

    // Auto-detect the current page
    if (heading2 && heading2.innerText.includes("Quiz 1")) quizId = "quiz1";
    else if (heading2 && heading2.innerText.includes("Quiz 2")) quizId = "quiz2";
    else if (heading2 && heading2.innerText.includes("Quiz 3")) quizId = "quiz3";
    else if (heading2 && heading2.innerText.includes("Quiz 4")) quizId = "quiz4";
    else if (heading1 && heading1.innerText.includes("Final Exam")) quizId = "finalQuiz";

    // Grade the questions on the screen
    for (let i = 1; i <= totalQuestions; i++) {
        let selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        let card = document.getElementById(`card${i}`);
        let feedback = document.getElementById(`feedback${i}`);

        card.classList.remove('border', 'border-success', 'border-danger', 'border-3');

        if (!selectedAnswer) {
            alert(`Please answer Question ${i} before submitting!`);
            return; 
        }

        if (selectedAnswer.value === "correct") {
            score++;
            card.classList.add('border', 'border-success', 'border-3'); 
            feedback.innerHTML = "✅ Correct!";
            feedback.className = "fw-bold mt-3 text-success";
        } else {
            card.classList.add('border', 'border-danger', 'border-3'); 
            feedback.innerHTML = "❌ Incorrect.";
            feedback.className = "fw-bold mt-3 text-danger";
        }
    }

    // Save the current score to memory
    if(quizId) {
        localStorage.setItem(quizId, score + " / " + totalQuestions);
    }

    let resultBox = document.getElementById("resultBox");

    // ==========================================
    // 🏆 CUMULATIVE FINAL EXAM GRADING SCREENS
    // ==========================================
    if (quizId === "finalQuiz") {
        let q1 = parseInt((localStorage.getItem('quiz1') || "0").split(" ")[0]);
        let q2 = parseInt((localStorage.getItem('quiz2') || "0").split(" ")[0]);
        let q3 = parseInt((localStorage.getItem('quiz3') || "0").split(" ")[0]);
        let q4 = parseInt((localStorage.getItem('quiz4') || "0").split(" ")[0]);

        let cumulativeScore = score + q1 + q2 + q3 + q4;
        let cumulativePercentage = Math.round((cumulativeScore / 35) * 100);

        // --- NEW: Star Rating & Adjective Logic ---
        let stars = "";
        let adjective = "";
        
        if (cumulativePercentage >= 90) {
            stars = "⭐⭐⭐⭐⭐";
            adjective = "Brilliant Master!";
        } else if (cumulativePercentage >= 80) {
            stars = "⭐⭐⭐⭐";
            adjective = "Awesome Scholar!";
        } else if (cumulativePercentage >= 75) {
            stars = "⭐⭐⭐";
            adjective = "Good Learner!";
        } else if (cumulativePercentage >= 60) {
            stars = "⭐⭐";
            adjective = "Developing Student!";
        } else if (cumulativePercentage >= 50) {
            stars = "⭐";
            adjective = "Brave Beginner!";
        } else {
            stars = "🌱"; // A growing seed for under 50%
            adjective = "Still Growing!";
        }
        
        // The HTML for the new star badge
        let starBadgeHTML = `<h4 class="mb-3">${stars} <span class="badge bg-light text-dark shadow-sm ms-2">${adjective}</span></h4>`;

        // Hide the quiz form and old text
        document.querySelectorAll('.card.lesson-card').forEach(c => c.style.display = 'none');
        document.querySelector('button[onclick="checkAnswers()"]').style.display = 'none';
        document.getElementById('pastScoresBoard').style.display = 'none';
        document.querySelector('p.text-center.mb-5.fs-5').style.display = 'none';
        
        resultBox.classList.remove("mt-4");
        
        // Inject the Screens (Now featuring the starBadgeHTML)
        if (cumulativePercentage === 100) {
            resultBox.innerHTML = `
                <div class="card p-5 text-center shadow-lg" style="background: linear-gradient(135deg, #FFD700, #ff8c00); color: white; border: none; border-radius: 20px;">
                    <h1 class="display-1">🏆</h1>
                    <h1 class="fw-bold mb-2">Excellent! Flawless Victory!</h1>
                    ${starBadgeHTML}
                    <h3 class="bg-white text-dark py-2 px-4 rounded-pill d-inline-block mx-auto mb-4">Total Score: 100% (${cumulativeScore}/35)</h3>
                    <p class="fs-4">You have mastered the entire English Basics course without a single mistake. This is an incredible achievement!</p>
                    <a href="index.html" class="btn btn-light btn-lg mt-4 text-warning fw-bold fs-4">Return Home as a Champion 🌟</a>
                </div>`;
        } else if (cumulativePercentage >= 90) {
            resultBox.innerHTML = `
                <div class="card p-5 text-center shadow-lg" style="background: linear-gradient(135deg, #28a745, #20c997); color: white; border: none; border-radius: 20px;">
                    <h1 class="display-1">🎉</h1>
                    <h1 class="fw-bold mb-2">Great Work!</h1>
                    ${starBadgeHTML}
                    <h3 class="bg-white text-dark py-2 px-4 rounded-pill d-inline-block mx-auto mb-4">Total Score: ${cumulativePercentage}% (${cumulativeScore}/35)</h3>
                    <p class="fs-4">You have successfully completed and learned from the course. We are so proud of your hard work!</p>
                    <a href="index.html" class="btn btn-light btn-lg mt-4 text-success fw-bold fs-4">Return Home 🏡</a>
                </div>`;
        } else if (cumulativePercentage >= 80) {
            resultBox.innerHTML = `
                <div class="card p-5 text-center shadow-lg" style="background: linear-gradient(135deg, #17a2b8, #0dcaf0); color: white; border: none; border-radius: 20px;">
                    <h1 class="display-1">👍</h1>
                    <h1 class="fw-bold mb-2">Good Job!</h1>
                    ${starBadgeHTML}
                    <h3 class="bg-white text-dark py-2 px-4 rounded-pill d-inline-block mx-auto mb-4">Total Score: ${cumulativePercentage}% (${cumulativeScore}/35)</h3>
                    <p class="fs-4">You did well! You have completed the course, but there is always a little room to improve.</p>
                    <a href="index.html" class="btn btn-light btn-lg mt-4 text-info fw-bold fs-4">Return Home 🏡</a>
                </div>`;
        } else if (cumulativePercentage >= 75) {
            resultBox.innerHTML = `
                <div class="card p-5 text-center shadow-lg" style="background: linear-gradient(135deg, #fd7e14, #ffc107); color: white; border: none; border-radius: 20px;">
                    <h1 class="display-1">📚</h1>
                    <h1 class="fw-bold mb-2">You Passed!</h1>
                    ${starBadgeHTML}
                    <h3 class="bg-white text-dark py-2 px-4 rounded-pill d-inline-block mx-auto mb-4">Total Score: ${cumulativePercentage}% (${cumulativeScore}/35)</h3>
                    <p class="fs-4">You completed the course, but it is highly recommended to go through the modules you had difficulty in again to strengthen your English.</p>
                    <a href="index.html" class="btn btn-light btn-lg mt-4 text-warning fw-bold fs-4">Return Home 🏡</a>
                </div>`;
        } else {
            resultBox.innerHTML = `
                <div class="card p-5 text-center shadow-lg" style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; border: none; border-radius: 20px;">
                    <h1 class="display-1">💔</h1>
                    <h1 class="fw-bold mb-2">Course Failed</h1>
                    ${starBadgeHTML}
                    <h3 class="bg-white text-dark py-2 px-4 rounded-pill d-inline-block mx-auto mb-4">Total Score: ${cumulativePercentage}% (${cumulativeScore}/35)</h3>
                    <p class="fs-4">Don't give up! Please go back and retake the modules and quizzes to improve your understanding.</p>
                    <a href="index.html" class="btn btn-light btn-lg mt-4 text-danger fw-bold fs-4">Retry Course 🔄</a>
                </div>`;
        }
    } 
    // ==========================================
    // NORMAL MODULE QUIZ GRADING
    // ==========================================
    else {
        let percentage = (score / totalQuestions) * 100;
        if (percentage === 100) {
            resultBox.innerHTML = `🏆 Perfect Score! You got ${score} out of ${totalQuestions}! 🏆`;
            resultBox.style.color = "green";
        } else if (percentage >= 60) {
            resultBox.innerHTML = `Great job! You scored ${score} out of ${totalQuestions}.`;
            resultBox.style.color = "orange";
        } else {
            resultBox.innerHTML = `You scored ${score} out of ${totalQuestions}. Keep practicing!`;
            resultBox.style.color = "red";
        }

        let nextBtn = document.getElementById("nextModuleBtn");
        if(nextBtn) {
            nextBtn.classList.remove("d-none");
        }
    }
}

// --- The Gatekeeper function for the Final Exam ---
function checkFinalExamAccess() {
    let q1 = localStorage.getItem('quiz1');
    let q2 = localStorage.getItem('quiz2');
    let q3 = localStorage.getItem('quiz3');
    let q4 = localStorage.getItem('quiz4');

    function getScoreNumber(scoreString) {
        if (!scoreString) return 0;
        return parseInt(scoreString.split(" ")[0]); 
    }

    let s1 = getScoreNumber(q1);
    let s2 = getScoreNumber(q2);
    let s3 = getScoreNumber(q3);
    let s4 = getScoreNumber(q4);

    if (!q1 || !q2 || !q3 || !q4) {
        alert("🔒 LOCKED! You must complete and click 'Submit' on Quizzes 1, 2, 3, and 4 before taking the Final Exam!");
    } else if (s1 >= 3 && s2 >= 3 && s3 >= 3 && s4 >= 3) {
        window.location.href = "finalquiz.html"; 
    } else {
        alert("🔒 LOCKED! You must get at least 3 answers correct on EVERY module quiz to unlock the Final Exam. Please go back and retry the quizzes to improve your score!");
    }
}

// --- Auto-load past scores when the Final Exam page opens ---
document.addEventListener("DOMContentLoaded", function() {
    let scoreBoard = document.getElementById("pastScoresBoard");
    
    if(scoreBoard) {
        let q1 = localStorage.getItem('quiz1') || "❌ Not Done";
        let q2 = localStorage.getItem('quiz2') || "❌ Not Done";
        let q3 = localStorage.getItem('quiz3') || "❌ Not Done";
        let q4 = localStorage.getItem('quiz4') || "❌ Not Done";
        
        scoreBoard.innerHTML = `
            <div class="alert alert-warning shadow-sm border-warning mb-5">
                <h4 class="text-center text-dark mb-3">📊 Your Previous Module Scores</h4>
                <div class="row text-center fs-5 text-dark">
                    <div class="col-md-3"><strong>Quiz 1:</strong><br> <span class="text-success fw-bold">${q1}</span></div>
                    <div class="col-md-3"><strong>Quiz 2:</strong><br> <span class="text-success fw-bold">${q2}</span></div>
                    <div class="col-md-3"><strong>Quiz 3:</strong><br> <span class="text-success fw-bold">${q3}</span></div>
                    <div class="col-md-3"><strong>Quiz 4:</strong><br> <span class="text-success fw-bold">${q4}</span></div>
                </div>
            </div>
        `;
    }
});
