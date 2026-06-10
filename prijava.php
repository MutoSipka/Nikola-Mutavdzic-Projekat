<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'konekcija.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['korisnickoIme']) && !empty($data['lozinka'])) {
    
    $user = $conn->real_escape_string(trim($data['korisnickoIme']));
    $pass = $data['lozinka'];

    // Traženje korisnika u bazi
    $rezultat = $conn->query("SELECT korisnicko_ime, email, lozinka, balans FROM korisnici WHERE korisnicko_ime = '$user'");
    
    if ($rezultat->num_rows > 0) {
        $korisnik = $rezultat->fetch_assoc();
        
        // Provera hešovane lozinke
        if (password_verify($pass, $korisnik['lozinka'])) {
            echo json_encode([
                "status" => "success",
                "message" => "Uspešna prijava!",
                "korisnik" => [
                    "korisnickoIme" => $korisnik['korisnicko_ime'],
                    "email" => $korisnik['email'],
                    "balans" => floatval($korisnik['balans'])
                ]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Pogrešna lozinka!"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Korisnik ne postoji!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Unesite korisničko ime i lozinku!"]);
}
?>