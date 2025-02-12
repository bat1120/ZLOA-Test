const express = require("express");
const cors = require("cors");
const open = require("open"); // 브라우저 창 자동 실행

const app = express();
app.use(cors());
app.use(express.json());

// 닉네임을 받아 ZLOA 검색 창을 PC에서 실행
app.post("/open-browser", (req, res) => {
    const { nickname } = req.body;
    if (!nickname) return res.status(400).json({ error: "닉네임을 입력하세요." });

    const zloaUrl = `https://zloa.net/char/${nickname}`;
    open(zloaUrl); // 브라우저에서 자동 실행

    res.json({ message: `브라우저에서 ${nickname} 검색 완료!` });
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ 서버 실행 중: http://localhost:${PORT}`));
