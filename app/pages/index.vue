<template>
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
</template>

<script lang="ts" setup>
import { validateForm } from "@/utils/validate-form";
const cue = useCue()

const signMode = ref(false)
const loading = ref(false)

const toggleMode = () => signMode.value = !signMode.value

const form = ref({
  name: '',
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
  const verify = validateForm(form, formErrors, signMode)
  if (!verify) {
    loading.value = false
    return;
  }

  signMode.value ? await signup() : await login()
  loading.value = false
}

const login = async () => {
  await useApi.post(
    'user/login',
    form.value,
  ).then((data) => {
    const { ok, token } = data
    if (ok) {
      if (token) useToken.set(token)
      useRouter().push({ path: "/admin" })
    }
  }).catch(() => {
    useToken.remove()
  })
}

const signup = async () => {
  await useApi.post('user/reg', form.value)
    .then((data) => { }).catch(() => { })
}

onMounted(async () => {
  const auth = useToken.get()
  const noauth = useRoute().query.mode === 'auth'

  if (auth) {
    loading.value = true
    await login()
    loading.value = false
  } else {
    if (noauth) cue.error({ title: 'You have no permission' })
    const init: any = await useApi.get('user/init')
  console.log(init);
  
    if (init.ok) {
      signMode.value = true
      useCue().done({ title: "Please initialize the owner." })
    }
  }
})
</script>

<style></style>
