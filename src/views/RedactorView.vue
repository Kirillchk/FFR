<template>
	<div>{{ FFmpegStore.IsSignedIn }}</div>
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
  