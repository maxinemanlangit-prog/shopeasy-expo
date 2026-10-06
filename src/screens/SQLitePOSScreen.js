import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { db, initDatabase } from '../services/db';
import { colors, peso } from '../../screens/ui';
import { useShop } from '../state/ShopContext';

export default function SQLitePOSScreen() {
  const insets = useSafeAreaInsets();
  const { refreshProducts } = useShop();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '' });

  function loadProducts(term = search) {
    if (term.trim() === '') {
      const rows = db.getAllSync('SELECT * FROM products ORDER BY id DESC;');
      setProducts(rows);
      return;
    }
    const rows = db.getAllSync(
      'SELECT * FROM products WHERE name LIKE ? ORDER BY name ASC;',
      ['%' + term + '%']
    );
    setProducts(rows);
  }

  function handleSearch(text) {
    setSearch(text);
    loadProducts(text);
  }

  function saveProduct() {
    const price = parseFloat(form.price);
    const stock = parseInt(form.stock, 10);
    if (!form.name.trim() || !form.category.trim() || isNaN(price) || isNaN(stock) || form.price === '' || form.stock === '') {
      Alert.alert('Missing fields', 'Please fill in name, category, price, and stock.');
      return;
    }
    db.runSync('INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?);', [form.name.trim(), form.category.trim(), price, stock]);
    setForm({ name: '', category: '', price: '', stock: '' });
    setModalVisible(false);
    loadProducts(search);
    refreshProducts();
  }

  function deleteProduct(id) {
    Alert.alert('Delete product', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          db.runSync('DELETE FROM products WHERE id = ?;', [id]);
          loadProducts(search);
          refreshProducts();
        },
      },
    ]);
  }

  function changeStock(id, delta) {
    db.runSync('UPDATE products SET stock = MAX(stock + ?, 0) WHERE id = ?;', [delta, id]);
    loadProducts(search);
    refreshProducts();
  }

  useEffect(() => {
    initDatabase();
    loadProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>ShopEasy POS</Text>
        <Text style={styles.subtitle}>Inventory · SQLite</Text>
      </View>
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search products..."
          placeholderTextColor="#7A93A3"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.addBtnText}>+ Add Item</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No products yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category} · Stock: {item.stock}</Text>
            </View>
            <Text style={styles.price}>{peso(item.price)}</Text>
            <TouchableOpacity style={styles.stockBtn} onPress={() => changeStock(item.id, -1)}><Text style={styles.stockBtnText}>−</Text></TouchableOpacity>
            <TouchableOpacity style={styles.stockBtn} onPress={() => changeStock(item.id, 1)}><Text style={styles.stockBtnText}>+</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => deleteProduct(item.id)}><Text style={styles.deleteBtn}>✕</Text></TouchableOpacity>
          </View>
        )}
      />
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Item</Text>
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#7A93A3" value={form.name} onChangeText={(t) => setForm({ ...form, name: t })} />
            <TextInput style={styles.input} placeholder="Category" placeholderTextColor="#7A93A3" value={form.category} onChangeText={(t) => setForm({ ...form, category: t })} />
            <TextInput style={styles.input} placeholder="Price (₱)" placeholderTextColor="#7A93A3" keyboardType="numeric" value={form.price} onChangeText={(t) => setForm({ ...form, price: t })} />
            <TextInput style={styles.input} placeholder="Stock" placeholderTextColor="#7A93A3" keyboardType="numeric" value={form.stock} onChangeText={(t) => setForm({ ...form, stock: t })} />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={{ fontWeight: '800', color: colors.text }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSave} onPress={saveProduct}>
                <Text style={{ fontWeight: '800', color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.orange,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#FFEDE0', fontSize: 14, marginTop: 4 },
  list: { padding: 16, gap: 12 },
  searchWrap: { paddingHorizontal: 16, paddingTop: 16 },
  search: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: '#D6EAF5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: '800', color: colors.text },
  category: { fontSize: 13, color: colors.gray, marginTop: 4 },
  price: { fontSize: 18, fontWeight: '800', color: colors.orange },
  empty: { padding: 32, alignItems: 'center' },
  emptyText: { color: colors.gray, fontSize: 14 },
  addBtn: { backgroundColor: colors.orange, marginHorizontal: 16, marginTop: 12, borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  stockBtn: { backgroundColor: colors.tile, borderRadius: 8, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  stockBtnText: { fontSize: 18, fontWeight: '800', color: colors.text },
  deleteBtn: { fontSize: 18, color: '#FF4D6D', fontWeight: '800', paddingHorizontal: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(11,42,60,0.4)', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, gap: 12 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 4 },
  input: { borderWidth: 1.5, borderColor: '#D6EAF5', borderRadius: 12, paddingVertical: 11, paddingHorizontal: 14, fontSize: 15, color: colors.text },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  modalCancel: { flex: 1, backgroundColor: colors.tile, borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  modalSave: { flex: 1, backgroundColor: colors.orange, borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
});
