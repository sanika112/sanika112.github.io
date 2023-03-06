// GET REQUEST
function getTodos() {
// console.log('GET Request');
//     axios({
//         method: 'get',
//         url: 'https://jsonplaceholder.typicode.com/todos',
//         param: {
//             _limit: 5
//         }
//     })

//     .then(res => console.log(res))
//     .then(res => console.log(res.data))

    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        timeout: 5000
    })

    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

//POST REQUEST
function addTodo() {
    // console.log("POST REQUEST");
    axios.post('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        title: 'New Todo',
        completed: false
    })
    .then(res => showOutput (res))
    .catch(err => console.error(err));
}

//  PUT/PATCH REQUEST
function updateTodo() {
    // console.log("PUT/PATCH REQUEST");
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Update Todo',
        completed: true
    })
    .then(res => showOutput (res))
    .catch(err => console.error(err));
}

//DELETE REQUEST
function removeTodo() {
    // console.log("DELETE REQUEST");
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput (res))
    .catch(err => console.error(err));
}

//SIMULTANEOUS DATA
function getData() {
    // console.log("SIMULTANEOUS Request");
        // console.log("DELETE REQUEST");
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])

    // .then(axios.spread((todos, posts) => showOutput (todos)))
    .then(axios.spread((tidis, posts) => showOutput(posts)))
    .catch(err => console.error(err));
}

//CUSTOM HEADERS
function customHeaders() {
    // console.log("CUSTOM HEADERS");
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    };
    axios.post('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        title: 'New Todo',
        completed: false
}, config
)
    .then(res => showOutput (res))
    .catch(err => console.error(err));
}



//TRANSFORMING REQUEST AND RESPONSE
function transformResponse() {
    // console.log("TRANSFORMING Response");
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: 'hello world'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };
    axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
    // console.log("ERROR HANDLING");
    axios.get('https://jsonplaceholder.typicode.com/todos', {

    })
    .then(res => showOutput(res))
    .catch(err => {
        if (err.response) {
            //SERVER RESPONDED WITH A STATUS OTHER THAN 200 RANGE
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if(err.response.status === 404) {
                alert('Error: Page not found');
            } else if (err.request) {
                // REQUEST WAS MADE BUT NO RESPONSE
                console.error(err.request);
            } else {
                console.error(err.message);
            }
        }
    });
}

// CANCEL TOKEN
function cancelToken() {
    // console.log("CANCEL TOKEN");
    const source = axios.CancelToken.source();

    axios.get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
        if (axios.isCancel(thrown)) {
            console.log('Request Canceled', thrown.message);
        }
    });
    if (true) {
        source.cancel('Request Canceled');
    }
}

// INTERCEPTING REQUEST AND RESPONSES   
axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

    return config
}, error => {
    return Promise.reject(error);
});
// AXIOS INSTANCES
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

// AXIOS INSTANCES

// SHOW OUTPUT IN BROWSER
function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
        <h5>Status: ${res.status}</h5>
    </div>

    <div class="card mt-3">
        <div class="card-header">
            Header
        </div>
        <div class="card-body">
            <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
    </div>

    <div class="card mt-3">
        <div class="card-header">
            Data
        </div>
        <div class="card-body">
            <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
    </div>

    <div class="card mt-3">
        <div class="card-header">
            Config
        </div>
        <div class="card-body">
            <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
    </div>
    `;
}

// EVENT LISTENERS
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);