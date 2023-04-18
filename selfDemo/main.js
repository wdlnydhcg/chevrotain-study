/*
 * @Author: MrAlenZhong
 * @Date: 2023-04-12 18:47:57
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-04-14 18:49:38
 * @Description: 
 */

const fs = require('fs');
const path = require('path');
const { lex } = require("./src/lexer")
const { parse } = require("./src/parser")
const { toAst } = require("./src/actions")



const inputText = fs.readFileSync(path.resolve(__dirname,"./demo.rdl"),'utf-8').toString();

console.log("toAst(inputText)  ",toAst(inputText));
