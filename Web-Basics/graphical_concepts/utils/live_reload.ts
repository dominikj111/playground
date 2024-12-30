// Live reload client implementation
export function injectLiveReload() {
  const script = document.createElement("script");
  script.textContent = `
    let socket;
    function connect() {
      socket = new WebSocket('ws://localhost:8001');
      
      socket.onopen = () => {
        console.log('Live reload connected');
      };
      
      socket.onmessage = (event) => {
        if (event.data === 'reload') {
          console.log('Reloading page...');
          window.location.reload();
        }
      };
      
      socket.onclose = () => {
        console.log('Live reload disconnected. Attempting to reconnect...');
        setTimeout(connect, 1000);
      };
    }
    connect();
  `;
  document.head.appendChild(script);
}
