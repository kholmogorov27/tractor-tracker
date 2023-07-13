const timeNow = document.querySelector(".time_wrapper")

function updateClock() {
    let now = new Date(); // показывает текущие дату и время
    let hours = now.getHours();
    let minutes = now.getMinutes();


    // Добавляем ведущий ноль, если минуты состоят из одной цифры
    minutes = (minutes < 10 ? "0" : "") + minutes;

    // Получаем элемент с id "currentTime" обновляем содержимое часов
    document.getElementById("currentTime").innerHTML = hours + ":" + minutes;
  }

// Вызываем функцию обновления времени каждую минуту
setInterval(updateClock, 1000);