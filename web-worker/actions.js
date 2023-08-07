(() => {
	self.addEventListener('message', evt => {
		if (evt.data.action === 'actions') {
			evt.data.value.forEach(action => {
				importScripts(action);
			});
		} else {
			self.postMessage({
				value: self[evt.data.action](evt.data.value),
				action: evt.data.action,
			});
		}
	});
})();
