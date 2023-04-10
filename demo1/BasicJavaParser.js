import { CstParser } from 'chevrotain'
import * as L from './BasicJavaLexer'

export default class BasicJavaParser extends CstParser {
    constructor() {
        super(L.basicJavaTokens, {
            recoveryEnabled: true,
        })

        const $ = this

        $.RULE('classDeclaration', () => {
            $.CONSUME(L.Public)
            $.CONSUME(L.Class)
            $.CONSUME(L.Identifier)
            $.CONSUME(L.LCurly)

            $.MANY({
                DEF: () => {
                    $.SUBRULE($.memberDeclaration)
                },
            })

            $.CONSUME(L.RCurly)
        })

        $.RULE('memberDeclaration', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.attributeDeclaration) },
                { ALT: () => $.SUBRULE($.methodDeclaration) },
            ])
        })

        $.RULE('attributeDeclaration', () => {
            $.CONSUME(L.Private)
            $.CONSUME(L.Final)
            $.SUBRULE($.type)
            $.CONSUME(L.Identifier)
            $.CONSUME(L.SemiColon)
        })

        $.RULE('methodDeclaration', () => {
            $.CONSUME(L.Public)
            $.SUBRULE($.type)
            $.CONSUME(L.Identifier)
            $.CONSUME(L.LBracket)

            $.OPTION(() => {
                $.SUBRULE($.parameterList)
            })

            $.CONSUME(L.RBracket)
            $.CONSUME(L.LCurly)

            $.MANY({
                DEF: () => {
                    $.SUBRULE($.statement)
                },
            })

            $.CONSUME(L.RCurly)
        })

        $.RULE('type', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.builtInType) },
                { ALT: () => $.CONSUME(L.Identifier) },
            ])
        })

        $.RULE('builtInType', () => {
            $.OR([
                { ALT: () => $.CONSUME(L.Int) },
                { ALT: () => $.CONSUME(L.Double) },
                { ALT: () => $.CONSUME(L.Void) },
            ])
        })

        $.RULE('parameterList', () => {
            $.SUBRULE($.type)
            $.CONSUME(L.Identifier)

            $.MANY({
                DEF: () => {
                    $.CONSUME(L.Comma)
                    $.SUBRULE1($.type)
                    $.CONSUME1(L.Identifier)
                },
            })
        })

        $.RULE('statement', () => {
            $.CONSUME(L.Identifier)
            $.CONSUME(L.SemiColon)
        })

        // very important to call this after all the rules have been setup.
        // otherwise the parser may not work correctly as it will lack information
        // derived from the self analysis.
        this.performSelfAnalysis()
    }
}
