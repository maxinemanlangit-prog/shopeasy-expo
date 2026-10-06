import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export const colors = {
  bg: '#F2FAFF',
  orange: '#FF6A00',
  orangeLight: '#FFEDE0',
  blue: '#90D5FF',
  banner: '#A5DDFB',
  card: '#E8F6FF',
  tile: '#E3F4FF',
  lightBorder: '#D6EAF5',
  text: '#0B2A3C',
  gray: '#5B7686',
  grayLight: '#7A93A3',
  darkBlue: '#12394E',
  white: '#fff',
  success: '#4CC97A',
};

export const peso = (n) => '₱' + n.toLocaleString('en-PH');

const p = (d) => <Path d={d} />;
const c = (cx, cy, r) => <Circle cx={cx} cy={cy} r={r} />;
const r = (x, y, w, h, rx) => <Rect x={x} y={y} width={w} height={h} rx={rx} />;

const SHAPES = {
  home: () => p('M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9z'),
  cart: () => (<>{p('M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6')}{c(10, 20.5, 1.4)}{c(17, 20.5, 1.4)}</>),
  box: () => (<>{p('M21 8l-9-5-9 5v8l9 5 9-5V8z')}{p('M3 8l9 5 9-5M12 13v8')}</>),
  chat: () => p('M21 12a8 8 0 0 1-11.6 7.1L4 21l2-5.1A8 8 0 1 1 21 12z'),
  me: () => (<>{c(12, 8, 4)}{p('M4.5 20a7.5 7.5 0 0 1 15 0')}</>),
  search: () => (<>{c(11, 11, 7)}{p('M20 20l-3.5-3.5')}</>),
  bell: () => (<>{p('M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6')}{p('M10 20a2.2 2.2 0 0 0 4 0')}</>),
  back: () => p('M15 5l-7 7 7 7'),
  dots: (color) => (<>{<Circle cx={5} cy={12} r={1.8} fill={color} stroke="none" />}{<Circle cx={12} cy={12} r={1.8} fill={color} stroke="none" />}{<Circle cx={19} cy={12} r={1.8} fill={color} stroke="none" />}</>),
  truck: () => (<>{p('M1 7h13v10H1zM14 10h4l3 3v4h-7z')}{c(6, 18.5, 1.8)}{c(17, 18.5, 1.8)}</>),
  shield: () => (<>{p('M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3z')}{p('M9 12l2 2 4-4')}</>),
  check: () => p('M4.5 12.5l5 5L19.5 6.5'),
  heart: () => p('M12 20s-7.5-4.6-9.3-9A5.2 5.2 0 0 1 12 6.4 5.2 5.2 0 0 1 21.3 11c-1.8 4.4-9.3 9-9.3 9z'),
  store: () => (<>{p('M3 9l1.5-5h15L21 9')}{p('M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9')}</>),
  storeFull: () => (<>{p('M3 9l1.5-5h15L21 9')}{p('M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9')}{p('M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9z')}</>),
  ticket: () => p('M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-3a2 2 0 0 0 0-4V8z'),
  edit: () => (<>{p('M12 20h9')}{p('M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z')}</>),
  pin: () => (<>{p('M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z')}{c(12, 10, 2.5)}</>),
  wallet: () => (<>{r(3, 6, 18, 13, 2.5)}{p('M3 10h13a2.5 2.5 0 0 1 0 5h-2')}</>),
  help: (color) => (<>{c(12, 12, 9)}{p('M9.5 9.3a2.6 2.6 0 1 1 3.6 2.4c-.8.3-1.1.9-1.1 1.8')}{<Circle cx={12} cy={17} r={0.6} fill={color} stroke="none" />}</>),
  settings: () => (<>{c(12, 12, 3.2)}{p('M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2-1.2L14.2 3h-4l-.4 2.7a7 7 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2 1.2l.4 2.7h4l.4-2.7a7 7 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.06-.4.1-.8.1-1.2z')}</>),
  logout: () => (<>{p('M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3')}{p('M15 8l4 4-4 4M19 12H9')}</>),
  gift: () => (<>{r(4, 9, 16, 11, 2)}{p('M12 9v11M4 13.5h16M12 9s-4.5.3-4.5-2.5C7.5 4.5 12 6 12 9zm0 0s4.5.3 4.5-2.5C16.5 4.5 12 6 12 9z')}</>),
  history: () => (<>{p('M12 3a9 9 0 1 0 9 9')}{p('M12 7v5l3 3')}{p('M16 3l2 2 4-4')}</>),
  shoeIcon: () => r(3, 6, 18, 13, 2.5),
  // category icons
  shirt: () => p('M9 4L4 7l2 4 2-1.5V20h8v-10.5L18 11l2-4-5-3a3 3 0 0 1-6 0z'),
  sparkle: () => (<>{p('M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z')}{p('M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z')}</>),
  headphones: () => (<>{p('M4 15v-3a8 8 0 0 1 16 0v3')}{r(3, 14, 4, 7, 2)}{r(17, 14, 4, 7, 2)}</>),
  lamp: () => (<>{p('M8 4h8l3 8H5l3-8z')}{p('M12 12v6M8.5 20h7')}</>),
  shoes: () => (<>{p('M4 15c0-1 .8-1.5 2-1.5S9 14 10.5 15.5c1.6 1.6 3.5 2.5 6.5 2.5H19a2 2 0 0 0 2-2v-1')}{p('M4 15v3a2 2 0 0 0 2 2h14')}</>),
  bag: () => (<>{p('M6 8h12l-1 12a2 2 0 0 1-2 1.8H9A2 2 0 0 1 7 20L6 8z')}{p('M9 8V6a3 3 0 0 1 6 0v2')}</>),
  gym: () => p('M7 8v8M4 10v4M17 8v8M20 10v4M7 12h10'),
  apple: () => (<>{p('M12 7c-4-2.5-8 .5-8 5 0 4 3 8 5.5 8 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5C17 19.5 20 16 20 12c0-4.5-4-7.5-8-5z')}{p('M12 7c0-2 1-3.5 3-4')}</>),
  toys: () => (<>{r(4, 4, 7, 7, 2)}{r(13, 13, 7, 7, 2)}{<Rect x={13} y={4} width={7} height={7} rx={3.5} />}</>),
  grid: () => (<>{r(4, 4, 16, 16, 2)}{p('M4 12h16M12 4v16')}</>),
  bannerBag: () => (<>{p('M5 8h14l-1.2 12a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z')}{p('M5 8l1.5-4h11L19 8')}{p('M9 12.5c.8 1.2 1.8 1.8 3 1.8s2.2-.6 3-1.8')}</>),
};

export function Icon({ name, size = 24, color = '#0B2A3C', strokeWidth = 1.8, fill = 'none' }) {
  const shape = SHAPES[name];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {shape ? shape(color) : null}
    </Svg>
  );
}

export const common = StyleSheet.create({
  cardbox: { backgroundColor: colors.white, borderRadius: 16, padding: 16 },
  lightcard: { backgroundColor: colors.card, borderRadius: 16, padding: 16 },
  btn: { borderRadius: 16, paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  btnOrange: { backgroundColor: colors.orange },
  btnLight: { backgroundColor: '#DDF1FF' },
  btnBlock: { paddingVertical: 18 },
});
