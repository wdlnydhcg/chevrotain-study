import BasicJavaParser from './BasicJavaParser'

const parser = new BasicJavaParser()
const BaseVisitor = parser.getBaseCstVisitorConstructor()

export default class BasicJavaVisitor extends BaseVisitor {
    constructor() {
        super()
        this.validateVisitor()
    }

    classDeclaration(ctx) {
        const className = ctx.Identifier[0].image
        const members = ctx.memberDeclaration
            ? ctx.memberDeclaration.map((md) => this.visit(md))
            : []

        return {
            type: 'CLASS_DECLARATION',
            className,
            members,
        }
    }

    memberDeclaration(ctx) {
        if (ctx.attributeDeclaration) {
            return this.visit(ctx.attributeDeclaration)
        } else if (ctx.methodDeclaration) {
            return this.visit(ctx.methodDeclaration)
        } else {
            throw new Error(`Invalid memberDeclaration encountered: '${ctx}'.`)
        }
    }

    attributeDeclaration(ctx) {
        const attributeType = this.visit(ctx.type)
        const attributeName = ctx.Identifier[0].image

        return {
            type: 'ATTRIBUTE_DECLARATION',
            attributeType,
            attributeName,
        }
    }

    methodDeclaration(ctx) {
        let parameters
        if (ctx.parameterList) {
            parameters = this.visit(ctx.parameterList)
        } else {
            parameters = null
        }

        const statements = ctx.statement
            ? ctx.statement.map((st) => this.visit(st))
            : []

        return {
            type: 'METHOD_DECLARATION',
            returnType: this.visit(ctx.type),
            methodName: ctx.Identifier[0].image,
            parameters,
            statements,
        }
    }

    type(ctx) {
        if (ctx.builtInType) {
            return this.visit(ctx.builtInType)
        } else {
            return ctx.Identifier[0].image
        }
    }

    builtInType(ctx) {
        if (ctx.Int) {
            return ctx.Int[0].image
        } else if (ctx.Double) {
            return ctx.Double[0].image
        } else {
            return ctx.Void[0].image
        }
    }

    parameterList(ctx) {
        const types = ctx.type.map((t) => this.visit(t))
        const names = ctx.Identifier.map((id) => id.image)

        const parameters = []
        for (let i = 0; i < types.length; i++) {
            parameters[i] = {
                type: 'PARAMETER',
                parameterType: types[i],
                parameterName: names[i],
            }
        }
        return parameters
    }

    statement(ctx) {
        return ctx.Identifier[0].image
    }
}
