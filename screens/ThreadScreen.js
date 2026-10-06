import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from './ui';
import { Icon } from './ui';

export default function ThreadScreen({ go, convo, sendMessage }) {
  const [text, setText] = useState('');
  const scrollRef = useRef(null);
  if (!convo) return null;

  const send = () => {
    const v = text.trim();
    if (!v) return;
    sendMessage(v);
    setText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => go('chat')}><Icon name="back" size={22} strokeWidth={2.2} /></TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text, flex: 1 }}>{convo.name}</Text>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={styles.thread} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
          {convo.msgs.map((m, i) => (
            <View key={i} style={[styles.bubble, m.from === 'me' ? styles.me : styles.them]}>
              <Text style={{ fontSize: 14, color: colors.text }}>{m.t}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.chatinput}>
          <TextInput style={styles.input} placeholder="Type a message..." placeholderTextColor="#7A93A3" value={text} onChangeText={setText} onSubmitEditing={send} />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Text style={{ color: '#fff', fontWeight: '800' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: '#fff', padding: 10, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 14 },
  thread: { padding: 16, gap: 10 },
  bubble: { maxWidth: '75%', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 16, marginBottom: 10 },
  them: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  me: { backgroundColor: colors.blue, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  chatinput: { flexDirection: 'row', gap: 10, padding: 12, paddingHorizontal: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E3F0F8' },
  input: { flex: 1, borderWidth: 1.5, borderColor: colors.lightBorder, borderRadius: 999, paddingVertical: 11, paddingHorizontal: 16, fontSize: 14 },
  sendBtn: { backgroundColor: colors.orange, borderRadius: 999, paddingHorizontal: 20, justifyContent: 'center' },
});
