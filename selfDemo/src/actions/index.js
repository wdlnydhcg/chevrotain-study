/*
 * @Author: MrAlenZhong
 * @Date: 2023-04-14 16:42:21
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2023-04-18 11:16:56
 * @Description: 
 */
const { lex } = require("../lexer");
const {  SelfParser,parserInstance, parse} = require("../parser");
const BaseCstVisitor = parserInstance.getBaseCstVisitorConstructor();
class AstVisitor extends BaseCstVisitor {
    constructor() {
        super()
        this.validateVisitor()
    }

    start(ctx){
        const ast = {
            // applications: [],
            // deployments: [],
            // constants: {},
            struct: [],
            // relationships: [],
            // enums: [],
            // options: {},
            // useOptions: [],
        };
        if (ctx.structStatement) {
            ast.struct = ctx.structStatement.map(this.visit, this);
        }
        return ast;
    }
    
    structStatement(ctx) {
        const name = ctx.Name[0].image;
        let tableName = name;
        let body = [];
        if (ctx.structBody) {
            body = this.visit(ctx.structBody);
        }
        return {
            name,
            body
        }
    }
    
    structBody(ctx) {
        if (!ctx.fieldDeclaration) {
            return [];
        }
        return ctx.fieldDeclaration.map(element => this.visit(element));
    }
    
    fieldDeclaration(ctx) {
        return {
            name: ctx.Name[0].image,
            type: this.visit(ctx.fieldType),
        }
    }

    fieldType(ctx) {
        return ctx.Name[0].image;
    }
}

const toAstVisitorInstance = new AstVisitor();

module.exports = {
    toAst: function (inputText) {
        const cst = parse(inputText);
        const ast = toAstVisitorInstance.visit(cst)
        return ast
    }
  }