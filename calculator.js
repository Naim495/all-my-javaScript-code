<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>iPhone Style Calculator</title>
  <style>
    body { display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#000;font-family:system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial }
    .calculator { width:280px;background:#000;border-radius:40px;overflow:hidden;padding:20px; }
    .display { color:#fff;padding:20px 10px;font-size:2rem;text-align:right;min-height:60px;word-break:break-all }
    .keys { display:grid;grid-template-columns:repeat(4,1fr);gap:12px; }
    button { height:60px;font-size:1.5rem;border-radius:50%;border:none;cursor:pointer;transition:transform 0.1s ease, box-shadow 0.1s ease; }
    .num { background:#333;color:#fff; }
    .op { background:#f7931a;color:#fff; }
    .gray { background:#a5a5a5;color:#000; }
    .wide { grid-column:span 2;border-radius:50px !important;text-align:left;padding-left:25px; }
    button:active { filter:brightness(1.2); }
    .pc-haptic {
      transform:scale(0.95);
      box-shadow:0 0 12px rgba(255,255,255,0.6);
    }
  </style>
</head>
<body>
  <div class="calculator" role="application" aria-label="iPhone style calculator">
    <div class="display" id="display">0</div>
    <div class="keys">
      <button id="clear" class="gray">AC</button>
      <button id="plusminus" class="gray">±</button>
      <button id="percent" class="gray">%</button>
      <button data-value="/" class="op">÷</button>

      <button data-value="7" class="num">7</button>
      <button data-value="8" class="num">8</button>
      <button data-value="9" class="num">9</button>
      <button data-value="*" class="op">×</button>

      <button data-value="4" class="num">4</button>
      <button data-value="5" class="num">5</button>
      <button data-value="6" class="num">6</button>
      <button data-value="-" class="op">−</button>

      <button data-value="1" class="num">1</button>
      <button data-value="2" class="num">2</button>
      <button data-value="3" class="num">3</button>
      <button data-value="+" class="op">+</button>

      <button data-value="0" class="num wide">0</button>
      <button data-value="." class="num">.</button>
      <button id="equals" class="op">=</button>
    </div>
  </div>

  <audio id="clickSound" src="https://www.soundjay.com/button/button-16.mp3" preload="auto"></audio>

  <script>
    const displayEl = document.getElementById('display');
    const clickSound = document.getElementById('clickSound');
    let expr = '';

    function playFeedback(btn){
      clickSound.currentTime = 0;
      clickSound.play();

      // Haptic feedback for mobile
      if (navigator.vibrate) {
        navigator.vibrate(10);
      } else {
        // Visual haptic effect for PC
        btn.classList.add('pc-haptic');
        setTimeout(()=>btn.classList.remove('pc-haptic'),100);
      }
    }

    function update(){
      displayEl.textContent = expr === '' ? '0' : expr;
    }

    function append(v){
      expr += v;
      update();
    }

    function clearAll(){
      expr = '';
      update();
    }

    function evaluateExpr(){
      if (!expr) return;
      try {
        const result = Function('return (' + expr + ')')();
        expr = String(result);
        update();
      } catch (e) {
        displayEl.textContent = 'Error';
      }
    }

    document.querySelectorAll('button[data-value]').forEach(b=>{
      b.addEventListener('click',()=>{append(b.getAttribute('data-value')); playFeedback(b);});
    });
    document.getElementById('clear').addEventListener('click',(e)=>{clearAll(); playFeedback(e.target);});
    document.getElementById('equals').addEventListener('click',(e)=>{evaluateExpr(); playFeedback(e.target);});

    update();
  </script>
</body>
</html>
