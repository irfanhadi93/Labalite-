import { addPemasukan, getPemasukan } from '/js/data/pemasukan.js';
import { addPengeluaran, getPengeluaran } from '/js/data/pengeluaran.js';
import { renderRingkasan } from '/js/ui/render.js';
import { renderRiwayat } from '/js/ui/riwayat.js';

const formPemasukan = document.getElementById('formPemasukan');
const formPengeluaran = document.getElementById('formPengeluaran');

formPemasukan.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = document.getElementById('namaPemasukan').value.trim();
  const jumlah = Number(document.getElementById('jumlahPemasukan').value);

  if (!nama || jumlah <= 0) return;

  addPemasukan({ nama, jumlah });
  formPemasukan.reset();

  renderRingkasan();
  renderRiwayat(); // update riwayat
});

formPengeluaran.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = document.getElementById('namaPengeluaran').value.trim();
  const jumlah = Number(document.getElementById('jumlahPengeluaran').value);

  if (!nama || jumlah <= 0) return;

  addPengeluaran({ nama, jumlah });
  formPengeluaran.reset();

  renderRingkasan();
  renderRiwayat(); // update riwayat
});

// Render awal saat page load
renderRingkasan();
renderRiwayat();