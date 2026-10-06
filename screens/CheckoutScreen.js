import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { colors, common, Icon, peso } from './ui';
import { useShop } from '../src/state/ShopContext';

export default function CheckoutScreen({ go, toast, cart, pay, setPay, placeOrder }) {
  const { products } = useShop();
  const items = cart.filter((i) => i.checked);
  const n = items.reduce((s, i) => s + i.qty, 0);
  const st = items.reduce((s, i) => s + (products[i.id] ? products[i.id].price : 0) * i.qty, 0);
  const total = st === 0 ? 0 : Math.max(0, st - (st >= 999 ? 100 : 0));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => go('cart')}><Icon name="back" size={22} strokeWidth={2.2} /></TouchableOpacity>
        <Text style={styles.h1}>Checkout</Text>
        <Icon name="shield" size={24} strokeWidth={1.8} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={common.lightcard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Icon name="pin" size={20} strokeWidth={1.8} />
            <Text style={{ fontWeight: '800', color: colors.text }}>Delivery address</Text>
            <Text style={{ marginLeft: 'auto', color: colors.text }} onPress={() => toast('Edit delivery address (demo)')}>Edit ›</Text>
          </View>
          <Text style={{ marginTop: 8, fontWeight: '700', color: colors.text }}>Alex Reyes  ·  +63 917 123 4567</Text>
          <Text style={{ color: colors.gray, fontSize: 14, marginTop: 4 }}>24 Mabini St., Brgy. Poblacion{'\n'}Makati City, Metro Manila 1210</Text>
        </View>
        <View style={common.cardbox}>
          <Text style={{ fontWeight: '800', fontSize: 15, color: colors.text }}>SoundLab Official</Text>
          <View style={{ marginTop: 12, gap: 12 }}>
            {items.length ? items.map((it) => {
              const p = products[it.id];
              if (!p) return null;
              return (
                <View key={it.id} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <Image source={p.img} style={{ width: 56, height: 56, borderRadius: 12, resizeMode: 'cover' }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: colors.text }}>{p.name}</Text>
                    <Text style={{ fontSize: 13, color: colors.gray, marginTop: 2 }}>Sky blue · Qty {it.qty}</Text>
                  </View>
                  <Text style={{ color: colors.orange, fontWeight: '800' }}>{peso(p.price * it.qty)}</Text>
                </View>
              );
            }) : <Text style={{ color: colors.gray, fontSize: 14 }}>No items selected.</Text>}
          </View>
          <Text style={{ color: colors.gray, fontSize: 13, marginTop: 12 }}>Free delivery · Arrives Oct 7–9</Text>
        </View>
        <Text style={{ fontSize: 17, fontWeight: '800', color: colors.text }}>Payment method</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[['Card', '💳 Card'], ['GCash', '👛 GCash'], ['COD', '💵 COD']].map(([m, label]) => (
            <TouchableOpacity key={m} style={[common.btn, { flex: 1 }, pay === m ? { backgroundColor: colors.blue } : { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E3F0F8' }]} onPress={() => setPay(m)}>
              <Text style={{ fontWeight: pay === m ? '800' : '600', color: colors.text }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={common.cardbox}>
          <Text style={{ fontSize: 17, fontWeight: '800', color: colors.text }}>Order summary</Text>
          <View style={{ marginTop: 10 }}>
            <View style={styles.kv}><Text style={styles.kk}>Subtotal ({n} items)</Text><Text style={styles.vv}>{peso(st)}</Text></View>
            <View style={styles.kv}><Text style={styles.kk}>Shipping</Text><Text style={styles.vv}>FREE</Text></View>
            <View style={styles.kv}><Text style={styles.kk}>Welcome voucher</Text><Text style={styles.vv}>{st >= 999 ? '−' + peso(100) : '−₱0'}</Text></View>
            <View style={[styles.kv, { marginTop: 6 }]}><Text style={{ fontWeight: '800', fontSize: 16, color: colors.text }}>Total payment</Text><Text style={{ fontSize: 24, fontWeight: '800', color: colors.orange }}>{peso(total)}</Text></View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={[common.btn, common.btnOrange, common.btnBlock, { opacity: items.length ? 1 : 0.5 }]} onPress={placeOrder}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 17 }}>Place Order · {peso(total)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: colors.bg, padding: 10, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 14 },
  h1: { fontSize: 24, fontWeight: '800', color: colors.text, flex: 1 },
  scroll: { padding: 16, gap: 14 },
  kv: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7 },
  kk: { fontSize: 14, color: colors.gray },
  vv: { fontSize: 14, fontWeight: '700', color: colors.text },
  footer: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E3F0F8', padding: 12, paddingBottom: 14, paddingHorizontal: 16 },
});
