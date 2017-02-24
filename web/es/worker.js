// TODO : cache fetches

// self.addEventListener('message', async (e) => {
//   const { cmd, msg } = e.data;
//
//   self.postMessage(JSON.stringify({ cmd, msg }, 2, 2));
// }, false);

// self.addEventListener('fetch', async (e) => {
//   // const { cmd, msg } = e.data;
//   self.postMessage(`I AM FETCH${e.data}`);
//   // self.postMessage('I AM FETCH' + JSON.stringify({ cmd, msg }, 2, 2));
// }, false);
// onmessage = function (event) {
//   const data = event.data;
//   postMessage(`I AM message ${JSON.stringify(event, 2, 2)}`);
// };