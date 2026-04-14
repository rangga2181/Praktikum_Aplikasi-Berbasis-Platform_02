<?php
header('Content-Type: application/json');

$profil = [
    'nama' => 'Rangga Pradarrell Fathi',
    'pekerjaan' => 'Web Developer',
    'lokasi' => 'Purwokerto'
];

echo json_encode($profil);
