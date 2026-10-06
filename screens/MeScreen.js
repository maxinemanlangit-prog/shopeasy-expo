import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, common, Icon } from './ui';

export default function MeScreen({ go, toast, setPurchTab, shipCount }) {
  const icons = [
    { label: 'To Pay', ic: 'wallet', tab: 'To Pay' },
    { label: 'To Ship', ic: 'box', tab: 'To Ship', badge: shipCount },
    { label: 'To Receive', ic: 'truck', tab: 'To Receive' },
    { label: 'Completed', ic: 'history', tab: 'Completed' },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.appbar}>
        <View style={styles.avatar}><Text style={{ color: colors.text, fontWeight: '800', fontSize: 20 }}>MM</Text></View>
        <Text style={styles.h1}>Maxine Manlangit</Text>
        <TouchableOpacity onPress={() => toast('Opening settings (demo)')}><Icon name="settings" size={24} color="#fff" strokeWidth={1.8} /></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={common.cardbox}>
          <View style={styles.cardHead}>
            <Text style={{ fontWeight: '800', fontSize: 16, color: colors.text }}>My Purchases</Text>
            <Text style={{ color: colors.gray }} onPress={() => go('purchases')}>View all ›</Text>
          </View>
          <View style={styles.meIcons}>
            {icons.map((it) => (
              <TouchableOpacity key={it.label} style={styles.meIconWrap} onPress={() => { setPurchTab(it.tab); go('purchases'); }}>
                <View>
                  <Icon name={it.ic} size={26} strokeWidth={1.7} />
                  {it.badge > 0 && <View style={styles.badge}><Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>{it.badge}</Text></View>}
                </View>
                <Text style={{ fontSize: 12, color: colors.text }}>{it.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.wallet}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Icon name="wallet" size={30} strokeWidth={1.8} />
            <View><Text style={styles.walletLab}>ShopEasy Wallet</Text><Text style={styles.walletBig}>₱250.00</Text></View>
          </View>
          <View style={{ alignItems: 'flex-end' }}><Text style={styles.walletLab}>Easy Coins</Text><Text style={styles.walletBig}>120 coins</Text></View>
        </View>
        <View style={[common.cardbox, { paddingVertical: 2, paddingHorizontal: 16 }]}>
          {[
            ['heart', 'Likes', '24 items', 'Opening Likes — 24 items'],
            ['pin', 'Addresses', '2 saved', 'Opening Addresses — 2 saved'],
            ['help', 'Help', null, 'Opening Help Center'],
            ['settings', 'Settings', null, 'Opening Settings'],
            ['logout', 'Logout', null, 'Logged out (demo)'],
          ].map(([ic, t, n, msg]) => (
            <TouchableOpacity key={t} style={styles.meRow} onPress={() => toast(msg)}>
              <Icon name={ic} size={22} strokeWidth={1.8} />
              <Text style={styles.meRowT}>{t}</Text>
              {n && <Text style={{ fontSize: 13, color: colors.gray }}>{n}</Text>}
              <Text>›</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[common.lightcard, { flexDirection: 'row', gap: 12, alignItems: 'center' }]}>
          <Icon name="gift" size={26} strokeWidth={1.8} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '800', color: colors.text }}>Your next reward is closer</Text>
            <Text style={{ fontSize: 13, color: colors.gray, marginTop: 2 }}>Shop, earn coins and unlock more savings.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: colors.orange, padding: 16, paddingBottom: 26, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 52, height: 52, borderRadius: 14, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  h1: { flex: 1, fontSize: 22, fontWeight: '800', color: '#fff' },
  scroll: { padding: 16, gap: 14 },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  meIcons: { flexDirection: 'row', justifyContent: 'space-around' },
  meIconWrap: { alignItems: 'center', gap: 6 },
  badge: { position: 'absolute', top: -6, right: -10, backgroundColor: colors.orange, borderRadius: 999, minWidth: 20, height: 20, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' },
  wallet: { backgroundColor: colors.blue, borderRadius: 20, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletLab: { fontSize: 14, color: colors.darkBlue },
  walletBig: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 4 },
  meRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E3F0F8' },
  meRowT: { flex: 1, fontSize: 15, color: colors.text },
});
