  
var http = require('http')
var url = require('url')
var user = {
	"users":[{'name':"farhan"}]
}

var server = http.createServer(function (req,res) {
	if(req.method == 'GET'){
		if(req.url == '/users'){
			res.end(JSON.stringify(user.users))
		}else{
			res.end('Not Found')
		}
	}else if(req.method == 'POST'){
		if(req.url == '/addUser'){
			var auth = (req.headers.authorization)
			//console.log(auth)
			var read = new Buffer(auth.split(' ')[1],'base64').toString().split(':')
			var usr = read[0]
			var pass = read[1]
			if(usr == 'admin' && pass == 'hello'){
				console.log(req.body)
				req.on('data',function(content){
					
					var data = content.toString()
					console.log(data)
					data = JSON.parse(data)
					user.users.push({"name":data.name})
			 		res.end('User Successfully Added')

			 	})	
			}else{
			 	res.end('You are not authorized')
			}
			
			
		}else{
			res.end('Not Found')
		}
	}else{
		res.end('Invalid Method')
	}
})

server.listen(3002)