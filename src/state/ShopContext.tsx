import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import { CartItem, Convo, Order, PRODUCTS, initialCart, initialConvos, initialOrders, peso } from '../data';

interface ShopState {
  cart: CartItem[];
  orders: Order[];
  convos: Convo[];
  purchTab: Order['status'];
  activeThread: number | null;
  lastOrder: Order | null;
  cartCount: number;
  unreadTotal: number;
  toShipCount: number;
  addToCart: (id: string, qty: number) => void;
  setCartQty: (id: string, qty: number) => void;
  toggleChecked: (id: string) => void;
  toggleAll: () => void;
  removeUnchecked: () => void;
  subtotal: () => number;
  totalPay: () => number;
  checkedItems: () => CartItem[];
  placeOrder: (pay: string) => Order | null;
  buyAgain: (id: string) => void;
  setPurchTab: (t: Order['status']) => void;
  openConvo: (i: number) => void;
  setActiveThread: (i: number | null) => void;
  sendMessage: (i: number, text: string) => void;
  toastMsg: string | null;
  toast: (msg: string) => void;
}

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [convos, setConvos] = useState<Convo[]>(initialConvos);
  const [purchTab, setPurchTab] = useState<Order['status']>('To Ship');
  const [activeThread, setActiveThread] = useState<number | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const convosRef = useRef(convos);
  convosRef.current = convos;
  const activeThreadRef = useRef(activeThread);
  activeThreadRef.current = activeThread;

  const toast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 1800);
  };

  const addToCart = (id: string, qty: number) => {
    setCart(cs => {
      const it = cs.find(i => i.id === id);
      if (it) return cs.map(i => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...cs, { id, qty, checked: true }];
    });
    toast(PRODUCTS[id].name + ' added to cart');
  };
  const setCartQty = (id: string, qty: number) =>
    setCart(cs => cs.map(i => (i.id === id ? { ...i, qty: Math.min(99, Math.max(1, qty)) } : i)));
  const toggleChecked = (id: string) => setCart(cs => cs.map(i => (i.id === id ? { ...i, checked: !i.checked } : i)));
  const toggleAll = () =>
    setCart(cs => {
      const v = !(cs.length > 0 && cs.every(i => i.checked));
      return cs.map(i => ({ ...i, checked: v }));
    });
  const checkedItems = () => cart.filter(i => i.checked);
  const subtotal = () => checkedItems().reduce((s, i) => s + PRODUCTS[i.id].price * i.qty, 0);
  const totalPay = () => {
    const st = subtotal();
    return st === 0 ? 0 : Math.max(0, st - (st >= 999 ? 100 : 0));
  };

  const placeOrder = (pay: string): Order | null => {
    const pending = cart.filter(i => i.checked);
    if (!pending.length) {
      toast('Select items in your cart first');
      return null;
    }
    const now = new Date();
    const num = '#SE-' + String(now.getFullYear()).slice(2) + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + '-' + String(Math.floor(1000 + Math.random() * 9000));
    const total = totalPay();
    const order: Order = {
      id: num,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'To Ship', seller: 'SoundLab Official',
      items: pending.map(i => ({ id: i.id, qty: i.qty })), total, pay,
    };
    setOrders(os => [order, ...os]);
    setCart(cs => cs.filter(i => !i.checked));
    setLastOrder(order);
    return order;
  };

  const buyAgain = (id: string) => addToCart(id, 1);

  const openConvo = (i: number) => {
    setConvos(cs => cs.map((c, idx) => (idx === i ? { ...c, unread: 0 } : c)));
  };

  const sendMessage = (i: number, text: string) => {
    const v = text.trim();
    if (!v) return;
    setConvos(cs => cs.map((c, idx) => (idx === i ? { ...c, msgs: [...c.msgs, { from: 'me', t: v }], last: 'You: ' + v } : c)));
    setTimeout(() => {
      const reply = 'Got it! Thanks for reaching out to ' + convosRef.current[i].name + ' 😊';
      const isActive = activeThreadRef.current === i;
      setConvos(cs => cs.map((c, idx) => (idx === i ? { ...c, msgs: [...c.msgs, { from: 'them', t: reply }], last: reply, unread: isActive ? c.unread : c.unread + 1 } : c)));
    }, 900);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const unreadTotal = convos.reduce((s, c) => s + c.unread, 0);
  const toShipCount = orders.filter(o => o.status === 'To Ship').length;

  const value: ShopState = {
    cart, orders, convos, purchTab, activeThread, lastOrder,
    cartCount, unreadTotal, toShipCount,
    addToCart, setCartQty, toggleChecked, toggleAll, removeUnchecked: () => setCart(cs => cs.filter(i => !i.checked)),
    subtotal, totalPay, checkedItems, placeOrder, buyAgain, setPurchTab,
    openConvo, setActiveThread, sendMessage, toastMsg, toast,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const s = useContext(ShopContext);
  if (!s) throw new Error('useShop must be used within ShopProvider');
  return s;
}
