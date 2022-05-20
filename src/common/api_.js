
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
    body: isForm ? form : JSON.stringify(body),
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
    get: () => url('topics', '', 'GET').then(({ topics }) => topics),
    create: body => url('topics', body, 'POST'),
    delete: id => url(`topic/${id}`, null, 'DELETE'),
  },
  login: data => url('login', data),
  status: () => url('status'),
  logout: () => url('logout'),
  test: {
    demo: () => url('login', { userId: 1 }),
    error: () => url('loginError', { userId: 1 }),
  },
  users: {
    save: (data) => url('users/set', data),
    add: (data) => url('users/add', data),
    del: id => url('users/del', { id }),
    get: () => url('users/get'),
    sendApprove: id => url('users/sendApprove', { id }),
    sendApproveByEmail: email => url('users/sendApprove', { email }),
    secure: (data) => url('users/secure', data),
  },
  category: {
    save: (data) => url('category/set', data),
    add: (data) => url('category/add', data),
    getAll: () => url('category'),
    get: () => url('category/get'),
    del: id => url('category/del', { id }),
  },
  question: {
    init: category_id => url('question/init', { category_id }),
    start: category_id => url('question/start', { category_id }),
    save: data => url('question/set', data),
    add: data => url('question/add', data),
    del: id => url('question/del', { id }),
    get: category_id => url('question/get', { category_id }),
  },
  ans: {
    save: (data) => url('ans/set', data),
    add: (data) => url('ans/add', data),
    del: id => url('ans/del', { id }),
    // get: (category_id) => url('ans/get', { category_id }),
  },
  usersGroup: {
    add: name => url('usersGroup/add', { name }),
    get: () => url('usersGroup/get'),
  },
  state: {
    add: (data) => url('state/add', data),
    del: id => url('state/del', { id }),
    get: data => url('state/get', data),
    // TODO: Need add functionality for using ID
    result: session => url('state/result', { session }),
  },
}
