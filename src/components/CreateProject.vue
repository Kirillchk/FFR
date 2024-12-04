<script setup>
import { ref } from 'vue';

const ProjectName = ref('');
const emoji = ref('');

function Submit() {
	console.log(`NAME${ProjectName.value}, EMO${emoji.value}`);
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