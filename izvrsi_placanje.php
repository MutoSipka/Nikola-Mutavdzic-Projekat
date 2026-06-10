<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'konekcija.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['korisnickoIme']) && isset($data['ukupnaCena'])) {
    
    $user = $conn->real_escape_string($data['korisnickoIme']);
    $ukupnaCena = floatval($data['ukupnaCena']);

    // Provera trenutnog stanja direktno iz baze
    $rezultat = $conn->query("SELECT balans FROM korisnici WHERE korisnicko_ime = '$user'");
    if ($rezultat->num_rows > 0) {
        $korisnik = $rezultat->fetch_assoc();
        $trenutniBalans = floatval($korisnik['balans']);

        // Provera da li ima dovoljno novca
        if ($trenutniBalans < $ukupnaCena) {
            echo json_encode(["status" => "error", "message" => "Nemate dovoljno novca na računu!"]);
            exit;
        }

        // Skidanje novca sa računa
        $sql = "UPDATE korisnici SET balans = balans - $ukupnaCena WHERE korisnicko_ime = '$user'";
        
        if ($conn->query($sql) === TRUE) {
            $noviBalans = $trenutniBalans - $ukupnaCena;
            echo json_encode([
                "status" => "success",
                "message" => "Kupovina uspešna!",
                "noviBalans" => $noviBalans
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Greška prilikom obrade plaćanja."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Korisnik nije pronađen."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Nevažeći podaci za plaćanje."]);
}
?>