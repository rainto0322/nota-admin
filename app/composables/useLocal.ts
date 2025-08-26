//  composables/useLocal
// https://nuxt.com/docs/4.x/api/composables/use-cookie
const Token = 'nota_token'
export const useLocal = {
  get: () => useCookie(Token).value,
  set: (params: string) => {
    const auth = useCookie(Token, {
      sameSite: 'lax',
      secure: false
    })
    auth.value = params
  },
  remove: () => {
    const auth = useCookie(Token)
    auth.value = null
  }
}
