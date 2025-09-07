<template>
  <div class="upload-container">
    <div class="upload-modal">
      <h2 class="upload-title">上传图片</h2>
      
      <!-- 已上传图片预览 -->
      <div v-if="modelValue.length > 0" class="preview-container">
        <h3>已上传图片</h3>
        <div class="preview-grid">
          <div v-for="(img, index) in modelValue" :key="index" class="preview-item">
            <img :src="img" alt="Uploaded image" class="preview-image" />
            <button @click="removeImage(index)" class="remove-btn">×</button>
          </div>
        </div>
      </div>

      <div class="upload-area" 
           @click="triggerFileInput"
           @dragover="handleDragOver"
           @drop="handleDrop">
        <div class="upload-placeholder">
          <div class="plus-icon">+</div>
          <p>点击或拖拽文件到此处上传</p>
          <p class="upload-hint">支持多选，仅限图片格式</p>
        </div>
        <input 
          ref="fileInput"
          type="file" 
          @change="handleFileSelect"
          style="display: none;"
          accept="image/*"
          multiple
        />
      </div>

      <!-- 文件列表 -->
      <div v-if="selectedFiles.length > 0" class="file-list">
        <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
          <div class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
          </div>
          <button @click="removeFile(index)" class="remove-file-btn">×</button>
        </div>
      </div>

      <!-- 上传进度 -->
      <div v-if="uploadProgress > 0" class="progress-container">
        <div class="progress-header">
          <span>上传进度</span>
          <span>{{ uploadProgress }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
        </div>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div class="action-buttons">
        <button 
          @click="uploadFiles" 
          :disabled="isUploading || selectedFiles.length === 0" 
          class="upload-btn"
        >
          {{ isUploading ? '上传中...' : `上传 ${selectedFiles.length} 张图片` }}
        </button>
        <button @click="cancelUpload" class="cancel-btn">取消</button>
      </div>

      <div class="reference-id">250907-n7ab</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  // 其他可能的props
})

const modelValue = defineModel({
  type: Array,
  default: () => []
})

const fileInput = ref(null)
const selectedFiles = ref([])
const isUploading = ref(false)
const uploadProgress = ref(0)
const errorMessage = ref('')

// 生成图片名称
const generateImageName = () => {
  const datePart = dayjs().format('YYMMDD')
  const randomPart = Math.random().toString(36).slice(2, 6)
  return `${datePart}-${randomPart}`
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 0) {
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length > 0) {
      selectedFiles.value = [...selectedFiles.value, ...validFiles]
      errorMessage.value = ''
    } else {
      errorMessage.value = '请选择有效的图片文件'
    }
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

const handleDrop = (event) => {
  event.preventDefault()
  event.stopPropagation()
  
  const files = Array.from(event.dataTransfer.files)
  if (files.length > 0) {
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length > 0) {
      selectedFiles.value = [...selectedFiles.value, ...validFiles]
      errorMessage.value = ''
    } else {
      errorMessage.value = '请拖拽有效的图片文件'
    }
  }
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const removeImage = (index) => {
  modelValue.value.splice(index, 1)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) return
  
  isUploading.value = true
  uploadProgress.value = 0
  errorMessage.value = ''
  
  const totalFiles = selectedFiles.value.length
  let uploadedCount = 0
  
  for (const file of selectedFiles.value) {
    try {
      // 将文件内容转换为Base64编码
      const base64Content = await readFileAsBase64(file)
      
      // 生成图片名称
      const imageName = generateImageName()
      
      // 准备请求体参数
      const requestBody = {
        content: base64Content,
        message: `Upload ${file.name}`,
        branch: 'main',
        author: {
          name: 'Current User', // 应从用户信息获取
          email: 'user@example.com' // 应从用户信息获取
        }
      }
      
      // 模拟上传过程
      await simulateApiCall(requestBody, file)
      
      // 模拟生成图片URL（实际应用中应从API响应获取）
      const imageUrl = `https://example.com/images/${imageName}`
      modelValue.value = [...modelValue.value, imageUrl]
      
      uploadedCount++
      uploadProgress.value = Math.round((uploadedCount / totalFiles) * 100)
      
    } catch (error) {
      errorMessage.value = `上传失败: ${error.message}`
      break
    }
  }
  
  isUploading.value = false
  if (uploadedCount === totalFiles) {
    selectedFiles.value = []
  }
}

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // 移除Data URL前缀（如"data:image/png;base64,"）
      const base64Content = reader.result.split(',')[1]
      resolve(base64Content)
    }
    reader.onerror = error => reject(error)
  })
}

const simulateApiCall = (requestBody, file) => {
  return new Promise((resolve, reject) => {
    // 模拟上传延迟
    const delay = Math.random() * 1000 + 500 // 500-1500ms
    
    setTimeout(() => {
      // 模拟90%的成功率
      if (Math.random() < 0.9) {
        resolve({ success: true, data: { file } })
      } else {
        reject(new Error(`上传 ${file.name} 时出现网络错误`))
      }
    }, delay)
  })
}

const cancelUpload = () => {
  selectedFiles.value = []
  uploadProgress.value = 0
  isUploading.value = false
  errorMessage.value = ''
}
</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.upload-modal {
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.upload-title {
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.preview-container {
  margin-bottom: 20px;
}

.preview-container h3 {
  color: #ccc;
  margin-bottom: 10px;
  font-size: 1rem;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: rgba(244, 67, 54, 0.8);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
}

.upload-area {
  border: 2px dashed #666;
  border-radius: 6px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  margin-bottom: 20px;
}

.upload-area:hover {
  border-color: #888;
}

.plus-icon {
  font-size: 3rem;
  color: #888;
  margin-bottom: 10px;
}

.upload-placeholder p {
  color: #888;
  margin: 0;
}

.upload-hint {
  font-size: 0.9rem;
  margin-top: 8px !important;
}

.file-list {
  margin-bottom: 15px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #3a3a3a;
  border-radius: 4px;
  margin-bottom: 8px;
}

.file-info {
  display: flex;
  flex-direction: column;
}

.file-name {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.file-size {
  color: #888;
  font-size: 0.8rem;
}

.remove-file-btn {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

.progress-container {
  margin-bottom: 15px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.progress-bar {
  height: 8px;
  background-color: #3a3a3a;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s;
}

.error-message {
  color: #f44336;
  margin-bottom: 15px;
  padding: 8px;
  background-color: rgba(244, 67, 54, 0.1);
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.upload-btn, .cancel-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.upload-btn {
  background-color: #4caf50;
  color: white;
}

.upload-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.upload-btn:disabled {
  background-color: #666;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: transparent;
  color: #ccc;
  border: 1px solid #666;
}

.cancel-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.reference-id {
  text-align: center;
  color: #666;
  font-size: 0.8rem;
  margin-top: 10px;
}
</style>