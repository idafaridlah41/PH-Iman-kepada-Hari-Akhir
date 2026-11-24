const SPREADSHEET_ID = '1G2I9e9kwKzjpg4ifsTckZEk4Tpl2I_1ijgESmz2MYqI';

function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID);
}

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Asesmen Digital PAI Kelas IX')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// =========================================================================
// FUNGSI SEKALI JALAN: MENGISI 30 SOAL DARI PDF KE SHEET "BankSoal" OTOMATIS
// =========================================================================
function isiDatabaseSoalOtomatis() {
  const ss = getSpreadsheet();
  let sheetSoal = ss.getSheetByName('BankSoal');
  if (!sheetSoal) sheetSoal = ss.insertSheet('BankSoal');
  
  let sheetHasil = ss.getSheetByName('HasilUjian');
  if (!sheetHasil) {
    sheetHasil = ss.insertSheet('HasilUjian');
    sheetHasil.appendRow(['Waktu Submit', 'Nama Siswa', 'Kelas', 'Skor Otomatis', 'Skor Maksimal (Objektif)', 'Detail Jawaban (JSON)', 'Status Koreksi Uraian']);
  }

  sheetSoal.clear();

  const stim1 = "STIMULUS 1: Jurnal Ekologi dan Jejak Digital Manusia di Era Modern\nDalam sebuah riset lingkungan global, tercatat bahwa rata-rata seorang remaja menghabiskan waktu 6,5 jam per hari menggunakan perangkat digital. Penggunaan internet ini menyumbang sekitar 1,6 gram emisi karbon (CO2) per pencarian dan 11 gram CO2 per jam pemutaran video streaming. Jika diakumulasikan, aktivitas digital harian seorang remaja menyumbang beban emisi ekologis yang signifikan bagi bumi.\nDi sisi lain, Al-Qur'an menekankan bahwa setiap detik waktu, penggunaan panca indera, serta jejak tindakan baik fisik maupun digital akan dituntut pertanggungjawabannya pada Yaumul Hisab (Hari Perhitungan) dan ditimbang di Yaumul Mizan (Hari Penimbangan).\n\"Dan Dialah yang menjadikan kamu penguasa-penguasa di bumi dan Dia meninggikan sebagian kamu atas sebagian yang lain beberapa derajat, untuk mengujimu tentang apa yang diberikan-Nya kepadamu...\" (QS. Al-An'am [6]: 165)\nKesadaran akan adanya Hari Kiamat (Kiamat Sugra berupa kerusakan lingkungan dan Kiamat Kubra berupa kehancuran semesta) tidak hanya membentuk orientasi spiritual, melainkan melahirkan etika ekologis dan perilaku digital yang penuh kepedulian (mindful execution).";

  const stim2 = "STIMULUS 2: Simulasi Timbangan Amalan (Kajian Kasus Remaja: Arya)\nArya, seorang murid Kelas IX, mencatat aktivitas mingguan selama satu minggu (168 jam total):\n• Ibadah Wajib & Sunnah (Shalat, Mengaji): 14 jam (Kebaikan Mutlak)\n• Belajar & Membantu Orang Tua: 28 jam (Kebaikan Sosial / Produktif)\n• Kegiatan Ekstrakurikuler & Olahraga: 14 jam (Mubah - Bermanfaat bagi Fisik)\n• Tidur & Istirahat: 56 jam (Mubah - Kebutuhan Biologis)\n• Bermain Game & Sosmed Pasif: 42 jam (Berpotensi Lalai / Kelalaian Waktu)\n• Berkata Kasar & Menyebarkan Hoaks (Sosmed): 14 jam (Kejahatan/Dosa - Jejak Digital Buruk)\nBerdasarkan ajaran Islam, amalan tidak hanya diukur dari segi durasi fisik, melainkan dari bobot niat, dampak positif terhadap sesama, serta ada tidaknya dosa jariyah yang ditimbulkan.";

  const stim3 = "STIMULUS 3: Transisi Kehidupan Pasca-Kematian (Peta Konsep Kosmis)\n1. Alam Barzakh (Alam Kubur): Masa tunggu (fase antara) sebelum kebangkitan universal, tempat ruh menerima balasan awal (nikmat atau siksa kubur).\n2. Yaumul Ba'ats: Hari dibangkitkannya seluruh manusia dari kubur setelah tiupan sangkakala kedua Malaikat Israfil.\n3. Yaumul Mahsyar: Hari dikumpulkannya seluruh umat manusia di Padang Mahsyar tanpa terkecuali untuk menghadapi Pengadilan Agung (Al-Fasl).\n4. Yaumul Hisab & Mizan: Hari perhitungan mendetail serta penimbangan hakiki atas kadar kebaikan dan keburukan tanpa ada diskriminasi atau kecurangan.\n5. Yaumul Jaza / Sirat: Hari pembalasan di mana manusia meniti jembatan menuju Surga (Darus Salam) atau Neraka (Jahannam) sesuai bobot ketakwaan mereka.";

  const rows = [
    ['ID', 'Tipe', 'Stimulus', 'Pertanyaan', 'Opsi_A', 'Opsi_B', 'Opsi_C', 'Opsi_D', 'Kunci', 'Bobot'],
    [1, 'PG', stim3, 'Berdasarkan Stimulus 3, seorang murid yang menyadari urutan fase kehidupan akhirat akan memahami bahwa Alam Barzakh merupakan fase transit awal. Pernyataan yang paling tepat mendeskripsikan implikasi logis dari keberadaan Alam Barzakh bagi kehidupan manusia di dunia adalah...', 'Tempat manusia mendapatkan kesempatan kedua untuk memperbanyak ibadah yang sempat tertunda di dunia.', 'Ruang tunggu di mana amalan manusia dihitung secara final dan tidak lagi terpengaruh oleh doa orang lain.', 'Fase pembatas yang menunjukkan bahwa kematian bukanlah akhir kehidupan, melainkan awal pembalasan terbatas sebelum kebangkitan massal.', 'Masa di mana manusia dapat memilih tempat tinggalnya di surga atau neraka berdasarkan status sosial semasa hidup.', 'C', 4],
    [2, 'PGK', stim1, 'Berdasarkan Stimulus 1, bagaimana seorang murid PAI yang beriman kepada Hari Akhir seharusnya bersikap terhadap penggunaan media sosial dan energi digital? (Pilih dua atau lebih jawaban yang benar!)', 'Mengurangi konsumsi digital yang tidak perlu sebagai bentuk efisiensi energi dan pengurangan jejak emisi karbon yang dipertanggungjawabkan di Yaumul Hisab.', 'Bebas mengunggah konten apapun karena aktivitas di dunia maya tidak dicatat oleh Malaikat Raqib dan Atid.', 'Memastikan setiap unggahan mengandung kemanfaatan agar menjadi amal jariyah yang memberatkan timbangan kebaikan di Yaumul Mizan.', 'Mengabaikan dampak lingkungan dari perangkat digital karena Kiamat Kubra merupakan takdir yang pasti terjadi tanpa bisa dicegah.', 'A,C', 4],
    [3, 'JODOH', stim3, 'Berdasarkan Stimulus 3, jodohkanlah nama hari akhir di Kolom A dengan makna/fenomena yang sesuai pada Kolom B!', "1. Yaumul Ba'ats", '2. Yaumul Mahsyar', '3. Yaumul Mizan', 'A. Hari di mana setiap kebaikan sekecil zarrah akan diperhitungkan dan ditimbang secara presisi. | B. Proses dibangkitkannya kembali seluruh jasad manusia dari alam kubur dengan kondisi sesuai amalnya. | C. Peristiwa dikumpulkannya seluruh manusia di satu padang luas yang membara untuk menanti Pengadilan Ilahi. | D. Masa tinggal sementara di dalam kubur hingga datangnya tiupan sangkakala pertama.', '1-B,2-C,3-A', 4],
    [4, 'ISIAN', stim1, 'Berdasarkan Stimulus 1, tindakan merusak lingkungan yang memicu terjadinya bencana alam lokal merupakan salah satu fenomena dari tanda-tanda Kiamat yang disebut Kiamat...', '', '', '', '', 'Sugra,Kiamat Kecil', 4],
    [5, 'URAIAN', stim1, 'Berdasarkan Stimulus 1, jelaskan hubungan korelasi antara kesadaran iman kepada Hari Akhir (khususnya Yaumul Hisab) dengan tanggung jawab seorang muslim dalam menjaga kelestarian lingkungan hidup (Eco-Jihad)! Berikan minimal 2 alasan logis!', '', '', '', '', 'Pertanggungjawaban ekologis khalifah di Yaumul Hisab dan mencegah kerusakan (fasad)', 4],
    [6, 'PG', stim2, 'Berdasarkan Stimulus 2, jika Arya menghabiskan 14 jam per minggu untuk perilaku berdosa di sosial media (berkata kasar/hoaks), berapa persentase waktu produktif dan ibadah Arya (42 jam total) dibandingkan dengan akumulasi waktu kelalaian dan dosanya (56 jam total)? Analisislah dampaknya terhadap timbangan amalnya di Yaumul Mizan!', 'Persentase waktu baik lebih besar (60%), sehingga dipastikan timbangan amalnya tetap unggul tanpa perlu bertobat.', 'Persentase waktu kelalaian dan dosa (57,1%) melebihi waktu baik (42,9%), yang mengindikasikan risiko beratnya timbangan keburukan jika tidak diimbangi dengan tobat dan perbaikan kualitas amal.', 'Kedua jenis waktu seimbang (50% : 50%), sehingga Arya secara otomatis aman dari siksa neraka.', 'Durasi waktu tidak berpengaruh sama sekali terhadap penimbangan amal di Yaumul Mizan karena hanya niat yang dinilai.', 'B', 4],
    [7, 'PGK', '', 'Perhatikan pernyataan-pernyataan berikut mengenai keterkaitan iman kepada Hari Akhir dengan perilaku kejujuran akademik saat ujian sekolah. Manakah pernyataan yang mencerminkan pemahaman HOTS yang benar?', 'Menyontek saat ujian menunjukkan lemahnya keimanan terhadap Yaumul Hisab karena menganggap Allah tidak melihat kecurangan tersebut.', 'Keberhasilan nilai tinggi dari hasil kecurangan akan membawa berkah di dunia dan menyucikan dosa di akhirat.', 'Hasil kerja jujur meskipun nilainya standar akan memperberat timbangan kebaikan karena bernilai integritas (shiddiq).', 'Kejujuran akademik hanya berlaku pada mata pelajaran Agama dan tidak dicatat dalam persidangan Yaumul Mahsyar.', 'A,C', 4],
    [8, 'JODOH', '', 'Jodohkanlah contoh perilaku sehari-hari berikut dengan nama peristiwa Hari Akhir yang menjadi landasan motivasinya!', '1. Berhati-hati saat membuat konten dan menulis komentar di media sosial.', '2. Semangat belajar dan menuntut ilmu yang bermanfaat bagi orang banyak.', '3. Bertobat dan memohon maaf setelah melakukan kesalahan kepada sesama.', 'A. Yaumul Hisab (Kesadaran akan perhitungan amal) | B. Amal Jariyah & Yaumul Mizan (Pemberat timbangan kebaikan) | C. Yaumul Jaza (Keterhindaran dari azab dan harapan balasan Surga)', '1-A,2-B,3-C', 4],
    [9, 'ISIAN', '', 'Keyakinan bahwa seluruh rahasia, niat tersembunyi, dan perbuatan yang tidak terlihat oleh manusia di dunia akan dibuka secara transparan pada Hari Kiamat mengacu pada nama Kiamat sebagai Yaumul...', '', '', '', '', "Tabsyr,Al-Qari'ah,Al-Haqqah,Tubla as-Sarair", 4],
    [10, 'URAIAN', '', 'Rancanglah sebuah rancangan program aksi nyata skala kecil (mini project) di lingkungan sekolah yang terdiri dari 3 tahapan kegiatan untuk membiasakan murid gemar menabung "Amal Jariyah" sebagai persiapan menghadapi Yaumul Mizan!', '', '', '', '', 'Perencanaan, Pelaksanaan, Keberlanjutan', 4],
    [11, 'PG', '', 'Bencana kekeringan panjang dan krisis air bersih melanda suatu wilayah akibat eksploitasi alam berlebihan. Jika ditinjau dari perspektif keimanan PAI, fenomena ini dapat dianalisis sebagai...', 'Kehendak mutlak Allah yang tidak ada kaitannya dengan ulah tangan manusia.', 'Bentuk Kiamat Sugra yang menjadi peringatan agar manusia mengevaluasi dan memperbaiki tata kelola bumi.', 'Tanda pasti Kiamat Kubra yang menandakan seluruh kehidupan di bumi akan berakhir esok hari.', 'Hukuman fisik yang hanya ditujukan kepada orang-orang non-muslim di wilayah tersebut.', 'B', 4],
    [12, 'PGK', '', 'Manakah di antara tindakan berikut yang tergolong sebagai upaya memupuk "Jariyah Digital" yang akan terus mengalir pahalanya bahkan setelah seseorang berada di Alam Barzakh?', 'Mengunggah video tutorial pembelajaran atau konten dakwah yang edukatif dan dimanfaatkan orang banyak.', 'Menyebarkan berita kontroversial tanpa verifikasi (tabayyun) untuk meraih popularitas.', 'Membuat aplikasi atau piranti lunak gratis yang memudahkan masyarakat dalam beribadah dan beramal saleh.', 'Mengunduh dan membagikan ulang karya cipta orang lain tanpa izin demi mendapatkan keuntungan finansial.', 'A,C', 4],
    [13, 'JODOH', '', 'Jodohkanlah potongan makna dalil berikut dengan prinsip keimanan Hari Akhir yang ditunjukkannya!', '1. "Barangsiapa mengerjakan kebaikan seberat zarrah, niscaya dia akan melihat balasan-Nya."', '2. "Tiap-tiap yang berjiwa akan merasakan mati."', '3. "Dunia adalah ladang bercocok tanam untuk akhirat."', 'A. Yaumul Mizan / Keadilan Mutlak Allah | B. Kepastian Kiamat Sugra / Kematian (Maut) | C. Fungsi Dunia sebagai Tempat Orientasi Bekal', '1-A,2-B,3-C', 4],
    [14, 'ISIAN', '', 'Pertimbangan dan persidangan agung Allah yang memisahkan antara orang-orang yang beriman dengan orang-orang kafir atau fasik dinamakan Yaumul...', '', '', '', '', 'Fasl', 4],
    [15, 'URAIAN', '', 'Pandangan hidup materialisme menganggap bahwa kehidupan hanya ada di dunia ini saja dan kematian adalah akhir dari segalanya. Evaluasilah dampak negatif pandangan hidup materialistis tersebut terhadap moralitas dan perilaku sosial manusia jika dibandingkan dengan pandangan hidup seorang muslim yang beriman kepada Hari Akhir!', '', '', '', '', 'Hedonis, menghalalkan segala cara vs kontrol diri dan tanggung jawab akhirat', 4],
    [16, 'PG', '', 'Seorang murid menghitung bahwa ia menyumbang 110 gram emisi CO2 setiap hari dari aktivitas streaming hiburan secara berlebihan. Jika ia mengurangi waktu streaming sebesar 50% dan mengalokasikan waktunya untuk membaca Al-Qur\'an, maka pengurangan emisi per minggunya serta dampak spiritualnya adalah...', 'Berkurang sebesar 385 gram CO2/minggu dan menambah beban dosa di Yaumul Mizan.', 'Berkurang sebesar 385 gram CO2/minggu dan mencerminkan kedewasaan spiritual dalam menjaga kelestarian lingkungan dan efisiensi waktu.', 'Berkurang sebesar 770 gram CO2/minggu tanpa ada kaitan dengan catatan amal Malaikat Raqib.', 'Tidak berpengaruh terhadap emisi karbon, namun tetap menambah pahala membaca Al-Qur\'an.', 'B', 4],
    [17, 'PGK', '', 'Sikap yang mencerminkan pemahaman mendalam tentang konsep Yaumul Hasrah (Hari Penyesalan) adalah...', 'Memanipulasi waktu belajar untuk hal-hal yang tidak produktif karena menganggap masa muda harus dihabiskan bersenang-senang.', 'Memanfaatkan setiap detik kesempatan hidup untuk berbuat baik kepada sesama sebelum datangnya kematian.', 'Meminta maaf dan menyelesaikan tanggung jawab kekeluargaan serta utang piutang selagi masih hidup di dunia.', 'Menunda-nunda pelaksanaan tobat hingga memasuki usia tua atau saat menderita sakit parah.', 'B,C', 4],
    [18, 'JODOH', '', 'Jodohkanlah golongan manusia di Padang Mahsyar berikut dengan amalan utama yang menyebabkan mereka mendapatkan perlindungan (Naungan Allah)!', '1. Pemuda yang tumbuh dalam ibadah kepada Allah', '2. Pemimpin yang adil', '3. Seseorang yang bersedekah secara tersembunyi', 'A. Mengendalikan hawa nafsu dan konsisten menjaga kehormatan serta keimanan sejak remaja. | B. Menggunakan kekuasaan dan wewenang untuk menyejahterakan serta melindungi rakyatnya. | C. Menjaga keikhlasan niat tanpa mengharapkan pujian dan riya dari orang lain.', '1-A,2-B,3-C', 4],
    [19, 'ISIAN', '', 'Peristiwa ditiupnya sangkakala pertama oleh Malaikat Israfil menandakan mulainya kehancuran seluruh alam semesta yang disebut Kiamat...', '', '', '', '', 'Kubra,Kiamat Besar', 4],
    [20, 'URAIAN', '', 'Bagaimana konsep "Timbangan Amal" (Yaumul Mizan) dapat membentuk mentalitas murid yang seimbang (Tawazun) dalam mengejar prestasi duniawi (akademik) dan kesiapan spiritual (akhirat)? Uraikan argumenmu!', '', '', '', '', 'Dunia sebagai wasilah menanam kebaikan, belajar dengan niat ibadah', 4],
    [21, 'PG', '', 'Fenomena doomscrolling (terus-menerus mengonsumsi berita buruk atau konten negatif di media sosial) dapat merusak kesehatan mental dan membuang waktu secara sia-sia. Dari sudut pandang iman kepada Hari Akhir, perilaku ini dapat merugikan manusia di Yaumul Hisab karena...', 'Waktu yang terbuang sia-sia tidak akan dipertanyakan oleh Allah swt.', 'Panca indera yang digunakan untuk melihat hal negatif akan bersaksi dan menuntut pertanggungjawaban di hadapan Allah.', 'Media sosial adalah produk teknologi yang bebas dari norma keagamaan.', 'Setiap emosi negatif yang timbul otomatis mengurangi seluruh pahala kebaikan yang pernah dilakukan.', 'B', 4],
    [22, 'PGK', '', 'Manakah di antara contoh penggalangan dana dan filantropi berikut yang berpotensi menjadi investasi pahala jangka panjang (Amal Jariyah) menyongsong Yaumul Mizan?', 'Membangun sumur air bersih dan fasilitas sanitasi di daerah yang melanda kekeringan.', 'Membagikan makanan siap saji yang habis dikonsumsi saat itu juga kepada anak yatim.', 'Menyediakan beasiswa pendidikan bagi anak-anak kurang mampu hingga mereka mandiri dan mengajarkan ilmunya.', 'Menyumbangkan buku-buku bacaan dan perpustakaan digital yang terus dipakai murid secara berkelanjutan.', 'A,C,D', 4],
    [23, 'JODOH', '', 'Jodohkan fenomena kosmis dalam Al-Qur\'an terkait Hari Kiamat dengan penjelasan ilmiahnya!', '1. "Matahari digulung dan bintang-bintang berjatuhan" (QS. At-Takwir: 1-2)', '2. "Bumi digoncangkan dengan goncangan yang dahsyat" (QS. Az-Zalzalah: 1)', '3. "Laut dipanaskan/meluap" (QS. At-Takwir: 6)', 'A. Habisnya bahan bakar hidrogen pada bintang/matahari sehingga mengalami pembengkakan lalu hancur (Supernova/Red Giant). | B. Pelepasan energi tektonik secara masif akibat pergeseran lempeng bumi secara ekstrem dan bersamaan. | C. Pemanasan global ekstrem atau benturan benda langit yang mencairkan es kutub dan memicu gelombang megatsunami.', '1-A,2-B,3-C', 4],
    [24, 'ISIAN', '', 'Tiga hal yang pahalanya tidak terputus meskipun seseorang telah meninggal dunia dan berada di Alam Barzakh adalah sedekah jariyah, ilmu yang bermanfaat, dan...', '', '', '', '', 'Anak saleh yang mendoakan orang tuanya,Anak saleh,Anak yang saleh', 4],
    [25, 'URAIAN', '', 'Maraknya kasus depresi dan krisis makna hidup pada sebagian remaja modern sering disebabkan oleh orientasi hidup yang terlalu terfokus pada standar kesuksesan duniawi semata. Susunlah sebuah analisis dan solusi spiritual-pedagogis bagaimana iman kepada Hari Akhir dapat menjadi benteng kesehatan mental (Mental Resilience) bagi remaja!', '', '', '', '', 'Kesadaran bahwa kegagalan dunia sementara, hasil akhir ditentukan ketakwaan di akhirat', 4],
    [26, 'PG', '', 'Pak Ahmad memiliki harta simpanan. Sebelum meninggal, ia mewasiatkan 1/3 hartanya untuk pembangunan panti asuhan sebagai tabungan akhirat, sementara sisa hartanya dibagikan kepada ahli waris sesuai hukum Islam. Keputusan Pak Ahmad mencerminkan...', 'Ketidakadilan kepada ahli waris karena mengurangi hak materi mereka di dunia.', 'Kebijaksanaan finansial berbasis kesadaran akhirat untuk memastikan pahala mengalir melalui amal jariyah tanpa merugikan hak waris (max 1/3).', 'Pemborosan harta yang dilarang dalam ajaran Islam.', 'Upaya untuk menghindari kewajiban pajak duniawi semata.', 'B', 4],
    [27, 'PGK', '', 'Di era Kecerdasan Buatan (AI), seseorang dapat membuat konten rekayasa digital (deepfake) atau menyebarkan hoaks dengan sangat cepat. Bagaimana kesadaran akan Yaumul Hisab membatasi seorang murid dalam memanfaatkan AI?', 'Menggunakan AI hanya untuk kebaikan dan klarifikasi kebenaran, bukan untuk merugikan atau menipu orang lain.', 'Menyadari bahwa prompt/perintah yang dimasukkan ke AI yang berdampak buruk tetap dicatat oleh malaikat sebagai dosa perbuatan.', 'Bebas menggunakan AI untuk memalsukan tugas sekolah karena yang bertanggung jawab adalah sistem AI, bukan pembuatnya.', 'Mengkritisi setiap informasi hasil AI dengan asas tabayyun sebelum membagikannya kepada umum.', 'A,B,D', 4],
    [28, 'JODOH', '', 'Jodohkan prinsip Tazkiyatun Nufs (Penyucian Jiwa) menyongsong Hari Akhir dengan penerapannya dalam kehidupan sehari-hari!', '1. Muhasabah (Introspeksi Diri)', '2. Mujahadah (Sungguh-sungguh)', '3. Muraqabah (Merasa Diawasi)', 'A. Mengevaluasi kekurangan amalan harian sebelum tidur malam. | B. Melawan rasa malas untuk bangun shalat subuh tepat waktu. | C. Menjaga integritas dan tidak mencontek saat ujian meskipun tidak ada pengawas.', '1-A,2-B,3-C', 4],
    [29, 'ISIAN', '', 'Proses penimbangan seluruh bobot kebaikan dan keburukan manusia dengan keadilan yang seadil-adilnya pada hari kiamat dinamakan Yaumul...', '', '', '', '', 'Mizan', 4],
    [30, 'URAIAN', '', 'Buatlah sebuah skenario program Profil Pelajar Pancasila (P5) tema "Gaya Hidup Berkelanjutan" yang diintegrasikan dengan nilai iman kepada Hari Akhir (Kiamat Sugra & Mizan) dalam bentuk gerakan Zero Waste di sekolah!', '', '', '', '', 'Mengumpulkan & mendaur ulang sampah plastik sebagai pencegahan Kiamat Sugra dan amal saleh di Mizan', 4]
  ];

  sheetSoal.getRange(1, 1, rows.length, 10).setValues(rows);
  Logger.log('Berhasil mengisi 30 soal PAI ke dalam sheet BankSoal!');
}

function getSoalData() {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('BankSoal');
  if (!sheet) throw new Error("Tab 'BankSoal' tidak ditemukan!");

  const data = sheet.getDataRange().getDisplayValues();
  const soalList = [];

  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    soalList.push({
      id: String(data[i][0]).trim(),
      tipe: String(data[i][1]).trim().toUpperCase(),
      stimulus: String(data[i][2]),
      pertanyaan: String(data[i][3]),
      opsiA: String(data[i][4]),
      opsiB: String(data[i][5]),
      opsiC: String(data[i][6]),
      opsiD: String(data[i][7]),
      bobot: Number(data[i][9]) || 1
    });
  }
  return soalList;
}

function submitJawaban(payload) {
  const ss = getSpreadsheet();
  const sheetSoal = ss.getSheetByName('BankSoal');
  const sheetHasil = ss.getSheetByName('HasilUjian');
  if (!sheetHasil) throw new Error("Tab 'HasilUjian' tidak ditemukan!");

  const dataSoal = sheetSoal.getDataRange().getDisplayValues();
  let skorDiperoleh = 0;
  let skorMaksObjektif = 0;
  let adaUraian = false;

  const kunciMap = {};
  for (let i = 1; i < dataSoal.length; i++) {
    kunciMap[String(dataSoal[i][0]).trim()] = {
      tipe: String(dataSoal[i][1]).trim().toUpperCase(),
      kunci: String(dataSoal[i][8]).trim(),
      bobot: Number(dataSoal[i][9]) || 1
    };
  }

  const jawabanSiswa = payload.jawaban;
  for (const id in kunciMap) {
    const info = kunciMap[id];
    const jwb = jawabanSiswa[id] || '';

    if (info.tipe === 'URAIAN') {
      adaUraian = true;
      continue;
    }

    skorMaksObjektif += info.bobot;

    if (info.tipe === 'PG') {
      if (jwb.toUpperCase() === info.kunci.toUpperCase()) skorDiperoleh += info.bobot;
    } else if (info.tipe === 'PGK') {
      const arrKunci = info.kunci.toUpperCase().split(',').map(s => s.trim()).sort().join(',');
      const arrJwb = String(jwb).toUpperCase().split(',').map(s => s.trim()).filter(Boolean).sort().join(',');
      if (arrKunci === arrJwb && arrKunci !== '') skorDiperoleh += info.bobot;
    } else if (info.tipe === 'JODOH') {
      if (String(jwb).toUpperCase() === info.kunci.toUpperCase()) skorDiperoleh += info.bobot;
    } else if (info.tipe === 'ISIAN') {
      const variasiKunci = info.kunci.toLowerCase().split(',').map(s => s.trim());
      if (variasiKunci.includes(String(jwb).toLowerCase().trim())) skorDiperoleh += info.bobot;
    }
  }

  sheetHasil.appendRow([
    new Date(),
    payload.nama,
    payload.kelas,
    skorDiperoleh,
    skorMaksObjektif,
    JSON.stringify(jawabanSiswa),
    adaUraian ? 'Menunggu Koreksi Guru' : 'Selesai Otomatis'
  ]);

  return {
    status: 'sukses',
    skor: skorDiperoleh,
    maksimal: skorMaksObjektif,
    adaUraian: adaUraian
  };
}
