const colours = {
  dark: {
    fg: "#fcfcfa",
    bg: "#2d2b2d",
    comment: "#727072",
    gray: "#939293",
    purple: "#ab9df2",
    yellow: "#ffd866",
    red: "#ff6188",
    orange: "#fc9867",
    green: "#a9dc76",
    blue: "#78dce8",
    highlightBg: "#403e41"
  },
  light: {
    fg: "#221f22",
    bg: "#eeeeec",
    comment: "#a2a19c",
    gray: "#a2a19c",
    purple: "#684d99",
    yellow: "#998f2f",
    red: "#f9005a",
    orange: "#e14e05",
    green: "#679c00",
    blue: "#0089b3",
    highlightBg: "#e6e3c3"
  }
}

function monokai(theme) {
  return {
    "code[class*=\"language-\"]": {
      "MozTabSize": "2",
      "OTabSize": "2",
      "tabSize": "2",
      "WebkitHyphens": "none",
      "MozHyphens": "none",
      "msHyphens": "none",
      "hyphens": "none",
      "whiteSpace": "pre-wrap",
      "wordWrap": "normal",
      "fontSize": "0.75rem",
      "color": colours[theme].fg,
      "textShadow": "none"
    },
    "pre[class*=\"language-\"]": {
      "MozTabSize": "2",
      "OTabSize": "2",
      "tabSize": "2",
      "WebkitHyphens": "none",
      "MozHyphens": "none",
      "msHyphens": "none",
      "hyphens": "none",
      "whiteSpace": "pre-wrap",
      "wordWrap": "normal",
      "fontSize": "0.75rem",
      "color": colours[theme].fg,
      "textShadow": "none",
      "background": colours[theme].bg,
      "padding": "1rem",
      "borderRadius": "0.25rem",
      "overflow": "auto",
      "position": "relative"
    },
    "pre > code[class*=\"language-\"]": {
      "fontSize": "0.75rem"
    },
    "pre[class*=\"language-\"] code": {
      "whiteSpace": "pre",
      "display": "block"
    },
    "namespace":          { "Opacity": ".7" },
    "comment":            { "color": colours[theme].comment },
    "punctuation":        { "color": colours[theme].gray },
    "keyword":            { "color": colours[theme].red },
    "module":             { "fontStyle": "italic" },
    "operator":           { "color": colours[theme].red },
    "script-punctuation": { "color": colours[theme].red },
    "function":           { "color": colours[theme].green },
    "parameter":          { "color": colours[theme].orange },
    "variable":           { "color": colours[theme].orange },
    "unit":               { "color": colours[theme].red },
    "property":           { "color": colours[theme].blue },
    "class-name":         { "color": colours[theme].blue },
    "string":             { "color": colours[theme].yellow },
    "attrName":           { "color": colours[theme].green },
    "tag":                { "color": colours[theme].purple },
    "template-string":    { "color": colours[theme].yellow },
    "number":             { "color": colours[theme].purple },
    "boolean":            { "color": colours[theme].purple },
    "null":               { "color": colours[theme].purple },
    "regex":              { "color": colours[theme].blue },
    "important":          { "color": colours[theme].red },
    "script":             { "color": colours[theme].fg }
  };
}

const monokaiDark = monokai("dark");
const monokaiLight = monokai("light");

export { monokaiDark, monokaiLight };
