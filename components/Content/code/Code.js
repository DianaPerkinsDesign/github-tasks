import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import monokai from "react-syntax-highlighter/dist/cjs/styles/hljs/monokai";
import { solidity } from "highlightjs-solidity";

// This is created using react-syntax-highlighter. There's a way to send props to it using `wrapLines` and `lineProps`. It'd be cool if clicking an issue scrolled you in the code properly, but at the very least, we could highlight the referenced lines using this. - 🍔

const Code = ({ codeString }) => {
  SyntaxHighlighter.registerLanguage("solidity", solidity);
  console.log(SyntaxHighlighter.supportedLanguages);
  return (
    <SyntaxHighlighter language="solidity" style={monokai} showLineNumbers>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default Code;
