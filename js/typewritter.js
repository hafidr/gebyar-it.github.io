function typewritter(parent, paragraphs, callback) {
	const child = document.createElement("div");
	parent.append(child);

	const queue = [];

	const addToQueue = (cb) => queue.push(() => new Promise(cb));

	const writeText = (text, typingSpeed) => {
		return addToQueue((resolve) => {
			let i = 0;
			const interval = setInterval(() => {
				child.append(text[i]);
				i++;

				if (i >= text.length) {
					clearInterval(interval);
					resolve();
				}
			}, typingSpeed);
		});
	};

	const deleteText = (numOfChar, deleteSpeed) => {
		return addToQueue((resolve) => {
			let i = 0;
			const interval = setInterval(() => {
				child.textContent = child.textContent.substring(0, child.textContent.length - 1);
				i++;

				if (i >= numOfChar) {
					clearInterval(interval);
					resolve();
				}
			}, deleteSpeed);
		});
	};

	const pauseTyping = (timeout) => addToQueue((resolve) => setTimeout(resolve, timeout));

	const startTyping = async () => {
		for (const cb of queue) {
			await cb();
		}

		if (typeof callback == "function") callback();
	};

	for (const paragraph of paragraphs) {
		switch (paragraph.ACTION) {
			case "WRITE":
				writeText(paragraph.PAYLOAD, paragraph.SPEED);
				break;
			case "DELETE":
				deleteText(paragraph.PAYLOAD, paragraph.SPEED);
				break;
			case "PAUSE":
				pauseTyping(paragraph.PAYLOAD);
				break;
		}
	}

	startTyping();
}
