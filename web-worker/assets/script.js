self.onmessage = function(e) {
    self.postMessage('msg from worker');
    console.log( "ready!" );
};