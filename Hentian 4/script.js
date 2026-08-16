// =======================================================
// SKSTP2 CYBER ANTIVIRUS FIREWALL
// HENTIAN 4 - ANTIVIRUS UPDATE
// SYSTEM SAFE
// =======================================================


// =======================================================
// DATA SOALAN
// =======================================================

const soalanAntivirusUpdate = [

    // ---------------------------------------------------
    // SOALAN 1 - BANTU RAKAN
    // ---------------------------------------------------

    {
        soalan:
        "Apakah tindakan kita apabila rakan terlibat DARVIH?",

        jawapan: [

            "A. Membiarkannya",

            "B. Mengejeknya",

            "C. Membantu dan mendapatkan bantuan daripada orang yang dipercayai",

            "D. Mengikutinya"

        ],

        betul: 2
    },


    // ---------------------------------------------------
    // SOALAN 2 - GAYA HIDUP SIHAT
    // ---------------------------------------------------

    {
        soalan:
        "Apakah amalan gaya hidup sihat untuk menjauhi DARVIH?",

        jawapan: [

            "A. Bersukan dan menjaga pemakanan",

            "B. Mengikut pengaruh rakan",

            "C. Mencuba bahan terlarang",

            "D. Tidak menjaga kesihatan"

        ],

        betul: 0
    },


    // ---------------------------------------------------
    // SOALAN 3 - AMALAN AGAMA
    // ---------------------------------------------------

    {
        soalan:
        "Apakah amalan agama yang membantu menjauhi DARVIH?",

        jawapan: [

            "A. Meninggalkan ibadah",

            "B. Menjaga solat dan mendekatkan diri kepada Allah",

            "C. Mengikut ajakan rakan",

            "D. Melakukan perkara yang dilarang"

        ],

        betul: 1
    }

];


// =======================================================
// PEMBOLEH UBAH
// =======================================================

let soalanSekarang = 0;

let jawapanBetulCount = 0;

let sedangMenjawab = false;

let audioSekarang = null;


// =======================================================
// TUKAR HALAMAN
// =======================================================

function showPage(id) {

    document
        .querySelectorAll(".page")
        .forEach(function(page) {

            page.classList.remove("active");

        });


    const page =
        document.getElementById(id);


    if (page) {

        page.classList.add("active");

    }

}


// =======================================================
// HENTIKAN SEMUA AUDIO
// =======================================================

function stopAudio() {

    document
        .querySelectorAll("audio")
        .forEach(function(audio) {

            audio.pause();

            audio.currentTime = 0;

        });


    audioSekarang = null;

}


// =======================================================
// MAIN AUDIO
// =======================================================
// Audio dimainkan satu demi satu.
// Audio sebelumnya tidak akan memotong audio seterusnya.
// =======================================================

function playAudio(id) {

    return new Promise(function(resolve) {

        const audio =
            document.getElementById(id);


        if (!audio) {

            console.warn(
                "Audio tidak dijumpai:",
                id
            );

            resolve();

            return;

        }


        audio.pause();

        audio.currentTime = 0;

        audioSekarang = audio;


        let selesai = false;


        function selesaiAudio() {

            if (selesai) {

                return;

            }


            selesai = true;


            audio.removeEventListener(
                "ended",
                selesaiAudio
            );


            audio.removeEventListener(
                "error",
                ralatAudio
            );


            if (
                audioSekarang === audio
            ) {

                audioSekarang = null;

            }


            resolve();

        }


        function ralatAudio() {

            console.warn(
                "Gagal memainkan audio:",
                id
            );


            selesaiAudio();

        }


        audio.addEventListener(
            "ended",
            selesaiAudio
        );


        audio.addEventListener(
            "error",
            ralatAudio
        );


        const playPromise =
            audio.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(
                function(error) {

                    console.warn(
                        "Audio play error:",
                        id,
                        error
                    );


                    selesaiAudio();

                }
            );

        }

    });

}


// =======================================================
// MULAKAN ANTIVIRUS UPDATE
// =======================================================

function mulaAntivirusUpdate() {

    stopAudio();


    soalanSekarang = 0;

    jawapanBetulCount = 0;

    sedangMenjawab = false;


    // Update bermula 0%
    kemaskiniUpdate(0);


    const status =
        document.getElementById(
            "scanStatus"
        );


    if (status) {

        status.innerHTML =
            "READY";

    }


    const startStatus =
        document.getElementById(
            "updatePercent"
        );


    if (startStatus) {

        startStatus.innerHTML =
            "0%";

    }


    showPage(
        "pageScan"
    );

}


// =======================================================
// BUKA SOALAN
// =======================================================

function bukaSoalan() {

    stopAudio();


    soalanSekarang = 0;

    jawapanBetulCount = 0;

    sedangMenjawab = false;


    kemaskiniUpdate(0);


    showPage(
        "pageQuestion"
    );


    paparkanSoalan();

}


// =======================================================
// PAPARKAN SOALAN
// =======================================================

function paparkanSoalan() {

    const data =
        soalanAntivirusUpdate[
            soalanSekarang
        ];


    if (!data) {

        tamatAntivirusUpdate();

        return;

    }


    sedangMenjawab = false;


    // ---------------------------------------------------
    // NOMBOR SOALAN
    // ---------------------------------------------------

    const number =
        document.getElementById(
            "questionNumber"
        );


    if (number) {

        number.innerHTML =
            "SOALAN " +
            (soalanSekarang + 1) +
            " DARIPADA 3";

    }


    // ---------------------------------------------------
    // SOALAN
    // ---------------------------------------------------

    const question =
        document.getElementById(
            "questionBox"
        );


    if (question) {

        question.innerHTML =
            data.soalan;

    }


    // ---------------------------------------------------
    // STATUS
    // ---------------------------------------------------

    const status =
        document.getElementById(
            "questionStatus"
        );


    if (status) {

        status.innerHTML = "";

        status.style.color = "";

    }


    // ---------------------------------------------------
    // JAWAPAN
    // ---------------------------------------------------

    const area =
        document.getElementById(
            "answerArea"
        );


    if (!area) {

        return;

    }


    area.innerHTML = "";


    data.jawapan.forEach(
        function(
            jawapan,
            index
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer";


            button.innerHTML =
                jawapan;


            button.onclick =
                function() {

                    jawapanAntivirusUpdate(
                        index
                    );

                };


            area.appendChild(
                button
            );

        }
    );


    kemaskiniQuestionUpdate();

}


// =======================================================
// JAWAPAN ANTIVIRUS UPDATE
// =======================================================

async function jawapanAntivirusUpdate(index) {

    if (sedangMenjawab) {

        return;

    }


    sedangMenjawab = true;


    const data =
        soalanAntivirusUpdate[
            soalanSekarang
        ];


    const buttons =
        document.querySelectorAll(
            "#answerArea .answer"
        );


    buttons.forEach(
        function(button) {

            button.disabled = true;

        }
    );


    // ===================================================
    // JAWAPAN BETUL
    // ===================================================

    if (index === data.betul) {


        jawapanBetulCount++;


        const status =
            document.getElementById(
                "questionStatus"
            );


        if (status) {

            status.style.color =
                "#00ff91";


            status.innerHTML =
                "✓ JAWAPAN TEPAT";

        }


        // ------------------------------------------------
        // SOALAN 1
        // ------------------------------------------------

        if (soalanSekarang === 0) {

            // 0% -> 33%
            kemaskiniUpdate(33);


            // Audio BETUL
            await playAudio(
                "audioBetul"
            );

        }


        // ------------------------------------------------
        // SOALAN 2
        // ------------------------------------------------

        else if (soalanSekarang === 1) {

            // 33% -> 67%
            kemaskiniUpdate(67);


            // Audio BETUL
            await playAudio(
                "audioBetul"
            );

        }


        // ------------------------------------------------
        // SOALAN 3
        // ------------------------------------------------

        else if (soalanSekarang === 2) {

            // 67% -> 100%
            kemaskiniUpdate(100);


            // Audio BETUL
            await playAudio(
                "audioBetul"
            );

        }


        await delay(900);


        // ------------------------------------------------
        // SOALAN SETERUSNYA
        // ------------------------------------------------

        if (
            soalanSekarang <
            soalanAntivirusUpdate.length - 1
        ) {

            soalanSekarang++;


            paparkanSoalan();

        }

        else {

            // Semua soalan selesai
            await tamatAntivirusUpdate();

        }

    }


    // ===================================================
    // JAWAPAN SALAH
    // ===================================================

    else {


        const status =
            document.getElementById(
                "questionStatus"
            );


        if (status) {

            status.style.color =
                "#ff4444";


            status.innerHTML =
                "❌ JAWAPAN BELUM TEPAT";

        }


        // Audio salah
        await playAudio(
            "audioSalah"
        );


        // Audio cuba lagi
        await playAudio(
            "audioCubaLagi"
        );


        await delay(500);


        sedangMenjawab = false;


        buttons.forEach(
            function(button) {

                button.disabled = false;

            }
        );

    }

}


// =======================================================
// KEMASKINI UPDATE PROGRESS
// =======================================================

function kemaskiniUpdate(value) {


    // ---------------------------------------------------
    // HALAMAN PERMULAAN
    // ---------------------------------------------------

    const percent =
        document.getElementById(
            "updatePercent"
        );


    const bar =
        document.getElementById(
            "updateBarFill"
        );


    if (percent) {

        percent.innerHTML =
            value + "%";

    }


    if (bar) {

        bar.style.width =
            value + "%";

    }


    // ---------------------------------------------------
    // HALAMAN SCAN
    // ---------------------------------------------------

    const scanPercent =
        document.getElementById(
            "scanUpdatePercent"
        );


    const scanBar =
        document.getElementById(
            "scanUpdateBarFill"
        );


    if (scanPercent) {

        scanPercent.innerHTML =
            value + "%";

    }


    if (scanBar) {

        scanBar.style.width =
            value + "%";

    }


    // ---------------------------------------------------
    // HALAMAN SOALAN
    // ---------------------------------------------------

    const questionPercent =
        document.getElementById(
            "questionUpdate"
        );


    const questionBar =
        document.getElementById(
            "questionUpdateBar"
        );


    if (questionPercent) {

        questionPercent.innerHTML =
            value + "%";

    }


    if (questionBar) {

        questionBar.style.width =
            value + "%";

    }

}


// =======================================================
// UPDATE MENGIKUT SOALAN
// =======================================================

function kemaskiniQuestionUpdate() {

    let value = 0;


    if (soalanSekarang === 0) {

        value = 0;

    }

    else if (soalanSekarang === 1) {

        value = 33;

    }

    else if (soalanSekarang === 2) {

        value = 67;

    }


    kemaskiniUpdate(
        value
    );

}


// =======================================================
// TAMAT ANTIVIRUS UPDATE
// =======================================================

async function tamatAntivirusUpdate() {


    // ===================================================
    // UPDATE = 100%
    // ===================================================

    kemaskiniUpdate(100);


    // ===================================================
    // STATUS
    // ===================================================

    const status =
        document.getElementById(
            "scanStatus"
        );


    if (status) {

        status.innerHTML =
            "UPDATE COMPLETE";

    }


    // ===================================================
    // PAPAR SYSTEM SAFE
    // ===================================================

    showPage(
        "pageComplete"
    );


    // ===================================================
    // AUDIO 1
    // ANTIVIRUS UPDATE COMPLETE
    // ===================================================

    await playAudio(
        "audioAntivirusUpdateComplete"
    );


    // ===================================================
    // AUDIO 2
    // SYSTEM SAFE
    // ===================================================

    await playAudio(
        "audioSystemSafe"
    );


    // ===================================================
    // AUDIO 3
    // MISSION COMPLETE
    // ===================================================

    await playAudio(
        "audioMissionComplete"
    );

    // Terus buka halaman Maklumat Peserta
    window.location.href = "../participant/index.html";
    return;

    // ===================================================
    // CONSOLE
    // ===================================================

    console.log(
        "=========================================="
    );


    console.log(
        "ANTIVIRUS UPDATE COMPLETE"
    );


    console.log(
        "UPDATE PROGRESS: 100%"
    );


    console.log(
        "SYSTEM SAFE"
    );


    console.log(
        "MISSION COMPLETE"
    );


    console.log(
        "=========================================="

    );

}


// =======================================================
// KEMBALI KE SOALAN
// =======================================================

function kembaliKeSoalan() {

    stopAudio();


    showPage(
        "pageQuestion"
    );


    paparkanSoalan();

}


// =======================================================
// IMBAS EJEN BAHARU
// =======================================================

function imbasEjenBaharu() {

    stopAudio();


    soalanSekarang = 0;

    jawapanBetulCount = 0;

    sedangMenjawab = false;


    kemaskiniUpdate(0);


    const status =
        document.getElementById(
            "scanStatus"
        );


    if (status) {

        status.innerHTML =
            "READY";

    }


    showPage(
        "pageStart"
    );

}


// =======================================================
// DELAY
// =======================================================

function delay(ms) {

    return new Promise(
        function(resolve) {

            setTimeout(
                resolve,
                ms
            );

        }
    );

}


// =======================================================
// WINDOW LOAD
// =======================================================

window.addEventListener(
    "load",
    function() {


        // Update bermula 0%
        kemaskiniUpdate(0);


        console.log(
            "=========================================="
        );


        console.log(
            "SKSTP2 CYBER ANTIVIRUS FIREWALL"
        );


        console.log(
            "HENTIAN 4 - ANTIVIRUS UPDATE"
        );


        console.log(
            "SYSTEM SAFE"
        );


        console.log(
            "=========================================="
        );


        console.log(
            "SOALAN:"
        );


        console.log(
            "1. BANTU RAKAN TERLIBAT DARVIH"
        );


        console.log(
            "2. AMALAN GAYA HIDUP SIHAT"
        );


        console.log(
            "3. AMALAN AGAMA"
        );


        console.log(
            "=========================================="
        );


        console.log(
            "UPDATE PROGRESS:"
        );


        console.log(
            "0% -> 33% -> 67% -> 100%"
        );


        console.log(
            "=========================================="
        );


        console.log(
            "AUDIO SEQUENCE:"
        );


        console.log(
            "1. BETUL"
        );


        console.log(
            "2. ANTIVIRUS UPDATE COMPLETE"
        );


        console.log(
            "3. SYSTEM SAFE"
        );


        console.log(
            "4. MISSION COMPLETE"
        );


        console.log(
            "=========================================="
        );


        console.log(
            "SYSTEM READY"
        );


        console.log(
            "=========================================="

        );

    }
);