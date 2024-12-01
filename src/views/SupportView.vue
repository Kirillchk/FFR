<template>
	<div class="text">
		<div>
			<div>Поддержите нас!</div>
			<div>Помогите нам создать магию с помощью ваших пожертвований!</div>
			<div>пожертвовать</div>
		</div>
	</div>
	<div class="cont">
		<img src="/support_backgroud.svg">
	</div>
</template>
<style lang="sass" scoped>
@import "../src/assets/main.sass"
.text
	margin: auto
	margin-top: 200px
	position: absolute
	width: 100%
	> *
		text-align: center
		:nth-child(1)
			font-size: 4rem
		:nth-child(2)
			margin: 40px auto
			font-size: 2rem
		:nth-child(3)
			cursor: pointer
			width: 400px
			margin: auto
			font-size: 3rem
			border: $cyan solid
			color: $cyan
			border-radius: 200px
			&:hover
				color: white
				background-color: $cyan
.cont
	display: flex
	justify-content: center 
	align-items: center
	overflow: hidden
	justify-content: center
	img
		height: 100vh
		display: block
		margin: auto
		margin-top: 7vh
</style>