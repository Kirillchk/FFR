<script setup>
const Addclip = () => {
	console.log("addclip")
}
const Change_temp = () => {
	console.log("temp")
}
const Add_text = () => {
	console.log("Add_text")
}
const Record = () => {
	console.log("Record")
}
const Cut = () => {
	console.log("Cut")
}
const Add_sticker = () => {
	console.log("Add_sticker")
}
const Rewind = () => {
	console.log("Rewind")
}
const Download = () => {
	console.log("Download")
}
</script>
<template>
	<div class="container">
		<aside class="actions">
			<img src="/tools svgs/add clip.svg" alt="Addclip" @click="Addclip">
			<ul>
				<li>
					<img src="/tools svgs/temp.svg" alt="Change_temp" @click="Change_temp">
				</li>
				<li>
					<img src="/tools svgs/text.svg" alt="Add_text" @click="Add_text">
				</li>
				<li>
					<img src="/tools svgs/record.svg" alt="Record" @click="Record">
				</li>
				<li>
					<img src="/tools svgs/cut.svg" alt="Cut" @click="Cut">
				</li>
				<li>
					<img src="/tools svgs/stickers.svg" alt="Add_sticker" @click="Add_sticker">
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
			<video src="../../public/Download.mp4" style=" height:90vh; width: 100%;" controls></video>
		</main>
	</div>
</template>
<style lang="sass" scoped>
@import "../src/assets/main.sass"
img
	display: block
	cursor: pointer
	height: 10vh
.container
	display: flex
	flex: 1
	height: 100%
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
main
	flex: 15
	background-color: $dark2

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
