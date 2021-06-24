<?php
if (isset($_POST['name']) && isset($_POST['score']) && isset($_POST['time'])) {
// Переменные с формы
    $name = $_POST['name'];
    $score = $_POST['score'];
    $valid_score = $_POST['valid_score'];
    $time = $_POST['time'];
    $date = $_POST['date'];

// Параметры для подключения
    $db_host = "localhost";
    $db_user = "ppax"; // Логин БД
    $db_password = "comSVcraft84mg"; // Пароль БД
    $db_base = 'ppax'; // Имя БД
    $db_table = "aim"; // Имя Таблицы БД

    if ($valid_score!== $score) {

        $response = ['message' => 'CHEATER'];
        header('Content-type: application/json');
        echo json_encode($response);

    }







    try {
        // Подключение к базе данных
        $db = new PDO("mysql:host=$db_host;dbname=$db_base", $db_user, $db_password);
        // Устанавливаем корректную кодировку
        $db->exec("set names utf8");
        // Собираем данные для запроса
        $data = array('name' => $name, 'score' => $score, 'time' => $time, 'date' => $date);
        // Подготавливаем SQL-запрос
        $query = $db->prepare("INSERT INTO $db_table (name, score, time, date) values (:name, :score, :time, :date)");
        // Выполняем запрос с данными
        $query->execute($data);
        // Запишим в переменую, что запрос отрабтал
        $result = true;

        if (!$result) {
            $message = 'При отправке результата произошла ошибка. Попробуйте повторить отправку позже.';
        } else {
            $message = 'Результат сохранен';
        }
    } catch (PDOException $e) {
        // Если есть ошибка соединения или выполнения запроса, выводим её
        print "Ошибка!: " . $e->getMessage() . "<br/>";
    }

    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);

}




?>





