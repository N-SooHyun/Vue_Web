// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 50051;

// Vue 프로젝트의 빌드된 파일을 정적 파일로 서빙
app.use(express.static(path.join(__dirname, '../dist')));

// 클라이언트 요청 시 index.html을 반환
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
