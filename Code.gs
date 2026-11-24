<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Asesmen Digital PAI Kelas IX</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { background-color: #f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding-bottom: 40px; }
    .hero-banner { background: linear-gradient(135deg, #0d6efd, #084298); color: white; border-radius: 14px; box-shadow: 0 4px 15px rgba(13, 110, 253, 0.2); }
    .card-panel { border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.04); background: #ffffff; }
    .stimulus-box { background-color: #f8fafc; border-left: 4px solid #0d6efd; padding: 14px 16px; border-radius: 6px; margin-bottom: 16px; font-size: 0.94rem; color: #334155; white-space: pre-line; line-height: 1.6; }
    .sticky-bar { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.96); backdrop-filter: blur(6px); border-bottom: 1px solid #cbd5e1; padding: 10px 0; margin-bottom: 20px; }
    .sticky-sidebar { position: sticky; top: 75px; }
    .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
    .nav-btn { width: 100%; height: 40px; padding: 0; font-size: 0.9rem; font-weight: 600; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
    .nav-btn.aktif { border: 2.5px solid #0d6efd !important; box-shadow: 0 0 0 3px rgba(13,110,253,0.2); transform: scale(1.04); }
    .form-check-label { cursor: pointer; line-height: 1.5; }
    .form-check:hover { background-color: #f8fafc; border-radius: 6px; }
  </style>
</head>
<body>

  <!-- Sticky Status Bar saat ujian berlangsung -->
  <div id="top-bar" class="sticky-bar d-none shadow-sm">
    <div class="container d-flex justify-content-between align-items-center" style="max-width: 1140px;">
      <div>
        <span class="fw-bold text-dark d-block" id="labelNama" style="font-size: 0.95rem;">Peserta</span>
        <small class="text-muted" id="labelKelas">Kelas</small>
      </div>
      <div class="text-end">
        <span class="badge bg-primary fs-6 px-3 py-2" id="progresBadge">0 / 30 Terjawab</span>
      </div>
    </div>
  </div>

  <div class="container pt-3" style="max-width: 1140px;">
    <!-- Header Utama (Muncul saat Login) -->
    <div id="header-awal" class="hero-banner p-4 text-center mb-4 mx-auto" style="max-width: 720px;">
      <span class="badge bg-warning text-dark mb-2">ASESMEN HOTS & AKM</span>
      <h3 class="mb-1 fw-bold">Pendidikan Agama Islam & Budi Pekerti</h3>
      <p class="mb-0 opacity-75">Kelas IX • Materi Iman Kepada Hari Akhir</p>
    </div>

    <!-- Form Login -->
    <div id="section-login" class="card-panel p-4 mx-auto" style="max-width: 720px;">
      <h5 class="mb-3 fw-bold text-primary">Identitas Peserta Ujian</h5>
      <div class="row g-3">
        <div class="col-md-7">
          <label class="form-label fw-semibold">Nama Lengkap</label>
          <input type="text" id="inputNama" class="form-control form-control-lg" placeholder="Masukkan nama lengkap...">
        </div>
        <div class="col-md-5">
          <label class="form-label fw-semibold">Kelas</label>
          <input type="text" id="inputKelas" class="form-control form-control-lg" placeholder="Contoh: IX-C">
        </div>
      </div>
      <button type="button" onclick="mulaiUjian()" class="btn btn-primary btn-lg mt-4 w-100 fw-bold">Mulai Mengerjakan Soal</button>
    </div>

    <!-- Loading -->
    <div id="loading" class="text-center my-5 d-none">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
      <p class="mt-3 text-muted fw-semibold">Menyiapkan soal dari database...</p>
    </div>

    <!-- Area Ujian Split Kiri (Soal) & Kanan (Nomor Soal) -->
    <div id="section-ujian" class="d-none">
      <div class="row g-4 align-items-start">
        <!-- KOLOM KIRI: BUTIR SOAL AKTIF -->
        <div class="col-md-8">
          <div id="container-soal-aktif" class="card-panel p-4 mb-3">
            <!-- Isi soal aktif dirender di sini -->
          </div>

          <!-- Tombol Navigasi Sebelumnya / Selanjutnya -->
          <div class="d-flex justify-content-between align-items-center gap-2">
            <button type="button" id="btnPrev" onclick="gantiSoal(indexAktif - 1)" class="btn btn-outline-primary px-4 py-2 fw-semibold">
              &laquo; Soal Sebelumnya
            </button>
            <button type="button" id="btnNext" onclick="gantiSoal(indexAktif + 1)" class="btn btn-primary px-4 py-2 fw-semibold">
              Soal Selanjutnya &raquo;
            </button>
          </div>
        </div>

        <!-- KOLOM KANAN: DAFTAR NOMOR SOAL -->
        <div class="col-md-4">
          <div class="card-panel p-3 sticky-sidebar">
            <h6 class="fw-bold text-dark mb-2">Daftar Nomor Soal</h6>
            <div class="d-flex flex-wrap gap-2 mb-3" style="font-size: 0.78rem;">
              <span><span class="badge bg-primary">&nbsp;</span> Aktif</span>
              <span><span class="badge bg-success">&nbsp;</span> Terjawab</span>
              <span><span class="badge bg-light text-dark border">&nbsp;</span> Belum</span>
            </div>
            <div id="navigasi-nomor" class="nav-grid mb-4"></div>

            <hr>
            <button type="button" id="btnSubmit" onclick="kirimJawaban()" class="btn btn-success w-100 py-2 fw-bold shadow-sm">
              Kirim Semua Jawaban
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Halaman Hasil -->
    <div id="section-hasil" class="card-panel p-5 text-center mx-auto d-none" style="max-width: 720px;">
      <div class="mb-3 text-success">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
      </div>
      <h4 class="text-success fw-bold">Jawaban Berhasil Dikirim!</h4>
      <p class="text-muted">Terima kasih <strong id="hasilNama"></strong>, data ujian Anda telah tersimpan di database guru.</p>
      <div class="my-4 p-4 bg-light rounded border">
        <span class="text-uppercase text-muted small d-block fw-semibold">Skor Soal Objektif (PG, PGK, Menjodohkan, Isian)</span>
        <h1 class="display-4 fw-bold text-primary mb-0" id="tampilSkor">0 / 0</h1>
      </div>
      <div id="catatanUraian" class="alert alert-warning d-none">
        <strong>Catatan:</strong> Nilai akhir masih menunggu koreksi manual guru untuk soal Uraian.
      </div>
    </div>
  </div>

  <script>
    // =========================================================================
    // TEMPEL URL WEB APP APPS SCRIPT ANDA (YANG BERAKHIRAN /exec) DI SINI:
    // =========================================================================
    const SCRIPT_URL = "TEMPEL_URL_WEB_APP_EXEC_ANDA_DI_SINI";

    var daftarSoal = [];
    var jawabanTersimpan = {};
    var indexAktif = 0;

    function mulaiUjian() {
      var nama = document.getElementById('inputNama').value.trim();
      var kelas = document.getElementById('inputKelas').value.trim();
      if (!nama || !kelas) {
        alert('Harap isi Nama Lengkap dan Kelas terlebih dahulu!');
        return;
      }

      document.getElementById('labelNama').innerText = nama;
      document.getElementById('labelKelas').innerText = 'Kelas: ' + kelas;
      document.getElementById('section-login').classList.add('d-none');
      document.getElementById('header-awal').classList.add('d-none');
      document.getElementById('loading').classList.remove('d-none');

      // Mengambil data soal dari Google Apps Script via Fetch API
      fetch(SCRIPT_URL)
        .then(function(response) {
          if (!response.ok) throw new Error('Jaringan bermasalah (' + response.status + ')');
          return response.json();
        })
        .then(function(res) {
          if (res.status === 'sukses') {
            inisialisasiUjian(res.data);
          } else {
            throw new Error(res.message || 'Gagal memuat soal dari server.');
          }
        })
        .catch(function(err) {
          document.getElementById('loading').classList.add('d-none');
          document.getElementById('section-login').classList.remove('d-none');
          document.getElementById('header-awal').classList.remove('d-none');
          alert('Error dari server: ' + err.message);
        });
    }

    function inisialisasiUjian(data) {
      daftarSoal = data || [];
      document.getElementById('loading').classList.add('d-none');
      document.getElementById('section-ujian').classList.remove('d-none');
      document.getElementById('top-bar').classList.remove('d-none');

      if (daftarSoal.length === 0) {
        document.getElementById('container-soal-aktif').innerHTML = '<div class="alert alert-warning">Data soal kosong.</div>';
        return;
      }

      buatTombolNavigasi();
      tampilkanSoal(0);
      updateStatusNavigasi();
    }

    function buatTombolNavigasi() {
      var navContainer = document.getElementById('navigasi-nomor');
      navContainer.innerHTML = '';
      daftarSoal.forEach(function(soal, idx) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'nav_btn_' + idx;
        btn.className = 'btn btn-outline-secondary nav-btn';
        btn.innerText = idx + 1;
        btn.onclick = function() { gantiSoal(idx); };
        navContainer.appendChild(btn);
      });
    }

    function simpanJawabanSaatIni() {
      if (!daftarSoal[indexAktif]) return;
      var soal = daftarSoal[indexAktif];

      if (soal.tipe === 'PG') {
        var terpilih = document.querySelector('input[name="soal_aktif"]:checked');
        jawabanTersimpan[soal.id] = terpilih ? terpilih.value : '';
      } else if (soal.tipe === 'PGK') {
        var terpilihPgk = Array.from(document.querySelectorAll('input[name="soal_aktif"]:checked')).map(function(el) { return el.value; });
        jawabanTersimpan[soal.id] = terpilihPgk.join(',');
      } else if (soal.tipe === 'JODOH') {
        var selects = Array.from(document.querySelectorAll('.jodoh_aktif'));
        var pasangan = selects.map(function(sel) { return sel.dataset.nomor + '-' + sel.value; }).filter(function(val) { return !val.endsWith('-'); });
        jawabanTersimpan[soal.id] = pasangan.join(',');
      } else if (soal.tipe === 'ISIAN') {
        var inp = document.getElementById('isian_aktif');
        if (inp) jawabanTersimpan[soal.id] = inp.value.trim();
      } else if (soal.tipe === 'URAIAN') {
        var txt = document.getElementById('uraian_aktif');
        if (txt) jawabanTersimpan[soal.id] = txt.value.trim();
      }
    }

    function gantiSoal(indexBaru) {
      if (indexBaru < 0 || indexBaru >= daftarSoal.length) return;
      simpanJawabanSaatIni();
      tampilkanSoal(indexBaru);
      updateStatusNavigasi();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function tampilkanSoal(idx) {
      indexAktif = idx;
      var soal = daftarSoal[idx];
      var jwbLama = jawabanTersimpan[soal.id] || '';
      var container = document.getElementById('container-soal-aktif');

      var htmlStimulus = soal.stimulus ? '<div class="stimulus-box">' + soal.stimulus + '</div>' : '';
      var htmlInput = '';
      var labelTipe = soal.tipe;

      if (soal.tipe === 'PG') {
        labelTipe = 'Pilihan Ganda';
        var opsi = [
          { kode: 'A', teks: soal.opsiA },
          { kode: 'B', teks: soal.opsiB },
          { kode: 'C', teks: soal.opsiC },
          { kode: 'D', teks: soal.opsiD }
        ];
        opsi.forEach(function(o) {
          if (o.teks) {
            var checked = (jwbLama === o.kode) ? 'checked' : '';
            htmlInput += '<div class="form-check p-2 ps-4 mb-2 border rounded">' +
              '<input class="form-check-input" type="radio" onchange="onInputChange()" name="soal_aktif" value="' + o.kode + '" id="opt_' + o.kode + '" ' + checked + '>' +
              '<label class="form-check-label w-100" for="opt_' + o.kode + '"><strong>' + o.kode + '.</strong> ' + o.teks + '</label>' +
              '</div>';
          }
        });
      } else if (soal.tipe === 'PGK') {
        labelTipe = 'PG Kompleks';
        var arrJwb = jwbLama ? jwbLama.split(',') : [];
        var opsiPgk = [
          { kode: 'A', teks: soal.opsiA },
          { kode: 'B', teks: soal.opsiB },
          { kode: 'C', teks: soal.opsiC },
          { kode: 'D', teks: soal.opsiD }
        ];
        htmlInput += '<small class="text-primary fw-semibold d-block mb-2">*Pilih lebih dari satu jawaban yang benar</small>';
        opsiPgk.forEach(function(o) {
          if (o.teks) {
            var checked = arrJwb.includes(o.kode) ? 'checked' : '';
            htmlInput += '<div class="form-check p-2 ps-4 mb-2 border rounded">' +
              '<input class="form-check-input" type="checkbox" onchange="onInputChange()" name="soal_aktif" value="' + o.kode + '" id="opt_' + o.kode + '" ' + checked + '>' +
              '<label class="form-check-label w-100" for="opt_' + o.kode + '">' + o.teks + '</label>' +
              '</div>';
          }
        });
      } else if (soal.tipe === 'JODOH') {
        labelTipe = 'Menjodohkan';
        var mapJodoh = {};
        if (jwbLama) {
          jwbLama.split(',').forEach(function(p) {
            var parts = p.split('-');
            if (parts.length === 2) mapJodoh[parts[0]] = parts[1];
          });
        }

        var itemKiri = [soal.opsiA, soal.opsiB, soal.opsiC].filter(Boolean);
        var pilihanKanan = soal.opsiD ? soal.opsiD.split('|').map(function(s) { return s.trim(); }) : [];
        htmlInput += '<div class="table-responsive"><table class="table table-bordered align-middle mb-0"><thead class="table-light"><tr><th>Premis / Pernyataan</th><th>Pasangan Jawaban</th></tr></thead><tbody>';
        itemKiri.forEach(function(kiri, i) {
          var nomorKiri = String(i + 1);
          var valTerpilih = mapJodoh[nomorKiri] || '';
          var optionsDropdown = '<option value="">-- Pilih Pasangan --</option>';
          pilihanKanan.forEach(function(kanan) {
            var huruf = kanan.split('.')[0].trim();
            var selected = (valTerpilih === huruf) ? 'selected' : '';
            optionsDropdown += '<option value="' + huruf + '" ' + selected + '>' + kanan + '</option>';
          });
          htmlInput += '<tr><td width="48%">' + kiri + '</td><td width="52%">' +
            '<select class="form-select jodoh_aktif" onchange="onInputChange()" data-nomor="' + nomorKiri + '">' + optionsDropdown + '</select>' +
            '</td></tr>';
        });
        htmlInput += '</tbody></table></div>';
      } else if (soal.tipe === 'ISIAN') {
        labelTipe = 'Isian Singkat';
        htmlInput = '<input type="text" class="form-control form-control-lg" oninput="onInputChange()" id="isian_aktif" value="' + jwbLama.replace(/"/g, '&quot;') + '" placeholder="Ketik jawaban singkat Anda di sini...">';
      } else if (soal.tipe === 'URAIAN') {
        labelTipe = 'Uraian';
        htmlInput = '<textarea class="form-control" oninput="onInputChange()" id="uraian_aktif" rows="5" placeholder="Tuliskan analisis/penjelasan lengkap Anda di sini...">' + jwbLama + '</textarea>';
      }

      container.innerHTML =
        '<div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">' +
        '<span class="fw-bold text-primary fs-5">Soal No. ' + (idx + 1) + ' <span class="text-muted fw-normal fs-6">dari ' + daftarSoal.length + '</span></span>' +
        '<span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2">' + labelTipe + '</span>' +
        '</div>' +
        htmlStimulus +
        '<p class="fw-semibold mb-3" style="font-size: 1.05rem;">' + soal.pertanyaan + '</p>' +
        htmlInput;

      document.getElementById('btnPrev').disabled = (idx === 0);
      document.getElementById('btnNext').disabled = (idx === daftarSoal.length - 1);
    }

    function onInputChange() {
      simpanJawabanSaatIni();
      updateStatusNavigasi();
    }

    function isSoalTerjawab(soal) {
      var val = jawabanTersimpan[soal.id] || '';
      if (!val) return false;
      if (soal.tipe === 'JODOH') {
        var jumlahItemKiri = [soal.opsiA, soal.opsiB, soal.opsiC].filter(Boolean).length;
        return val.split(',').length === jumlahItemKiri;
      }
      return val.trim() !== '';
    }

    function updateStatusNavigasi() {
      var totalTerjawab = 0;
      daftarSoal.forEach(function(soal, idx) {
        var btn = document.getElementById('nav_btn_' + idx);
        var sudah = isSoalTerjawab(soal);
        if (sudah) totalTerjawab++;

        btn.className = 'btn nav-btn';
        if (idx === indexAktif) {
          btn.classList.add('aktif');
          btn.classList.add(sudah ? 'btn-success' : 'btn-primary');
        } else {
          btn.classList.add(sudah ? 'btn-success' : 'btn-outline-secondary');
        }
      });

      document.getElementById('progresBadge').innerText = totalTerjawab + ' / ' + daftarSoal.length + ' Terjawab';
    }

    function kirimJawaban() {
      simpanJawabanSaatIni();

      var totalTerjawab = daftarSoal.filter(isSoalTerjawab).length;
      var pesanKonfirmasi = (totalTerjawab < daftarSoal.length)
        ? 'Baru ' + totalTerjawab + ' dari ' + daftarSoal.length + ' soal yang terjawab. Yakin ingin mengirim jawaban sekarang?'
        : 'Semua soal (' + daftarSoal.length + '/' + daftarSoal.length + ') sudah terjawab. Yakin ingin mengirim jawaban sekarang?';

      if (!confirm(pesanKonfirmasi)) return;

      var btn = document.getElementById('btnSubmit');
      btn.disabled = true;
      btn.innerText = 'Menyimpan Jawaban...';

      var namaSiswa = document.getElementById('inputNama').value.trim();
      var payload = {
        nama: namaSiswa,
        kelas: document.getElementById('inputKelas').value.trim(),
        jawaban: jawabanTersimpan
      };

      // Mengirim jawaban ke Google Apps Script via Fetch POST
      // Menggunakan text/plain agar terhindar dari blokir CORS preflight browser
      fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      })
      .then(function(response) {
        if (!response.ok) throw new Error('Gagal terhubung ke server (' + response.status + ')');
        return response.json();
      })
      .then(function(res) {
        if (res.status === 'sukses') {
          document.getElementById('section-ujian').classList.add('d-none');
          document.getElementById('top-bar').classList.add('d-none');
          document.getElementById('section-hasil').classList.remove('d-none');
          document.getElementById('hasilNama').innerText = namaSiswa;
          document.getElementById('tampilSkor').innerText = res.skor + ' / ' + res.maksimal;
          if (res.adaUraian) {
            document.getElementById('catatanUraian').classList.remove('d-none');
          }
        } else {
          throw new Error(res.message || 'Gagal menyimpan jawaban.');
        }
      })
      .catch(function(err) {
        btn.disabled = false;
        btn.innerText = 'Kirim Semua Jawaban';
        alert('Gagal menyimpan jawaban: ' + err.message);
      });
    }
  </script>
</body>
</html>
