import { ImageSourcePropType } from 'react-native';

export const C = {
  bg: '#F2FAFF',
  orange: '#FF6A00',
  blue: '#90D5FF',
  blueLight: '#E8F6FF',
  blueMid: '#A5DDFB',
  blueTile: '#E3F4FF',
  blueCDE: '#CDEEFE',
  btnLight: '#DDF1FF',
  border: '#E3F0F8',
  borderStep: '#D6EAF5',
  text: '#0B2A3C',
  gray: '#5B7686',
  grayLight: '#7A93A3',
  green: '#4CC97A',
  pillBg: '#E8F6FF',
};

export interface Product {
  id: string;
  name: string;
  price: number;
  old: number;
  off: string;
  discount: string;
  img: ImageSourcePropType;
  rating: string;
  sold: string;
  desc: string;
}

export const PRODUCTS: Record<string, Product> = {
  headphones: {
    id: 'headphones', name: 'AirTune Wireless Headphones', price: 1299, old: 1999,
    off: '35% OFF', discount: '−35%', img: require('../assets/headphones.png'),
    rating: '★ 4.9 (248 reviews)', sold: '1.2k sold',
    desc: 'Big sound, zero wires. Enjoy 40-hour battery life, soft ear cushions and clear calls with Bluetooth 5.3.',
  },
  speaker: {
    id: 'speaker', name: 'Mini Bluetooth Speaker', price: 599, old: 799,
    off: '25% OFF', discount: '−25%', img: require('../assets/speaker.png'),
    rating: '★ 4.8 (180 reviews)', sold: '680 sold',
    desc: 'Pocket-sized speaker with rich bass and 12-hour playtime. Pairs instantly over Bluetooth 5.3.',
  },
};

export const peso = (n: number) => '₱' + n.toLocaleString('en-PH');

export interface CartItem { id: string; qty: number; checked: boolean }
export interface OrderItem { id: string; qty: number }
export interface Order {
  id: string; date: string; status: 'To Pay' | 'To Ship' | 'To Receive' | 'Completed';
  seller: string; items: OrderItem[]; total: number; pay: string; delivered?: string;
}
export interface Msg { from: 'me' | 'them'; t: string }
export interface Convo {
  name: string; time: string; unread: number; blue?: boolean; icon: string;
  last: string; msgs: Msg[];
}

export const CATS: [string, string][] = [
  ['Fashion', 'shirt'], ['Beauty', 'sparkle'], ['Electronics', 'headphones'], ['Home', 'lamp'], ['Shoes', 'shoes'],
  ['Bags', 'bag'], ['Sports', 'gym'], ['Groceries', 'apple'], ['Toys', 'toys'], ['More', 'grid'],
];

export const initialCart: CartItem[] = [
  { id: 'headphones', qty: 1, checked: true },
  { id: 'speaker', qty: 1, checked: true },
];

export const initialOrders: Order[] = [
  { id: '#SE-261004-0821', date: 'Oct 4, 2026', status: 'To Ship', seller: 'SoundLab Official', items: [{ id: 'headphones', qty: 1 }, { id: 'speaker', qty: 1 }], total: 1798, pay: 'GCash' },
  { id: '#SE-260912-0415', date: 'Sep 12, 2026', status: 'Completed', seller: 'SoundLab Official', items: [{ id: 'speaker', qty: 1 }], total: 599, pay: 'GCash', delivered: 'Sep 15' },
];

export const initialConvos: Convo[] = [
  { name: 'SoundLab Official', time: '9:38 AM', unread: 2, blue: true, icon: 'headphones', last: "Thanks, Alex! We're packing your order.", msgs: [{ from: 'them', t: 'Hi Alex! Thanks for your order 🎉' }, { from: 'them', t: "Thanks, Alex! We're packing your order." }] },
  { name: 'Daily Style', time: '9:12 AM', unread: 1, blue: true, icon: 'shirt', last: 'The medium size is back in stock 😊', msgs: [{ from: 'them', t: 'The medium size is back in stock 😊' }] },
  { name: 'Glow Beauty', time: 'Yesterday', unread: 0, icon: 'sparkle', last: "Yes, it's suitable for sensitive skin.", msgs: [{ from: 'me', t: 'Is it okay for sensitive skin?' }, { from: 'them', t: "Yes, it's suitable for sensitive skin." }] },
  { name: 'Home & Co.', time: 'Yesterday', unread: 0, icon: 'lamp', last: 'You: Thank you for the quick reply!', msgs: [{ from: 'them', t: 'Your lamp ships tomorrow!' }, { from: 'me', t: 'Thank you for the quick reply!' }] },
  { name: 'Fresh Finds', time: 'Oct 2', unread: 0, icon: 'apple', last: 'Your delivery has been completed.', msgs: [{ from: 'them', t: 'Your delivery has been completed.' }] },
  { name: 'Stride Sports', time: 'Oct 1', unread: 0, icon: 'gym', last: 'You: Is this available in blue?', msgs: [{ from: 'me', t: 'Is this available in blue?' }] },
];
