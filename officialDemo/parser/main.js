/*
 * @Author: MrAlenZhong
 * @Date: 2023-04-04 12:01:12
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-04-04 17:44:01
 * @Description: 
 */
const parse = require("./parsing").parse

let inputText = "SELECT column1 FROM table2"
// step into the parse function to debug the full flow
parse(inputText)


// no output here so nothing to show...