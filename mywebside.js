$(function () {
  function updateClock() {
    const timerElement = document.getElementById("start-bar-timer");
    const windowTimeInputElement = document.getElementById(
      "time-window-timeoutput"
    );
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    timerElement.value = `${hours}:${minutes}:${seconds}`;
    if (windowTimeInputElement) {
      windowTimeInputElement.value = timerElement.value;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  // timer windows start
  const canvas = document.getElementById("clockCanvas");
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const center = size / 2;
  const radius = size * 0.4;

  function drawMinuteSquares() {
    const squareSize = 6;

    for (let i = 0; i < 60; i++) {
      const angle = (i * Math.PI) / 30;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.rect(x - squareSize / 2, y - squareSize / 2, squareSize, squareSize);

      if (i % 5 === 0) {
        const gradient = ctx.createLinearGradient(
          x - squareSize / 2,
          y - squareSize / 2,
          x + squareSize / 2,
          y + squareSize / 2
        );
        gradient.addColorStop(0, "#82e1da");
        gradient.addColorStop(1, "#04191a");

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 1;
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      } else {
        const gradient = ctx.createLinearGradient(
          x - squareSize / 2,
          y - squareSize / 2,
          x + squareSize / 2,
          y + squareSize / 2
        );
        gradient.addColorStop(0, "#f6fbf5");
        gradient.addColorStop(1, "#828282");

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 1;
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      }

      ctx.fill();
      ctx.closePath();
    }
  }

  function drawHands() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();

    const hourAngle = (hours + minutes / 60) * (Math.PI / 6);
    const minuteAngle = minutes * (Math.PI / 30);

    drawTriangleHand(hourAngle, radius * 0.5, 20, "#318084");
    drawTriangleHand(minuteAngle, radius * 0.7, 20, "#318084");
  }

  function drawTriangleHand(angle, length, width, color) {
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle - Math.PI / 2);
    ctx.scale(-1, -1);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-width / 2, -length / 2);
    ctx.lineTo(0, -length);
    ctx.lineTo(width / 2, -length / 2);
    ctx.closePath();

    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawClock() {
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(-Math.PI / 2);
    ctx.translate(-center, -center);

    drawMinuteSquares();
    drawHands();

    ctx.restore();
  }

  setInterval(drawClock, 1000);
  // timer window end

  $("#start-bar-timer").click(function () {
    const element = document.getElementById("timer-window");
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });

  $("#close-time-window").click(function () {
    const element = document.getElementById("timer-window");
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
