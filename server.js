const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const dataFile = path.join(__dirname, 'data.json');
let reservations = [];

// data.json 존재하면 불러오기
if (fs.existsSync(dataFile)) {
  reservations = JSON.parse(fs.readFileSync(dataFile));
}

// ---------------- API ----------------
// 전체 예약 리스트 반환
app.get('/list', (req, res) => {
  res.json(reservations);
});

// 손님 예약 조회
app.post('/check', (req, res) => {
  const { reservation, phone } = req.body;
  const found = reservations.find(r => r.reservation === reservation && r.phone === phone);
  res.json({ found: !!found, reservation, total: reservations.length });
});

// 예약 추가
app.post('/add', (req, res) => {
  const { reservation, phone, dose } = req.body;
  reservations.push({ reservation, phone, dose });
  fs.writeFileSync(dataFile, JSON.stringify(reservations, null, 2));
  res.json({ success: true });
});

// 예약 삭제
app.post('/delete', (req, res) => {
  const { reservation, phone } = req.body;
  const index = reservations.findIndex(r => r.reservation === reservation && r.phone === phone);
  if (index !== -1) {
    reservations.splice(index, 1);
    fs.writeFileSync(dataFile, JSON.stringify(reservations, null, 2));
  }
  res.json({ success: true });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
