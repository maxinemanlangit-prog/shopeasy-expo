import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { colors, common, Icon, peso } from './ui';

import { useShop } from '../src/state/ShopContext';

export default function ProductScreen({ go, toast, productId, qty, setQty, addToCart }) {
  const [liked, setLiked] = useState(false);
  const [showStepper, setShowStepper] = useState(false);
  const { products } = useShop();
  const p = products[productId] || Object.values(products)[0];

  if (!p) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.gray }}>Loading products...</Text>
      </View>
    );
  }

  const changeQty = (d) => setQty(Math.min(99, Math.max(1, qty + d)));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => go('home')}><Icon name="back" size={22} strokeWidth={2.2} /></TouchableOpacity>
        <Text style={styles.h1}>Product Details</Text>
        <TouchableOpacity onPress={() => go('cart')}><Icon name="cart" size={24} strokeWidth={1.8} /></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.pdImg}>
          <Image source={p.img} style={styles.pdImgImg} />
          <TouchableOpacity style={styles.heart} onPress={() => { setLiked(!liked); toast(!liked ? 'Added to Likes' : 'Removed from Likes'); }}>
            <Icon name="heart" size={24} strokeWidth={1.8} color={liked ? '#FF4D6D' : '#0B2A3C'} fill={liked ? '#FF4D6D' : 'none'} />
          </TouchableOpacity>
          <View style={styles.counter}><Text style={{ fontWeight: '700', fontSize: 14 }}>1 / 5</Text></View>
        </View>
        <View style={styles.pdPrice}>
          <Text style={styles.pdBig}>{peso(p.price)}</Text>
          <Text style={styles.pdOld}>{peso(p.old)}</Text>
          <View style={styles.offPill}><Text style={styles.offPillText}>{p.off}</Text></View>
        </View>
        <Text style={styles.pdTitle}>{p.name}</Text>
        <View style={styles.pdMeta}><Text style={styles.pdMetaT}>{p.rating}</Text><Text style={styles.pdMetaT}>·</Text><Text style={styles.pdMetaT}>{p.sold}</Text></View>
        <TouchableOpacity style={styles.rowline} onPress={() => setShowStepper(!showStepper)}>
          <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>Color: Sky blue  ·  Quantity: <Text style={{ fontWeight: '800' }}>{qty}</Text></Text>
          {showStepper ? (
            <View style={styles.stepper} onStartShouldSetResponder={() => true}>
              <TouchableOpacity onPress={() => changeQty(-1)}><Text style={styles.stepBtn}>−</Text></TouchableOpacity>
              <Text style={styles.stepVal}>{qty}</Text>
              <TouchableOpacity onPress={() => changeQty(1)}><Text style={styles.stepBtn}>+</Text></TouchableOpacity>
            </View>
          ) : <Text style={{ color: colors.text }}>›</Text>}
        </TouchableOpacity>
        <View style={[common.cardbox, styles.seller]}>
          <View style={styles.sellerTile}><Icon name="store" size={26} strokeWidth={1.8} /></View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: '800', color: colors.text }}>SoundLab Official</Text>
            <Text style={{ fontSize: 13, color: colors.gray, marginTop: 3 }}>Verified seller  ·  98% positive</Text>
          </View>
          <Text style={{ fontWeight: '800', color: colors.text }} onPress={() => toast('Opening SoundLab Official shop')}>Visit ›</Text>
        </View>
        <View>
          <Text style={{ fontSize: 17, fontWeight: '800', color: colors.text }}>Made for your day</Text>
          <Text style={{ fontSize: 14, color: colors.gray, marginTop: 8, lineHeight: 21 }}>{p.desc}</Text>
        </View>
      </ScrollView>
      <View style={styles.ctaBar}>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => go('chat')}>
          <Icon name="chat" size={24} strokeWidth={1.8} />
          <Text style={{ fontSize: 11 }}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[common.btn, common.btnLight, { flex: 1 }]} onPress={() => addToCart(p.id, qty)}>
          <Text style={{ fontWeight: '800', fontSize: 16, color: colors.text }}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[common.btn, common.btnOrange, { flex: 1 }]} onPress={() => { addToCart(p.id, qty); go('checkout'); }}>
          <Text style={{ fontWeight: '800', fontSize: 16, color: '#fff' }}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: colors.bg, padding: 10, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 14 },
  h1: { fontSize: 24, fontWeight: '800', color: colors.text, flex: 1 },
  scroll: { padding: 16, gap: 14, backgroundColor: colors.bg },
  pdImg: { position: 'relative', backgroundColor: '#E3F0F3', borderRadius: 20, overflow: 'hidden' },
  pdImgImg: { width: '100%', height: 340, resizeMode: 'cover' },
  heart: { position: 'absolute', top: 14, right: 14, width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.9)', alignItems: 'center', justifyContent: 'center' },
  counter: { position: 'absolute', bottom: 14, right: 14, backgroundColor: 'rgba(255,255,255,.9)', borderRadius: 999, paddingVertical: 5, paddingHorizontal: 14 },
  pdPrice: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pdBig: { fontSize: 32, fontWeight: '800', color: colors.orange },
  pdOld: { fontSize: 16, color: colors.grayLight, textDecorationLine: 'line-through' },
  offPill: { backgroundColor: colors.orangeLight, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
  offPillText: { color: colors.orange, fontWeight: '800', fontSize: 13 },
  pdTitle: { fontSize: 22, fontWeight: '800', color: colors.text },
  pdMeta: { flexDirection: 'row', gap: 10 },
  pdMetaT: { fontSize: 14, color: colors.gray },
  rowline: { backgroundColor: colors.card, borderRadius: 14, padding: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 2, borderWidth: 1.5, borderColor: colors.lightBorder, borderRadius: 999, backgroundColor: '#fff' },
  stepBtn: { fontSize: 18, paddingVertical: 6, paddingHorizontal: 12, color: colors.text },
  stepVal: { paddingHorizontal: 6, fontSize: 15, fontWeight: '700' },
  seller: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  sellerTile: { width: 52, height: 52, backgroundColor: colors.blue, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  ctaBar: { backgroundColor: '#fff', padding: 12, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', gap: 12, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E3F0F8' },
});
