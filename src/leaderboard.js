//Работа с формой
console.log('Leaderboard is connected')
const leaderboard = document.getElementById('table')
const names = document.querySelectorAll('.lead_name')
const scores = document.querySelectorAll('.lead_score')
const times = document.querySelectorAll('.lead_time')

setTimeout(() => {
    getDataFromDb()
}, 1000)





async function getDataFromDb(){

        let response = await fetch('./get_stats.php', {
            method: "GET"
        });

        if (response.ok){
            let result = await response.json();
            for (let i = 0 ; i < result.data.length; i++) {
                let {name, score, time} = result.data[i]
                names[i].innerHTML = name
                scores[i].innerHTML = score
                times[i].innerHTML = time
            }


        } else {
            alert('Ошибка HTTP:' + response.status)
            console.log(response)
        }

}

