const timerRef = document.querySelector(".current-time");
const hourInput = document.getElementById("hour-input");
const minuteInput = document.getElementById("minute-input");
const activeAlarms = document.querySelector(".alarms-list");
const setAlarm = document.getElementById("set");
const clearAllButton = document.querySelector(".clear");
const alarmSound = new Audio("./bbc_clocks--al_07070161.mp3");

let alarmIndex = 0;
let alarmArray = [];
let initialHour = 0;
let initialMinute = 0;

const appendZero = (value) => (value < 10 ? "0" + value : value);

// 타이머 시간 설정, 알람 울림
const displayTimer = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-US", { hour12: false });
  timerRef.textContent = currentTime;

  // 알람 울림
  alarmArray.forEach((alarm) => {
    if (alarm.isActive && alarm.time === currentTime.slice(0, 5)) {
        alarmSound.play();
    }
});
};

// 알람 추가
const createAlarm = (hour, minute) => {
  alarmIndex += 1;
  const alarmObj = {
    id: `${alarmIndex}_${hour}_${minute}`,
    time: `${appendZero(hour)}:${appendZero(minute)}`,
    isActive: false
  };
  alarmArray.push(alarmObj);

  // 알람 목록
  const alarmDiv = document.createElement("div");
  alarmDiv.className = "alarm";
  alarmDiv.dataset.id = alarmObj.id;
  alarmDiv.innerHTML = `<span>${alarmObj.time}</span>`;

  // 알람 토글, 삭제버튼
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => toggleAlarm(alarmObj));
  alarmDiv.appendChild(checkbox);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa solid fa-trash-can"></i>`;
  deleteButton.className = "deleteButton";
  deleteButton.addEventListener("click", () => deleteAlarm(alarmObj));
  alarmDiv.appendChild(deleteButton);

  activeAlarms.appendChild(alarmDiv);
};

// 알람 토글기능
const toggleAlarm = (alarm) => {
  alarm.isActive = !alarm.isActive;
  if (alarm.isActive) {
      const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 5);
      if (alarm.time === currentTime) {
          alarmSound.play();
      }
  } else {
      alarmSound.pause();
  }
};

// 알람 삭제기능
const deleteAlarm = (alarm) => {
  const index = alarmArray.indexOf(alarm);
  if (index > -1) {
      alarmArray.splice(index, 1);
      document.querySelector(`[data-id="${alarm.id}"]`).remove();
  }
};

// 알람 모두 삭제
clearAllButton.addEventListener("click", () => {
  alarmArray = [];
  activeAlarms.innerHTML = "";
});

// 알람추가 이벤트리스너
setAlarm.addEventListener("click", () => {
  let hour = parseInt(hourInput.value) || 0;
  let minute = parseInt(minuteInput.value) || 0;

  // 유효성
  if(hour < 0 || hour > 23 || minute < 0 || minute > 59){
    alert("타이머 설정이 잘못되었습니다. 올바른 값으로 설정해주세요.");
    return;
  }

  // 동일 알람 체크
  if(!alarmArray.some(alarm => alarm.time === `${appendZero(hour)}:${appendZero(minute)}`)){
    createAlarm(hour, minute);
  }

  [hourInput.value, minuteInput.value] = ["", ""];
});

window.onload = () => {
  setInterval(displayTimer, 10);
  [hourInput.value, minuteInput.value] = ["", ""];
};