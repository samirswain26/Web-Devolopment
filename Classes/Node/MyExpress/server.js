const http = require("http");
// const path = require("path");

function createServer(){
    const routes = {GET:{}, POST:{}}

    function handler(req, res){
        const method = req.method;
        const url = req.url;

        if(routes[method] && routes[method][url]){
            return routes[method][url](req, res)
        }
        res.statusCode = 404
        res.end("Page not found")
    }

    return {
        getcallpar: (path, handler) => (routes.GET[path] = handler),
        postcallpar: (path, handler) => (routes.POST[path] = handler),
        suno: (port, cb) => http.createServer(handler).listen(port, cb),

    }

}

module.exports = createServer