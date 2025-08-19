import { saveData, loadData } from '/js/utils/storage.js';

const KEY = 'pengeluaran';

// Ambil semua data
export function getPengeluaran() {
  return loadData(KEY);
}

// Tambah data baru
export function addPengeluaran(item) {
  const data = loadData(KEY);
  item.id = Date.now(); // beri ID unik
  data.push(item);
  saveData(KEY, data);
}

// Update data berdasarkan ID
export function updatePengeluaran(id, newItem) {
  let data = loadData(KEY);
  data = data.map(item => item.id === id ? { ...item, ...newItem } : item);
  saveData(KEY, data);
}

// Hapus data berdasarkan ID
export function deletePengeluaran(id) {
  let data = loadData(KEY);
  data = data.filter(item => item.id !== id);
  saveData(KEY, data);
}