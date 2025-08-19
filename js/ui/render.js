import { formatRupiah } from '/js/utils/formatter.js';
import { hitungLabaRugi } from '/js/core/labaRugi.js';

export function renderRingkasan() {
  const { totalPemasukan, totalPengeluaran, labaRugi } = hitungLabaRugi();

  const elTotalPemasukan = document.getElementById('totalPemasukan');
  const elTotalPengeluaran = document.getElementById('totalPengeluaran');
  const elLabaRugi = document.getElementById('labaRugi');

  elTotalPemasukan.textContent = formatRupiah(totalPemasukan);
  elTotalPengeluaran.textContent = formatRupiah(totalPengeluaran);

  // Tambahkan teks keterangan laba/rugi
  if (labaRugi >= 0) {
    elLabaRugi.textContent = `${formatRupiah(labaRugi)} — Kamu untung!`;
    elLabaRugi.style.color = 'limegreen';
  } else {
    elLabaRugi.textContent = `${formatRupiah(Math.abs(labaRugi))} — Kamu rugi!`;
    elLabaRugi.style.color = 'red';
  }
}