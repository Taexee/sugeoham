document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('add-new-alarm').addEventListener('click', showAddAlarm);
  document.getElementById('close').addEventListener('click', close);
  document.getElementById('alarmButton').addEventListener('click', setAlarm);
  document.getElementById('saveButton').addEventListener('click', saveChanges);
  document.getElementById('cancelButton').addEventListener('click', closeEditMode);
  document.getElementById('clearButton').addEventListener('click', clearAll);
  document.getElementById('okButton').addEventListener('click', closeNotification);

  let newAlarm = document.getElementById('new-alarm');

  let audio = new Audio('./bbc_clocks--al_07070161.mp3');
  loadAlarms();
  setInterval(updateCountdown, 1000);

  function showAddAlarm (){
    newAlarm.style.opacity = '1';
    newAlarm.style.zIndex = '100';
  }

  function close() {
    newAlarm.style.opacity = '0';
    newAlarm.style.zIndex = '-100';
  }

  function setAlarm() {
    let alarmNameInput = document.getElementById('alarmName');
    let alarmDateInput = document.getElementById('alarmDate');
    let alarmTimeInput = document.getElementById('alarmTime');
    let alarmName = alarmNameInput.value.trim();
    let alarmDate = alarmDateInput.value;
    let alarmTime = alarmTimeInput.value;
    

    if(alarmName === '' || alarmDate === '' || alarmTime === ''){
      alert('Please fill in all the fileds(Name, Date, Time).');
      return;
    }

    if(validateDateTime(alarmDate, alarmTime)){
      let alarmObject = {
        name: alarmName,
        date: alarmDate,
        time: alarmTime
      };
      addAlarm(alarmObject);
      displayAlarms();
      clearForm();
      close();
    }else{
      alert('Please enter a valid future date and time.');
    }
  }

  function validateDateTime(date, time){
    let now = new Date();
    let selectedDateTime = new Date(date + ' ' + time);
    return selectedDateTime > now;
  }

  function addAlarm(alarmObject){
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    alarms.push(alarmObject);
    localStorage.setItem('alarms', JSON.stringify(alarms));

    scheduleAlarm(alarmObject, alarms.length - 1);
  }

  function scheduleAlarm(alarmObject, index){
    let now = new Date();
    let alarmTime = new Date(alarmObject.date + ' ' + alarmObject.time);
    let timeUntilAlarm = alarmTime - now;

    if(timeUntilAlarm > 0) {
      setTimeout(function () {
        showNotification(alarmObject.name, index);
        showNextAlarm();
      }, timeUntilAlarm);
    }
  }

  function showNotification(alarmName, alarmIndex){
    let notification = document.getElementById('notification');
    let notificationMessage = document.getElementById('notificationMessage');
    notificationMessage.innerHTML = `It's time for ${alarmName}!`;
    notification.style.display = 'block';
    let okButton = document.getElementById('okButton');
    okButton.onclick = function(){
      closeNotification(alarmIndex);
    };
    playSong();
  }

  function clearExpiredAlarm(expiredIndex){
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    let now = new Date();

    alarms = alarms.filter((alarm, index) => {
      let alarmDateTime = new Date(alarm.date + ' ' + alarm.time);
      return alarmDateTime > now || index === expiredIndex;
    });

    localStorage.setItem('alarms', JSON.stringify(alarms));
    displayAlarms();
  }

  function closeNotification(alarmIndex){
    let notification = document.getElementById('notification');
    notification.style.display = 'none';

    pauseSong();
    if(alarmIndex !== undefined && alarmIndex !== null){
      clearExpiredAlarm(alarmIndex);
    }
    showNextAlarm();
  }

  function playSong(){
    audio.play();
  }

  function pauseSong(){
    audio.pause();
    audio.currentTime = 0;
  }

  function clearForm(){
    document.getElementById('alarmName').value = '';
    document.getElementById('alarmDate').value = '';
    document.getElementById('alarmTime').value = '';
  }

  function displayAlarms(){
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    let alarmList = document.getElementById('alarms');
    alarmList.innerHTML = '';

    alarms.forEach(function(alarm, index){
      let listItem = document.createElement('li');
      listItem.classList.add('alarm-item');
      listItem.innerHTML = `<strong>${alarm.name}</strong> ${alarm.date} ${alarm.time}`;
      let buttonSection = document.createElement('div');
      buttonSection.classList.add('buttonSection');
      let deleteButton = document.createElement('span');
      deleteButton.classList.add('deleteButton');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.addEventListener('click', function(){
        deleteAlarm(index);
      });
      buttonSection.appendChild(deleteButton);
      let editButton = document.createElement('span');
      editButton.classList.add('editButton');
      editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
      editButton.addEventListener('click', function(){
        openEditModal(index);
      });
      buttonSection.appendChild(editButton);
      listItem.appendChild(buttonSection);
      alarmList.append(listItem);
    });
  }

  function deleteAlarm(index){
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    alarms.splice(index, 1);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    displayAlarms();
  }

  function openEditModal(index){
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    let alarm = alarms[index];

    document.getElementById('editName').value = alarm.name;
    document.getElementById('editDate').value = alarm.date;
    document.getElementById('editTime').value = alarm.time;

    document.getElementById('editModal').style.display = 'block';
    document.getElementById('saveButton').setAttribute('date-index', index);
  }

  function saveChanges(){
    let index = parseInt(document.getElementById('saveButton').getAttribute('date-index'));

    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    let alarm = alarms[index];

    let newName = document.getElementById('editName').value.trim();
    let newDate = document.getElementById('editDate').value;
    let newTime = document.getElementById('editTime').value;

    showNextAlarm();
    if(newName === '' || newDate === '' || newTime === ''){
      alert('Please fill in all the fields(Name, Date, Time).');
      return;
    }

    if(validateDateTime(newDate, newTime)){
      alarm.name = newName;
      alarm.date = newDate;
      alarm.time = newTime;

      localStorage.setItem('alarms', JSON.stringify(alarms));
      displayAlarms();
      closeEditMode();
    }else{
      alert('Please enter a valid future date and time');
    }
  }

  function closeEditMode(){
    document.getElementById('editModal').style.display = 'none';
  }

  function clearAll(){
    localStorage.removeItem('alarms');
    displayAlarms();
  }

  function updateCountdown(){
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    showNextAlarm();
  }

  function showNextAlarm(){
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    let now = new Date();
    let nextAlarm = null;
    let nextAlarmIndex = -1;
    alarms = alarms.filter(alarm => new Date(alarm.date + ' ' + alarm.time) > now);
    localStorage.setItem('alarms', JSON.stringify(alarms));

    alarms.forEach(function(alarm, index){
      let alarmDateTime = new Date(alarm.date + ' ' + alarm.time);
      if(!nextAlarm || alarmDateTime < newAlarm){
        newAlarm = alarmDateTime;
        nextAlarmIndex = index;
      }
    });

    let countdownTime = document.getElementById('countdownTimer');
    if(nextAlarm){
      let timeRemainig = newAlarm - now;
      let hours = Math.floor(timeRemainig / (1000 * 60 * 60)).toString().padStart(2, '0');
      let minutes = Math.floor((timeRemainig % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      let seconds = Math.floor((timeRemainig % (1000 * 60)) / 1000).toString().padStart(2, '0');

      countdownTime.innerHTML = `${alarms[nextAlarmIndex].name} - ${hours}:${minutes}:${seconds}`;
    }else{
      countdownTime.innerHTML = 'No upcoming alarms.';
    }
  }

  function loadAlarms(){
    displayAlarms();
    updateCountdown();
  }

});