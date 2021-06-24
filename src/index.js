import('@/styles.css')

const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const restartBtn = document.querySelector('#restart-btn')
const backBtn = document.querySelector('#return-btn')
const leaderBtn = document.querySelector('#leaderboard')
const timeList = document.querySelector('.time-list')
const formForScore = document.querySelector('#formScore')

const timer = document.querySelector('#time')
const board = document.querySelector('#board')


const circleColors = ['linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)', 'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(37,255,143,1) 50%, rgba(253,187,45,1) 100%)', 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)']


let score = 0, time = 0, aim = 0, bonus = 0
let fullTime
window.score = 0


//Обработка кнопки "Начать игру"
startBtn.addEventListener('click',(event) => {
    event.preventDefault()
    screens[0].classList.add('up')
    window.navigator.vibrate(200)
})

//Обработка кнопок выбора времени
timeList.addEventListener('click', (event)=> {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        fullTime = time
        screens[1].classList.add('up')
        window.navigator.vibrate(200)
        startGame()
    }
})

//Обработка кликов по объектам борды
board.addEventListener('click', (event) => {
    //Если клик по кружку
    if (event.target.classList.contains('circle')){
        aim++
        event.target.remove()
        createRandomCircle()

        let selectPoint = document.createElement("audio");
        selectPoint.src = "static/sounds/select_sound.mp3";
        selectPoint.volume = 0.2
        selectPoint.play()
        setTimeout(() => {
            selectPoint.remove()

        }, 500)
        window.navigator.vibrate(150)
    }
    //Если клик по бонусу
    if (event.target.classList.contains('bonus')){
        bonus++
        event.target.remove()

        let selectPoint = document.createElement("audio");
        selectPoint.src = "static/sounds/select_sound.mp3";
        selectPoint.volume = 0.2
        selectPoint.play()
        setTimeout(() => {
            selectPoint.remove()
        }, 500)
        window.navigator.vibrate([100, 30, 100])
    }
    //Если клик по бомбе


})

//Обработка кнопки "Еще разок"
restartBtn.addEventListener('click', (event)=> {
    window.navigator.vibrate(200)
    resetGame()
})

leaderBtn.addEventListener('click',(event) => {
    event.preventDefault()
    window.navigator.vibrate(200)

    goToLeaders()

})

backBtn.addEventListener('click',(event) => {
    window.navigator.vibrate(200)

    event.preventDefault()
    screens[2].classList.remove('up')
})



function startGame() {
    setTime(time)
    console.log(time)
    let warming = 3
    let doWarming = setInterval(() => {
        if (warming > 0) {

            let soundWarm = document.createElement("audio");
            soundWarm.src = `./static/sounds/cd${warming}.wav`;
            soundWarm.volume = 0.2
            soundWarm.play()
            setTimeout(() => {
                soundWarm.remove()

            }, 500)

            board.innerHTML = `<h1><span class="primary">${warming}</span></h1>`
        } else {
            board.innerHTML = ''
            clearInterval(doWarming)
        }
        warming--
    }, 1000)

    let mainGame = setTimeout(() => {
        let timeCheck = setInterval(() => {
        decreaseTime()
        if (time < 0) {
            clearTimeout(mainGame)
            clearInterval(timeCheck)
        }
    }, 1000)

        createRandomCircle()

        let makeBonus = setInterval(()=> {
            let bonus = board.querySelector('.bonus')
            if (bonus) {
                bonus.remove()
            } else if ((time > 2) && (time < fullTime-1)) {
                createBonus()
                console.log('bonus from start')
            } else {
                clearInterval(makeBonus)
            }

        }, getRandomValue(2,3) * 1000)

    setTime(time)
    }, (warming+1) * 1000 +100)
}

function decreaseTime () {
    if (time === 0) {
        finishGame()
        let selectPoint = document.createElement("audio");
        selectPoint.src = `./static/sounds/cd${time}.wav`;
        selectPoint.volume = 0.2
        selectPoint.play()
        setTimeout(() => {
            selectPoint.remove()

        }, 500)
        --time

    } else if (time > 0){
        let current = --time
        if (current < 10) {
        current = `0${current}`
        }
        setTime(current)
    }
}

function setTime (value) {
    timer.innerHTML = `00:${value}`
}

function finishGame () {
    board.style.flexDirection = 'column'
    score = (aim + bonus * 2)
    window.score = score
    window.fullTime = fullTime
    console.log(score, window.score)
    console.log(fullTime, window.fullTime)

    let aimSec = Math.round(aim * 100 / fullTime) / 100
    let scoreSec = Math.round(score * 100 / fullTime) / 100
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`+
        `<h2>(за ${fullTime} сек.)</h2>`+
        `<h2>- aim <span class="primary">${aim}</span> - bonus score <span class="primary">${bonus * 2}</span> -</h2>`+
        `<h2>- aim/second <span class="primary">${aimSec}</span> - score/second <span class="primary">${scoreSec}</span> -</h2>`+
        ``
    restartBtn.classList.remove('hide')
    leaderBtn.classList.remove('hide')
    timer.parentNode.classList.add('hide')

}

function createRandomCircle () {
    const circle = document.createElement('div')
    const size = getRandomValue(20, 50)
    // const qqq = board.getBoundingClientRect()
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomValue(0, width - size)
    const y = getRandomValue(0, height - size)

    circle.style.background = circleColors[getRandomValue(1,3)-1]
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function createBonus () {
    const bonus = document.createElement('div')
    const size = 20
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomValue(0, width - size)
    const y = getRandomValue(0, height - size)

    bonus.classList.add('bonus')
    bonus.style.width = `${size}px`
    bonus.style.height = `${size}px`
    bonus.style.top = `${y}px`
    bonus.style.left = `${x}px`
    board.append(bonus)
}

function getRandomValue(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function resetGame() {
    timer.parentNode.classList.remove('hide')
    board.style.flexDirection = 'row'
    board.innerHTML = ''
    restartBtn.classList.add('hide')
    leaderBtn.classList.add('hide')
    aim = 0
    bonus = 0
    screens[1].classList.remove('up')
}

function goToLeaders() {
    screens[2].classList.add('up')
    formForScore.value = window.score
}

function makeTodayDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today

}




