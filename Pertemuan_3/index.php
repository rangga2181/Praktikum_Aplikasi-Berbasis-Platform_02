<?php
// Program Penilaian Mahasiswa
// Tugas Pertemuan 3 - PHP

// Function hitung nilai akhir
function hitungNilaiAkhir($tugas, $uts, $uas) {
    $hasil = ($tugas * 0.3) + ($uts * 0.35) + ($uas * 0.35);
    return round($hasil, 2);
}

// Function tentukan grade
function tentukanGrade($nilai) {
    if ($nilai >= 85) {
        return 'A';
    } elseif ($nilai >= 75) {
        return 'B';
    } elseif ($nilai >= 65) {
        return 'C';
    } elseif ($nilai >= 55) {
        return 'D';
    } else {
        return 'E';
    }
}

// Function tentukan kelulusan
function tentukanStatus($grade) {
    if ($grade == 'A' || $grade == 'B' || $grade == 'C') {
        return 'Lulus';
    } else {
        return 'Tidak Lulus';
    }
}

// Input data
echo "\n========================================\n";
echo "   INPUT NILAI MAHASISWA\n";
echo "========================================\n\n";

echo "Jumlah mahasiswa: ";
$jumlah = trim(fgets(STDIN));

while ($jumlah < 3) {
    echo "Minimal 3! Jumlah: ";
    $jumlah = trim(fgets(STDIN));
}

$mahasiswa = [];

for ($i = 1; $i <= $jumlah; $i++) {
    echo "\nMahasiswa ke-$i\n";
    echo "Nama: ";
    $nama = trim(fgets(STDIN));
    
    echo "NIM: ";
    $nim = trim(fgets(STDIN));
    
    echo "Nilai Tugas: ";
    $tugas = trim(fgets(STDIN));
    
    echo "Nilai UTS: ";
    $uts = trim(fgets(STDIN));
    
    echo "Nilai UAS: ";
    $uas = trim(fgets(STDIN));
    
    $mahasiswa[] = [
        'nama' => $nama,
        'nim' => $nim,
        'tugas' => $tugas,
        'uts' => $uts,
        'uas' => $uas
    ];
}

// Proses nilai
$data = [];
$total = 0;
$tertinggi = 0;
$namaTertinggi = '';

foreach ($mahasiswa as $mhs) {
    $akhir = hitungNilaiAkhir($mhs['tugas'], $mhs['uts'], $mhs['uas']);
    $grade = tentukanGrade($akhir);
    $status = tentukanStatus($grade);
    
    $data[] = [
        'nama' => $mhs['nama'],
        'nim' => $mhs['nim'],
        'tugas' => $mhs['tugas'],
        'uts' => $mhs['uts'],
        'uas' => $mhs['uas'],
        'akhir' => $akhir,
        'grade' => $grade,
        'status' => $status
    ];
    
    $total += $akhir;
    
    if ($akhir > $tertinggi) {
        $tertinggi = $akhir;
        $namaTertinggi = $mhs['nama'];
    }
}

$rataRata = round($total / count($mahasiswa), 2);

// Tampilkan hasil
echo "\n========================================\n";
echo "   HASIL PENILAIAN\n";
echo "========================================\n\n";

echo "No  Nama              NIM         Tugas  UTS   UAS   Akhir   Grade  Status\n";
echo "--------------------------------------------------------------------------------\n";

$no = 1;
foreach ($data as $d) {
    printf("%-4s%-18s%-12s%-7s%-6s%-6s%-8s%-7s%s\n",
        $no . ".",
        $d['nama'],
        $d['nim'],
        $d['tugas'],
        $d['uts'],
        $d['uas'],
        $d['akhir'],
        $d['grade'],
        $d['status']
    );
    $no++;
}

echo "--------------------------------------------------------------------------------\n\n";

echo "Ringkasan:\n";
echo "- Rata-rata kelas: " . $rataRata . "\n";
echo "- Nilai tertinggi: " . $tertinggi . " (" . $namaTertinggi . ")\n";
echo "- Jumlah mahasiswa: " . count($mahasiswa) . "\n";
echo "\n";
?>
