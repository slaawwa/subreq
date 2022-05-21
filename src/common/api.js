
import Vue from 'vue'

const base = `/api/`;

class ApiError extends Error {
  constructor(code, msg = '<EMPTY_MESSAGE>') {
    super()
    this.name = `Api Error #${code}`
    this.code = code
    this.message = msg
  }
}

function url(urlPath = '', body = null, method = 'POST') {
  const headers = {
    Accept: 'application/json',
    'x-requested-with': 'XMLHttpRequest',
  };
  const isForm = typeof data === 'object' && body.file;
  let form;
  if (isForm) {
    form = new FormData();
    form.append('file', body.file);
    delete body.file;
    form.append('__json__', JSON.stringify(body));
  } else {
    headers['Content-Type'] = 'application/json';
  }
  console.log(' - api::', isForm)
  console.log(' - api:isForm:data:', isForm, body)

  return fetch(`${base}${urlPath}`, {
    headers,
    method,
    credentials: 'same-origin',
    ...(body && { body: isForm ? form : JSON.stringify(body) })
  })
    // .then(r => r.json())
    // .then(res => {
    //   if (res.status !== 'done') {
    //     console.error(`throw Error! ${res?.message}`);
    //     return Promise.reject(res?.message);
    //   }
    //   return res?.data;
    // })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json()
        throw new ApiError(errorData.status, errorData.message);
      }
      return response.json()
    })
    .catch((err) => {
      const [title, ...msgParts] = `${err?.toString()}`.split(': ')
      Vue.prototype.$noti({
        snackbar: true,
        title,
        text: msgParts.join(': '),
      })
      throw err;
    });
}

export default {
  topics: {
    get: () => url('topics', null, 'GET').then(({ topics }) => topics),
    create: body => url('topics', body, 'POST'),
    delete: id => url(`topic/${id}`, null, 'DELETE'),
  },
  rules: {
    get: () => url('rules', null, 'GET').then(({ rules }) => rules),
  },
  logs: {
    get: id => url('logs', { id }).then(({ logs }) => logs),
  },

  demo: {
    login: () => url('login1'),
    loginError: () => url('loginError'),
  },
  test: {
    demo: () => url('login', { userId: 1 }),
    error: () => url('loginError', { userId: 1 }),
  },
}
