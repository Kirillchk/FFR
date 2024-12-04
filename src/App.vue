<!-- App.vue -->
<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import SignUpFormComponent from './components/SignUpFormComponent.vue';
import CreateProject from './components/CreateProject.vue';
function ToggleForm(){
	showSignUp.value = !showSignUp.value
}
const showSignUp = ref(false);
const showNewproject = ref(false)
</script>

<template>
  <header>
    <nav>
      <img src="/FFRlogo.svg" alt="" style="height: auto;">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/Redactor">Redactor</router-link></li>
        <li><router-link to="/Support">Support</router-link></li>
        <li><router-link to="/Cotalog">Cotalog</router-link></li>
        <li class="Login_button" @click="ToggleForm">Login</li>
      </ul>
    </nav>
  </header>
  <router-view @CreateNew="showNewproject = !showNewproject"/>
  <sign-up-form-component v-if="showSignUp" class="signup" @close="ToggleForm"/>
  <create-project v-if="showNewproject" class="signup" @close="showNewproject = !showNewproject"/>
</template>

<style scoped lang="sass">
@import "../src/assets/main.sass"
header
	background-color: $dark1
	position: fixed
	z-index: 5
	width: 100%
	top: 0
nav
	display: flex
	justify-content: space-between
	border-bottom: solid $white-trans 1px
	> *
		padding: 20px
		height: 100%
		padding: auto
	img
		border-right: solid $white-trans 1px
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
