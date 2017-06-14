//Setup global variables
function setup(){
  global.api_version      = "v1"; //Use api version
  global.connectionString = "[mongodb://127.0.0.1:27017/db_name]";
  // API IP and port
  global.base_url         = process.env.API_URL;
  global.api_port         = process.env.API_PORT;
  // Student server port
  global.server_port      = 3011;

  global.token_length     = 16;
  global.token_secret     = "alphaplus";
  global.SALT_FACTOR      = 10;
  global.SALT_CONNSTR     = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  global.loglevel         = "debug"; // Set as 'trace', 'debug', 'info', 'warn', 'error', 'silent'
  global.elastic          = process.env.ELATICSEARCH;
  //Requires
  // require('./utilities');
}
module.exports = setup();
