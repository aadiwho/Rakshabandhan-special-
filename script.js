const canvas = document.getElementById("fallCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let currentPage = 0;
let startTime = Date.now();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function addParticles(count, shape) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10,
      size: 6 + Math.random() * 8,
      speed: 1 + Math.random() * 2,
      drift: (Math.random() - 0.5) * 1.5,
      shape: shape
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    ctx.fillStyle = "#ffb6c1";
    ctx.beginPath();

    if (p.shape === "circle") {
      ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
    } else if (p.shape === "square") {
      ctx.fillRect(p.x, p.y, p.size, p.size * 0.8);
      ctx.closePath();
    } else {
      ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
    }

    ctx.fill();

    p.y += p.speed;
    p.x += p.drift;

    if (p.y > canvas.height) {
      particles.splice(index, 1);
    }
  });
}

function animate() {
  const elapsed = (Date.now() - startTime) / 1000;
  const shape = document.querySelectorAll('.page')[currentPage].dataset.shape;

  if (elapsed <= 5) {
    addParticles(8, shape);
  } else {
    addParticles(2, shape);
  }

  drawParticles();
  requestAnimationFrame(animate);
}

function showPage(index) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.page')[index].classList.add('active');
  currentPage = index;
  particles = [];
  startTime = Date.now();
}

document.getElementById("next").addEventListener("click", () => {
  const next = (currentPage + 1) % document.querySelectorAll('.page').length;
  showPage(next);
});

document.getElementById("prev").addEventListener("click", () => {
  const prev = (currentPage - 1 + document.querySelectorAll('.page').length) % document.querySelectorAll('.page').length;
  showPage(prev);
});  








function drawHeart(ctx, x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
  ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
  ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
  ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function initCanvas3() {
  const canvas = document.getElementById('canvas3');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = [];
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      size: Math.random() * 10 + 8,
      speed: Math.random() * 1.5 + 0.5,
      color: 'rgba(255, 182, 193, 0.8)'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
      drawHeart(ctx, heart.x, heart.y, heart.size, heart.color);
      heart.y -= heart.speed;
      if (heart.y < -20) {
        heart.y = canvas.height + Math.random() * canvas.height;
        heart.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(animate);
  }

  animate();
}



Z




showPage(0);
animate();