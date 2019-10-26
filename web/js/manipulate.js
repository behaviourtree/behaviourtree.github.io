// Manipulation functions 

// Keys on press
document.onkeydown = checkKey;

function checkKey(e) {
   e = e || window.event;

   // Add node
   if (e.keyCode == '65') {
      if (!_jm.view.is_editing()) {
         add_node()
      }
   }
   // Remove node
   else if (e.keyCode == '68') {
      if (!_jm.view.is_editing()) {
         remove_node()
      }
   }
   // Zoom in
   else if (e.keyCode == '90') {
      if (!_jm.view.is_editing()) {
         zoomIn()
      }
   }
   // Zoom out
   else if (e.keyCode == '88') {
      if (!_jm.view.is_editing()) {
         zoomOut()
      }
   }
}
// End keys on press

// Collapsable menu
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
// End collapsable menu

var _jm = null;
function open_empty() {
   var options = {
      container: 'btArea',
      theme: 'greensea',
      editable: true
   }
   _jm = jsMind.show(options);
   // _jm = jsMind.show(options,mind);
}

function open_json() {
   var mind = {
      "meta": {
         "name": "jsMind remote",
         "author": "hizzgdev@163.com",
         "version": "0.2"
      },
      "format": "node_tree",
      "data": {
         "id": "root", "topic": "jsMind", "children": [
            {
               "id": "easy", "topic": "Easy", "direction": "left", "children": [
                  { "id": "easy1", "topic": "Easy to show" },
                  { "id": "easy2", "topic": "Easy to edit" },
                  { "id": "easy3", "topic": "Easy to store" },
                  { "id": "easy4", "topic": "Easy to embed" },
                  { "id": "other3", "background-image": "ant.png", "width": "100", "height": "100" }
               ]
            },
            {
               "id": "open", "topic": "Open Source", "direction": "right", "children": [
                  { "id": "open1", "topic": "on GitHub", "background-color": "#eee", "foreground-color": "blue" },
                  { "id": "open2", "topic": "BSD License" }
               ]
            },
            {
               "id": "powerful", "topic": "Powerful", "direction": "right", "children": [
                  { "id": "powerful1", "topic": "Base on Javascript" },
                  { "id": "powerful2", "topic": "Base on HTML5" },
                  { "id": "powerful3", "topic": "Depends on you" }
               ]
            },
            {
               "id": "other", "topic": "test node", "direction": "left", "children": [
                  { "id": "other1", "topic": "I'm from local variable" },
                  { "id": "other2", "topic": "I can do everything" }
               ]
            }
         ]
      }
   }
   _jm.show(mind);
}

function open_ajax() {
   var mind_url = 'data_example.json';
   jsMind.util.ajax.get(mind_url, function (mind) {
      _jm.show(mind);
   });
}

function screen_shot() {
   _jm.screenshot.shootDownload();
}

function show_data() {
   var mind_data = _jm.get_data();
   var mind_string = jsMind.util.json.json2string(mind_data);
   prompt_info(mind_string);
}

function save_file() {
   var mind_data = _jm.get_data();
   var mind_name = mind_data.meta.name;
   var mind_str = jsMind.util.json.json2string(mind_data);
   jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.json');
}

function open_file() {
   var file_input = document.getElementById('file_input');
   var files = file_input.files;
   if (files.length > 0) {
      var file_data = files[0];
      jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
         var mind = jsMind.util.json.string2json(jsmind_data);
         if (!!mind) {
            _jm.show(mind);
         } else {
            prompt_info('can not open this file as mindmap');
         }
      });
   } else {
      prompt_info('please choose a file first')
   }
}

function select_node() {
   var nodeid = 'other';
   _jm.select_node(nodeid);
}

function show_selected() {
   var selected_node = _jm.get_selected_node();
   if (!!selected_node) {
      prompt_info(selected_node.topic);
   } else {
      prompt_info('nothing');
   }
}

function get_selected_nodeid() {
   var selected_node = _jm.get_selected_node();
   if (!!selected_node) {
      return selected_node.id;
   } else {
      return null;
   }
}

function add_node() {
   var selected_node = _jm.get_selected_node(); // as parent of new node

   var nodeid = jsMind.util.uuid.newid();
   var topic = 'Node_' + nodeid.substr(nodeid.length - 6);
   var node = _jm.add_node(selected_node, nodeid, topic);
}

// Behaviour Tree Nodes
function add_sequence() {
   var selected_node = _jm.get_selected_node(); // as parent of new node

   var nodeid = jsMind.util.uuid.newid();
   var topic = 'name:seq';
   var node = _jm.add_node(selected_node, nodeid, topic);
}

function add_selector() {
   var selected_node = _jm.get_selected_node(); // as parent of new node

   var nodeid = jsMind.util.uuid.newid();
   var topic = 'name:sel';
   var node = _jm.add_node(selected_node, nodeid, topic);
}

function add_chooser() {
   var selected_node = _jm.get_selected_node(); // as parent of new node

   var nodeid = jsMind.util.uuid.newid();
   var topic = 'name:cho';
   var node = _jm.add_node(selected_node, nodeid, topic);
}

function add_parallel() {
   var selected_node = _jm.get_selected_node(); // as parent of new node

   var nodeid = jsMind.util.uuid.newid();
   var topic = 'name:par';
   var node = _jm.add_node(selected_node, nodeid, topic);
}

function add_action() {
   var selected_node = _jm.get_selected_node(); // as parent of new node

   var nodeid = jsMind.util.uuid.newid();
   var topic = 'name(args*)';
   var node = _jm.add_node(selected_node, nodeid, topic);
}

function add_label() {
   var selected_node = _jm.get_selected_node(); // as parent of new node

   var nodeid = jsMind.util.uuid.newid();
   var topic = 'name';
   var node = _jm.add_node(selected_node, nodeid, topic);
}

// End Behaviour Tree Nodes

var imageChooser = document.getElementById('image-chooser');

imageChooser.addEventListener('change', function (event) {
   // Read file here.
   var reader = new FileReader();
   reader.onloadend = (function () {
      var selected_node = _jm.get_selected_node();
      var nodeid = jsMind.util.uuid.newid();
      var topic = undefined;
      var data = {
         "background-image": reader.result,
         "width": "100",
         "height": "100"
      };
      var node = _jm.add_node(selected_node, nodeid, topic, data);
      //var node = _jm.add_image_node(selected_node, nodeid, reader.result, 100, 100);
      //add_image_node:function(parent_node, nodeid, image, width, height, data, idx, direction, expanded){
   });

   var file = imageChooser.files[0];
   if (file) {
      reader.readAsDataURL(file);
   };

}, false);

function add_image_node() {
   var selected_node = _jm.get_selected_node(); // as parent of new node

   imageChooser.focus();
   imageChooser.click();
}

function move_to_first() {
   var selected_id = get_selected_nodeid();

   _jm.move_node(selected_id, '_first_');
}

function move_to_last() {
   var selected_id = get_selected_nodeid();

   _jm.move_node(selected_id, '_last_');
}

function remove_node() {
   var selected_id = get_selected_nodeid();

   _jm.remove_node(selected_id);
}

function set_theme(theme_name) {
   _jm.set_theme(theme_name);
}

var zoomInButton = document.getElementById("zoom-in-button");
var zoomOutButton = document.getElementById("zoom-out-button");

function zoomIn() {
   if (_jm.view.zoomIn()) {
      zoomOutButton.disabled = false;
   } else {
      zoomInButton.disabled = true;
   };
};

function zoomOut() {
   if (_jm.view.zoomOut()) {
      zoomInButton.disabled = false;
   } else {
      zoomOutButton.disabled = true;
   };
};

function toggle_editable(btn) {
   var editable = _jm.get_editable();
   if (editable) {
      _jm.disable_edit();
      btn.innerHTML = 'enable editable';
   } else {
      _jm.enable_edit();
      btn.innerHTML = 'disable editable';
   }
}

function toggle() {
   var selected_id = get_selected_nodeid();

   _jm.toggle_node(selected_id);
}

function expand_all() {
   _jm.expand_all();
}

function collapse_all() {
   _jm.collapse_all();
}


function get_nodearray_data() {
   var mind_data = _jm.get_data('node_array');
   var mind_string = jsMind.util.json.json2string(mind_data);
   prompt_info(mind_string);
}

function save_nodearray_file() {
   var mind_data = _jm.get_data('node_array');
   var mind_name = mind_data.meta.name;
   var mind_str = jsMind.util.json.json2string(mind_data);
   jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.json');
}

function open_nodearray() {
   var file_input = document.getElementById('file_input_nodearray');
   var files = file_input.files;
   if (files.length > 0) {
      var file_data = files[0];
      jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
         var mind = jsMind.util.json.string2json(jsmind_data);
         if (!!mind) {
            _jm.show(mind);
         } else {
            prompt_info('can not open this file as mindmap');
         }
      });
   } else {
      prompt_info('please choose a file first')
   }
}

function get_freemind_data() {
   var mind_data = _jm.get_data('freemind');
   var mind_string = jsMind.util.json.json2string(mind_data);
   alert(mind_string);
}

function save_freemind_file() {
   var mind_data = _jm.get_data('freemind');
   var mind_name = mind_data.meta.name || 'freemind';
   var mind_str = mind_data.data;
   jsMind.util.file.save(mind_str, 'text/xml', mind_name + '.mm');
}

function open_freemind() {
   var file_input = document.getElementById('file_input_freemind');
   var files = file_input.files;
   if (files.length > 0) {
      var file_data = files[0];
      jsMind.util.file.read(file_data, function (freemind_data, freemind_name) {
         if (freemind_data) {
            var mind_name = freemind_name;
            if (/.*\.mm$/.test(mind_name)) {
               mind_name = freemind_name.substring(0, freemind_name.length - 3);
            }
            var mind = {
               "meta": {
                  "name": mind_name,
                  "author": "hizzgdev@163.com",
                  "version": "1.0.1"
               },
               "format": "freemind",
               "data": freemind_data
            };
            _jm.show(mind);
         } else {
            prompt_info('can not open this file as mindmap');
         }
      });
   } else {
      prompt_info('please choose a file first')
   }
}

function prompt_info(msg) {
   alert(msg);
}

open_empty();