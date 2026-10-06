import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('pos_inventory.db');

export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );
  `);

  const row = db.getFirstSync('SELECT COUNT(*) as count FROM products');
  if (row.count === 0) {
    const samples = [
      { name: 'Adidas Samba', category: 'Shoes', price: 5500, stock: 12 },
      { name: 'Tiger Tokuten', category: 'Shoes', price: 4800, stock: 8 },
      { name: 'Sperry Top-Sider', category: 'Shoes', price: 4200, stock: 15 },
      { name: 'Nike Air Zoom G.T. Cut', category: 'Shoes', price: 7500, stock: 5 },
      { name: 'AirTune Wireless Headphones', category: 'Electronics', price: 1299, stock: 20 },
    ];
    for (const p of samples) {
      db.runSync(
        'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
        [p.name, p.category, p.price, p.stock]
      );
    }
  }
}
