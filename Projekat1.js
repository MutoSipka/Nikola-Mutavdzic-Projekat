
// ======================
// BAZA PODATAKA PROIZVODA SA TVOJIM LINKOVIMA SLIKA
// ======================
const proizvodi = [
    { 
        id: 1, 
        ime: "Nike Air Force 1", 
        cena: 120, 
        kategorija: "Patike", 
        slika: "https://www.tike.rs/files/images/products/media/CW2/CW2288-111/images/CW2288-111.jpg.webp", // Tvoj link
        modeli: [
            { naziv: "All White Classic", slika: "https://www.tike.rs/files/images/products/media/CW2/CW2288-111/images/CW2288-111.jpg.webp" }, // Tvoj link
            { naziv: "Black Edition", slika: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/759cacc7-c5fb-4aa6-9dc2-922f14223d66/AIR+FORCE+1+%2707+LX+VIBRAM.png" },
            { naziv: "Retro Blue/White", slika: "https://static.ftshp.digital/img/p/7/9/7/1/5/8/797158-full_product.jpg" }
        ]
    },
    { 
        id: 2, 
        ime: "Jordan 4", 
        cena: 250, 
        kategorija: "Patike", 
        slika: "https://images.stockx.com/360/Air-Jordan-4-Retro-Military-Black/Images/Air-Jordan-4-Retro-Military-Black/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1653037411", 
        modeli: [
            { naziv: "Military Gray", slika: "https://images.stockx.com/360/Air-Jordan-4-Retro-Military-Black/Images/Air-Jordan-4-Retro-Military-Black/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1653037411" },
            { naziv: "Red/White Crimson", slika: "https://images.stockx.com/360/Air-Jordan-4-Retro-Red-Cement/Images/Air-Jordan-4-Retro-Red-Cement/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1692209172" },
            { naziv: "Dark Shadow Black", slika: "https://images.stockx.com/360/Air-Jordan-4-Retro-Black-Cat-2020/Images/Air-Jordan-4-Retro-Black-Cat-2020/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1606321271" }
        ]
    },
    { 
        id: 3, 
        ime: "Dior Sauvage", 
        cena: 100, 
        kategorija: "Parfemi", 
        slika: "https://apothecary.rs/17902-large_default/dior-sauvage-eau-de-toilette-100ml.jpg", // Tvoj link
        modeli: [
            { naziv: "Eau de Toilette (Svetli)", slika: "https://apothecary.rs/17902-large_default/dior-sauvage-eau-de-toilette-100ml.jpg" }, // Tvoj link
            { naziv: "Eau de Parfum (Teget)", slika: "https://www.parfemilux.rs/wp-content/uploads/2023/07/photo-output-53.jpeg" },
            { naziv: "Elixir Premium (Crni)", slika: "https://maxparfemi.rs/wp-content/uploads/2024/04/christian.png" }
        ]
    },
    { 
        id: 4, 
        ime: "Versace Eros", 
        cena: 80, 
        kategorija: "Parfemi", 
        slika: "https://www.parfemilux.rs/wp-content/uploads/2023/07/IMG_1117.webp", // Tvoj link
        modeli: [
            { naziv: "Eros EDT (Plavi)", slika: "https://www.parfemilux.rs/wp-content/uploads/2023/07/IMG_1117.webp" }, // Tvoj link
            
        ]
    },
    { 
        id: 5, 
        ime: "Nike Hoodie", 
        cena: 60, 
        kategorija: "Dukserice", 
        slika: "https://cdn.sportshop.com/catalog/product/1500/1500/1/2/125373_1.jpg", // Tvoj link
        modeli: [
            { naziv: "Sivi Classic", slika: "https://cdn.sportshop.com/catalog/product/1500/1500/1/2/125373_1.jpg" }, // Tvoj link
            
        ]
    },
    { 
        id: 6, 
        ime: "Adidas Hoodie", 
        cena: 55, 
        kategorija: "Dukserice", 
        slika: "https://www.bfgcdn.com/1500_1500_90/704-4540-0111/adidas-kids-small-logo-fleece-hoodie-225-hoodie.jpg", // Tvoj link
        modeli: [
            { naziv: "Crni", slika: "https://www.bfgcdn.com/1500_1500_90/704-4540-0111/adidas-kids-small-logo-fleece-hoodie-225-hoodie.jpg" }, // Tvoj link
            
        ]
    },
    { 
        id: 7, 
        ime: "Nike Tech Fleece", 
        cena: 150, 
        kategorija: "Trenerke", 
        slika: "https://images.kupujemprodajem.com/photos/oglasi/5/51/185760515/185760515_68e7bbf0768559-90549815image.webp", // Tvoj link
        modeli: [
            { naziv: "Bež", slika: "https://images.kupujemprodajem.com/photos/oglasi/5/51/185760515/185760515_68e7bbf0768559-90549815image.webp" }, // Tvoj link
            
        ]
    }
];
let korpa = JSON.parse(localStorage.getItem("korpa")) || [];
let favoriti = JSON.parse(localStorage.getItem("favoriti")) || [];
let trenutniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik")) || null;
if (trenutniKorisnik && Object.prototype.hasOwnProperty.call(trenutniKorisnik, 'lozinka')) {
    delete trenutniKorisnik.lozinka;
    localStorage.setItem("trenutniKorisnik", JSON.stringify(trenutniKorisnik));
}
let prethodnaSekcija = 'pocetna';
const API_BASE = `${window.location.origin}/resell-hub/`;

async function poslatiZahtjev(url, data) {
    const odgovor = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const rezultat = await odgovor.json();
    if (!odgovor.ok || rezultat.status !== 'success') {
        throw new Error(rezultat.message || 'Došlo je do greške prilikom obrade zahteva.');
    }

    return rezultat;
}

// ======================
// POKRETANJE I INICIJALIZACIJA
// ======================
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    UčitajTemu();
    osvežiHeaderNavigaciju('pocetna');
    azurirajProfilUI();
});

// ======================
// CUSTOM TOAST NOTIFIKACIJE
// ======================
function showToast(poruka) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = poruka;
    toast.classList.add("prikazi");
    
    setTimeout(() => {
        toast.classList.remove("prikazi");
    }, 3000);
}

function UčitajTemu() {
    if(localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
}

// ======================
// HEADER NAVIGACIJA
// ======================
function osvežiHeaderNavigaciju(aktivnaSekcija) {
    const navMeni = document.getElementById("nav-meni");
    if (!navMeni) return;

    const rute = [
        { id: 'pocetna', naziv: 'Početna', akcija: "prikažiSekciju('pocetna')" },
        { id: 'proizvodi', naziv: 'Popularne stvari 🔥', akcija: "prikažiSvePopularneStvari()" },
        { id: 'favoriti', naziv: 'Favoriti ❤️', akcija: "prikažiSekciju('favoriti')" },
        { id: 'korpa', naziv: 'Korpa 🛒', akcija: "prikažiSekciju('korpa')" }
    ];

    navMeni.innerHTML = "";
    rute.forEach(ruta => {
        if (ruta.id !== aktivnaSekcija) {
            navMeni.innerHTML += `<a onclick="${ruta.akcija}">${ruta.naziv}</a>`;
        }
    });
}

function prikažiSvePopularneStvari() {
    prikažiSekciju('proizvodi');
    document.getElementById("proizvodi-sekcija").classList.remove("skriveno");
    document.getElementById("kategorija-naslov").innerText = "Popularne stvari 🔥";
    prethodnaSekcija = 'pocetna';

    const kategorije = ["Patike", "Parfemi", "Dukserice", "Trenerke"];
    let popularneStvari = [];

    kategorije.forEach(kat => {
        const prvaStvar = proizvodi.find(p => p.kategorija === kat);
        if (prvaStvar) popularneStvari.push(prvaStvar);
    });

    prikažiSveProizvode(popularneStvari, "proizvodi-grid");
}

// ======================
// NAVIGACIJA STRANICA (SPA)
// ======================
function prikažiSekciju(sekcijaId) {
    const sekcije = ['pocetna-sekcija', 'proizvodi-sekcija', 'favoriti-sekcija', 'detalji-sekcija', 'korpa-sekcija', 'profil-sekcija'];
    sekcije.forEach(id => document.getElementById(id).classList.add("skriveno"));

    osvežiHeaderNavigaciju(sekcijaId === 'profil' ? '' : sekcijaId);

    if (sekcijaId === 'pocetna') {
        document.getElementById("pocetna-sekcija").classList.remove("skriveno");
        prethodnaSekcija = 'pocetna';
    } else if (sekcijaId === 'korpa') {
        document.getElementById("korpa-sekcija").classList.remove("skriveno");
        loadCart();
    } else if (sekcijaId === 'favoriti') {
        document.getElementById("favoriti-sekcija").classList.remove("skriveno");
        prikažiFavorite();
    } else if (sekcijaId === 'profil') {
        document.getElementById("profil-sekcija").classList.remove("skriveno");
        azurirajProfilUI();
    }
}

function filtrirajKategoriju(kat) {
    prikažiSekciju('proizvodi');
    document.getElementById("proizvodi-sekcija").classList.remove("skriveno");
    document.getElementById("kategorija-naslov").innerText = kat;
    prethodnaSekcija = 'proizvodi';

    const filtrirano = proizvodi.filter(p => p.kategorija === kat);
    prikažiSveProizvode(filtrirano, "proizvodi-grid");
}

function prikažiPrethodnuSekciju() {
    prikažiSekciju(prethodnaSekcija);
    if(prethodnaSekcija === 'proizvodi') {
        document.getElementById("proizvodi-sekcija").classList.remove("skriveno");
    }
}

// ======================
// RENDER KARTICA PROIZVODA
// ======================
function prikažiSveProizvode(lista, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = "";

    if(lista.length === 0) {
        grid.innerHTML = "<p style='color:var(--text-muted);'>Nema pronađenih proizvoda.</p>";
        return;
    }

    lista.forEach(p => {
        const jeFavorit = favoriti.includes(p.id);
        const klasaSrca = jeFavorit ? "fav-btn aktivan" : "fav-btn";

        grid.innerHTML += `
            <div class="kartica" onclick="prikažiDetalje(${p.id})">
                <button class="${klasaSrca}" onclick="toggleFavorit(event, ${p.id})">❤️</button>
                <div class="slika-box">
                    <img src="${p.slika}" onerror="this.src='https://via.placeholder.com/260x240'">
                </div>
                <div class="kartica-info">
                    <h3>${p.ime}</h3>
                    <p class="kartica-cena">${p.cena}€</p>
                </div>
            </div>
        `;
    });
}

// ======================
// DETALJI PROIZVODA & IZMENA MODELA
// ======================
function prikažiDetalje(id) {
    const p = proizvodi.find(artikal => artikal.id === id);
    if (!p) return;

    prikažiSekciju('');
    document.getElementById("detalji-sekcija").classList.remove("skriveno");

    document.getElementById("detalji-ime").innerText = p.ime;
    document.getElementById("detalji-cena").innerText = p.cena + "€";
    document.getElementById("detalji-slika").src = p.slika;

    const modelSelect = document.getElementById("model-select");
    modelSelect.innerHTML = "";
    p.modeli.forEach(m => {
        modelSelect.innerHTML += `<option value="${m.slika}">${m.naziv}</option>`;
    });

    const velicinaSelect = document.getElementById("velicina");
    velicinaSelect.innerHTML = "";
    let opcije = p.kategorija === "Parfemi" ? ["50ml", "100ml", "200ml"] : ["S", "M", "L", "XL"];
    if (p.kategorija === "Patike") opcije = ["41", "42", "43", "44", "45"];

    opcije.forEach(o => {
        velicinaSelect.innerHTML += `<option value="${o}">${o}</option>`;
    });

    document.getElementById("dodaj-u-korpu-btn").onclick = () => {
        const izabraniModelTekst = modelSelect.options[modelSelect.selectedIndex].text;
        dodajUKorpu(`${p.ime} (${izabraniModelTekst})`, p.cena, velicinaSelect.value);
    };
}

function promeniSlikuModela() {
    const modelSelect = document.getElementById("model-select");
    const slikaElement = document.getElementById("detalji-slika");
    if(modelSelect && slikaElement) {
        slikaElement.src = modelSelect.value;
    }
}

// ======================
// SISTEM FAVORITA
// ======================
function toggleFavorit(event, id) {
    event.stopPropagation();
    const indeks = favoriti.indexOf(id);
    const p = proizvodi.find(artikal => artikal.id === id);

    if (indeks === -1) {
        favoriti.push(id);
        showToast(`❤️ ${p.ime} dodat u favorite!`);
    } else {
        favoriti.splice(indeks, 1);
        showToast(`💔 ${p.ime} uklonjen iz favorita.`);
    }

    localStorage.setItem("favoriti", JSON.stringify(favoriti));
    
    if (!document.getElementById("proizvodi-sekcija").classList.contains("skriveno")) {
        const trenutnaKat = document.getElementById("kategorija-naslov").innerText;
        if(trenutnaKat === "Rezultati pretrage") pretražiProizvode();
        else if(trenutnaKat === "Popularne stvari 🔥") prikažiSvePopularneStvari();
        else filtrirajKategoriju(trenutnaKat);
    } else if (!document.getElementById("favoriti-sekcija").classList.contains("skriveno")) {
        prikažiFavorite();
    }
}

function prikažiFavorite() {
    const filtriraniFavoriti = proizvodi.filter(p => favoriti.includes(p.id));
    prikažiSveProizvode(filtriraniFavoriti, "favoriti-grid");
}

// ======================
// SISTEM PRETRAGE
// ======================
function proveriEnter(event) {
    if (event.key === "Enter") pretražiProizvode();
}

function pretražiProizvode() {
    let unos = document.getElementById("search").value.toLowerCase();
    if(unos.trim() !== "") {
        prikažiSekciju('proizvodi');
        document.getElementById("proizvodi-sekcija").classList.remove("skriveno");
        document.getElementById("kategorija-naslov").innerText = "Rezultati pretrage";
        
        let filtrirani = proizvodi.filter(p => p.ime.toLowerCase().includes(unos));
        prikažiSveProizvode(filtrirani, "proizvodi-grid");
    } else {
        showToast("❌ Unesi nešto za pretragu!");
    }
}

// ======================
// KORPA & DETALJNI SKIDANJE PARA (CHECKOUT)
// ======================
function dodajUKorpu(ime, cena, velicina) {
    korpa.push({ ime, cena, velicina });
    localStorage.setItem("korpa", JSON.stringify(korpa));
    updateCartCount();
    showToast(`✔ Uspešno dodato u korpu!`);
}

function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (el) el.innerText = korpa.length;
}

function loadCart() {
    const box = document.getElementById("cartBox");
    if (!box) return;
    box.innerHTML = "";

    if (korpa.length === 0) {
        box.innerHTML = "<p style='text-align:center; color:var(--text-muted);'>Tvoja korpa je prazna.</p>";
        return;
    }

    let total = 0;
    korpa.forEach((p, i) => {
        total += Number(p.cena);
        box.innerHTML += `
            <div class="korpa-stavka">
                <div class="korpa-stavka-info">
                    <h3>${p.ime}</h3>
                    <p>Opcija: ${p.velicina}</p>
                    <p style="color:var(--accent); font-weight:700;">${p.cena}€</p>
                </div>
                <button class="remove-btn" onclick="removeItem(${i})">Ukloni</button>
            </div>
        `;
    });

    box.innerHTML += `
        <div class="total-box">Ukupno: <span style="color:var(--accent);">${total}€</span></div>
        <button class="checkout-btn" onclick="izrsiPlacanje(${total})">💳 Plati odmah (Checkout)</button>
    `;
}

function removeItem(i) {
    korpa.splice(i, 1);
    localStorage.setItem("korpa", JSON.stringify(korpa));
    loadCart();
    updateCartCount();
}

// POPRAVLJENO: Sada istog trena ažurira interfejs i skida pare svuda na klik!
async function izrsiPlacanje(ukupnaCena) {
    if (!trenutniKorisnik) {
        showToast("❌ Moraš biti ulogovan da bi kupovao! Idi na profil.");
        prikažiSekciju('profil');
        return;
    }

    if (trenutniKorisnik.balans < ukupnaCena) {
        showToast("❌ Nemaš dovoljno novca! Dopuni novčanik na profilu.");
        return;
    }

    try {
        const rezultat = await poslatiZahtjev(`${API_BASE}izvrsi_placanje.php`, {
            korisnickoIme: trenutniKorisnik.korisnickoIme,
            ukupnaCena
        });

        trenutniKorisnik.balans = Number(rezultat.noviBalans || 0);
        localStorage.setItem("trenutniKorisnik", JSON.stringify(trenutniKorisnik));

        korpa = [];
        localStorage.removeItem("korpa");

        updateCartCount();
        loadCart();
        azurirajProfilUI();

        showToast("🎉 Kupovina uspešna! Balans je uspešno umanjen.");
    } catch (greška) {
        showToast(`❌ ${greška.message}`);
    }
}

// ======================
// LOGIN, REGISTRACIJA I TABOVI
// ======================
function promeniAuthTab(tab) {
    const loginForma = document.getElementById("forma-login");
    const regForma = document.getElementById("forma-reg");
    const loginTabBtn = document.getElementById("tab-login-btn");
    const regTabBtn = document.getElementById("tab-reg-btn");

    if (tab === 'login') {
        loginForma.classList.remove("skriveno");
        regForma.classList.add("skriveno");
        loginTabBtn.classList.add("aktivan-tab");
        regTabBtn.classList.remove("aktivan-tab");
    } else {
        loginForma.classList.add("skriveno");
        regForma.classList.remove("skriveno");
        loginTabBtn.classList.remove("aktivan-tab");
        regTabBtn.classList.add("aktivan-tab");
    }
}

async function registrujSe() {
    const user = document.getElementById("reg-korisnik").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-lozinka").value.trim();
    const bal = parseFloat(document.getElementById("reg-balans").value);

    if (user === "" || email === "" || pass === "" || isNaN(bal) || bal < 0) {
        showToast("❌ Molimo popunite sva polja ispravno!");
        return;
    }

    try {
        const rezultat = await poslatiZahtjev(`${API_BASE}registracija.php`, {
            korisnickoIme: user,
            email,
            lozinka: pass,
            balans: bal
        });

        trenutniKorisnik = {
            korisnickoIme: rezultat.korisnik.korisnickoIme,
            email,
            balans: Number(rezultat.korisnik.balans || 0)
        };

        localStorage.setItem("trenutniKorisnik", JSON.stringify(trenutniKorisnik));
        showToast(`🎉 Nalog uspešno kreiran! Dobrodošao ${user}.`);

        document.getElementById("reg-korisnik").value = "";
        document.getElementById("reg-email").value = "";
        document.getElementById("reg-lozinka").value = "";

        azurirajProfilUI();
    } catch (greška) {
        showToast(`❌ ${greška.message}`);
    }
}

async function prijaviSe() {
    const user = document.getElementById("login-korisnik").value.trim();
    const pass = document.getElementById("login-lozinka").value.trim();

    if (user === "" || pass === "") {
        showToast("❌ Unesi korisničko ime i lozinku!");
        return;
    }

    try {
        const rezultat = await poslatiZahtjev(`${API_BASE}prijava.php`, {
            korisnickoIme: user,
            lozinka: pass
        });

        trenutniKorisnik = {
            korisnickoIme: rezultat.korisnik.korisnickoIme,
            email: rezultat.korisnik.email || '',
            balans: Number(rezultat.korisnik.balans || 0)
        };

        localStorage.setItem("trenutniKorisnik", JSON.stringify(trenutniKorisnik));
        showToast(`👋 Dobrodošao nazad, ${user}!`);

        document.getElementById("login-korisnik").value = "";
        document.getElementById("login-lozinka").value = "";
        azurirajProfilUI();
    } catch (greška) {
        showToast(`❌ ${greška.message}`);
    }
}

function odjaviSe() {
    trenutniKorisnik = null;
    localStorage.removeItem("trenutniKorisnik");
    showToast("🔒 Uspešno si se odjavio.");
    azurirajProfilUI();
}

function postaviBrzuDopunu(iznos) {
    document.getElementById("dopuna-iznos").value = iznos;
}

async function dopuniBalans() {
    if (!trenutniKorisnik) return;

    const iznos = parseFloat(document.getElementById("dopuna-iznos").value);
    if (isNaN(iznos) || iznos <= 0) {
        showToast("❌ Unesi validan iznos za dopunu!");
        return;
    }

    try {
        const rezultat = await poslatiZahtjev(`${API_BASE}dopuni_balans.php`, {
            korisnickoIme: trenutniKorisnik.korisnickoIme,
            iznos
        });

        trenutniKorisnik.balans = Number(rezultat.noviBalans || 0);
        localStorage.setItem("trenutniKorisnik", JSON.stringify(trenutniKorisnik));

        document.getElementById("dopuna-iznos").value = "";
        showToast(`💰 Račun uspešno dopunjen za ${iznos}€!`);
        azurirajProfilUI();
    } catch (greška) {
        showToast(`❌ ${greška.message}`);
    }
}

function azurirajProfilUI() {
    const authKontejner = document.getElementById("auth-kontejner");
    const profilPodaci = document.getElementById("profil-podaci");
    const navBtn = document.getElementById("profil-nav-btn");

    if (trenutniKorisnik) {
        authKontejner.classList.add("skriveno");
        profilPodaci.classList.remove("skriveno");
        
        document.getElementById("profil-ime").innerText = trenutniKorisnik.korisnickoIme;
        document.getElementById("profil-prikaz-balansa").innerText = trenutniKorisnik.balans.toFixed(2) + "€";
        navBtn.innerText = `👤 ${trenutniKorisnik.korisnickoIme} (${trenutniKorisnik.balans.toFixed(2)}€)`;
    } else {
        authKontejner.classList.remove("skriveno");
        profilPodaci.classList.add("skriveno");
        navBtn.innerText = "👤 Profil";
    }
}

// ======================
// KONTAKT FORMA
// ======================
function posaljiPoruku() {
    const email = document.getElementById("kontakt-email").value.trim();
    const poruka = document.getElementById("kontakt-poruka").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showToast("❌ Molimo unesi ispravnu Email adresu!");
        document.getElementById("kontakt-email").style.borderColor = "#ff3b30";
        return;
    }

    if(poruka === "") {
        showToast("❌ Polje sa porukom ne može biti prazno!");
        return;
    }

    // ==========================================
    // NOVI DEO: SLANJE PODATAKA NA PHP BACKEND
    // ==========================================
    fetch('kontakt.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            poruka: poruka
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            showToast("✔ " + data.message);
            // Praznimo polja samo ako je upis u bazu uspeo
            document.getElementById("kontakt-email").value = "";
            document.getElementById("kontakt-poruka").value = "";
            document.getElementById("kontakt-email").style.borderColor = "var(--border-color)";
        } else {
            showToast("❌ " + data.message);
        }
    })
    .catch(err => {
        console.error(err);
        showToast("❌ Greška u komunikaciji sa serverom.");
    });
}