const { Parser } = require('htmlparser2');

// State stack to track if we are currently inside a "loud" element
let loudStack = [];

const parser = new Parser({
  onopentag(name, attribs) {
    // Reconstruct the opening tag
    let attrStr = '';
    for (const [key, value] of Object.entries(attribs)) {
      attrStr += ` ${key}="${value}"`;
    }
    process.stdout.write(`<${name}${attrStr}>`);

    // Determine if this tag is "loud"
    const classes = attribs.class ? attribs.class.split(/\s+/) : [];
    const isLoud = classes.includes('loud');

    // Push to stack to handle nested elements
    loudStack.push(isLoud);
  },

  onclosetag(name) {
    // Reconstruct the closing tag
    process.stdout.write(`</${name}>`);
    // Remove the current element from state
    loudStack.pop();
  },

  ontext(text) {
    // Check the top of the stack to see if we are inside a "loud" element
    if (loudStack[loudStack.length - 1]) {
      process.stdout.write(text.toUpperCase());
    } else {
      process.stdout.write(text);
    }
  },

  oncomment(data) {
    process.stdout.write(`<!--${data}-->`);
  },

  // Handle processing instructions (like <?xml ?>)
  onprocessinginstruction(name, attribs) {
    process.stdout.write(`<?${name} ${attribs}>`);
  }
}, { decodeEntities: true });

// --- THE FIX IS HERE ---
process.stdin.on('data', (chunk) => {
  // Convert Buffer to String to avoid "charCodeAt is not a function"
  parser.write(chunk.toString());
});

process.stdin.on('end', () => {
  parser.end();
});

process.stdin.on('error', (err) => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});