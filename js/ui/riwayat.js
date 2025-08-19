// js/ui/riwayat.js
import { getPemasukan, updatePemasukan, deletePemasukan } from '/js/data/pemasukan.js';
import { getPengeluaran, updatePengeluaran, deletePengeluaran } from '/js/data/pengeluaran.js';
import { renderRingkasan } from '/js/ui/render.js';
import { formatRupiah } from '/js/utils/formatter.js';

const riwayatListEl = document.getElementById('riwayatList');

export function renderRiwayat() {
  if (!riwayatListEl) return; // aman kalau elemen belum ada
  riwayatListEl.innerHTML = '';

  // Ambil data, jika null, jadikan array kosong
  const pemasukan = (getPemasukan() || []).map(item => ({ ...item, tipe: 'pemasukan' }));
  const pengeluaran = (getPengeluaran() || []).map(item => ({ ...item, tipe: 'pengeluaran' }));

  // Gabung & urutkan
  const semuaTransaksi = [...pemasukan, ...pengeluaran]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  if (semuaTransaksi.length === 0) {
    riwayatListEl.innerHTML = '<li>Belum ada transaksi</li>';
    return;
  }

  semuaTransaksi.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.tipe === 'pemasukan' ? '📥' : '📤'} ${item.nama} - ${formatRupiah(item.jumlah)}</span>
      <button class="edit">Edit</button>
      <button class="hapus">Hapus</button>
    `;

    // Edit transaksi
    li.querySelector('.edit').addEventListener('click', () => {
      const newNama = prompt('Edit nama:', item.nama);
      if (newNama === null) return;

      const newJumlah = prompt('Edit jumlah:', item.jumlah);
      if (newJumlah === null || isNaN(newJumlah)) return;

      if (item.tipe === 'pemasukan') {
        updatePemasukan(item.id, { nama: newNama, jumlah: Number(newJumlah) });
      } else {
        updatePengeluaran(item.id, { nama: newNama, jumlah: Number(newJumlah) });
      }

      renderRiwayat();
      renderRingkasan();
    });

    // Hapus transaksi
    li.querySelector('.hapus').addEventListener('click', () => {
      if (!confirm('Yakin mau hapus transaksi ini?')) return;

      if (item.tipe === 'pemasukan') {
        deletePemasukan(item.id);
      } else {
        deletePengeluaran(item.id);
      }

      renderRiwayat();
      renderRingkasan();
    });

    riwayatListEl.appendChild(li);
  });
}