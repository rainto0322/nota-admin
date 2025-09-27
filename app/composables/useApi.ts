type Options = { token?: string, body?: any }
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const createFetch = async (method: Method, path: string, body?: any) => {
  const cue = useCue()
  const url = useRuntimeConfig().public.api
  const token = useToken.get()

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (method !== 'GET' && token) headers["Authorization"] = `${token}`

  const options = {
    method,
    headers,
    body,
  }

  try {
    const result = await $fetch<{
      ok: boolean,
      msg?: string,
      token?: string,
      data?: any,
    }>(url + path, options);

    if (result.ok && import.meta.client && method !== 'GET') {
      cue.done({ title: result.msg || 'Successful.' });
      console.log(result);
    }
    return result
  } catch (error: any) {
    let errorMsg = error.data?.msg || error.message || 'Request failed';

    // permission
    if (error.data.code === 401) {
      useToken.remove()
      useRouter().push({ path: '/admin?mode=auth' })
    }

    cue.error({ title: errorMsg });
    throw error
  }
}

export const useApi = {
  get: (path: string) => createFetch('GET', path),
  post: (path: string, body: any) => createFetch('POST', path, body),
  put: (path: string, body: any) => createFetch('PUT', path, body),
  delete: (path: string) => createFetch('DELETE', path)
}