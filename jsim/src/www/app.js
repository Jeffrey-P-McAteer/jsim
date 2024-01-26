

window.sendMessageToServer = function sendMessageToServer(cmd) {
    if (window.external !== undefined && window.external.invoke !== undefined) {
        return window.external.invoke(cmd);
    } else if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.external !== undefined) {
        return window.webkit.messageHandlers.external.postMessage(cmd);
    }
    //throw new Error('Failed to locate webkit external handler')
}

window.rust_click = function(evt) {
  sendMessageToServer(""+evt);
  var code = javascript.javascriptGenerator.workspaceToCode(window.workspace);
  sendMessageToServer("code="+code);
};

sendMessageToServer("test");


Blockly.setLocale('En');

const toolbox = {
  // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
  kind: 'flyoutToolbox',
  // The contents is the blocks and other items that exist in your toolbox.
  contents: [
    {
      kind: 'block',
      type: 'controls_if'
    },
    {
      kind: 'block',
      type: 'controls_whileUntil'
    }
    // You can add more blocks to this array.
  ]
};

/*
const definitions = Blockly.createBlockDefinitionsFromJsonArray([
  {
    // The type is like the "class name" for your block. It is used to construct
    // new instances. E.g. in the toolbox.
    type: 'my_custom_block',
    // The message defines the basic text of your block, and where inputs or
    // fields will be inserted.
    message0: 'move forward %1',
    args0: [
      // Each arg is associated with a %# in the message.
      // This one gets substituted for %1.
      {
        // The type specifies the kind of input or field to be inserted.
        type: 'field_number',
        // The name allows you to reference the field and get its value.
        name: 'FIELD_NAME',
      }
    ],
    // Adds an untyped previous connection to the top of the block.
    previousStatement: null,
    // Adds an untyped next connection to the bottom of the block.
    nextStatement: null,
  }
]);

// Register the definition.
Blockly.defineBlocks(definitions);
*/


const workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
  toolbox: toolbox
});
window.workspace = workspace;


// A <script> tag defines window.javascript like an import
const code = javascript.javascriptGenerator.workspaceToCode(workspace);
window.code = code;

sendMessageToServer("code = "+code);


