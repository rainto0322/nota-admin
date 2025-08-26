type Options = { token?: string, body?: any }
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const createFetch = async (method: Method, path: string, body?: any, token?: string) => {
  const cue = useCue()
  const url = useRuntimeConfig().public.api

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers["Authorization"] = `${token}`

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

    if (result.ok) cue.done({ title: result.msg || 'Successful.' });
    console.log(result);
    return result
  } catch (error: any) {
    let errorMsg = error.data?.msg || error.message || 'Request failed';

    // permission
    if (error.data.code === 401) {
      useLocal.remove()
      useRouter().push({ path: '/', query: { mode: 'auth' } })
    }

    cue.error({ title: errorMsg });
    throw error
  }
}

export const useApi = {
  get: (path: string) => createFetch('GET', path),
  post: (path: string, body: any, token?: string) => createFetch('POST', path, body, token),
  put: (path: string, options: Options) => createFetch('PUT', path, options),
  del: (path: string, options: Options) => createFetch('DELETE', path, options)
}