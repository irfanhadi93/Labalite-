import { getPemasukan } from '/js/data/pemasukan.js';
import { getPengeluaran } from '/js/data/pengeluaran.js';

export function hitungLabaRugi() {
  const pemasukan = getPemasukan();
  const pengeluaran = getPengeluaran();

  const totalPemasukan = pemasukan.reduce((sum, item) => sum + Number(item.jumlah), 0);
  const totalPengeluaran = pengeluaran.reduce((sum, item) => sum + Number(item.jumlah), 0);
  const labaRugi = totalPemasukan - totalPengeluaran;

  return { totalPemasukan, totalPengeluaran, labaRugi };
}