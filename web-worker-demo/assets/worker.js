self.onmessage = function(event) {
  const scriptUrls = event.data;

  // Load and execute each script
  scriptUrls.forEach(function(url) {
    importScript(url);
  });
};

function importScript(url) {
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}
