import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar as RNStatusBar, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, Icon } from './screens/ui';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import SuccessScreen from './screens/SuccessScreen';
import PurchasesScreen from './screens/PurchasesScreen';
import ChatScreen from './screens/ChatScreen';
import ThreadScreen from './screens/ThreadScreen';
import MeScreen from './screens/MeScreen';
import SQLitePOSScreen from './src/screens/SQLitePOSScreen';
import { ShopProvider, useShop } from './src/state/ShopContext';

function AppInner() {
  const { products } = useShop();
  const [screen, setScreen] = useState('home');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [convos, setConvos] = useState([
    { name: 'SoundLab Official', time: '9:38 AM', unread: 2, blue: true, icon: 'headphones', last: "Thanks, Alex! We're packing your order.", msgs: [{ from: 'them', t: 'Hi Alex! Thanks for your order 🎉' }, { from: 'them', t: "Thanks, Alex! We're packing your order." }] },
    { name: 'Daily Style', time: '9:12 AM', unread: 1, blue: true, icon: 'shirt', last: 'The medium size is back in stock 😊', msgs: [{ from: 'them', t: 'The medium size is back in stock 😊' }] },
    { name: 'Glow Beauty', time: 'Yesterday', unread: 0, icon: 'sparkle', last: "Yes, it's suitable for sensitive skin.", msgs: [{ from: 'me', t: 'Is it okay for sensitive skin?' }, { from: 'them', t: "Yes, it's suitable for sensitive skin." }] },
    { name: 'Home & Co.', time: 'Yesterday', unread: 0, icon: 'lamp', last: 'You: Thank you for the quick reply!', msgs: [{ from: 'them', t: 'Your lamp ships tomorrow!' }, { from: 'me', t: 'Thank you for the quick reply!' }] },
    { name: 'Fresh Finds', time: 'Oct 2', unread: 0, icon: 'apple', last: 'Your delivery has been completed.', msgs: [{ from: 'them', t: 'Your delivery has been completed.' }] },
    { name: 'Stride Sports', time: 'Oct 1', unread: 0, icon: 'gym', last: 'You: Is this available in blue?', msgs: [{ from: 'me', t: 'Is this available in blue?' }] },
  ]);
  const [purchTab, setPurchTab] = useState('To Ship');
  const [chip, setChip] = useState('all');
  const [pay, setPay] = useState('GCash');
  const [current, setCurrent] = useState(null);
  const [pdQty, setPdQty] = useState(1);
  const [activeConvo, setActiveConvo] = useState(0);
  const [lastOrder, setLastOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const toastTimer = useRef(null);

  const toast = (msg) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 1800);
  };

  const go = (k) => setScreen(k);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const unreadTotal = convos.reduce((s, c) => s + c.unread, 0);
  const shipCount = orders.filter((o) => o.status === 'To Ship').length;

  const openProduct = (id) => { setCurrent(id); setPdQty(1); setScreen('product'); };

  const addToCart = (id, qty) => {
    setCart((c) => {
      const it = c.find((i) => i.id === id);
      if (it) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id, qty, checked: true }];
    });
    toast(products[id] ? products[id].name + ' added to cart' : 'Item added to cart');
  };

  const placeOrder = () => {
    const pending = cart.filter((i) => i.checked);
    if (!pending.length) { toast('Select items in your cart first'); return; }
    const now = new Date();
    const num = '#SE-' + String(now.getFullYear()).slice(2) + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + '-' + String(Math.floor(1000 + Math.random() * 9000));
    const subtotal = pending.reduce((s, i) => s + (products[i.id] ? products[i.id].price : 0) * i.qty, 0);
    const total = Math.max(0, subtotal - (subtotal >= 999 ? 100 : 0));
    const count = pending.reduce((s, i) => s + i.qty, 0);
    setOrders((o) => [{ id: num, date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), status: 'To Ship', seller: 'SoundLab Official', items: pending.map((i) => ({ id: i.id, qty: i.qty })), total, pay }, ...o]);
    setCart((c) => c.filter((i) => !i.checked));
    setLastOrder({ id: num, pay, total, itemCount: count });
    setScreen('success');
  };

  const buyAgain = (id) => { addToCart(id, 1); setScreen('cart'); };

  const openThread = (i) => {
    setActiveConvo(i);
    setConvos((cs) => cs.map((c, idx) => (idx === i ? { ...c, unread: 0 } : c)));
    setScreen('thread');
  };

  const sendMessage = (v) => {
    setConvos((cs) => cs.map((c, idx) => (idx === activeConvo ? { ...c, msgs: [...c.msgs, { from: 'me', t: v }], last: 'You: ' + v } : c)));
    setTimeout(() => {
      setConvos((cs) => cs.map((c, idx) => {
        if (idx !== activeConvo) return c;
        const reply = 'Got it! Thanks for reaching out to ' + c.name + ' 😊';
        return { ...c, msgs: [...c.msgs, { from: 'them', t: reply }], last: reply };
      }));
    }, 900);
  };

  const TABS = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'cart', label: 'Cart', icon: 'cart', badge: cartCount },
    { key: 'purchases', label: 'Purchases', icon: 'box' },
    { key: 'chat', label: 'Chat', icon: 'chat', badge: unreadTotal },
    { key: 'me', label: 'Me', icon: 'me' },
    { key: 'inventory', label: 'Inventory', icon: 'store' },
  ];

  const isTab = ['home', 'cart', 'purchases', 'chat', 'me', 'inventory'].includes(screen);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0, backgroundColor: '#fff' }}>
        {screen === 'home' && <HomeScreen go={go} toast={toast} openProduct={openProduct} />}
        {screen === 'product' && <ProductScreen go={go} toast={toast} productId={current} qty={pdQty} setQty={setPdQty} addToCart={addToCart} />}
        {screen === 'cart' && <CartScreen go={go} toast={toast} cart={cart} setCart={setCart} />}
        {screen === 'checkout' && <CheckoutScreen go={go} toast={toast} cart={cart} pay={pay} setPay={setPay} placeOrder={placeOrder} />}
        {screen === 'success' && <SuccessScreen go={go} setPurchTab={setPurchTab} lastOrder={lastOrder} />}
        {screen === 'purchases' && <PurchasesScreen go={go} toast={toast} orders={orders} purchTab={purchTab} setPurchTab={setPurchTab} buyAgain={buyAgain} />}
        {screen === 'chat' && <ChatScreen go={go} toast={toast} convos={convos} chip={chip} setChip={setChip} openThread={openThread} />}
        {screen === 'thread' && <ThreadScreen go={go} convo={convos[activeConvo]} sendMessage={sendMessage} />}
        {screen === 'me' && <MeScreen go={go} toast={toast} setPurchTab={setPurchTab} shipCount={shipCount} />}
        {screen === 'inventory' && <SQLitePOSScreen />}
      </View>
      {screen !== 'thread' && (
        <View style={styles.tabbar}>
          {TABS.map((t) => (
            <TouchableOpacity key={t.key} style={[styles.tab, isTab && screen === t.key && styles.tabActive]} onPress={() => go(t.key)}>
              <View style={{ position: 'relative' }}>
                <Icon name={t.icon} size={24} strokeWidth={1.8} />
                {t.badge > 0 && <View style={styles.badge}><Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>{t.badge}</Text></View>}
              </View>
              <Text style={{ fontSize: 12, fontWeight: isTab && screen === t.key ? '800' : '400', color: colors.text }}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {toastMsg ? (
        <View style={styles.toast}>
          <Text style={{ color: '#fff', fontSize: 13 }}>{toastMsg}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppInner />
    </ShopProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  tabbar: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E3F0F8', flexDirection: 'row', padding: 8, paddingBottom: 4 },
  tab: { flex: 1, alignItems: 'center', gap: 3, paddingVertical: 8, paddingHorizontal: 0, borderRadius: 18 },
  tabActive: { backgroundColor: colors.blue },
  badge: { position: 'absolute', top: -6, right: -14, backgroundColor: colors.orange, borderRadius: 999, minWidth: 22, height: 22, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' },
  toast: { position: 'absolute', bottom: 110, alignSelf: 'center', backgroundColor: '#0B2A3C', paddingVertical: 11, paddingHorizontal: 20, borderRadius: 999 },
});
