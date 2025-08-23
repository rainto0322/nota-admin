// utils/form-verify.ts
import type { Ref } from 'vue'

interface FormData {
  name: string
  psw: string
  email: string
}

interface FormErrors {
  name: string
  psw: string
  email: string
}

/**
 * 表单验证函数
 * @param form 表单数据引用
 * @param errors 错误信息引用
 * @param isSignMode 是否为注册模式
 * @returns 验证是否通过
 */
export const validateForm = (
  form: Ref<FormData>,
  errors: Ref<FormErrors>,
  isSignMode: Ref<boolean> | boolean
): boolean => {
  let isValid = true
  errors.value = { name: '', psw: '', email: '' }

  // 验证name（2-8字符）
  if (!form.value.name || form.value.name.length < 2 || form.value.name.length > 8) {
    errors.value.name = 'Name must be 2-8 characters'
    isValid = false
  }

  // 验证password（8-20字符且包含字母和数字）
  const pswRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
  if (!form.value.psw || !pswRegex.test(form.value.psw)) {
    errors.value.psw = 'Password must be 8-20 characters with letters and numbers'
    isValid = false
  }

  // 如果是注册模式，验证email
  const shouldValidateEmail = typeof isSignMode === 'boolean' ? isSignMode : isSignMode.value
  if (shouldValidateEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.value.email || !emailRegex.test(form.value.email)) {
      errors.value.email = 'Please enter a valid email'
      isValid = false
    }
  }

  return isValid
}

/**
 * 密码强度验证（可选扩展）
 * @param password 密码字符串
 * @returns 强度等级 0-3
 */
export const checkPasswordStrength = (password: string): number => {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  return strength
}