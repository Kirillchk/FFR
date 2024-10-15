<template>
	<div class="container">
		<aside class="actions">
			<ul>
				<li>scisors</li>
				<li>scisors</li>
				<li>scisors</li>
				<li>scisors</li>
				<li>scisors</li>
			</ul>
		</aside>
		<main>ы</main>
		<aside class="clips">
			<div class="button_container">
				<label for="addclip"> asdjasdasd</label>
				<button id="addclip" style="display: none;"></button>
			</div>
		</aside>
	</div>
</template>
<script>
import { GetFFmpegStore } from '@/stores/FFmpegStore';
export default{
  setup(){
    const FFmpegStore = GetFFmpegStore()
    return{
      FFmpegStore
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../src/assets/main.sass"
.container
	display: flex
	position: absolute
	top: 11vh
	left: 0
	right: 0
	bottom: 0
	.actions
		flex:1
		background-color: $dark2
		display: flex
		ul
			margin: auto
			list-style: none
			padding: 0
			li
				marker: none
				padding: 20px 0
				border-bottom: solid $text-color 1px
				border-top: solid $text-color 1px
	main
		flex: 10
	.clips
		display: flex	
		flex:3
		background-color: $dark2
		.button_container
			display: block
			height: 15%
			margin: auto
</style>