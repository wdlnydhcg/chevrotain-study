/*
 * @Author: MrAlenZhong
 * @Date: 2023-04-04 12:03:04
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-04-04 18:49:59
 * @Description: 
 */
const assert = require("assert")
const toAstVisitor = require("./actions_visitor").toAst
const toAstEmbedded = require("./actions_embedded").toAst

let inputText = "SELECT column1, column2 FROM table2 WHERE column2 > 3"

let astFromVisitor = toAstVisitor(inputText)
let astFromEmbedded = toAstEmbedded(inputText)

console.log("result : ",JSON.stringify(astFromVisitor, null, "\t"))

assert.deepEqual(
  astFromVisitor,
  astFromEmbedded,
  "Both ASTs should be identical"
)