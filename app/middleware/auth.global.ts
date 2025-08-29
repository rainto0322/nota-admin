export default defineNuxtRouteMiddleware((to, from) => {
  const { menuMode } = useStatus()
  menuMode.value = false
  const token = useToken.get()
  if (to.path.includes('admin') && !token) {
    return navigateTo('/?mode=auth')
  }
})