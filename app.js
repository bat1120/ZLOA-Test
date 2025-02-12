import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const API_URL = "https://your-render-backend.onrender.com"; // Render에 배포한 서버 URL

export default function App() {
  const [nickname, setNickname] = useState("");

  const sendNicknameToServer = async () => {
    if (!nickname) {
      Alert.alert("입력 오류", "닉네임을 입력하세요.");
      return;
    }

    try {
      await axios.post(`${API_URL}/open-browser`, { nickname });
      Alert.alert("성공", `${nickname} 검색 창이 PC에서 열립니다!`);
    } catch (error) {
      console.error("API 요청 실패:", error);
      Alert.alert("오류", "서버 연결 실패");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZLOA 검색</Text>
      <TextInput
        style={styles.input}
        placeholder="닉네임 입력"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button title="검색하기" onPress={sendNicknameToServer} />
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
});
