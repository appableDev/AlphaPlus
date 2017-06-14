/**
 * Created by zenymax on 3/14/17.
 */
import less from 'less';
import fs from './utils';
import fss from 'fs';
import path from 'path';
import del from 'del'


build();

function build(){
  console.log("----------------------------------------\n\
  Building LESS to CSS... \n\
----------------------------------------")
  del_less(read_less);
}

function del_less(cb){
  del([path.join(__dirname, '../public/build/*.less')]).then(function(paths){
    //console.log('Deleted Less files in \n', paths.join('\n'));
    cb()
  });
}

// Read file from less
function read_less(){
  var core_name = ['style', 'libs', 'ie', 'print'];
  var core_less = [];
  for(var i = 0; i < core_name.length; i++){
    core_less[i] = '../public/css/' + core_name[i] + ".less";
  }

  //Read file and store content
  var core_content = [];
  for(var i = 0; i < core_less.length; i++){
    var content = fss.readFileSync(path.join(__dirname, core_less[i]), 'utf8');
    core_content[i] = content;
  }
  for(var i = 0; i < core_content.length; i++){
    write_css(core_name[i], core_content[i]);
  }
}

// Write css file from less content
function write_css(name, content){
  less.render(content,
    {
      paths: [path.join(__dirname, '../public/css')],  // Specify search paths for @import directives
      filename: name+".less", // Specify a filename, for better error messages
      compress: false          // Minify CSS output
    }).then(function(output){
    var out_file = path.join(__dirname, '../public/build/') + name + ".css";
    fs.writeFile(out_file, output.css);
  }, function(error){
    console.log(error);
  });
}
