export default defineNuxtRouteMiddleware((to, from) => {
  const token = useLocal.get()

  if (to.path.includes('admin') && !token) {
    return navigateTo('/')
  }
})