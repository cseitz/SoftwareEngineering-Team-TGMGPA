let updateStyle = function() {
  if (!document.body) {
    requestAnimationFrame(updateStyle);
  } else {
    let list = document.body.classList;
    if (darkmode.enabled) {
      list.add('dark-mode')
    } else {
      list.remove('dark-mode');
    }
  }
}

window.darkmode = {
  detected: localStorage.getItem('dark-mode-detected'),
  toggle() {
    this.enabled = !this.enabled;
  },
  set(value) {
    this.enabled = value;
  }
}
Object.defineProperty(darkmode, 'enabled', {
  get() {
    return localStorage.getItem('dark-mode') == 'true';
  },
  set(value) {
    localStorage.setItem('dark-mode', value);
    updateStyle();
  }
})

if (!darkmode.detected) {
  let detector = document.createElement('span');
  let style = document.createElement('style');
  console.log('bruh');
  style.innerHTML = `
@media (prefers-color-scheme: light) {
  #detect-dark-mode {
    display: none;
  }
}
`;
  document.documentElement.appendChild(style);
  detector.id = 'detect-dark-mode';
  document.documentElement.appendChild(detector);
  requestAnimationFrame(function() {
    let prefers = getComputedStyle(detector).display == 'inline' ? 'dark' : 'light';
    localStorage.setItem('dark-mode-detected', prefers)
    darkmode.detected = prefers;
    darkmode.enabled = (prefers == 'dark');
    updateStyle();
  })
} else {
  updateStyle();
}
