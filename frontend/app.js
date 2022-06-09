// Read config.conf
async function main(){
	var config = await getFile('../config.json');

	document.getElementById("page_title").innerHTML = config.pageTitle || "MP3 Viewer";
	document.getElementById("title").innerHTML = config.title || "";
	document.getElementById("description").innerHTML = config.description || "";

	if(config.audios != null){
		console.log("AUDIOS")
		const audioWrapper = document.getElementById("audioWrapper")


		Object.entries(config.audios).forEach(([key, audio]) => {
			let fileType = audio.url.split('.')[audio.url.split('.').length - 1]
			let fileName = audio.url.split("/")[audio.url.split("/").length - 1]
			console.log(fileType)
			switch(fileType){
				case 'mp3':
					audio.type = 'audio/mpeg';
					break;
				case 'wav':
					audio.type = 'audio/wav';
					break;
				case 'ogg':
					audio.type = 'audio/ogg';
					break;
				case 'flac':
					audio.type = 'audio/flac';
					break;
				default:
					audio.type = 'audio/mpeg';
					break;
			}
			let audioElement = document.createElement("p");
			audioElement.classList.add("audio_element");
			audioElement.innerHTML = `
			<h4 class="audio-title">${audio.title}</h4>
			<audio controls>
				<source src="${audio.url}" type="${audio.type}">
			Your browser does not support the audio element.
			</audio> <br>
			<a class="audio-path" href="${audio.url}">${fileName}</a>
			`
			audioWrapper.appendChild(audioElement);
		})
	}

}
function getFile(path){
	return fetch(path)
	.then(response => response.json());
}
main()