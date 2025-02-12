import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default function App() {
  const [nickname, setNickname] = useState("");
  const [character, setCharacter] = useState(null);

  const searchZloa = async () => {
    if (!nickname) {
      Alert.alert("입력 오류", "닉네임을 입력하세요.");
      return;
    }

    try {
      // 🚀 Render에서 배포된 URL 사용 (수정 필요!)
      const response = await axios.post("https://zloa-server.onrender.com/search", { nickname });
      setCharacter(response.data);
    } catch (error) {
      Alert.alert("검색 실패", "서버 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZLOA 닉네임 검색</Text>
      <TextInput
        style={styles.input}
        placeholder="닉네임 입력"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button title="검색하기" onPress={searchZloa} />

      {character && (
        <View style={styles.result}>
          <Text style={styles.resultText}>이름: {character.name}</Text>
          <Text style={styles.resultText}>아이템 레벨: {character.level}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
  },
  resultText: {
    fontSize: 16,
  },
});
