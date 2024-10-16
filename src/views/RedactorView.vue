<template>
	<div class="container">
		<aside class="actions">
			<ul>
				<li>scissors</li>
				<li>scissors</li>
				<li>scissors</li>
				<li>scissors</li>
				<li>scissors</li>
			</ul>
		</aside>
		<main>ы</main>
		<aside class="clips">
			<div class="button_container">
				<label style="display: block;" for="addclip">Add clip</label>
				<input type="file" accept=".mp4" id="addclip" style="display: none;" @change="AddClip"></input>
			</div>
			<ul>
				<li v-for="clip in objects">
					{{clip}}
				</li>
			</ul>
		</aside>
	</div>
</template>
<script>
import { GetFFmpegStore } from '@/stores/FFmpegStore';
import { ref } from 'vue';
export default{
  setup(){
    const FFmpegStore = GetFFmpegStore()
	const objects = ref([])
	const AddClip = (event) => {
		console.log('sd')
		objects.value.push(event.target.files[0].name)
	}
    return{
      FFmpegStore,
	  objects,
	  AddClip,
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../src/assets/main.sass"

.container
	display: flex
	flex: 1
	height: 100vh 

.actions
	background-color: $dark2
	flex: 1 
	display: flex
	ul
		margin: auto
		list-style: none
		padding: 0
		li
			padding: 20px 0
			border-bottom: solid $text-color 1px
			border-top: solid $text-color 1px

main
	flex: 15
	background-color: $text-color 

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
