
async function apiFetch(url = '', body, method = 'POST') {
  const result = await fetch(`/api/${url}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...(!body ? null : { body: JSON.stringify(body) }),
  })
    .then((r) => {
      window.rr = r
      return r.json()
    })
    // .then(({ status, data, message }) => {
    //   if (status !== 'done') {
    //     throw new Error(message)
    //   }
    //   return data;
    // })
    .catch((e) => {
      console.log(`ERR API: ${e}`);
      throw e
    });

  return result
}

const api = {
  topics: {
    get: () => apiFetch('topics', '', 'GET').then(({ topics }) => topics),
    create: body => apiFetch('topics', body, 'POST'),
    delete: id => apiFetch(`topic/${id}`, '', 'DELETE'),
  },
  demo: {
    login: () => apiFetch('login1'),
    loginError: () => apiFetch('loginError'),
  },
  logs: {
    get: id => apiFetch('logs', { id }).then(({ logs }) => logs),
  },
  rules: {
    get: () => apiFetch('rules', '', 'GET').then(({ rules }) => rules),
  },
}

export default api
