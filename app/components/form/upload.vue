<template>
  <div class="flex flex-wrap gap-2 ">
    <!-- Existing images -->
    <div class="img" v-for="item in modelValue">
      <img :src="`https://raw.gitcode.com/rainto/Album/raw/main/daily/${item}.png`">
      <span class="img-name">{{ item }}</span>
    </div>

    <!-- select image -->
    <div class="img" v-for="item in selectFiles" @click="UploadCancel(item.name)">
      <img :src="item.base64">
      <span class="img-state" :class="`w-${item.state}`"></span>
      <span class="img-name">{{ item.name }}</span>
    </div>

    <!-- upload button -->
    <div v-if="(modelValue?.length ?? 0) + selectFiles.length < 6" class="img"
      @click="fileInput ? fileInput.click() : false">
    </div>
    <input @change="handleUpload" type="file" ref="fileInput" style="display: none;" accept=".jpg,.jpeg,.png" multiple>
  </div>
</template>

<script lang="ts" setup>
const modelValue = defineModel<string[]>()
const fileInput = ref<HTMLInputElement | null>(null);
const selectFiles = ref<ImageSelect[]>([])
const { UploadImage } = useImage()

const UploadCancel = (name: string) => {
  selectFiles.value = selectFiles.value.filter(img => img.name !== name);
}

// Obtain images's base64 data
const handleUpload = async (event: Event) => {
  const files = (event?.target as HTMLInputElement).files
  selectFiles.value = await ReadFiles(files as any)
  // upload function
  for (const item of selectFiles.value) {
    item.state = 20

    await UploadImage(item).then((data: any) => {
      item.state = 50
      if (data.commit) {
        item.state = 100

        setTimeout(() => {
          UploadCancel(item.name)
          modelValue.value?.push(item.name)
        }, 1000)
      }
    }).catch((error) => {
      UploadCancel(item.name)
    })
  }
}


</script>

<style scoped>
@keyframes start {
  from {
    width: 100%;
  }

  to {
    width: 60%;
  }
}

@keyframes conduct {
  from {
    width: 60%;
  }

  to {
    width: 30%;
  }
}

@keyframes done {
  from {
    width: 30%;
  }

  to {
    width: 0%;
  }
}

.img {
  position: relative;
  width: 100px;
  min-width: 100px;
  height: 100px;
  border: 2px solid var(--text);
  border-radius: var(--radius);
  overflow: hidden;
  object-fit: cover;
}

.img .img-name {
  position: absolute;
  width: 100%;
  font-size: .8rem;
  bottom: 0;
  left: 0;
  text-align: center;
  overflow: hidden;
  background-color: var(--base);
  opacity: .8;
  z-index: 2;
}

.img .img-state {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background-color: var(--error);
  opacity: .5;
  z-index: 2;
}

.img .img-state.w-50 {
  animation: .1s start forwards;
}

.img .img-state.w-50 {
  animation: .1s conduct forwards;
}

.img .img-state.w-100 {
  animation: .1s done forwards;
}

.img img {
  height: 100%;
  width: 100%;
}

.img::after {
  content: '+';
  position: absolute;
  left: 0;
  right: 0;
  top: 35%;
  z-index: -1;
  text-align: center;
}
</style>