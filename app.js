//console.log('i am ready...');
const gameArea=document.querySelector('.gameArea');

const btn =document.createElement('button');

const message =document.createElement('div');

const question =document.createElement('div');

message.textContent='click the button to start the game!';

question.classList.add('question');

message.classList.add('message');

const btnNext =document.createElement('button');
btn.textContent="Start Game!";
btnNext.textContent="Next Question";
btnNext.style.display="none";
gameArea.append(message);
gameArea.append(question);
gameArea.append(btn);
gameArea.append(btnNext);

const game ={data:{},cur:''};

const player={questions:0,correct:0, incorrect:0,total:0};

// btn.addEventListener('click',(e)=>{
// console.log(e);
// fetch('dataQA.json').then(res=>
//     {
//         //console.log(res);
//         return res.json();
// }).then(data=>{

//     console.log(data);
// })
// })

//  btn.addEventListener('click',(e)=>
//  {
//      console.log(e);
//      fetch('QuizData.json').then(res=>
//         {    
//            return res.json();
//         }).then(data=>{    
//            console.log(data);
//         })
// });

btn.addEventListener('click',startGame);

btnNext.addEventListener('click',nextQuestion);

function startGame()
{
    btn.style.display='none';
    message.textContent='';
    player.correct=0;
    player.total=0;
    player.incorrect=0;
    player.questions=0;
    loadQuizData('QuizData.json')
    scoreBoard();
}

function loadQuizData(url)
{
    fetch(url).then(res=>
        {    
           return res.json();
        }).then(jsonData=>{    
           //console.log(jsonData.data);
           game.data=jsonData.data;
           //console.log(game.data[0]);
          // createGame(game.data[0]);

          player.total=game.data.length;

          nextQuestion();
        })
}
  
function nextQuestion()
{
    console.log(game.data.length);
    if(game.data.length !=0)
    {
        player.questions++;
        game.cur=game.data.shift();
        //createGame(game.data[0]);
        createGame(game.cur);
    }
    else
    {
        question.innerHTML='Game is Over!';
        btnNext.style.display="none";
    }

    scoreBoard();
    
}

function createGame(val)
{
console.log(val);
question.innerHTML='';
const div=document.createElement('div');
div.classList.add('que');
div.textContent=val.question;
question.append(div);
const divholder=document.createElement('div');
divholder.classList.add('ans');
question.append(divholder);
const answers=val.options;
answers.push(val.answer);
answers.sort(()=>{

    return 0.5 - Math.random();
})
answers.forEach(element => {
    console.log(element);
    const span=document.createElement('span');
    span.textContent=element;
    span.classList.add('box');
    span.classList.add('boxA');
    divholder.append(span);
    span.addEventListener('click',(e)=>{
        console.log(element);
        elebox=document.querySelectorAll('box');

        elebox.forEach((eleElt)=>{
            eleElt.classList.remove('boxA');
            eleElt.style.backgroundColor='#ddd';
            eleElt.style.color='white';
        })
        if(element == val.answer)
        {
            span.style.backgroundColor='green';
            console.log('your are right');
            player.correct++;
        }
        else
        {
            span.style.backgroundColor='red';
            console.log('your are wrong');
            player.incorrect++;
        }
       scoreBoard();
        btnNext.style.display="block";

        divholder.addEventListener('click',(e)=>{
            e.stopPropagation();
        },true)
    })
});
console.log(answers);
}


function scoreBoard()
{
    message.innerHTML=`${player.questions} out of ${player.total} <br> Correct ${player.correct}
    Wrong ${player.incorrect}
    `
}