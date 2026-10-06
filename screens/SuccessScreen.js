import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, common, Icon, peso } from './ui';

export default function SuccessScreen({ go, setPurchTab, lastOrder }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => go('home')}><Icon name="back" size={22} strokeWidth={2.2} /></TouchableOpacity>
        <Text style={styles.h1}>ShopEasy</Text>
        <Icon name="bannerBag" size={26} strokeWidth={1.8} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.circle}><Icon name="check" size={52} color={colors.text} strokeWidth={2.2} /></View>
          <Text style={styles.h2}>Order placed!</Text>
          <Text style={{ color: colors.gray, fontSize: 15, textAlign: 'center' }}>Thanks, Alex. Your next great finds{'\n'}are on their way.</Text>
        </View>
        <View style={common.cardbox}>
          <View style={styles.kv}><Text style={styles.kk}>Order number</Text><Text style={styles.vv}>{lastOrder ? lastOrder.id : '#SE-261004-0821'}</Text></View>
          <View style={styles.kv}><Text style={styles.kk}>Seller</Text><Text style={styles.vv}>SoundLab Official</Text></View>
          <View style={styles.kv}><Text style={styles.kk}>Paid with</Text><Text style={styles.vv}>{lastOrder ? `${lastOrder.pay} · ${lastOrder.itemCount} item${lastOrder.itemCount > 1 ? 's' : ''}` : 'GCash · 2 items'}</Text></View>
          <View style={styles.divider} />
          <View style={[styles.kv, { alignItems: 'center' }]}><Text style={{ fontWeight: '800', color: colors.text }}>Total paid</Text><Text style={{ fontSize: 30, fontWeight: '800', color: colors.orange }}>{lastOrder ? peso(lastOrder.total) : '₱1,798'}</Text></View>
        </View>
        <View style={[common.lightcard, { flexDirection: 'row', gap: 12, alignItems: 'center' }]}>
          <Icon name="truck" size={26} strokeWidth={1.8} />
          <View>
            <Text style={{ fontWeight: '800', color: colors.text }}>Estimated delivery: Oct 7–9</Text>
            <Text style={{ fontSize: 13, color: colors.gray, marginTop: 2 }}>We'll keep you updated along the way.</Text>
          </View>
        </View>
        <TouchableOpacity style={[common.btn, common.btnOrange, common.btnBlock]} onPress={() => { setPurchTab('To Ship'); go('purchases'); }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 17 }}>View Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[common.btn, common.btnLight, common.btnBlock]} onPress={() => go('home')}>
          <Text style={{ color: colors.text, fontWeight: '800', fontSize: 17 }}>Continue Shopping</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: colors.bg, padding: 10, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 14 },
  h1: { fontSize: 24, fontWeight: '800', color: colors.text, flex: 1 },
  scroll: { padding: 16, gap: 14 },
  hero: { alignItems: 'center', gap: 14, textAlign: 'center', marginTop: 20, marginBottom: 6 },
  circle: { width: 110, height: 110, borderRadius: 55, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  h2: { fontSize: 28, fontWeight: '800', color: colors.text },
  kv: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7 },
  kk: { fontSize: 14, color: colors.gray },
  vv: { fontSize: 14, fontWeight: '700', color: colors.text },
  divider: { height: 1, backgroundColor: '#E3F0F8', marginVertical: 10 },
});
