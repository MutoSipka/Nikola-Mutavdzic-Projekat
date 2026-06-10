<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'konekcija.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['korisnickoIme']) && isset($data['iznos'])) {
    
    $user = $conn->real_escape_string($data['korisnickoIme']);
    $iznos = floatval($data['iznos']);

    if ($iznos <= 0) {
        echo json_encode(["status" => "error", "message" => "Iznos mora biti veći od nule!"]);
        exit;
    }

    // SQL UPDATE upit za dodavanje novca
    $sql = "UPDATE korisnici SET balans = balans + $iznos WHERE korisnicko_ime = '$user'";
    
    if ($conn->query($sql) === TRUE) {
        // Uzimamo novi balans iz baze da bismo ga vratili front-end-u
        $rezultat = $conn->query("SELECT balans FROM korisnici WHERE korisnicko_ime = '$user'");
        $korisnik = $rezultat->fetch_assoc();

        echo json_encode([
            "status" => "success",
            "message" => "Sredstva uspešno uplaćena!",
            "noviBalans" => floatval($korisnik['balans'])
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Greška prilikom uplate."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Nevažeći podaci za dopunu."]);
}
?>