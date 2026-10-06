import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { colors, common, Icon, peso } from './ui';
import { useShop } from '../src/state/ShopContext';

export default function PurchasesScreen({ go, toast, orders, purchTab, setPurchTab, buyAgain }) {
  const { products } = useShop();
  const list = orders.filter((o) => o.status === purchTab);
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => go('home')}><Icon name="back" size={22} strokeWidth={2.2} /></TouchableOpacity>
        <Text style={styles.h1}>My Purchases</Text>
        <TouchableOpacity onPress={() => toast('Search your orders (demo)')}><Icon name="search" size={22} strokeWidth={2} /></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.pillbar}>
          {['To Pay', 'To Ship', 'To Receive', 'Completed'].map((t) => (
            <TouchableOpacity key={t} style={[styles.pill, purchTab === t && styles.pillActive]} onPress={() => setPurchTab(t)}>
              <Text style={{ fontSize: 13, fontWeight: purchTab === t ? '800' : '600', color: colors.text }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {list.length ? list.map((o) => {
          const first = products[o.items[0].id];
          const extra = o.items.length > 1 ? products[o.items[1].id] : null;
          if (!first) return null;
          const count = o.items.reduce((s, i) => s + i.qty, 0);
          const sub = o.status === 'Completed' ? `${count} item · Delivered ${o.delivered || ''}` : `${count} item${count > 1 ? 's' : ''} · Paid with ${o.pay}`;
          return (
            <View key={o.id} style={styles.order}>
              <View style={styles.orderHead}><Text style={{ fontSize: 15, fontWeight: '800', color: colors.text }}>{o.seller}</Text>
                <View style={styles.statuspill}><Text style={{ fontSize: 12, fontWeight: '700', color: colors.text }}>{o.status}</Text></View></View>
              <Text style={styles.num}>{o.id} · {o.date}</Text>
              <View style={styles.main}>
                <Image source={first.img} style={styles.orderImg} />
                <View>
                  <Text style={{ fontWeight: '800', color: colors.text, fontSize: 15 }}>{first.name}</Text>
                  <Text style={{ fontSize: 13, color: colors.gray, marginTop: 3 }}>Sky blue · Qty {o.items[0].qty}</Text>
                  {extra && <Text style={{ fontSize: 13, color: colors.gray, marginTop: 6 }}>+ {extra.name} · Qty {o.items[1].qty}</Text>}
                </View>
              </View>
              <View style={styles.foot}><Text style={{ fontSize: 13, color: colors.gray }}>{sub}</Text><Text style={{ fontSize: 20, fontWeight: '800', color: colors.orange }}>{peso(o.total)}</Text></View>
              <View style={styles.actions}>
                <TouchableOpacity style={[common.btn, common.btnLight, { flex: 1, paddingVertical: 13 }]} onPress={() => toast('Order ' + o.id + ' details')}>
                  <Text style={{ fontWeight: '800', color: colors.text }}>{o.status === 'Completed' ? 'View Details' : 'View Order'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[common.btn, common.btnOrange, { flex: 1, paddingVertical: 13 }]} onPress={() => buyAgain(o.items[0].id)}>
                  <Text style={{ fontWeight: '800', color: '#fff' }}>Buy Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }) : <View style={[common.cardbox]}><Text style={{ textAlign: 'center', color: colors.gray }}>No {purchTab.toLowerCase()} orders yet.</Text></View>}
        <Text style={styles.fineprint}>All caught up. Your next find is waiting.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: colors.bg, padding: 10, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 14 },
  h1: { fontSize: 24, fontWeight: '800', color: colors.text, flex: 1 },
  scroll: { padding: 16, gap: 14 },
  pillbar: { backgroundColor: colors.card, borderRadius: 999, padding: 6, flexDirection: 'row', gap: 4 },
  pill: { flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: 'center' },
  pillActive: { backgroundColor: colors.blue },
  order: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 8 },
  orderHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statuspill: { backgroundColor: colors.card, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 999 },
  num: { fontSize: 13, color: colors.gray },
  main: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  orderImg: { width: 64, height: 64, borderRadius: 14, resizeMode: 'cover' },
  foot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  fineprint: { textAlign: 'center', fontSize: 13, color: colors.gray, marginVertical: 6 },
});
