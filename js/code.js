let api_url = "../LAMPAPI/"

async function doLogin(event) {

    const params = new URLSearchParams(window.location.search)
    let req = new XMLHttpRequest()

    req.open("POST", api_url + 'Login.php')
    req.setRequestHeader("Content-Type", "application/json", "charset=utf-8")
    req.send(JSON.stringify(params))
}