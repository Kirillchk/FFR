<template>
	<main>
		<h1>Видеоредактор</h1>
		<img src="/Logo.svg">
		<div>
			<router-link to="/Redactor">Создать проект</router-link>
		</div>
		<img class="curly_arrow" src="/curly_arrow.svg">
	</main>
</template>
<style scoped lang="sass">
@import "../../src/assets/vars.sass"
.curly_arrow
	height: 300px
	position: relative
	right: 290px
	bottom: 200px
	overflow: hidden
main
	position: absolute
	width: 100%
	margin-top: 30vh
	justify-content: center
	overflow: hidden
	> *
		margin: auto
		display: block
		text-align: center
	h1
		font-size: 5.5rem
	img
		height: 180px
	a
		font-size: 2.2rem
		background-color: $cyan
		border-radius: 20px
		padding: 12px 25px
		color: $text-color
		text-shadow: 1px 4px 6px black
</style>
<script>
</script>