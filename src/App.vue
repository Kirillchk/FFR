<script setup>
import { RouterLink, RouterView } from 'vue-router'
import router from './router';
</script>

<template>
  <header>
    <nav>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="" style="height: 40px;">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/Redactor">Redactor</router-link></li>
        <li><router-link to="/Support">Support</router-link></li>
      </ul>
    </nav>
  </header>
  <router-view />
</template>

<style scoped lang="sass">
@import "../src/assets/vars.sass"
header
  background-color: $dark2
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
</style>
