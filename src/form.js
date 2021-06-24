//Работа с формой



let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;





const form = document.getElementById('form')
form.addEventListener('submit', formSend)



async function formSend(e){

    e.preventDefault()

    let error = formValidate(form)
    let formData = new FormData(form)
    formData.append('valid_score', window.score)
    formData.append('time', window.fullTime)
    formData.append('date', today)

    if (error === 0) {
        form.classList.add('_sending');
        let response = await fetch('./send_stats.php', {
            method: "POST",
            body: formData
        });

        if (response.ok){
            let result = await response.json();
            alert(result.message);
            form.reset()
            form.classList.remove('_sending')
        } else {
            alert('Ошибка HTTP:' + response.status)
            console.log(response)
            form.classList.remove('_sending')
        }

    }else {
        alert('Обязательные поля не заполнены')
    }
}

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req')
    for (let index = 0; index < formReq.length; index++){
        const input = formReq[index]
        formRemoveError(input)
        if (input.value === '') {
            formAddError(input);
            error++;
        }
    }
    return error
}

function formAddError(input){
    input.parentElement.classList.add('_error')
    input.classList.add('_error')
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
}



