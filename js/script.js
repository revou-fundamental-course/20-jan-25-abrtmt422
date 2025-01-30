// Ambil elemen-elemen penting
const bmiForm = document.getElementById('bmi-form');
const bmiResult = document.getElementById('bmi-result');
const resetBtn = document.getElementById('reset-btn');

// Fungsi untuk mendapatkan deskripsi berdasarkan kategori BMI
function getBmiDescription(category) {
  const descriptions = {
    "Kekurangan Berat Badan": "Anda memiliki berat badan di bawah normal. Ini bisa menyebabkan berbagai masalah kesehatan.",
    "Berat Badan Normal": "Berat badan Anda ideal. Pertahankan pola hidup sehat dan seimbang.",
    "Kelebihan Berat Badan": "Anda memiliki berat badan di atas normal. Sebaiknya mulai perhatikan pola makan dan aktivitas fisik.",
    "Obesitas": "Obesitas dapat meningkatkan risiko berbagai penyakit. Konsultasikan dengan ahli gizi atau dokter."
  };
  return descriptions[category] || "Tidak diketahui";
}

// Fungsi untuk mendapatkan saran pola hidup sehat
function getLifestyleAdvice(category) {
  const advice = {
    "Kekurangan Berat Badan": "Cobalah meningkatkan asupan kalori dengan makanan bergizi dan olahraga yang sesuai.",
    "Berat Badan Normal": "Tetap jaga keseimbangan nutrisi, olahraga teratur, dan cukup istirahat.",
    "Kelebihan Berat Badan": "Kurangi asupan kalori berlebih dan tingkatkan aktivitas fisik secara rutin.",
    "Obesitas": "Perlu perubahan pola makan sehat dan olahraga lebih intensif. Sebaiknya konsultasikan ke dokter."
  };
  return advice[category] || "Tidak diketahui";
}

// Fungsi untuk mendapatkan rekomendasi gizi
function getNutritionAdvice(category) {
  const nutrition = {
    "Kekurangan Berat Badan": "Tingkatkan konsumsi protein, lemak sehat, dan karbohidrat kompleks.",
    "Berat Badan Normal": "Pertahankan pola makan seimbang dengan buah, sayur, protein, dan serat.",
    "Kelebihan Berat Badan": "Kurangi makanan tinggi lemak jenuh dan gula, serta perbanyak serat.",
    "Obesitas": "Fokus pada diet rendah kalori dengan lebih banyak serat, protein, dan air."
  };
  return nutrition[category] || "Tidak diketahui";
}

// Fungsi untuk mendapatkan daftar penyakit yang berisiko
function getHealthRisks(category) {
  const risks = {
    "Kekurangan Berat Badan": ["Anemia", "Osteoporosis", "Sistem Imun Lemah", "Kekurangan gizi", "Gangguan pertumbuhan", 
      "Sistem kekebalan tubuh lemah", "Gangguan kesuburan"],
    "Berat Badan Normal": ["Risiko penyakit rendah, pertahankan gaya hidup sehat"],
    "Kelebihan Berat Badan": ["Diabetes tipe 2", "Hipertensi", "Kolesterol tinggi"],
    "Obesitas": ["Penyakit jantung", "Diabetes", "Stroke", "Hipertensi", "Kanker", "Masalah Pencernaan", "Sleep Apnea", "Osteoartritis"]
  };
  return risks[category] ? risks[category].join(", ") : "Tidak diketahui";
}

// Tambahkan event listener untuk form submit
bmiForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Ambil nilai input
  const gender = document.getElementById('gender').value;
  const age = parseInt(document.getElementById('age').value);
  const height = parseFloat(document.getElementById('height').value) / 100; // Konversi ke meter
  const weight = parseFloat(document.getElementById('weight').value);

  // Validasi input
  if (!gender || !age || !height || !weight) {
    bmiResult.innerHTML = `<p style="color: red;">Harap isi semua kolom dengan benar!</p>`;
    return;
  }

  // Hitung BMI
  const bmi = (weight / (height * height)).toFixed(1);

  // Tentukan kategori BMI
  let category = '';
  if (bmi < 18.5) {
    category = 'Kekurangan Berat Badan';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Berat Badan Normal';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Kelebihan Berat Badan';
  } else {
    category = 'Obesitas';
  }

  // Ambil informasi tambahan
  const description = getBmiDescription(category);
  const advice = getLifestyleAdvice(category);
  const nutrition = getNutritionAdvice(category);
  const risks = getHealthRisks(category);

  // Tampilkan hasil
  bmiResult.innerHTML = `
    <p>Jenis Kelamin: ${gender === 'male' ? 'Laki-Laki' : 'Wanita'}</p>
    <p>BMI Anda: <strong>${bmi}</strong></p>
    <p>Kategori: <strong>${category}</strong></p>
    <p><strong>Deskripsi:</strong> ${description}</p>
    <p><strong>Saran Pola Hidup:</strong> ${advice}</p>
    <p><strong>Saran Gizi:</strong> ${nutrition}</p>
    <p><strong>Risiko Penyakit:</strong> ${risks}</p>
  `;

  // Tampilkan hasil BMI, tombol unduhan, dan tombol reset
  document.getElementById('result').style.display = "block";
  document.getElementById('download-app').style.display = "block";
  document.getElementById('reset-section').style.display = "block";
});

// Tambahkan event listener untuk tombol "Hitung Ulang"
resetBtn.addEventListener('click', function () {
  // Reset form input
  bmiForm.reset();

  // Sembunyikan hasil BMI, unduh aplikasi, dan tombol reset
  document.getElementById('result').style.display = "none";
  document.getElementById('download-app').style.display = "none";
  document.getElementById('reset-section').style.display = "none";
});
