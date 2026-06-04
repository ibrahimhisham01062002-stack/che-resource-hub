const preprocessMarkdownMath = (text) => {
  if (!text) return { processed: "", mathBlocks: [] };
  let processed = text;
  const mathBlocks = [];

  // Helper to balance unescaped curly braces in math blocks
  const balanceMathBraces = (content) => {
    let openCount = 0;
    let closeCount = 0;
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '{') {
        let backslashCount = 0;
        let j = i - 1;
        while (j >= 0 && content[j] === '\\') {
          backslashCount++;
          j--;
        }
        if (backslashCount % 2 === 0) {
          openCount++;
        }
      } else if (content[i] === '}') {
        let backslashCount = 0;
        let j = i - 1;
        while (j >= 0 && content[j] === '\\') {
          backslashCount++;
          j--;
        }
        if (backslashCount % 2 === 0) {
          closeCount++;
        }
      }
    }
    if (openCount > closeCount) {
      return content + '}'.repeat(openCount - closeCount);
    }
    return content;
  };

  // Auto-close unclosed display/inline math blocks at paragraph level
  let paragraphs = processed.split(/\n\n+/);
  for (let i = 0; i < paragraphs.length; i++) {
    let p = paragraphs[i].trim();
    
    // Case 1: starts with $$ and no other $$ or odd number of $$
    if (p.startsWith('$$')) {
      const dollarCount = (p.match(/\$\$/g) || []).length;
      if (dollarCount % 2 !== 0) {
        paragraphs[i] = paragraphs[i] + '\n$$';
      }
    }
    // Case 2: starts with \[ and no \]
    else if (p.startsWith('\\[') && !p.includes('\\]')) {
      paragraphs[i] = paragraphs[i] + '\n\\]';
    }
    // Case 3: starts with \( and no \)
    else if (p.startsWith('\\(') && !p.includes('\\)')) {
      paragraphs[i] = paragraphs[i] + '\n\\)';
    }
    // Case 4: starts with [ (not a link, checkbox, or task) and has math indicators but no ]
    else if (p.startsWith('[') && !p.includes(']')) {
      const isLinkOrCheckbox = p.startsWith('[ ]') || p.startsWith('[x]') || p.startsWith('[X]') || /^[a-zA-Z0-9\s]+\]\(/.test(p);
      const hasMath = /[\_=^\\+\-*\/]/.test(p) || p.includes('\\mathcal') || p.includes('\\frac');
      if (!isLinkOrCheckbox && hasMath) {
        paragraphs[i] = paragraphs[i] + '\n]';
      }
    }
  }
  processed = paragraphs.join('\n\n');

  const maskPattern = (regex) => {
    processed = processed.replace(regex, (match) => {
      const placeholder = `MATHBLOCKPLACEHOLDERXYZ${mathBlocks.length}`;
      mathBlocks.push({ placeholder, content: match });
      return placeholder;
    });
  };

  // Stage 1: Mask all existing standard math blocks (protecting them from any further replacements!)
  maskPattern(/\$\$[\s\S]*?\$\$/g);
  maskPattern(/\\\[[\s\S]*?\\\]/g);
  maskPattern(/\\begin\{([a-zA-Z\*]+)\}[\s\S]*?\\end\{\1\}/g);
  maskPattern(/\\\([\s\S]*?\\\)/g);
  
  // Mask single dollar math blocks (without paragraph breaks)
  processed = processed.replace(/\$[^\$]+?\$/g, (match) => {
    if (match.includes('\n\n') || match.includes('\r\n\r\n')) {
      return match;
    }
    const placeholder = `MATHBLOCKPLACEHOLDERXYZ${mathBlocks.length}`;
    mathBlocks.push({ placeholder, content: match });
    return placeholder;
  });

  // Stage 2: Process non-standard display delimiters (display blocks wrapped in [ ... ])
  const blockRegex = /(?<!\\)\[\s*((?:[^\[\]]|\[[^\[\]]*\])+?)\s*\]/g;
  processed = processed.replace(blockRegex, (match, content) => {
    const hasSpaces = match.startsWith('[ ') && match.endsWith(' ]');
    const hasMathChars = /[\_=^\\+\-*\/]/.test(content);
    const isCheckbox = content === ' ' || content === 'x' || content === 'X';
    
    if ((hasSpaces || hasMathChars) && !isCheckbox && content.length > 2) {
      return `\n$$\n${content.trim()}\n$$\n`;
    }
    return match;
  });

  // Mask newly created block display equations
  maskPattern(/\$\$[\s\S]*?\$\$/g);

  // Stage 2.5: Process raw mathematical equations LHS = RHS
  processed = processed.replace(/(?<![\w\$])([\w\(\)\[\]\/\\\{\}\+\-\^']+\s*=\s*[a-zA-Z\d_\{\}\(\)\[\]\+\-\*\/\\'\.\^\s\:\,\;\!\?\-\’]+)/g, (match, eqPart) => {
    const tokens = eqPart.split(/(\s+)/);
    let equationTokens = [];
    let textTokens = [];
    let foundText = false;
    const stopWords = new Set(['with', 'parameters', 'and', 'the', 'is', 'for', 'at', 'by', 'on', 'where', 'of', 'in', 'to', 'a', 'an']);
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (!token) {
        if (!foundText) equationTokens.push(tokens[i]);
        else textTokens.push(tokens[i]);
        continue;
      }
      if (foundText) {
        textTokens.push(tokens[i]);
        continue;
      }
      const isWord = /^[a-z]{3,}$/.test(token) && !/^(ln|log|exp|sin|cos|tan|sqrt)$/.test(token);
      if (stopWords.has(token.toLowerCase()) || isWord) {
        foundText = true;
        if (equationTokens.length > 0 && /^\s+$/.test(equationTokens[equationTokens.length - 1])) {
          textTokens.push(equationTokens.pop());
        }
        textTokens.push(tokens[i]);
      } else {
        equationTokens.push(tokens[i]);
      }
    }
    
    const eqText = equationTokens.join('').trim();
    const remainingText = textTokens.join('');
    
    if (eqText.includes('=') && eqText.length > 3) {
      const hasMathIndicator = /[\_=^\\+\-*\/\[\]\d]/.test(eqText) || eqText.length > 8;
      if (hasMathIndicator) {
        return `$${eqText}$${remainingText}`;
      }
    }
    return match;
  });

  // Mask newly created raw equations
  maskPattern(/\$[^\$]+?\$/g);

  // Stage 3: Process inline equations/symbols wrapped in ( ... )
  const inlineRegex = /(?<![a-zA-Z0-9])\(\s*([^\(\)\r\n]+?)\s*\)(?=[\s\:\,\.\;\-\?\!\)]|$)/g;
  processed = processed.replace(inlineRegex, (match, content, offset, string) => {
    const trimmed = content.trim();
    const hasSpaces = match.startsWith('( ') && match.endsWith(' )');
    const isSingleChar = trimmed.length === 1 && /^[a-zA-Z\d]$/.test(trimmed);
    const hasMathSymbols = /[\_=^\\+\-*\/\[\]]/.test(trimmed);
    
    // Guard: do not replace if preceded by \left or followed by \right (with optional backslashes)
    const before = string.substring(0, offset);
    const after = string.substring(offset + match.length);
    const isStartOfLine = /^\s*$/.test(before) || /[\r\n]\s*$/.test(before);
    const isListItem = isStartOfLine && /^[a-d|i-j\d]$/i.test(trimmed);
    
    if (/\\?left\s*$/i.test(before) || /^\s*\\?right\b/i.test(after)) {
      return match;
    }
    
    if (trimmed.length <= 30 && (hasMathSymbols || (isSingleChar && !isListItem))) {
      return '$' + trimmed + '$';
    }
    return match;
  });

  // Mask newly created inline parenthesized blocks
  maskPattern(/\$[^\$]+?\$/g);

  // Stage 4: Process raw subscript variables, concentrations, and LaTeX keywords
  // a. Bracketed chemical concentrations/species, e.g. [S], [E], [ES], [P] (excluding markdown links)
  processed = processed.replace(/(?<!\\)\[\s*([a-zA-Z0-9\-\+]+)\s*\](?!\()/g, (match, content) => {
    if (content === ' ' || content === 'x' || content === 'X') {
      return match;
    }
    return `$[${content.trim()}]$`;
  });

  // b. Subscripted variables, e.g. V_max, V_{\text{max}}, K_m, k_d, C_A, C_{A0}, r_A
  const subscriptVarRegex = /\b([a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+_(?:[a-zA-Z0-9]+|\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}))(?![a-zA-Z0-9])/g;
  processed = processed.replace(subscriptVarRegex, (match) => {
    if (match.startsWith('MATHBLOCKPLACEHOLDERXYZ')) return match;
    return `$${match}$`;
  });

  // c. Raw LaTeX commands/Greek letters (excluding left/right layout modifiers)
  const rawLatexRegex = /\\(?!n|r|t|left|right\b)[a-zA-Z]+(?:\{[^{}]*\})*/g;
  processed = processed.replace(rawLatexRegex, (match, offset, string) => {
    const before = string.substring(Math.max(0, offset - 1), offset);
    const after = string.substring(offset + match.length, offset + match.length + 1);
    if (before === '$' && after === '$') {
      return match;
    }
    return `$${match}$`;
  });

  // Mask the newly created math blocks from Stage 4
  maskPattern(/\$[^\$]+?\$/g);

  // 5. Correct malformed LaTeX commands inside the masked math blocks (100% safe from URLs)
  const malformedLayoutRegex = /[\|\/]+\\?(frac|overline|underline|sqrt|left|right|begin|end)\b/g;
  const malformedSymbolRegex = /[\|\/]+(text|mathrm|mu|alpha|beta|gamma|delta|epsilon|theta|lambda|pi|rho|sigma|tau|phi|omega|partial|sum|int|infty|times|div|pm|mp|le|ge|ne|approx|hat|bar|tilde|dot|ddot|matrix|array|sin|cos|tan|ln|log|exp|deg)\b/g;

  mathBlocks.forEach(block => {
    block.content = block.content.replace(malformedLayoutRegex, '\\$1');
    block.content = block.content.replace(malformedSymbolRegex, '\\$1');
    
    // Auto-balance braces and \left/\right delimiters
    let delimStart = "";
    let delimEnd = "";
    let inner = block.content;
    
    if (block.content.startsWith('$$') && block.content.endsWith('$$')) {
      delimStart = '$$'; delimEnd = '$$';
      inner = block.content.slice(2, -2);
    } else if (block.content.startsWith('\\[') && block.content.endsWith('\\]')) {
      delimStart = '\\['; delimEnd = '\\]';
      inner = block.content.slice(2, -2);
    } else if (block.content.startsWith('\\(') && block.content.endsWith('\\)')) {
      delimStart = '\\('; delimEnd = '\\)';
      inner = block.content.slice(2, -2);
    } else if (block.content.startsWith('$') && block.content.endsWith('$')) {
      delimStart = '$'; delimEnd = '$';
      inner = block.content.slice(1, -1);
    }
    
    inner = inner.trim();
    inner = balanceMathBraces(inner);
    
    const leftCount = (inner.match(/\\left\b/g) || []).length;
    const rightCount = (inner.match(/\\right\b/g) || []).length;
    if (leftCount > rightCount) {
      inner += ' \\right.'.repeat(leftCount - rightCount);
    }
    
    if (delimStart === '$$' || delimStart === '\\[') {
      block.content = `${delimStart}\n${inner}\n${delimEnd}`;
    } else if (delimStart === '$' || delimStart === '\\(') {
      block.content = `${delimStart}${inner}${delimEnd}`;
    } else {
      block.content = inner;
    }
  });

  return { processed, mathBlocks };
};

const preprocessAndUnmask = (text) => {
  const { processed, mathBlocks } = preprocessMarkdownMath(text);
  let restored = processed;
  for (let i = mathBlocks.length - 1; i >= 0; i--) {
    restored = restored.replace(mathBlocks[i].placeholder, () => mathBlocks[i].content);
  }
  const globalLayoutRegex = /(?<![a-zA-Z0-9\:\.\/])[\|\/]+\\?(frac|overline|underline|sqrt|left|right|begin|end)\b/g;
  const globalSymbolRegex = /(?<![a-zA-Z0-9\:\.\/])[\|\/]+(text|mathrm|mu|alpha|beta|gamma|delta|epsilon|theta|lambda|pi|rho|sigma|tau|phi|omega|partial|sum|int|infty|times|div|pm|mp|le|ge|ne|approx|hat|bar|tilde|dot|ddot|matrix|array|sin|cos|tan|ln|log|exp|deg)\b/g;
  restored = restored.replace(globalLayoutRegex, '\\$1');
  restored = restored.replace(globalSymbolRegex, '\\$1');
  return restored;
};

// Test suite
const testCases = [
  {
    name: "Standard display equation with vertical bar prefix",
    input: "$$ \\overline{w}2 = |frac{|\\overline{x}{SP} - \\overline{x}1}{1 - |overline{x}{SP}} $$",
    expected: "$$\n\\overline{w}2 = \\frac{\\overline{x}{SP} - \\overline{x}1}{1 - \\overline{x}{SP}}\n$$"
  },
  {
    name: "Standard LaTeX display equation with vertical bar prefix",
    input: "\\[ \\overline{w}2 = |frac{|\\overline{x}{SP} - \\overline{x}1}{1 - |overline{x}{SP}} \\]",
    expected: "\\[\n\\overline{w}2 = \\frac{\\overline{x}{SP} - \\overline{x}1}{1 - \\overline{x}{SP}}\n\\]"
  },
  {
    name: "Derivative and parentheses inside display math",
    input: "$$ V \\frac{dc_A}{dt} = w(c_{A0} - c_A) - V r $$",
    expected: "$$\nV \\frac{dc_A}{dt} = w(c_{A0} - c_A) - V r\n$$"
  },
  {
    name: "Derivative and parentheses inside standard LaTeX block",
    input: "\\[ \\rho V C \\frac{dT}{dt} = w C (T_i - T) + \\Delta H_r r V + Q \\]",
    expected: "\\[\n\\rho V C \\frac{dT}{dt} = w C (T_i - T) + \\Delta H_r r V + Q\n\\]"
  },
  {
    name: "Left/right delimiter guard check in text",
    input: "Formula contains \\left( x \\right) or left(y)right symbols.",
    expected: "Formula contains \\left( x \\right) or left(y)right symbols."
  },
  {
    name: "Absolute value of Greek letter preserved",
    input: "$$ |\\mu| + |\\theta| $$",
    expected: "$$\n|\\mu| + |\\theta|\n$$"
  },
  {
    name: "URLs are fully preserved",
    input: "Check URL https://example.com/text and http://example.com/matrix for safety.",
    expected: "Check URL https://example.com/text and http://example.com/matrix for safety."
  },
  {
    name: "Inline variables converted",
    input: "The variable ( \\mu ) and ( v ) and ( C_A ) are inline.",
    expected: "The variable $\\mu$ and $v$ and $C_A$ are inline."
  },
  {
    name: "Truncated display equation auto-closing and brace-balancing",
    input: "[ \\mathcal{L}\\left\\{\\frac{d^n f(t)}{dt^n}\\right\\} = s^n F(s) - s^{n",
    expected: "\n$$\n\\mathcal{L}\\left\\{\\frac{d^n f(t)}{dt^n}\\right\\} = s^n F(s) - s^{n}\n$$\n"
  },
  {
    name: "Dangling left delimiter auto-closing",
    input: "$$ \\int_0^\\infty e^{-st} \\left( f(t) \\right. $$",
    expected: "$$\n\\int_0^\\infty e^{-st} \\left( f(t) \\right.\n$$"
  },
  {
    name: "Truncated left delimiter auto-closing (missing right)",
    input: "$$ F(s) = \\int \\left( e^{-st} f(t) $$",
    expected: "$$\nF(s) = \\int \\left( e^{-st} f(t) \\right.\n$$"
  },
  {
    name: "Raw equations formatted using LaTeX delimiters",
    input: "The model is v = V_max [S] / (K_m + [S]) with parameters.",
    expected: "The model is $v = V_max [S] / (K_m + [S])$ with parameters."
  },
  {
    name: "Raw concentrations formatted using LaTeX delimiters",
    input: "The substrate concentration [S] decreases over time.",
    expected: "The substrate concentration $[S]$ decreases over time."
  },
  {
    name: "Raw subscript variables formatted using LaTeX delimiters",
    input: "Michaelis constant K_m is a kinetic constant.",
    expected: "Michaelis constant $K_m$ is a kinetic constant."
  },
  {
    name: "Raw subscript variables with nested braces formatted",
    input: "Initial velocity V_{\\text{max}} represents peak rate.",
    expected: "Initial velocity $V_{\\text{max}}$ represents peak rate."
  },
  {
    name: "Parenthesized single variables converted while preserving list bullets",
    input: "(a) The velocity (v) decreases.\n(b) Substrate (S) binds to enzyme (E).",
    expected: "(a) The velocity $v$ decreases.\n(b) Substrate $S$ binds to enzyme $E$."
  }
];

let failed = 0;
testCases.forEach((tc, idx) => {
  const output = preprocessAndUnmask(tc.input);
  if (output === tc.expected) {
    console.log(`[PASS] Test ${idx + 1}: ${tc.name}`);
  } else {
    console.log(`[FAIL] Test ${idx + 1}: ${tc.name}`);
    console.log(`  Input:    ${tc.input}`);
    console.log(`  Expected: ${JSON.stringify(tc.expected)}`);
    console.log(`  Got:      ${JSON.stringify(output)}`);
    failed++;
  }
});

process.exit(failed);
