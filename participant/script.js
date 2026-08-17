/* =====================================================
   CYBER ANTIVIRUS FIREWALL
   PARTICIPANT SCRIPT
   FINAL VERSION
===================================================== */

const formPage = document.getElementById("formPage");
const loadingPage = document.getElementById("loadingPage");
const certificatePage = document.getElementById("certificatePage");

const namaInput = document.getElementById("nama");
const kelasInput = document.getElementById("kelas");

const namaOutput = document.getElementById("certificateName");
const kelasOutput = document.getElementById("certificateClass");
const tarikhOutput = document.getElementById("certificateDate");
const masaOutput = document.getElementById("certificateTime");

const successAudio = document.getElementById("successAudio");

/* =====================================================
   APABILA HALAMAN DIBUKA
===================================================== */

window.onload = function () {

    formPage.style.display = "flex";
    loadingPage.style.display = "none";
    certificatePage.style.display = "none";

    namaInput.value = "";
    kelasInput.value = "";

};

/* =====================================================
   FORMAT TARIKH
===================================================== */

function dapatTarikh() {

    const bulan = [
        "Januari",
        "Februari",
        "Mac",
        "April",
        "Mei",
        "Jun",
        "Julai",
        "Ogos",
        "September",
        "Oktober",
        "November",
        "Disember"
    ];

    const d = new Date();

    return d.getDate() + " " +
           bulan[d.getMonth()] + " " +
           d.getFullYear();

}

/* =====================================================
   FORMAT MASA
===================================================== */

function dapatMasa() {

    const sekarang = new Date();

    let jam = sekarang.getHours();
    let minit = sekarang.getMinutes();

    const tempoh = jam >= 12 ? "petang" : "pagi";

    jam = jam % 12;

    if (jam === 0) jam = 12;

    if (minit < 10) {

        minit = "0" + minit;

    }

    return jam + ":" + minit + " " + tempoh;

}

/* =====================================================
   AUTO FIT NAMA
===================================================== */

function autoFitNama(teks){

    namaOutput.textContent = teks;
}

/* =====================================================
   JANA SIJIL
===================================================== */

function janaSijil() {

    const nama = namaInput.value.trim();
    const kelas = kelasInput.value.trim();

    if (nama === "") {

        alert("Sila masukkan nama peserta.");

        namaInput.focus();

        return;

    }

    if (kelas === "") {

        alert("Sila masukkan kelas.");

        kelasInput.focus();

        return;

    }

    const namaBesar = nama.toUpperCase();
    const kelasBesar = kelas.toUpperCase();

    autoFitNama(namaBesar);

    namaOutput.textContent = namaBesar;
    kelasOutput.textContent = kelasBesar;

    tarikhOutput.textContent = dapatTarikh();
    masaOutput.textContent = dapatMasa();

    localStorage.setItem("namaPeserta", namaBesar);
    localStorage.setItem("kelasPeserta", kelasBesar);

    formPage.style.display = "none";
    loadingPage.style.display = "flex";

    setTimeout(function () {

        loadingPage.style.display = "none";
        certificatePage.style.display = "flex";

        if (successAudio) {

            successAudio.play().catch(() => {});

        }

    }, 1000);

}

/* =====================================================
   DOWNLOAD SIJIL
===================================================== */

function downloadCertificate() {

    const sijil = document.getElementById("certificate");

    html2canvas(sijil, {

        scale: 4,

        useCORS: true,

        allowTaint: true,

        backgroundColor: null

    }).then(function (canvas) {

        const link = document.createElement("a");

        const namaFail =
            namaOutput.textContent
            .replace(/\s+/g, "_");

        link.download = namaFail + "_Sijil_PPDa.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

        setTimeout(function () {

            alert(
                "🎉 Tahniah!\n\n" +
                "Sijil berjaya dimuat turun.\n\n" +
                "Sila serahkan peranti kepada peserta seterusnya."
            );

        }, 300);

    });

}

/* =====================================================
   PESERTA SETERUSNYA
===================================================== */

function resetForm() {

    namaInput.value = "";
    kelasInput.value = "";

    namaOutput.textContent = "";
    kelasOutput.textContent = "";
    tarikhOutput.textContent = "";
    masaOutput.textContent = "";

    formPage.style.display = "flex";
    loadingPage.style.display = "none";
    certificatePage.style.display = "none";

    namaInput.focus();

}

/* =====================================================
   ENTER KEY
===================================================== */

namaInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        kelasInput.focus();

    }

});

kelasInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        janaSijil();

    }

});