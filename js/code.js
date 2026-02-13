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

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
        document.getElementById("userWelcome").innerHTML = `Hello, ${firstName}!`
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	//document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = api_url + '/AddColor.php';
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("alertContainer").innerHTML = `
                <div class="alert alert-success" role="alert">
                    Color added successfully!
                </div>`;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("alertContainer").innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error when adding color: ${err.message}
                </div>`;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("alertContainer").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = api_url + '/SearchColors.php';
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("alertContainer").innerHTML = `
                <div class="alert alert-success" role="alert">
                    Colors found!
                </div>`;
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += colorList += `<tr><th scope="row">${i + 1}</th><td>${jsonObject.results[i]}</td></tr>`;
				}
				
				document.getElementById("colorRowsTable").innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("alertContainer").innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error when searching for color: ${err.message}
                </div>`;
	}
	
}