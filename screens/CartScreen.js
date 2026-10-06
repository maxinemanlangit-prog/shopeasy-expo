import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { colors, common, Icon, peso } from './ui';
import { useShop } from '../src/state/ShopContext';

export default function CartScreen({ go, toast, cart, setCart }) {
  const { products } = useShop();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const checkedItems = cart.filter((i) => i.checked);
  const subtotal = checkedItems.reduce((s, i) => s + (products[i.id] ? products[i.id].price : 0) * i.qty, 0);
  const totalPay = subtotal === 0 ? 0 : Math.max(0, subtotal - (subtotal >= 999 ? 100 : 0));
  const allChecked = cart.length > 0 && cart.every((i) => i.checked);
  const checkedCount = checkedItems.reduce((s, i) => s + i.qty, 0);

  const update = (idx, fn) => setCart((c) => c.map((it, i) => (i === idx ? fn(it) : it)));
  const toggleAll = () => setCart((c) => c.map((i) => ({ ...i, checked: !allChecked })));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => go('home')}><Icon name="back" size={22} strokeWidth={2.2} /></TouchableOpacity>
        <Text style={styles.h1}>My Cart ({cartCount})</Text>
        <TouchableOpacity onPress={() => toast('More options: edit, share, delete selected')}><Icon name="dots" size={22} fill={colors.text} /></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.shipping}>
          <Icon name="truck" size={24} strokeWidth={1.8} />
          <Text style={{ fontWeight: '800', color: colors.text, fontSize: 15 }}>You unlocked free shipping!</Text>
        </View>
        <View style={styles.checkrow}>
          <TouchableOpacity style={[styles.cb, !allChecked && styles.cbOff]} onPress={toggleAll}><Icon name="check" size={14} strokeWidth={3.4} /></TouchableOpacity>
          <Icon name="store" size={24} strokeWidth={1.8} />
          <Text style={{ fontWeight: '800', color: colors.text }}>SoundLab Official</Text>
          <Text style={{ color: colors.text }} onPress={() => toast('Opening SoundLab Official shop')}>›</Text>
        </View>

        {cart.length ? cart.map((it, i) => {
          const p = products[it.id];
          if (!p) return null;
          return (
            <View key={it.id} style={[common.cardbox, styles.cartitem]}>
              <TouchableOpacity style={[styles.cb, !it.checked && styles.cbOff]} onPress={() => update(i, (x) => ({ ...x, checked: !x.checked }))}>
                <Icon name="check" size={14} strokeWidth={3.4} />
              </TouchableOpacity>
              <Image source={p.img} style={styles.cartImg} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{p.name}</Text>
                <Text style={styles.itemSub}>Sky blue</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ color: colors.orange, fontWeight: '800' }}>{peso(p.price)}</Text>
                  <View style={styles.stepper}>
                    <TouchableOpacity onPress={() => update(i, (x) => ({ ...x, qty: Math.max(1, x.qty - 1) }))}><Text style={styles.stepBtn}>−</Text></TouchableOpacity>
                    <Text style={styles.stepVal}>{it.qty}</Text>
                    <TouchableOpacity onPress={() => update(i, (x) => ({ ...x, qty: x.qty + 1 }))}><Text style={styles.stepBtn}>+</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }) : <View style={[common.cardbox]}><Text style={{ textAlign: 'center', color: colors.gray }}>Your cart is empty.</Text></View>}

        <TouchableOpacity style={[common.lightcard, { flexDirection: 'row', alignItems: 'center', gap: 12 }]} onPress={() => toast('Welcome voucher applied: −₱100 (min. spend ₱999)')}>
          <Icon name="ticket" size={26} strokeWidth={1.8} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '800', color: colors.text }}>₱100 off applied</Text>
            <Text style={{ fontSize: 13, color: colors.gray, marginTop: 2 }}>Welcome voucher · Min. spend ₱999</Text>
          </View>
          <Text>›</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Icon name="shield" size={22} strokeWidth={1.8} />
          <Text style={{ color: colors.gray, fontSize: 14 }}>ShopEasy Guarantee protects every purchase</Text>
        </View>
      </ScrollView>
      <View style={styles.cartfooter}>
        <View style={styles.footerTop}>
          <TouchableOpacity style={[styles.cb, !allChecked && styles.cbOff]} onPress={toggleAll}><Icon name="check" size={14} strokeWidth={3.4} /></TouchableOpacity>
          <Text style={{ color: colors.text }}>Select All ({checkedCount})</Text>
          <View style={styles.totalWrap}><Text style={{ fontSize: 15, color: colors.text }}>Total </Text><Text style={styles.totalVal}>{peso(totalPay)}</Text></View>
        </View>
        <TouchableOpacity style={[common.btn, common.btnOrange, common.btnBlock, { opacity: checkedCount === 0 ? 0.5 : 1 }]} disabled={checkedCount === 0} onPress={() => go('checkout')}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 17 }}>Checkout ({checkedCount})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: colors.bg, padding: 10, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 14 },
  h1: { fontSize: 24, fontWeight: '800', color: colors.text, flex: 1 },
  scroll: { padding: 16, gap: 14 },
  shipping: { backgroundColor: colors.banner, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkrow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cb: { width: 26, height: 26, borderRadius: 8, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  cbOff: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#C7DEEA' },
  cartitem: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  cartImg: { width: 76, height: 76, borderRadius: 14, resizeMode: 'cover' },
  itemName: { fontSize: 15, fontWeight: '800', color: colors.text },
  itemSub: { fontSize: 13, color: colors.gray, marginVertical: 4 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 2, borderWidth: 1.5, borderColor: colors.lightBorder, borderRadius: 999, backgroundColor: '#fff' },
  stepBtn: { fontSize: 18, paddingVertical: 6, paddingHorizontal: 12, color: colors.text },
  stepVal: { paddingHorizontal: 6, fontSize: 15, fontWeight: '700' },
  cartfooter: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E3F0F8', padding: 12, paddingBottom: 14, paddingHorizontal: 16 },
  footerTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  totalWrap: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 10 },
  totalVal: { fontSize: 26, color: colors.orange, fontWeight: '800' },
});
