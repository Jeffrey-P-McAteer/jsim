

window.sendMessageToServer = function sendMessageToServer(cmd) {
    if (window.external !== undefined && window.external.invoke !== undefined) {
        return window.external.invoke(cmd);
    } else if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.external !== undefined) {
        return window.webkit.messageHandlers.external.postMessage(cmd);
    }
    //throw new Error('Failed to locate webkit external handler')
}

window.rust_click = function(evt) {
  try {
    var code = javascript.javascriptGenerator.workspaceToCode(window.workspace);
    sendMessageToServer("code="+code);
  }
  catch (err) {
    sendMessageToServer("err="+err);
  }
};

sendMessageToServer("test");


Blockly.setLocale('En');

const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Control",
      "contents": [
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          kind: 'block',
          type: 'controls_whileUntil'
        },
      ]
    },
    {
      "kind": "category",
      "name": "Logic",
      "contents": [
        {
          "kind": "block",
          "type": "logic_compare"
        },
        {
          "kind": "block",
          "type": "logic_operation"
        },
        {
          "kind": "block",
          "type": "logic_boolean"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Data",
      "contents": [
        {
          "kind": "block",
          "type": "text"
        },
        {
          "kind": "block",
          "type": "math_number"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Misc",
      "contents": [
        {
          "kind": "block",
          "type": "string_length"
        },
        {
          "kind": "block",
          "type": "alert_text"
        },
      ]
    },
  ]
};



Blockly.Blocks['string_length'] = {
  init: function() {
    this.jsonInit({
      "message0": 'length of %1',
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "String"
        }
      ],
      "output": "Number",
      "colour": 160,
      "tooltip": "Returns number of letters in the provided text.",
      "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
    });
  }
};

javascript.javascriptGenerator.forBlock['string_length'] = function(block, generator) {
  // String or array length.
  var argument0 = generator.valueToCode(block, 'VALUE', javascript.Order.FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', javascript.Order.MEMBER];
};



Blockly.Blocks['alert_text'] = {
  init: function() {
    this.jsonInit({
      "message0": 'alert text %1',
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "String"
        }
      ],
      "output": "",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160,
      "tooltip": "Outputs an alert.",
    });
  }
};

javascript.javascriptGenerator.forBlock['alert_text'] = function(block, generator) {
  // String or array length.
  var argument0 = generator.valueToCode(block, 'VALUE', javascript.Order.FUNCTION_CALL) || '\'\'';
  return 'alert('+argument0 + ');';
};



const workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
  toolbox: toolbox
});
window.workspace = workspace;


// A <script> tag defines window.javascript like an import
const code = javascript.javascriptGenerator.workspaceToCode(workspace);
window.code = code;

sendMessageToServer("code = "+code);
