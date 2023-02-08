function isAllowed(file) {
	const allowedFiles = ['image/png', 'image/jpeg'];
	
	return file && allowedFiles.includes(file.type); 
}

function getFile() {
	const input = document.getElementById('upload-thing');
	const file = input.files[0];

	return file;
}

function getResolution() {
	const width = document.getElementById('width').value == '' ? 1920 : parseInt(document.getElementById('width').value);
	const height = document.getElementById('height').value == '' ? 1080 : parseInt(document.getElementById('height').value);

	return { width: width, height: height };
}

function getImageData(image) {
	const reader = new FileReader();
	const newImage = new Image();

	reader.onload = function(event) {
		newImage.src = event.target.result;
	}

	reader.readAsDataURL(image);
	
	return newImage;
}

function downloadFile(file) {
	const link = document.createElement('a');
	link.download = `resized-image-${getFile().name}`;
	link.href = file.toDataURL();
	link.click();
}

function resizeImageButton() {
	const image = document.getElementById('current-image');
	console.log('executed!');

	if (image) {
		const newImageResolution = getResolution();
		const canvasThing = document.createElement('canvas');
		const ctx = canvasThing.getContext('2d');
		
		canvasThing.width = newImageResolution.width;
		canvasThing.height = newImageResolution.height;

		console.log(typeof(image), image.nodeName);
		
		ctx.drawImage(image, 0, 0, newImageResolution.width, newImageResolution.height);
	
		const imageData = ctx.getImageData(0, 0, newImageResolution.width, newImageResolution.height);

		downloadFile(canvasThing);
	}
}

function displayImage(image) {
	const imageContainer = document.getElementById('image-container');
	const imageElement = document.createElement('img');
	
	imageElement.height = 200;
	imageElement.width = 400;
	imageElement.src = URL.createObjectURL(image);
	imageElement.id = 'current-image';

	imageContainer.innerHTML = '';
	imageContainer.appendChild(imageElement);
}

function imageUploaded() {
	const image = getFile();
	
	if (isAllowed(image)) {
		displayImage(image);
	} else {
		console.log(`[ERROR] File type "${image ? image.type : "NONE"}" is not a png/jpeg!`);
	}
}

