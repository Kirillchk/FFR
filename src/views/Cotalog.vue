<script setup>
import { ref, onMounted, defineEmits} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
defineEmits(['CreateNew'])
const Data = ref([])
const TipoData = [
	{
		Smailik: "0_0",
		Duration: "00:00:01",
		Name: "Super project",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:02",
		Name: "projectsssss",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:03",
		Name: "project",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:04",
		Name: "project",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:05",
		Name: "project",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:06",
		Name: "project",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:06",
		Name: "project",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:06",
		Name: "project",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:06",
		Name: "project",
	},
	{
		Smailik: "0w0",
		Duration: "00:00:06",
		Name: "project",
	}
]
const DeleteProject = (ProjectName) => {
	console.log(ProjectName)
	const myHeaders = new Headers()
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem("JWT")}`);
	const requestOptions = {
		method: 'DELETE',
		headers: myHeaders,
		redirect: 'follow'
	};
	fetch(`http://26.234.86.94:8080/api/videos/DeleteVideo/${ProjectName}`, requestOptions)
		.then(response => response.text)
		.then(result => console.log(result))
		.then(GetVideos)
		.catch(error => console.log('error', error));
}
const GetVideos = () =>{
	const myHeaders = new Headers()
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem("JWT")}`);
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};
	fetch("http://26.234.86.94:8080/api/videos/GetAllVideoInfo", requestOptions)
		.then(response => response.json())
		.then(result => {
			Data.value = result.$values;
			console.log("DATA recived")
		})
		.catch(error => console.log('error', error));
}
const setCurrentVideo = (videoName) => {
  localStorage.setItem('CurrentVideo', videoName);
  router.push({ name: 'redactor' })
};
onMounted(GetVideos)
</script>
<!--
<template>
	<div class="video_grid">
		<div v-for="item in Data.value" :key="item.id" >
			<div class="logo_smail">
				{{ item.smalic }}
			</div>
			<div class="info">
				<div class="duration"> {{ item.duration }} </div>
				<div class="project_name"> {{ item.nameVideos}} </div>
			</div>
		</div>
	</div>
</template>
-->
<template>
  <div class="video_grid">
    <div v-for="(item, index) in Data" :key="index">
      <div class="logo_smail" @click="setCurrentVideo(item.nameVideo)">
        {{ item.smalic }}
      </div>
	  <div class="container">
		<div class="info">
			<div class="duration"> {{ item.duration.replace(/\.\d+$/, '') }} </div>
			<div class="project_name"> {{ item.nameVideo }} </div>
		</div>
		<div class="butn" @click="DeleteProject(item.nameVideo)">
			X
		</div>
	  </div>
    </div>
	<div>
	<div class="logo_smail" @click="$emit('CreateNew')">
		+
    </div>
	<div class="container">
		<div class="info">
			<div class="duration"> 00:00:00 </div>
			<div class="project_name"> Create new video </div>
		</div>
	</div>
	</div>
  </div>
</template>
<style lang="sass" scoped>
.video_grid
	display: grid
	grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr))
	gap: 10px
	margin: 0 20px
	margin-top: 100px
	> *
		justify-content: center
		text-align: center
	.logo_smail
		font-size: 6rem
		cursor: pointer
	.container
		display: flex
		justify-content: space-between
		align-items: center
		.info
			flex-grow: 1
			flex-shrink: 1
			overflow: hidden
			.duration
				overflow: hidden
				white-space: nowrap
				text-overflow: ellipsis 
				font-size: 3rem
				font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
			.project_name
				overflow: hidden
				white-space: nowrap
				text-overflow: ellipsis 
				font-size: 1.5rem
		.butn
			color: red
			cursor: pointer
</style>