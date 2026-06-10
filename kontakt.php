<?php
header("Content-Type: application/json; charset=UTF-8");

// 1. Povezivanje sa bazom podataka
$host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "resell_db";

$conn = new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Neuspešna konekcija sa bazom."]);
    exit;
}
$conn->set_charset("utf8mb4");

// 2. Prihvatanje JSON podataka iz JS-a
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($data['email']) && !empty($data['poruka'])) {
        
        $email = $conn->real_escape_string(trim($data['email']));
        $poruka = $conn->real_escape_string(trim($data['poruka']));

        // Upit (U bazi ti trebaju samo kolone: id, email, poruka, datum_slanja)
        $sql = "INSERT INTO kontakt_poruke (email, poruka) VALUES ('$email', '$poruka')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Poruka uspešno poslata!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Greška pri čuvanju u bazu."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Sva polja su obavezna!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Nedozvoljen metod."]);
}

$conn->close();
?>