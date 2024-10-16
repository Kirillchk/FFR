<!-- App.vue -->
<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import SignUpFormComponent from './components/SignUpFormComponent.vue';
import { GetFFmpegStore } from '@/stores/FFmpegStore';

function ToggleForm(){
	showSignUp.value = !showSignUp.value
}
function ToggleLogedIn(){
	GetFFmpegStore.value = !GetFFmpegStore
}
const showSignUp = ref(false);
</script>

<template>
  <header>
    <nav>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="" style="height: 40px;">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/Redactor">Redactor</router-link></li>
        <li><router-link to="/Support">Support</router-link></li>
        <li class="Login_button" @click="ToggleForm">Login</li>
      </ul>
    </nav>
  </header>
  <router-view />
  <sign-up-form-component v-if="showSignUp" class="signup" @close="ToggleForm" @login="ToggleLogedIn"/>
</template>

<style scoped lang="sass">
@import "../src/assets/main.sass"
header
	background-color: $dark2
	position: fixed
	z-index: 5
	width: 100%
	top: 0
nav
	display: flex
	justify-content: space-between
	padding: 20px
img
	display: block
ul 
	display: flex
	li
		list-style: none
		padding: 10px
		&.Login_button
			border-radius: 25%
			border: solid 2px $text-color
			background-color:$text-color
			color: $dark2
			&:hover
				border: solid 2px $text-color
				background-color: $dark2
				color: $text-color
.signup
	z-index: 10
	position: absolute
	margin: auto
</style>
