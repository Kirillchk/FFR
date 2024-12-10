<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
const emit = defineEmits(['close'])
const router = useRouter();

const ProjectName = ref('');
const emoji = ref('');

function Submit() {
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
	formdata.append('namevideo', ProjectName.value)
	const requestOptions = {
		method: 'POST',
	   headers: myHeaders,
	   body: formdata,
	   redirect: 'follow'
	};
    fetch("http://26.234.86.94:8080/api/videos/save", requestOptions)
		.then(response => {
			console.log("debug")
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			localStorage.setItem('CurrentVideo', ProjectName.value);
			router.push({ name: 'redactor' })
			emit('close');
	    })
		.catch(error => console.log('error', error));
}
</script>
<template>
	<div class="popup">
		<div class="content">
			<div class="top">
				<div style="margin-left: auto; margin-right: 7px; display: inline-block; cursor: pointer;" @click="$emit('close')">
					X
				</div>
			</div>
			<h2>Project Form</h2>
			<form @submit.prevent="Submit">
				<div class="field">
					<label for="project_name">Project name</label>
					<input type="text" id="project_name" v-model="ProjectName" required/>
				</div>
				<div class="field">
					<label for="emoji-select">Emoji</label>
					<select id="emoji-select" v-model="emoji">
						<option v-for="val in 
						['😂', '❤️', '🤣', '😍', '😭', '😊', '🙏', '🥰', '😘', '😅', '👍', '💕', '🔥', '😢', '🎉', '😁', '🤔', '🥳', '😎', '🙌', '✨', '🤗', '😡', '🤩', '💔']"
						:value="val">{{ val }}</option>
					</select>
				</div>
				<div class="field">
					<label for="Video_file">Video</label>
					<input id="Video_file" style="display: none;" type="file" accept="video/mp4" @change="FileAdded">
					<label for="Video_file">Chose</label>
				</div>
				<div class="submit">
					<label for="submit">Create new project</label>
					<button id="submit" style="display: none;"></button>
				</div>
			</form>
		</div>
	</div>
</template>
<style lang="sass" scoped>
@import "../src/assets/main.sass"
.popup 
	top: 0
	left: 0
	width: 100%
	height: 100%
	background-color: rgba(0, 0, 0, 0.5) 
	display: flex
	justify-content: center
	align-items: center
	.content
		display: flex
		flex-direction: column
		align-items: center
		width: 480px
		height: 280px
		background-color: $dark1
		.top
			width: 100%
			height: 20px
			background-color: $dark2
			display: flex
		h2
			padding: 40px 0
		form
			flex-direction: column
			.field
				display: flex
				padding: 5px 0
				label
					display: block
					width: 80px
				input
					width: 200px
					background-color: $dark1
			.submit
				display: flex
				justify-content: space-evenly 
				margin-top: 20px
				label
					cursor: pointer
</style>