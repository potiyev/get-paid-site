/* Coins fall past the page now and then, scattered across the width, and then it
   goes quiet for a while before another handful arrives.

   Decorative only: the layer is aria-hidden, takes no pointer event, and sits
   behind the content (see .coinfall in style.css). Skipped outright when the
   visitor has asked for reduced motion, and it stops spawning while the tab is
   hidden — otherwise a page left in a background tab greets them with a
   downpour of everything that queued up while they were away.

   Scatter, size, drift and speed are picked here and handed to CSS as custom
   properties; the motion itself is a CSS animation, so it runs off the
   compositor and the main thread stays free. */
(function () {
  var layer = document.querySelector('.coinfall');
  if (!layer || !window.matchMedia) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var pick = function (a, b) { return Math.round(rand(a, b)); };
  var art = layer.getAttribute('data-coin') || 'assets/coin.png';

  function coin() {
    var drop = document.createElement('span');
    drop.className = 'drop';
    drop.style.cssText =
      '--x:' + rand(4, 96).toFixed(1) + 'vw;' +
      '--size:' + pick(17, 33) + 'px;' +
      '--sway:' + pick(-42, 42) + 'px;' +
      '--dur:' + rand(5.5, 9.5).toFixed(2) + 's';

    var img = new Image();
    img.src = art;
    img.alt = '';
    img.style.cssText =
      '--spin:' + (Math.random() < 0.5 ? '-360deg' : '360deg') + ';' +
      '--spindur:' + rand(1.5, 3.6).toFixed(2) + 's';

    drop.appendChild(img);
    // The fall runs once; when it ends the coin is off-screen and has no reason
    // to stay in the DOM. (The spin is infinite, so it never fires this.)
    drop.addEventListener('animationend', function (e) {
      if (e.target === drop) drop.remove();
    });
    layer.appendChild(drop);
  }

  function shower() {
    if (!document.hidden) {
      var n = pick(6, 13);
      for (var i = 0; i < n; i++) setTimeout(coin, rand(0, 3000));
    }
    // A handful takes about ten seconds to clear, so at the short end of this
    // range one shower is still falling when the next starts — often enough to
    // feel alive, with enough quiet left that it reads as a happy surprise
    // rather than as weather.
    setTimeout(shower, rand(7000, 16000));
  }

  setTimeout(shower, rand(1200, 2600));
})();
