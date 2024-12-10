<script setup>
import { ref, onMounted } from 'vue';

const WebcamVid = ref(null);
let mediaRecorder;
let recordedChunks = [];
const isRecording = ref(false);
const downloadLink = ref(null);
const mediaDevices = navigator.mediaDevices;

const openWebcam = () => {
    mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
			const hasVideo = stream.getVideoTracks().length > 0;
            const hasAudio = stream.getAudioTracks().length > 0;
            if (!hasVideo) {
                alert("Webcam access is required for this feature.");
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
            }
        })
        .catch((error) => {
            alert("Error accessing the camera: " + error);
        });
};

const startRecording = () => {
	if (!mediaRecorder) { openWebcam() }
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
        recordedChunks = [];
        mediaRecorder.start();
        isRecording.value = true;
    }
};

const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        isRecording.value = false;
    }
};

const downloadRecording = () => {
    const a = document.createElement('a');
    a.href = downloadLink.value;
    a.download = 'recording.webm';
    a.click();
};

// Wait for the DOM to mount before interacting with WebcamVid.
onMounted(() => {
    WebcamVid.value.muted = true; // Ensure the video is muted by default.
});
</script>

<template>
    <div>
        <div>
            <video ref="WebcamVid" style="width: 100%; max-height: 400px;"></video>
        </div>
        <button @click="openWebcam">Open Webcam</button>
        <button v-if="!isRecording" @click="startRecording" >Start Recording</button>
        <button v-else @click="stopRecording">Stop Recording</button>
        <button @click="downloadRecording" :disabled="!downloadLink">Download</button>
    </div>
</template>
