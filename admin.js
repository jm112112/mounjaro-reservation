// admin.js

// 기본 데이터 구조
function getAdminData() {
  return JSON.parse(localStorage.getItem("adminData")) || {
    "2.5mg": { max: 0, distributed: 0 },
    "5.0mg": { max: 0, distributed: 0 },
    "7.5mg": { max: 0, distributed: 0 },
    "10.0mg": { max: 0, distributed: 0 }
  };
}

// 화면에 표시
function updateDisplay() {
  const data = getAdminData();
  const displayText = Object.entries(data)
    .map(([dose, obj]) => `${dose} → 문자 완료: ${obj.distributed}, 최신 번호: ${obj.max}`)
    .join("\n");
  document.getElementById("displayArea").textContent = displayText;
}

// 저장
function saveNumbers() {
  const dose = document.getElementById("adminDoseSelect").value;
  const distributed = parseInt(document.getElementById("distributedNumber").value);
  const max = parseInt(document.getElementById("maxNumber").value);

  if(isNaN(distributed) || distributed < 0) return alert("문자 발송 완료 번호를 올바르게 입력해주세요.");
  if(isNaN(max) || max < 0) return alert("가장 최신 예약 번호를 올바르게 입력해주세요.");

  const data = getAdminData();
  data[dose] = { distributed, max };
  localStorage.setItem("adminData", JSON.stringify(data));

  document.getElementById("distributedNumber").value = "";
  document.getElementById("maxNumber").value = "";
  updateDisplay();
  alert(`${dose} 데이터가 업데이트되었습니다.`);
}

// 초기 로딩 시 표시
document.addEventListener("DOMContentLoaded", updateDisplay);