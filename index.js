const http = require("http");
const fs = require("fs");

const PORT = 3274;
const HOST = "localhost";

const server = http.createServer((req, res) => {
	console.log(req.url)
	if(req.url == "/"){
		// Write index.html
		fs.readFile("frontend/index.html", function (error, pgResp) {
			if (error) {
				res.writeHead(404);
				res.write('Sorry, Page Not Found');
			} else {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.write(pgResp);
			}
			res.end();
		});
	}else{
		
		fs.readFile( __dirname + req.url, function (err,data) {
			if (err) {
			  res.writeHead(404);
			  res.end(JSON.stringify(err));
			  return;
			}
			res.writeHead(200);
			res.end(data);
		  });
	}
});

server.listen(PORT, HOST);
console.log(`Server running at http://${HOST}:${PORT}/`);