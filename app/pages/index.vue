<template>
  <div>
    <!-- form submit -->
    <form @submit.prevent="submit" class="max-w-300px mx-auto mt-15vh">
      <h1 class="text-center">ʕ•ᴥ•ʔ</h1>

      <!-- toggle mode  -->
      <div class="flex justify-between items-center select-none" @click="loading ? false : toggleMode()">
        <h2 v-if="signMode" class="text-md show">Signup</h2>
        <h2 v-else class="text-md show">Login</h2>
        <toggle-button v-model="signMode" />
      </div>

      <!-- form input -->
      <div class="min-h-170px">
        <!-- name -->
        <input :class="{ 'border-error': formErrors.name }" v-model="form.name" placeholder="name" />

        <!-- password -->
        <input :class="{ 'border-error': formErrors.psw }" v-model="form.psw" placeholder="password" />

        <!-- email -->
        <div class="show" v-if="signMode">
          <input :class="{ 'border-error': formErrors.email }" v-model="form.email" placeholder="email" />
        </div>

        <!-- error list -->
        <ul>
          <li class="text-error text-xs block" v-for="error in formErrors">
            {{ error ? '- ' + error : '' }}
          </li>
        </ul>
      </div>

      <!-- submit button -->
      <button class="w-full" :disabled="loading">
        {{ loading ? "loading..." : "submit" }}
      </button>

      <nota-footer class="text-gray" />
    </form>
  </div>
</template>

<script lang="ts" setup>
import { validateForm } from "@/utils/validate-form";

const signMode = ref(false)
const loading = ref(false)

const toggleMode = () => signMode.value = !signMode.value

const form = ref({
  name: 'damin',
  psw: '',
  email: ''
})

const formErrors = ref({
  name: '',
  psw: '',
  email: ''
})


const submit = async () => {
  loading.value = true

  if (!validateForm(form, formErrors, signMode)) {
    loading.value = false
    return;
  }

  signMode ? await signup : await login

  loading.value = false
}

const login = async () => {

}
const signup = async () => {

}

</script>

<style>
</style>
