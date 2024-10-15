import { defineStore } from "pinia"

export const GetFFmpegStore = defineStore('FFmpegStore', {
	state: () => ({
		FFmpegPath: 'PATH',
		IsSignedIn: false
	})
})