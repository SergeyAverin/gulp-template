const clocklInit = () => {
  const clock = document.querySelector('#clock');

  setInterval(() => {
    console.log(currentTime);
    const currentTime = getCurrentTime();
    clock.innerHTML = currentTime;
  }, 1000);
};

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}


export default clocklInit;
