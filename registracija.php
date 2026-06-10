<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'konekcija.php';

// Čitanje JSON podataka poslatih preko JS fetch-a
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['korisnickoIme']) && !empty($data['email']) && !empty($data['lozinka'])) {
    
    $user = $conn->real_escape_string(trim($data['korisnickoIme']));
    $email = $conn->real_escape_string(trim($data['email']));
    $pass = password_hash($data['lozinka'], PASSWORD_BCRYPT); // Bezbedno heširanje
    $balans = isset($data['balans']) ? floatval($data['balans']) : 100.00;

    // Provera da li korisničko ime već postoji
    $provera = $conn->query("SELECT id FROM korisnici WHERE korisnicko_ime = '$user'");
    if ($provera->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Korisničko ime je zauzeto!"]);
        exit;
    }

    // Upis u bazu podataka
    $sql = "INSERT INTO korisnici (korisnicko_ime, email, lozinka, balans) VALUES ('$user', '$email', '$pass', '$balans')";
    
    // POKREĆEMO UPIT
    $rezultat = $conn->query($sql);

    // KLUČNA PROVERA: Da li je red stvarno ubačen u tabelu?
    if ($rezultat === TRUE && $conn->affected_rows > 0) {
        echo json_encode([
            "status" => "success",
            "message" => "Uspešna registracija!",
            "korisnik" => [
                "korisnickoIme" => $user,
                "balans" => $balans
            ]
        ]);
    } else {
        // Ako baza odbije, JS će sada dobiti tačan razlog za toast i konzolu
        echo json_encode([
            "status" => "error", 
            "message" => "Baza odbila upis! Greška: " . $conn->error
        ]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Molimo popunite sva polja!"]);
}
$conn->close();
?>