
/*
 * GET home page.
 */
var ip_port = "";
var stat = "none";
  
exports.index = function(req, res){

  if(req.body.ipport){
      ip_port = req.body.ipport;
      chekUDP(ip_port);
  }
    
  res.render('index', { 
      title: 'TestExpress',
      ipport: ip_port,
      status: stat});

};

function chekUDP(ipport){
    var HOST="127.0.0.1",PORT="10800";
    var dgram = require("dgram");
    var msg = "how about you?";
    var message = new Buffer(msg);
    
    var client = dgram.createSocket("udp4");
    client.send(message,0,message.length,PORT,HOST,function(err,bytes){
        if(err) throw err;
        console.log("UDP message sent to " + HOST + ":" + PORT);
    });
    
    client.on("message",function(msg,rinfo){
        console.log("recieve msg:" + msg);
        client.close();
    });
    
    setTimeout(function(){
        client.close();
        console.log("request time out");
        stat = "request time out";
        },5000);
}