let api_url = "./LAMPAPI/"

async function doLogin() {

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    let req = new XMLHttpRequest()

    req.open("POST", api_url + 'Login.php')
    req.setRequestHeader("Content-Type", "application/json", "charset=utf-8")
    req.send(JSON.stringify(data))
}


async function doLogout() {
    
}