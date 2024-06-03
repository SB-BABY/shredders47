<?php

// В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "7107201611:AAGtJyG0rBfAWRTZMQA_rxF8Qkf2fSUmEZI";

// Сюда вставляем chat_id
$chat_id = "-1002245356370";

// Определяем путь к файлу для хранения данных
$logFile = 'requests.log';

// Определяем текущую дату
$currentDate = date('Y-m-d');

// Получаем IP адрес пользователя
$userIp = $_SERVER['REMOTE_ADDR'];

// Читаем данные из файла
$logData = [];
if (file_exists($logFile)) {
    $logData = json_decode(file_get_contents($logFile), true);
}

// Инициализируем данные для текущего IP адреса и даты
if (!isset($logData[$userIp])) {
    $logData[$userIp] = [];
}
if (!isset($logData[$userIp][$currentDate])) {
    $logData[$userIp][$currentDate] = 0;
}

// Проверяем, не превышен ли лимит запросов
if ($logData[$userIp][$currentDate] >= 10) {
    // Возвращаем JSON-ответ об ошибке
    $response = array(
        'status' => 'error',
        'message' => 'Превышен лимит запросов. Попробуйте снова завтра.'
    );

    // Возвращаем JSON-ответ
    header('Content-Type: application/json');
    echo json_encode($response);

    // Завершаем выполнение скрипта
    exit();
}

// Увеличиваем количество запросов
$logData[$userIp][$currentDate]++;

// Сохраняем обновленные данные в файл
file_put_contents($logFile, json_encode($logData));

// Определяем переменные для передачи данных из нашей формы
if ($_POST['act'] == 'order') {
    $name = ($_POST['name']);
    $phone = ($_POST['phone']);
    $city = ($_POST['city']);

    // Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $name,
        'Телефон:' => $phone,
        'Город:' => $city,
    );

    // Настраиваем внешний вид сообщения в телеграме
    $txt = "";
    foreach ($arr as $key => $value) {
        $txt .= "<b>" . $key . "</b> " . $value . "%0A";
    }

    // Передаем данные боту
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

    // Формируем JSON-ответ
    $response = array();

    if ($sendToTelegram) {
        $response['status'] = 'success';
        $response['message'] = 'Ваша заявка принята, мы свяжемся с вами в ближайшее время!';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Что-то пошло не так. Попробуйте отправить форму ещё раз.';
    }

    // Возвращаем JSON-ответ
    header('Content-Type: application/json');
    echo json_encode($response);

    // Завершаем выполнение скрипта
    exit();
}
?>
