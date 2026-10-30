// Klavyeden Enter tuşu ile hesaplama tetikleme
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        hesapla();
    }
});

function hesapla() {
    // Hata mesajlarını ve stilleri sıfırla
    document.getElementById("errYilIci").innerText = "";
    document.getElementById("errFinal").innerText = "";
    document.getElementById("yilIci").classList.remove("input-error");
    document.getElementById("final").classList.remove("input-error");

    const yilIciInput = document.getElementById("yilIci");
    const finalInput = document.getElementById("final");
    const devamsizCheckbox = document.getElementById("devamsiz").checked;
    const sinavaGirmedimCheckbox = document.getElementById("sinavaGirmedim").checked;
    const butunlemeGirilmediCheckbox = document.getElementById("butunlemeGirilmedi").checked;

    const sonucKarti = document.getElementById("sonucKarti");
    const resBasariNotu = document.getElementById("resBasariNotu");
    const resHarfNotu = document.getElementById("resHarfNotu");
    const resDurum = document.getElementById("resDurum");
    const resAciklama = document.getElementById("resAciklama");

    let hataVar = false;

    // 1. Devamsızlık ve Sınava Girmeme Kontrolleri (Öncelikli kural kontrolleri)
    if (devamsizCheckbox) {
        gosterSonuc("-", "F1", "Kaldı (F1)", "F1: Devamsız (genel/bütünleme hakkı yok), katsayı 0.");
        return;
    }

    if (sinavaGirmedimCheckbox) {
        gosterSonuc("-", "F2", "Kaldı (F2)", "F2: Devam var ama genel/bütünleme sınavına girmemiş, katsayı 0.");
        return;
    }

    // 2. Boş alan ve Aralık Kontrolleri (0-100)
    let yilIciVal = yilIciInput.value.trim();
    let finalVal = finalInput.value.trim();

    if (yilIciVal === "") {
        document.getElementById("errYilIci").innerText = "Yıl içi notu boş bırakılamaz!";
        yilIciInput.classList.add("input-error");
        hataVar = true;
    }

    let yilIci = parseFloat(yilIciVal);
    if (!hataVar && (isNaN(yilIci) || yilIci < 0 || yilIci > 100)) {
        document.getElementById("errYilIci").innerText = "0-100 dışı değerlerde hesaplama durdurulur!";
        yilIciInput.classList.add("input-error");
        hataVar = true;
    }

    let finalNotu;
    if (butunlemeGirilmediCheckbox) {
        // Bütünleme girilmediyse yıl içi notu final yerine geçer (hesaplamada %60 olarak bütünleme kullanılır)
        finalNotu = yilIci;
    } else {
        if (finalVal === "") {
            document.getElementById("errFinal").innerText = "Final notu boş bırakılamaz!";
            finalInput.classList.add("input-error");
            hataVar = true;
        } else {
            let fin = parseFloat(finalVal);
            if (isNaN(fin) || fin < 0 || fin > 100) {
                document.getElementById("errFinal").innerText = "0-100 dışı değerlerde hesaplama durdurulur! (Ör: Final notu gereklidir)";
                finalInput.classList.add("input-error");
                hataVar = true;
            } else {
                finalNotu = fin;
            }
        }
    }

    if (hataVar) {
        sonucKarti.classList.add("hidden");
        return;
    }

    // 3. Hesaplama Mantığı
    // Yıl içi %40, Final/Bütünleme %60
    let basariNotu = (yilIci * 0.40) + (finalNotu * 0.60);
    basariNotu = Math.round(basariNotu * 100) / 100; // En fazla 2 ondalık gösterim

    // 4. Geçme Kontrolü ve Harf Notu Belirleme
    let harfNotu = "";
    let durum = "";
    let aciklama = "";

    // Geçme koşulu: (i) Genel/Bütünleme notu >= 50, (ii) Ders başarı notu >= 60
    let genelSartSaglandi = finalNotu >= 50;
    let basariSartiSaglandi = basariNotu >= 60;

    if (!genelSartSaglandi) {
        harfNotu = "F3";
        durum = "Kaldı (F3)";
        aciklama = `Eğer sınav < 50 → F3 (Final/Bütünleme notu ${finalNotu} < 50 olduğu için kaldınız).`;
    } else if (!basariSartiSaglandi) {
        harfNotu = "F3";
        durum = "Kaldı (F3)";
        aciklama = `Başarı notu < 60 → F3 (Başarı notunuz ${basariNotu}, geçme barajı olan 60'ın altında).`;
    } else {
        // Harf aralıkları kontrolü (90-100 A1, 80-89 A2, 70-79 B1, 65-69 B2, 60-64 C)
        if (basariNotu >= 90) {
            harfNotu = "A1 (4.00)";
        } else if (basariNotu >= 80) {
            harfNotu = "A2 (3.50)";
        } else if (basariNotu >= 70) {
            harfNotu = "B1 (3.00)";
        } else if (basariNotu >= 65) {
            harfNotu = "B2 (2.75)";
        } else {
            harfNotu = "C (2.50)";
        }
        durum = "Geçti";
        aciklama = `Tebrikler! Genel/bütünleme ve başarı notu koşulları sağlandı.`;
    }

    gosterSonuc(basariNotu, harfNotu, durum, aciklama);
}

function gosterSonuc(notu, harf, dur, acik) {
    document.getElementById("resBasariNotu").innerText = notu;
    document.getElementById("resHarfNotu").innerText = harf;
    document.getElementById("resDurum").innerText = dur;
    document.getElementById("resAciklama").innerText = acik;
    document.getElementById("sonucKarti").classList.remove("hidden");
}

function sifirla() {
    document.getElementById("notForm").reset();
    document.getElementById("sonucKarti").classList.add("hidden");
    document.getElementById("errYilIci").innerText = "";
    document.getElementById("errFinal").innerText = "";
    document.getElementById("yilIci").classList.remove("input-error");
    document.getElementById("final").classList.remove("input-error");
}