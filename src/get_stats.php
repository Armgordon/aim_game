<?php

// Параметры для подключения
    $db_host = "localhost";
    $db_user = "ppax"; // Логин БД
    $db_password = "comSVcraft84mg"; // Пароль БД
    $db_base = 'ppax'; // Имя БД
    $db_table = "aim"; // Имя Таблицы БД

    try {
        // Подключение к базе данных
        $db = new PDO("mysql:host=$db_host;dbname=$db_base", $db_user, $db_password);
        // Устанавливаем корректную кодировку
        $db->exec("set names utf8");
        // Подготавливаем SQL-запрос
        $query = $db->prepare("SELECT name, score, time, date FROM $db_table WHERE time=10 ORDER BY score DESC LIMIT 3");
        // Выполняем запрос с данными
        $query->execute();

        $leaders = $query->fetchAll();

        // Запишим в переменую, что запрос отрабтал
        $result = true;

        if (!$result) {
            $message = 'При отправке результата произошла ошибка. Попробуйте повторить отправку позже.';
        } else {
            $message = 'Результат сохранен';
        }
        $db = null;
        $query = null;

    } catch (PDOException $e) {
        // Если есть ошибка соединения или выполнения запроса, выводим её
        print "Ошибка!: " . $e->getMessage() . "<br/>";
    }




$response = ['data' => $leaders];
    header('Content-type: application/json');
    echo json_encode($response);






?>





