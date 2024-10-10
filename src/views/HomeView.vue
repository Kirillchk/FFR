<template>
	<main>
		<aside class="container">
			<div class="container_1">
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="200" viewBox="0 0 48 48">
					<path fill="#388e3c" d="M39.5,42h-9c-1,0-1.9-0.6-2.3-1.5c-0.4-0.9-0.2-2,0.5-2.7l8.3-8.3v-3.9L21.3,41.3 c-0.5,0.5-1.1,0.7-1.8,0.7h-11c-1,0-1.9-0.6-2.3-1.5c-0.4-0.9-0.2-2,0.5-2.7L33.5,11h-3.9L10.3,30.3c-0.7,0.7-1.8,0.9-2.7,0.5 C6.6,30.4,6,29.5,6,28.5v-11c0-0.7,0.3-1.3,0.7-1.8l4.7-4.7h-3C7.1,11,6,9.9,6,8.5S7.1,6,8.5,6h9c1,0,1.9,0.6,2.3,1.5 c0.4,0.9,0.2,2-0.5,2.7L11,18.5v3.9L26.7,6.7C27.2,6.3,27.8,6,28.5,6h11c1,0,1.9,0.6,2.3,1.5c0.4,0.9,0.2,2-0.5,2.7L14.5,37h3.9 l19.3-19.3c0.7-0.7,1.8-0.9,2.7-0.5c0.9,0.4,1.5,1.3,1.5,2.3v11c0,0.7-0.3,1.3-0.7,1.8L36.5,37h3c1.4,0,2.5,1.1,2.5,2.5 S40.9,42,39.5,42z"></path>
				</svg>
				<article>
					This web application made using FFmpeg <br>
					as one of it's dependancies.<br>
					You'll have to download and choose FFmpeg.exe <br>
					link: <a href="https://www.ffmpeg.org/download.html" style="color:darkslateblue;">Download</a>
				</article>
			</div>
		</aside>
		<section class="container">
			<div>
				<article>
					After downloading file from official site <br>
					chose your FFmpeg.exe file using button bellow.<br>
					<label for="choseexe" class="choseexe">Select path</label>
					<input
					type="file"
					accept=".exe"
					id="choseexe"
					style="display: none;"
					@change="FFmpegChoise"
					/>
				</article>
			</div>
		</section>
	</main>
</template>
<style scoped lang="sass">
@import "../../src/assets/vars.sass"
main
	display: flex
	justify-content: space-around
	margin-top: 20%
aside
	border-right: solid $dark2 2px 
.container
	width: 100%
	display: flex
	> *
		display: flex
		flex-direction: column
		margin: auto
		color: $text-color
		article
			font-size: 1.3rem
	.container_1
		> *
			margin: auto
	.choseexe
		display: contents
		color: darkslateblue
</style>
<script>
import { ref } from 'vue';
import { GetFFmpegStore } from '@/stores/FFmpegStore';
export default{
	setup(){
		const FFmpegStore = GetFFmpegStore()
		function FFmpegChoise(event){
			const name = event.target.files[0].name
			if (name === 'ffmpeg.exe'){
				console.log('correct')

				FFmpegStore.FFmpegPath = `${event.target.files[0].path}`
			}
			else{
				console.log('incorrect')
			}
			console.log(event.target)
		}
		return{
			FFmpegChoise
		}
	}
}
</script>