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
	// res.statusCode = 200;
	// res.setHeader('Content-Type', 'text/plain');
	// res.end("Hello World \n");
});


const getResource = (res) => {
	/* check if the resource exists or in our case, resource.json exists
		if yes then return the resource else throw a 404 error
	*/

	fs.exists('resource.json', (exists) => {
		if(exists){
			console.log("returning the json of the file");
		}else{
			console.log("forbidden");
		}
	})

	console.log("GET is called");

}

const createResource = (res) => {
	/* check if the resource exists or in our case, resource.json exists
		if not then create it with dummy data, else return forbidden header
	*/
	
	console.log("POST is called");
}

const editResource = (res) => {
	/* check if the resource exists or in our case, resource.json exists
		if yes then edit the resource with modified value else throw a 404 error
	*/
	
	console.log("PUT is called");


}




server.listen(port, hostname, ()=> {
	console.log(`server listening at http://${hostname}:${port}/`);
});