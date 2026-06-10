<?php
$host = "localhost";
$user = "root";          // Podrazumevani XAMPP korisnik
$pass = "";              // Podrazumevana XAMPP lozinka je prazna
$db_name = "resell_db";

// Kreiranje konekcije
$conn = new mysqli($host, $user, $pass, $db_name);

// Provera konekcije
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Neuspešna konekcija sa bazom podataka."]));
}

// Podešavanje kodiranja za naša slova (č, ć, š, đ, ž)
$conn->set_charset("utf8mb4");
?>