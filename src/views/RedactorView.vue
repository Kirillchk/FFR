<script setup>
import VideoContainer from '@/components/VideoContainer.vue';
import { ref, onMounted } from 'vue';
import { API_BASE_URL } from "@/constants";

const Styleforweb = ref('display: none')
const videoSrc = ref('')
const SlowdownFactor = ref('')
const fileInput = ref(null)
const VideoContainerElement = ref(null)
const ShowSlowdownfactor = ref(true)

function GETVideo(){
	videoSrc.value = ''
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem("JWT")}`);
	const requestOptions = {
	   method: 'GET',
	   headers: myHeaders,
	   redirect: 'follow'
	};
	fetch(`${API_BASE_URL}api/videos/GetVideo/${localStorage.getItem('CurrentVideo')}`, requestOptions)
	   .then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		} return response.blob();
	   })
	   .then(blob => {
			videoSrc.value = URL.createObjectURL(blob);
		})
		.catch(error => console.error('Error:', error));
}
const Addclip = () => {
	console.log("addclip")
	fileInput.value.click()
}
const FileAdded = (event) => {
	console.log("File added")
	const file = event.target.files[0]
	if (!file) {
        alert('Please select a video file before uploading.');
        return;
    }
	const myHeaders = new Headers()
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem("JWT")}`);
	const formdata = new FormData()
	formdata.append('video', file, file.name);
	formdata.append("point", "true");
	const requestOptions = {
	   method: 'PUT',
	   headers: myHeaders,
	   body: formdata,
	   redirect: 'follow'
	};
    fetch(`${API_BASE_URL}api/videos/${localStorage.getItem('CurrentVideo')}/addClip`, requestOptions)
		.then(response => {
			console.log("debug")
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
	    })
		.then(GETVideo)
		.catch(error => console.log('error', error));
}
const UpdateSlowdownFactor = (event) => {
	const NewValue = event.target.value
	if (NewValue > 2){
		SlowdownFactor.value = 2;
	} else if (NewValue < 0.5) {
		SlowdownFactor.value = 0.5
	} else {
		SlowdownFactor.value = event.target.value
	}
}
const Change_temp = () => {
	ShowSlowdownfactor.value = false
}
const Cut = () => {
	console.log("Cut")
	VideoContainerElement.value.ToggleClipSelector()
}
const HandleSubmit = (min, max) => {
	console.log(min, max)
	const convert = (totalSeconds) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = Math.floor(totalSeconds % 60);

		const paddedHours = String(hours).padStart(2, '0');
		const paddedMinutes = String(minutes).padStart(2, '0');
		const paddedSeconds = String(seconds).padStart(2, '0');
		console.log(`${paddedHours}:${paddedMinutes}:${paddedSeconds}`)
		return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
	}
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem("JWT")}`);
	const formdata = new FormData();
	formdata.append("startTime", convert(min));
	formdata.append("endTime", convert(max));
	const requestOptions = {
	   method: 'PUT',
	   headers: myHeaders,
	   body: formdata,
	   redirect: 'follow'
	};
	fetch(`${API_BASE_URL}api/videos/${localStorage.getItem('CurrentVideo')}/trim`, requestOptions)
	.then(response => {
		console.log("debug")
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
	})
	.then(GETVideo)
	.catch(error => console.log('error', error));
}
const Rewind = () => {
	console.log("Rewind")
	/* */
	const myHeaders = new Headers()
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem("JWT")}`);
	const formdata = new FormData()
	formdata.append("reverse", "true")
	const requestOptions = {
	   method: 'PUT',
	   headers: myHeaders,
	   body: formdata,
	   redirect: 'follow'
	};
	fetch(`${API_BASE_URL}api/videos/${localStorage.getItem('CurrentVideo')}/revers`, requestOptions)
		.then(response => {
			console.log("debug")
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
	    })
		.then(GETVideo)
		.catch(error => console.log('error', error));
	/* */
}
const Download = () => {
	console.log("Download")
	const a = document.createElement('a');
    a.href = videoSrc.value;
    a.download = 'recording.mp4';
    a.click();
}
const SubmitTempChange = () => {
	ShowSlowdownfactor.value = true
	/* */
	const myHeaders = new Headers()
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem("JWT")}`);
	const formdata = new FormData()
	formdata.append("slowdownFactor", SlowdownFactor.value.replace(/\./g, ','));
	const requestOptions = {
	   method: 'PUT',
	   headers: myHeaders,
	   body: formdata,
	   redirect: 'follow'
	};
	fetch(`${API_BASE_URL}api/videos/${localStorage.getItem('CurrentVideo')}/adjust`, requestOptions)
		.then(response => {
			console.log("debug")
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
	    })
		.then(GETVideo)
		.catch(error => console.log('error', error));
	/* */
}

const WebcamVid = ref(null);
let mediaRecorder;
let recordedChunks = [];
const isRecording = ref(false);
const downloadLink = ref(null);
const mediaDevices = navigator.mediaDevices;

const openWebcam = () => {
    return new Promise((resolve, reject) => {
        mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                const hasVideo = stream.getVideoTracks().length > 0;
                if (!hasVideo) {
                    alert("Webcam access is required for this feature.");
                    reject(new Error("No video tracks available."));
                    return;
                }
                if (WebcamVid.value) {
                    WebcamVid.value.srcObject = stream;
                    WebcamVid.value.play();

                    // Initialize MediaRecorder for the stream.
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            recordedChunks.push(event.data);
                        }
                    };
                    mediaRecorder.onstop = () => {
                        const blob = new Blob(recordedChunks, { type: 'video/webm' });
                        recordedChunks = [];
                        downloadLink.value = URL.createObjectURL(blob);
                    };

                    resolve(); // Resolve once everything is ready.
                } else {
                    reject(new Error("Webcam element not initialized."));
                }
            })
            .catch((error) => {
                alert("Error accessing the camera: " + error);
                reject(error);
            });
    });
};
const startRecord = async () => {
    await openWebcam(); // Ensure webcam stream is ready.
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
        recordedChunks = [];
        mediaRecorder.start();
        isRecording.value = true; // Update the reactive state.
		Styleforweb.value = 'display: block;'
    }
};
const stopRecord = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        isRecording.value = false; // Update the reactive state.
		Styleforweb.value = 'display: none;'
    }

    setTimeout(() => {
        const a = document.createElement('a');
        a.href = downloadLink.value;
        a.download = 'recording.webm';
        a.click();
    }, 100);
};
onMounted(() => {
	GETVideo()
    WebcamVid.value.muted = true; 
})
</script>
<template>
	<div class="container">
		<aside class="actions">
			<img src="/tools svgs/add clip.svg" alt="Addclip" @click="Addclip">
			<input type="file" ref="fileInput" accept="video/mp4, video/webm" style="display: none;" @change="FileAdded">
			<ul>
				<li>
					<img v-if="ShowSlowdownfactor" src="/tools svgs/temp.svg" alt="Change_temp" @click="Change_temp">
					<img v-else src="/tools svgs/temp.svg" alt="Change_temp" @click="SubmitTempChange" style="filter: hue-rotate(90deg) brightness(0.5);">
					<input v-if="!ShowSlowdownfactor" type="number" min="0.5" max="2" step="0.05" value="1" @change="UpdateSlowdownFactor">
				</li>
				<li>
					<img v-if="!isRecording" src="/tools svgs/record.svg" alt="Record" @click="startRecord">
					<img v-else src="/tools svgs/record.svg" alt="Record" style="filter: hue-rotate(90deg) brightness(0.5);" @click="stopRecord">
				</li>
				<li>
					<img src="/tools svgs/cut.svg" alt="Cut" @click="Cut">
				</li>
				<li>
					<img src="/tools svgs/rewind.svg" alt="Rewind" @click="Rewind">
				</li>
				<li>
					<img src="/tools svgs/download.svg" alt="Download" @click="Download">
				</li>
			</ul>
		</aside>
		<main>
			<VideoContainer ref="VideoContainerElement" :VideoSrcProp="videoSrc" @Submit_Range="HandleSubmit"/>
	        <div>
	            <video class="WebcamVid" ref="WebcamVid" :style="Styleforweb"></video>
	        </div>
		</main>
	</div>
</template>
<style lang="sass" scoped>
@import "../src/assets/main.sass"
.WebcamVid
	position: absolute
	top: 10vh
	width: 80vw
	max-height: 80vh
img
	display: block
	cursor: pointer
	height: 10vh
.container
	display: flex
	flex: 1
	height: 100vh
.actions
	background-color: $dark2
	flex: 1 
	display: flex
	flex-direction: column
	margin-top: 80px
	border: solid black 1px
	ul
		margin: auto
		list-style: none
		padding: 0
		li
			padding: 2vh 0
			display: flex
			justify-content: center
			overflow: hidden
			img
				height: 4vh
			input
				height: 4vh
				width: 3rem
				left: 7vw
				position: absolute
				background: $dark2
				border: $cyan solid 3px
main
	padding-top: 90px
	flex: 15
	background-color: $dark2
	> *
		justify-content: center
		margin: auto
.clips
	background-color: $dark2
	flex: 4 
	.button_container
		display: block
		margin-top: 90px
		width: 100%
		label
			cursor: pointer
			text-align: center
			border: solid $text-color 2px
			border-radius: 5px
			padding: 5px 0
			margin: 0 20px
			&:hover
				background-color: $text-color
				color: $dark1
	ul
		margin-top: 12px
		list-style: none
		padding: 0
		text-align: center
		li
			border-top: 1px solid $text-color
			border-bottom: 1px solid $text-color
			
</style>
