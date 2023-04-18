/*
 * @Author: MrAlenZhong
 * @Date: 2023-04-12 18:54:07
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-04-18 10:10:06
 * @Description: 
 */
"use strict"
const { Lexer, createToken } = require('chevrotain');

const tokenVocabulary = {};

const WhiteSpace = createToken({
    name: 'WhiteSpace',
    pattern: /[\n\t\r \u2028\u2029]+/,
    group: Lexer.SKIPPED,
});

const Struct = createToken({ 
    name: 'Struct', 
    pattern: 'struct' 
});

const Name = createToken({ 
    name: "Name", 
    pattern: /[a-zA-Z]\w*/ 
})

const Lcurly = createToken({ 
    name: 'Lcurly', 
    pattern: '{' 
});

const Rcurly = createToken({ 
    name: 'Rcurly', 
    pattern: '}' 
});

const Colon = createToken({ 
    name: 'Colon', 
    pattern: ':' 
});

const Comma = createToken({ 
    name: "Comma", 
    pattern: ','
})

const allTokens = [
    WhiteSpace,
    Struct,
    Name,
    // TypeName,
    Colon,
    Lcurly,
    Rcurly,
    Comma,
];

const SelfLexer = new Lexer(allTokens);
allTokens.forEach((tokenType) => {
    tokenVocabulary[tokenType.name] = tokenType
})


module.exports = {
    tokenVocabulary: tokenVocabulary,
    lex: function (inputText) {
        const lexingResult = SelfLexer.tokenize(inputText)
        if (lexingResult.errors.length > 0) {
            throw Error("lexing errors detected!\n" +
                lexingResult.errors[0].message
            )
        }
      return lexingResult
    }
}