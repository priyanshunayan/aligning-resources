const http = require('http');
const fs = require('fs')



const hostname = `127.0.0.1`;
const port = 3000;


const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;

	if(url == '/api' && method == "GET"){
		getResource(res);
	}
	if(url == '/api' && method == "POST"){
		createResource(res);
	}
	if(url == '/api' && method == "PUT"){
		editResource(res);
	}
});

const readData = (fd, res) => {
	const readStream = fs.createReadStream("", {fd: fd});
	let output = "";
	readStream.on('data', function(chunk) {
		output += chunk;
	});

	readStream.on('end', function() {
		res.statusCode = 200;
		res.statusMessage = "Read successful";
		res.setHeader('Content-Type', 'text/json');
		res.write(JSON.stringify({
			"message": output,
		}));
		res.end(() => {
			console.log("ReadData function reads: ", output);
		})
		
	});

	readStream.on('error', function(err) {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'text/plain');
		res.end("Error");
		throw err;
	});	
} 


const writeData = (fd, data, res) => {
	
	fs.writeFile('resource', data, (err) => {
		if(err) {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'text/plain');
			res.end("Error");
		}
		res.statusCode = 200;
		res.statusMessage = "Read successful";
		res.setHeader('Content-Type', 'text/json');
		res.write(JSON.stringify({
			"message": data,
		}))
		res.end(() => {
			console.log("Written Successfully in the file");
		})
		
	})	
}

const getResource = (res) => {
	/* check if the resource exists or in our case, resource.json exists
		if yes then return the resource else throw a 404 error
	*/

	fs.open('resource', 'r', (err, fd) => {
		if(err){
			if(err.code == 'ENOENT'){
				res.statusCode = 500;
				res.setHeader('Content-Type', 'text/plain');
				res.end("Error");
			}
		throw err;
		}
		readData(fd, res);
	});

	console.log("GET is called");

}

const createResource = (res) => {
	/* check if the resource exists or in our case, resource.json exists
		if not then create it with dummy data, else return forbidden header
	*/
	fs.open('resource', 'wx', (err, fd) => {
		if(err){
			if(err.code == 'EEXIST'){
				console.error("File already exists");
			}
		throw err;
		}
		writeData(fd, 'Hello there, I am a resource \n', res);
	});
	console.log("POST is called");
}

const editResource = (res) => {
	/* check if the resource exists or in our case, resource.json exists
		if yes then edit the resource with modified value else throw a 404 error
	*/
	fs.open('resource', 'r', (err, fd) => {
		if(err){
			throw err;
		}
		writeData(fd, 'Hello there, I am a resource changed \n', res);
	});
	console.log("PUT is called");


}




server.listen(port, hostname, ()=> {
	console.log(`server listening at http://${hostname}:${port}/`);
});