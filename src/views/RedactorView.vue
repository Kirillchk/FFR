<template>
	<div>{{ FFmpegStore.FFmpegPath }}</div>
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
  