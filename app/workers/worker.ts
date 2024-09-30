self.onmessage = (event) => {
  console.log("received data , ", event.data);

  self.postMessage("hello from worker");
};
