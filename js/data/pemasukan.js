import { saveData, loadData } from '../utils/storage.js';

const KEY = 'pemasukan';

// Ambil semua data
export function getPemasukan() {
  return loadData(KEY);
}

// Tambah data baru
export function addPemasukan(item) {
  const data = loadData(KEY);
  item.id = Date.now(); // beri ID unik
  data.push(item);
  saveData(KEY, data);
}

// Update data berdasarkan ID
export function updatePemasukan(id, newItem) {
  let data = loadData(KEY);
  data = data.map(item => item.id === id ? { ...item, ...newItem } : item);
  saveData(KEY, data);
}

// Hapus data berdasarkan ID
export function deletePemasukan(id) {
  let data = loadData(KEY);
  data = data.filter(item => item.id !== id);
  saveData(KEY, data);
}