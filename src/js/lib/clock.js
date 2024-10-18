const clockInit = () => {
  changeTimeOnWidget();
  setInterval(() => {
    changeTimeOnWidget();
  }, 1000);
};

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function changeTimeOnWidget() {
  const clock = document.querySelector("#clock");
  const currentTime = getCurrentTime();
  clock.innerHTML = currentTime;
}

export default clockInit;
