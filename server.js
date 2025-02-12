const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ZLOA에서 캐릭터 정보 크롤링
async function scrapeZloa(nickname) {
    const url = `https://zloa.net/char/${nickname}`;
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: "networkidle2" });

        // 예제: 캐릭터 이름과 아이템 레벨 가져오기
        const characterData = await page.evaluate(() => {
            const charName = document.querySelector(".character-name")?.innerText;
            const itemLevel = document.querySelector(".character-item-level")?.innerText;
            return { name: charName, level: itemLevel };
        });

        await browser.close();
        return characterData;
    } catch (error) {
        console.error("❌ ZLOA 크롤링 오류:", error);
        await browser.close();
        return null;
    }
}

// API 엔드포인트: 닉네임 검색 후 캐릭터 정보 반환
app.post("/search", async (req, res) => {
    const { nickname } = req.body;
    if (!nickname) return res.status(400).json({ error: "닉네임을 입력하세요." });

    const data = await scrapeZloa(nickname);
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: "ZLOA 검색 실패" });
    }
});

// 포트 설정 (Render는 환경 변수에서 포트 제공)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ 서버 실행 중: http://localhost:${PORT}`));
