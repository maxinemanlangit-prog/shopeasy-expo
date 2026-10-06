import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { colors, common, Icon } from './ui';

export default function ChatScreen({ go, toast, convos, chip, setChip, openThread }) {
  const [search, setSearch] = useState('');
  const unread = convos.reduce((s, c) => s + c.unread, 0);
  const list = convos.filter((c) => (chip === 'all' || c.unread > 0) && (c.name.toLowerCase().includes(search.toLowerCase()) || c.last.toLowerCase().includes(search.toLowerCase())));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => go('home')}><Icon name="back" size={22} strokeWidth={2.2} /></TouchableOpacity>
        <Text style={styles.h1}>Messages</Text>
        <TouchableOpacity onPress={() => toast('New message (demo)')}><Icon name="edit" size={22} strokeWidth={1.8} /></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.searchbox}>
          <Icon name="search" size={20} strokeWidth={2} />
          <TextInput style={{ flex: 1, fontSize: 15, color: colors.text }} placeholder="Search sellers and messages" placeholderTextColor="#7A93A3" value={search} onChangeText={setSearch} />
        </View>
        <View style={styles.chips}>
          <TouchableOpacity style={[styles.chipBtn, chip === 'all' && styles.chipActive]} onPress={() => setChip('all')}>
            <Text style={{ fontSize: 14, fontWeight: chip === 'all' ? '800' : '600', color: colors.text }}>All messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.chipBtn, chip === 'unread' && styles.chipActive]} onPress={() => setChip('unread')}>
            <Text style={{ fontSize: 14, fontWeight: chip === 'unread' ? '800' : '600', color: colors.text }}>Unread ({unread})</Text>
          </TouchableOpacity>
        </View>
        <View style={[common.cardbox, { paddingVertical: 4, paddingHorizontal: 16 }]}>
          {list.length ? list.map((c) => {
            const idx = convos.indexOf(c);
            return (
              <TouchableOpacity key={c.name} style={styles.convo} onPress={() => openThread(idx)}>
                <View style={[styles.tile, c.blue && { backgroundColor: colors.blue }]}><Icon name={c.icon} size={24} strokeWidth={1.7} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '800', color: colors.text }}>{c.name}</Text>
                  <Text style={{ fontSize: 13, color: colors.gray, marginTop: 3 }} numberOfLines={1}>{c.last}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 6 }}>
                  <Text style={{ fontSize: 12, color: colors.gray }}>{c.time}</Text>
                  {c.unread > 0 && <View style={styles.badge}><Text style={{ color: '#fff', fontSize: 12, fontWeight: '800' }}>{c.unread}</Text></View>}
                </View>
              </TouchableOpacity>
            );
          }) : <Text style={{ padding: 18, textAlign: 'center', color: colors.gray }}>No conversations found.</Text>}
        </View>
        <View style={[common.lightcard, { flexDirection: 'row', gap: 12, alignItems: 'center' }]}>
          <Icon name="shield" size={24} strokeWidth={1.8} />
          <Text style={{ fontSize: 14, color: '#38586A', flex: 1 }}>Keep chats and payments in ShopEasy for a safer shopping experience.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: colors.bg, padding: 10, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 14 },
  h1: { fontSize: 24, fontWeight: '800', color: colors.text, flex: 1 },
  scroll: { padding: 16, gap: 14 },
  searchbox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E3F0F8', borderRadius: 999, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, gap: 10 },
  chips: { flexDirection: 'row', gap: 10 },
  chipBtn: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 999, backgroundColor: colors.card },
  chipActive: { backgroundColor: colors.blue },
  convo: { flexDirection: 'row', gap: 14, alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E3F0F8' },
  tile: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#CDEEFE', alignItems: 'center', justifyContent: 'center' },
  badge: { backgroundColor: colors.orange, borderRadius: 999, minWidth: 22, height: 22, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
});
