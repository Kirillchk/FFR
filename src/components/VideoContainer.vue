<script setup>
import { ref, computed, defineProps, defineExpose, defineEmits } from 'vue';
const props = defineProps({
	VideoSrcProp: String
})

defineEmits(['Submit_Range']);

const videoElement = ref(null)
const PlayerBarElement = ref(null)
const IsPlaying = ref(false)
const IsVisible = ref(false)
const VideoTime = ref(0)

const MinElement = ref(null)
const MaxElement = ref(null)
const MinValue = ref(0)
const MaxValue = ref(1)

const ComputedTime = computed(() => {
	return `${Math.floor(VideoTime.value/60)}:${Math.floor(VideoTime.value)%60}`
})
const ComputedMin = computed(() => {
	return duration.value * MinValue.value 
})
const ComputedMax = computed(() => {
	return duration.value * MaxValue.value 
})

const duration = ref(0)
const videoWidth = ref(0)
const barWidth = ref(0)

const initializeVideoData = () => {
	duration.value = videoElement.value.duration
	videoWidth.value = videoElement.value.videoWidth
	barWidth.value = videoWidth.value
}
const OnPlay = () => {
	if(!IsPlaying.value){
		videoElement.value.play()
	} else {
		videoElement.value.pause()
	}
	IsPlaying.value = !IsPlaying.value
}
const OnTimeUpdate = () => {
	const Time = videoElement.value.currentTime
	VideoTime.value = Time
	PlayerBarElement.value.value = Time / duration.value
}
const OnVideoScroll = (event) =>{
	const VideoTime = event.target.value
	videoElement.value.currentTime = VideoTime*duration.value
}
const OnMinUpdated = (event) => {
	const Mininp = event.target.value
	if (Mininp >= MaxValue.value ) {
		MinElement.value.value = MaxValue.value
		MinValue.value = MaxValue.value
	} else {
		MinValue.value = event.target.value
	}
	videoElement.value.currentTime = ComputedMin.value
}
const OnMaxUpdated = (event) => {
	const Maxinp = event.target.value
	if (Maxinp <= MinValue.value ) {
		MaxElement.value.value = MinValue.value
		MaxValue.value = MinValue.value
	} else {
		MaxValue.value = event.target.value
	}
	videoElement.value.currentTime = ComputedMax.value
}
const ToggleClipSelector = () => {
	IsVisible.value = !IsVisible.value
	MinValue.value = 0
	MaxValue.value = 1
}
defineExpose({
  ToggleClipSelector,
});
</script>
<template>
<div class="wraper">
	<video ref="videoElement" v-if="VideoSrcProp" @timeupdate="OnTimeUpdate" @loadedmetadata="initializeVideoData" style="width: 80vw; max-height: 80vh;">  
		<source :src="VideoSrcProp" type="video/mp4"/>
		Your browser does not support the video tag.
	</video>
	<div class="custom_player" style="width: 80vw;">
		<div class="play" @click="OnPlay">
			<div v-if="IsPlaying">║</div>
			<div v-else>▶</div>
		</div>
		<input
		ref="PlayerBarElement"
		type="range"
		min="0"
		max="1"
		step="0.01"
		value="0"
		style="width:inherit" 
		@input="OnVideoScroll"/>
		<div class="time">
			{{ ComputedTime }}
		</div>
	</div>
	<div v-if="IsVisible" class="clip_selector" style="width: 80vw;">
		<div style="display: flex; width: inherit;">
			<input
			ref="MaxElement"
			type="range"
			min="0"
			max="1"
			step="0.01"
			value="1"
			style="width:inherit" 
			@input="OnMaxUpdated"/>
		</div>
		<div style="display: flex; width: inherit;">
			<input
			ref="MinElement"
			type="range"
			min="0"
			max="1"
			step="0.01"
			value="0"
			style="width:inherit" 
			@input="OnMinUpdated"/>
		</div>
		<div class="button" @click="$emit('Submit_Range', ComputedMin, ComputedMax)">
			Submit clip
		</div>
	</div>
</div>
</template>
<style lang="sass" scoped>
@import "../src/assets/main.sass"
	
video
	display: block
	margin: auto
.custom_player
	margin: auto
	display: flex
	.play
		cursor: pointer
		width: 20px
		height: 20px
		> *
			text-align: center
			color: $cyan
	.time
		width: 40px
.clip_selector
	display: block
	margin: auto
.button
	text-align: center
	cursor: pointer
	color: $cyan
	&:hover
		color: white
		background-color: $cyan
</style>
