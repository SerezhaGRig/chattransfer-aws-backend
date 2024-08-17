import * as readline from "node:readline";
import { htmlToText } from "html-to-text";

import { parseDOM } from "htmlparser2";
import { marked } from "marked";

const rl = readline.createInterface(process.stdin, process.stdout);
export const question = function (q: string): Promise<string> {
  return new Promise((res) => {
    rl.question(q, (answer) => {
      res(answer);
    });
  });
};

const isWellFormedHtml = (html: string) => {
  try {
    parseDOM(html);
    return true; // Parsing succeeded, so HTML is likely well-formed
  } catch (error) {
    return false; // Parsing failed, so HTML is likely malformed
  }
};

const cleanHtml = (html: string) => {
  if (isWellFormedHtml(html)) {
    return html; // Use well-formed HTML
  } else {
    console.warn("Malformed HTML detected. Stripping tags.");
    return htmlToText(html); // Convert malformed HTML to plain text, too
  }
};

export const markedToHtml = async (text: string) => {
  const parsed = (await marked.parse(text))
    .replace(/>\n</g, "><")
    .replace(/\n$/g, "");
  return cleanHtml(parsed);
};
