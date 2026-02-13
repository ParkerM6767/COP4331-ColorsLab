let api_url = "./LAMPAPI/"

async function doLogin() {

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }

    // hashing password test
    var hash = md5(data.password)

    data.password = hash;

    let req = new XMLHttpRequest()

    req.open("POST", api_url + 'Login.php')
    req.setRequestHeader("Content-Type", "application/json", "charset=utf-8")

    try
	{
		req.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( req.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = `
                    <div style="width:35%;margin: auto;" role="alert" class="alert alert-danger text-center mb-5">
                        Login invalid: username/password incorrect.
                    </div>`;
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "color.html";
			}
		};
		req.send(JSON.stringify(data));
	}
	catch(err)
	{
		console.warn(err.message)
	}
}