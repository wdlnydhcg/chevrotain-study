/*
 * @Author: MrAlenZhong
 * @Date: 2023-04-04 12:00:18
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-04-04 17:56:49
 * @Description: 
 */
const lex = require("./lexing").lex

const inputText = "   SELECT column1 FROM table2"
const lexingResult = lex(inputText)
// console.log("lexingResult = ",JSON.stringify(lexingResult, null, "\t"))