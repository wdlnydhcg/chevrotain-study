/*
 * @Author: MrAlenZhong
 * @Date: 2023-04-04 11:33:26
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-04-04 11:33:45
 * @Description: 
 */
import { createToken, Lexer } from 'chevrotain'

export const Public = createToken({ name: 'Public', pattern: /public\b/ })
export const Private = createToken({ name: 'Private', pattern: /private\b/ })
export const Final = createToken({ name: 'Final', pattern: /final\b/ })
export const Class = createToken({ name: 'Class', pattern: /class\b/ })
export const Void = createToken({ name: 'Void', pattern: /void\b/ })
export const Int = createToken({ name: 'Int', pattern: /int\b/ })
export const Double = createToken({ name: 'Double', pattern: /double\b/ })
export const Identifier = createToken({
    name: 'Identifier',
    pattern: /[a-zA-Z]\w*/,
})

export const SemiColon = createToken({ name: 'SemiColon', pattern: /;/ })
export const LCurly = createToken({ name: 'LCurly', pattern: /{/ })
export const RCurly = createToken({ name: 'RCurly', pattern: /}/ })
export const LBracket = createToken({ name: 'LBracket', pattern: /\(/ })
export const RBracket = createToken({ name: 'RBracket', pattern: /\)/ })
export const Comma = createToken({ name: 'Comma', pattern: /,/ })

export const WhiteSpace = createToken({
    name: 'WhiteSpace',
    pattern: /\s+/,
    group: Lexer.SKIPPED,
})

export const basicJavaTokens = [
    WhiteSpace,
    Public,
    Private,
    Final,
    Class,
    Void,
    Int,
    Double,
    // Generic identifier
    Identifier,
    SemiColon,
    LCurly,
    RCurly,
    LBracket,
    RBracket,
    Comma,
]

export default class BasicJavaLexer extends Lexer {
    constructor() {
        super(basicJavaTokens, {
            // Less position info tracked, reduces verbosity of the playground output.
            positionTracking: 'onlyStart',
        })
    }
}

SemiColon.LABEL = "';'"
LCurly.LABEL = "'{'"
RCurly.LABEL = "'}'"
LBracket.LABEL = "'('"
RBracket.LABEL = "')'"
Comma.LABEL = "','"
