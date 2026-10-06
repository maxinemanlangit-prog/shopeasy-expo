import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, StyleSheet } from 'react-native';
import { colors, common, Icon, peso } from './ui';
import { useShop } from '../src/state/ShopContext';

const CATS = [
  ['Fashion', 'shirt'], ['Beauty', 'sparkle'], ['Electronics', 'headphones'], ['Home', 'lamp'], ['Shoes', 'shoes'],
  ['Bags', 'bag'], ['Sports', 'gym'], ['Groceries', 'apple'], ['Toys', 'toys'], ['More', 'grid'],
];

export default function HomeScreen({ go, toast, openProduct }) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState(null);
  const [claimed, setClaimed] = useState({ v1: false, v2: false });
  const [total, setTotal] = useState(2 * 3600 + 14 * 60 + 38);

  useEffect(() => {
    const t = setInterval(() => setTotal((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const p2 = (n) => String(n).padStart(2, '0');
  const countdown = `${p2(Math.floor(total / 3600))} : ${p2(Math.floor((total % 3600) / 60))} : ${p2(total % 60)}`;

  const { products: productsMap } = useShop();
  const products = Object.values(productsMap).slice(0, 2).map((p) => ({
    id: p.id,
    name: p.name,
    price: peso(p.price),
    discount: p.discount || '',
    rating: `${p.rating} · ${p.sold}`,
    img: p.img,
  })).filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const claim = (key, label, small) => {
    setClaimed((c) => ({ ...c, [key]: !c[key] }));
    toast(claimed[key] ? `${label} voucher removed` : `${label} voucher claimed`);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchhead}>
        <View style={styles.searchbox}>
          <Icon name="search" size={20} strokeWidth={2} />
          <TextInput style={styles.searchInput} placeholder="Search ShopEasy" placeholderTextColor="#7A93A3" value={query} onChangeText={setQuery} />
        </View>
        <TouchableOpacity onPress={() => toast('You have 3 new notifications')}>
          <Icon name="bell" size={26} color="#fff" strokeWidth={1.8} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={styles.scroll}>
        <TouchableOpacity style={styles.banner} onPress={() => toast('Opening campaign: Big finds. Small prices.')}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tag}>SHOPEASY FINDS</Text>
            <Text style={styles.bannerH2}>Big finds. Small prices.</Text>
            <Text style={styles.bannerP}>Your everyday favorites, for less  →</Text>
          </View>
          <Icon name="bannerBag" size={64} strokeWidth={1.4} />
        </TouchableOpacity>

        <View style={styles.cats}>
          {CATS.map(([name, ic]) => (
            <TouchableOpacity key={name} style={styles.cat} onPress={() => { setActiveCat(name); toast(name + ' selected'); }}>
              <View style={[styles.catTile, activeCat === name && styles.catTileActive]}><Icon name={ic} size={26} strokeWidth={1.7} /></View>
              <Text style={styles.catLabel}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.vouchers}>
          {[['v1', '₱100 OFF', 'Min. spend ₱999  ›'], ['v2', 'FREE SHIPPING', 'On your first order  ›']].map(([key, title, small]) => (
            <TouchableOpacity key={key} style={[styles.voucher, claimed[key] && styles.voucherClaimed]} onPress={() => claim(key, title, small)}>
              <Text style={styles.voucherTitle}>{title}</Text>
              <Text style={[styles.voucherSmall, claimed[key] && { color: '#1E7A46' }]}>{claimed[key] ? '✓ Claimed' : small}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.fsHeader}>
          <Text style={styles.fsH2}>Flash Sale</Text>
          <Text style={styles.countdown}>{countdown}</Text>
          <Text style={styles.seeAll} onPress={() => toast('Showing all flash sale items')}>See all ›</Text>
        </View>

        <View style={styles.products}>
          {products.map((p) => (
            <TouchableOpacity key={p.id} style={styles.card} onPress={() => openProduct(p.id)}>
              <Image source={p.img} style={styles.cardImg} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{p.name}</Text>
                <View style={styles.priceRow}><Text style={styles.price}>{p.price}</Text><Text style={styles.discount}>{p.discount}</Text></View>
                <Text style={styles.rating}>{p.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.fineprint}>Easy returns  ·  Secure payments  ·  Great finds daily</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchhead: { backgroundColor: colors.orange, padding: 10, paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row', gap: 12, alignItems: 'center' },
  searchbox: { flex: 1, backgroundColor: '#fff', borderRadius: 999, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, gap: 10 },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },
  scroll: { padding: 16, gap: 14 },
  banner: { backgroundColor: colors.banner, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 8 },
  tag: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5, color: colors.text },
  bannerH2: { fontSize: 26, fontWeight: '800', color: colors.text, marginVertical: 6 },
  bannerP: { fontSize: 14, color: colors.darkBlue },
  cats: { flexDirection: 'row', flexWrap: 'wrap' },
  cat: { width: '20%', alignItems: 'center', marginBottom: 14, gap: 6 },
  catTile: { width: 60, height: 60, backgroundColor: colors.tile, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  catTileActive: { backgroundColor: '#CDEEFE', borderWidth: 2, borderColor: colors.blue },
  catLabel: { fontSize: 12, color: colors.text },
  vouchers: { flexDirection: 'row', gap: 12 },
  voucher: { flex: 1, backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.banner, borderRadius: 16, padding: 16 },
  voucherClaimed: { backgroundColor: '#E6F8EE', borderColor: colors.success },
  voucherTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 6 },
  voucherSmall: { fontSize: 13, color: '#38586A' },
  fsHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 8 },
  fsH2: { fontSize: 22, fontWeight: '800', color: colors.text, flex: 1 },
  countdown: { fontSize: 15, fontWeight: '800', color: '#fff', backgroundColor: colors.orange, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 999 },
  seeAll: { fontSize: 14, color: colors.gray },
  products: { flexDirection: 'row', gap: 12 },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 2 },
  cardImg: { width: '100%', height: 120, resizeMode: 'cover' },
  cardInfo: { padding: 10, paddingBottom: 12, paddingHorizontal: 12 },
  cardName: { fontSize: 14, fontWeight: '700', color: colors.text, minHeight: 38 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 },
  price: { fontSize: 22, fontWeight: '800', color: colors.orange },
  discount: { fontSize: 13, fontWeight: '700', color: colors.orange },
  rating: { fontSize: 12, color: colors.gray, marginTop: 4 },
  fineprint: { textAlign: 'center', fontSize: 13, color: colors.gray, marginVertical: 6 },
});
