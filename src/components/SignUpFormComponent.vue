<script setup>
import { ref } from 'vue';
import { API_BASE_URL } from "@/constants";
const username = ref('');
const password = ref('');

const changedusername = (event) => {
	username.value = event.target.value;
	console.log(username.value);
};

const changedpassword = (event) => {
	password.value = event.target.value;
	console.log(password.value);
};

const Submit = (event) => {
	event.preventDefault();
	console.log("Submitting");
};

const LogIn = async () => {
	localStorage.setItem("JWT", await getcookie(username.value,password.value))
};

async function getcookie(name, password) {
	let ret;
	const formdata = new FormData();
	formdata.append("username", name);
	formdata.append("password", password);
	const requestOptions = {
		method: "POST",
		body: formdata,
		redirect: "follow"
	};

	try {
		const response = await fetch(`${API_BASE_URL}api/user/login`, requestOptions);
		ret = await response.text();
		console.log(ret);
	} catch (error) {
		console.error(error);
	}
	return ret;
}

const SignUp = () => {
	console.log("Signing up");
	console.log(username.value);
	console.log(password.value);
	console.log(`cookie is ${localStorage.getItem("JWT")}`)
/********************* */
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("JWT")}`);

const formdata = new FormData();
formdata.append("Name", "lol");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow",
  credentials: "include"  // Это важно, чтобы браузер отправлял и получал куки
};

fetch(`${API_BASE_URL}api/videos/check/login`, requestOptions)
	.then((response) => response.text())
	.then((result) => console.log(result))
	.catch((error) => console.error(error));
/**************** */
};
</script>
<template>
	<div class="popup">
		<div class="content">
			<div class="top">
				<div style="margin-left: auto; margin-right: 7px; display: inline-block; cursor: pointer;" @click="$emit('close')">
					X
				</div>
			</div>
			<h2>Acount form</h2>
			<form @submit="Submit">
				<div class="field">
					<label for="username">username: </label>
					<input @change="changedusername" type="text" id="username" v-model="username" required/>
				</div>
				<div class="field">
					<label for="password" >password: </label>
					<input @change="changedpassword" type="text" id="password" v-model="password" required/>
				</div>
				<div class="submit">
					<label for="submit" @click="LogIn">Log in</label>
					<button id="submit" style="display: none;"></button>
					<label for="submit" @click="SignUp">Signup</label>
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