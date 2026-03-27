// app.js

// 카드 업데이트 함수 (실시간 대기 현황)
function updateCards() {
  const items = document.querySelectorAll(".status-item");
  const adminData = JSON.parse(localStorage.getItem("adminData")) || {};

  // 최대 대기 인원 계산
  let maxCount = 0;
  items.forEach(item => {
    const dose = item.querySelector(".dose").textContent.trim();
    const max = adminData[dose]?.max || 0;
    const distributed = adminData[dose]?.distributed || 0;
    const count = Math.max(0, max - distributed);
    if (count > maxCount) maxCount = count;
  });

  // 각 카드 업데이트
  items.forEach(item => {
    const dose = item.querySelector(".dose").textContent.trim();
    const max = adminData[dose]?.max || 0;
    const distributed = adminData[dose]?.distributed || 0;
    const count = Math.max(0, max - distributed);

    item.querySelector(".count strong").textContent = count;

    const bar = item.querySelector(".bar div");

    // 0명일 때 흐림 처리
    if (count === 0) {
      item.style.opacity = "0.5";
      bar.style.width = "0%";
    } else {
      item.style.opacity = "1";
      const percent = maxCount > 0 ? Math.round((count / maxCount) * 100) : 100;
      bar.style.width = percent + "%";
    }
  });
}

// 환자 예약 조회
function check() {
  const reservationInput = document.getElementById("reservation").value.trim();
  const phoneInput = document.getElementById("phone").value.trim();
  const dose = document.getElementById("doseSelect").value;

  const userNumber = parseInt(reservationInput);
  if (isNaN(userNumber)) return alert("예약번호를 올바르게 입력하세요.");
  if (!/^\d{4}$/.test(phoneInput)) return alert("휴대폰 뒷자리 4자리를 입력하세요.");

  const adminData = JSON.parse(localStorage.getItem("adminData")) || {};
  const distributed = adminData[dose]?.distributed || 0;
  const queueNumber = Math.max(0, userNumber - distributed);

  document.getElementById("result").textContent = `예약 순번: ${queueNumber}`;
  document.getElementById("total").textContent = `(곧 문자가 갈테니 조금만 기다려주세요💊)`;

  // 조회 시 카드도 업데이트
  updateCards();
}

// 페이지 로딩 시 카드 업데이트
document.addEventListener("DOMContentLoaded", updateCards);
