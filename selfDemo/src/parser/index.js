/*
 * @Author: MrAlenZhong
 * @Date: 2023-04-12 20:27:59
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-04-14 19:05:52
 * @Description: 
 */
const { CstParser } = require('chevrotain');
const { lex, tokenVocabulary: tokens } = require("../lexer");


// ----------------- parser -----------------
class SelfParser extends CstParser {
    constructor() {
      super(tokens);
      const $ = this;
      $.RULE("start", () => {
        this.MANY(() => {
          this.OR([
            {ALT: () => {$.SUBRULE(this.structStatement)}},
          ])
        })
      })

      $.RULE("structStatement", () => {
        $.CONSUME(tokens.Struct)
        $.CONSUME(tokens.Name)
        $.SUBRULE(this.structBody);
      })

      $.RULE('structBody', () => {
        $.CONSUME(tokens.Lcurly);
        $.MANY(() => {
          $.SUBRULE(this.fieldDeclaration);
          $.OPTION(() => {
            $.CONSUME(tokens.Comma);
          });
        });
        $.CONSUME(tokens.Rcurly);
      });

      $.RULE('fieldDeclaration', () => {
        $.CONSUME(tokens.Name);
        $.CONSUME(tokens.Colon);
        this.SUBRULE(this.fieldType);
        $.OPTION(() => {
            $.CONSUME(tokens.Comma);
        });
      })

      $.RULE('fieldType', () => {
        this.CONSUME(tokens.Name);
      });
      
      this.performSelfAnalysis()
    }
}
const parserInstance = new SelfParser()

module.exports = {
    parserInstance: parserInstance,
    
    SelfParser: SelfParser,
    
    parse: function (inputText) {  
      const lexResult = lex(inputText);
      parserInstance.input = lexResult.tokens;
      const cst = parserInstance.start()
      if (parserInstance.errors.length > 0) {
        throw Error(
          "parsing errors detected!\n" +
            parserInstance.errors[0].message
        )
      }
      return cst
    }
  }