const quizData = [
    {
        question:"How old is G?",
        a:'10',
        b:'88',
        c:'106',
        d:'old as fuk which is 26',
        correct:'d'

    },{
        question:'what is the best programming langauge?',
        a:'java',
        b:'python',
        c:'c',
        d:'JavaScript',
        correct:'a'
    },{
        question:'will eddie yu make to medical school?',
        a:'yes',
        b:'no',
        c:'maybe',
        d:'None of above',
        correct:'a'
    },{
        question:'when will i make back to China?',
        a:'October 2021',
        b:'December 2021',
        c:'Nov 2021',
        d:'None of above',
        correct:'a'
    }
]

const questionElement = document.getElementById('question');
const quiz = document.getElementById('quiz');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answers = document.querySelectorAll(".answer");

let currentQuestion = 0;
let score = 0;
loadQuestions();
function loadQuestions(){
    deselectChoices();
    const currQuiz = quizData[currentQuestion];
    questionElement.innerHTML = currQuiz.question;
    a_text.innerHTML = currQuiz.a;
    b_text.innerHTML = currQuiz.b;
    c_text.innerHTML = currQuiz.c;
    d_text.innerHTML = currQuiz.d;
    d_text.style.display= 'initial';

}
function getSelected(){
    let answer = undefined;
    answers.forEach((answerEl) =>{
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}
function deselectChoices(){
    answers.forEach((answerEl) =>{
        if(answerEl.checked){
            answerEl.checked = false;
        }
    });
}
submitBtn.addEventListener('click', () =>{

    const answer = getSelected();
    console.log(answer);
    
    if(answer) {
        if(answer === quizData[currentQuestion].correct){
            score++;
        }
    
        currentQuestion++;
        if(currentQuestion < quizData.length){
            loadQuestions();
        }else{
            quiz.innerHTML=`<h2>You scored ${score} out of ${quizData.length}</h2>
            <button id='closebutton'>Close</button>`;
            const closebutton = document.getElementById('closebutton');
            closebutton.addEventListener('click', () =>{
                if (confirm("Close Window?")) {
                    close();
                }
            });
        }
    }
});