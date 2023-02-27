import { GraphQLSchema } from "graphql";
import { mapSchema, MapperKind } from "@graphql-tools/utils";
import { Logger } from "../common";
import { gql } from "graphql-tag";

const customDirectiveTransformer = (schema: GraphQLSchema): GraphQLSchema =>
    mapSchema(schema, {
        // [MapperKind.TYPE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.TYPE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.SCALAR_TYPE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.SCALAR_TYPE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.ENUM_TYPE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.ENUM_TYPE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.COMPOSITE_TYPE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.COMPOSITE_TYPE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.OBJECT_TYPE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.OBJECT_TYPE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        [MapperKind.INPUT_OBJECT_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.INPUT_OBJECT_TYPE,
                type,
                schema,
            });
            return type;
        },
        // [MapperKind.ABSTRACT_TYPE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.ABSTRACT_TYPE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.UNION_TYPE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.UNION_TYPE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.INTERFACE_TYPE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.INTERFACE_TYPE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.ROOT_OBJECT]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.ROOT_OBJECT,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.QUERY]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.QUERY,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.MUTATION]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.MUTATION,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.SUBSCRIPTION]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.SUBSCRIPTION,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.ENUM_VALUE]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.ENUM_VALUE,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.FIELD]: (fieldConfig, fieldName, typeName, schema) => {
        //     if (
        //         !getDirective(schema, fieldConfig, "cursor_forward")?.[0] &&
        //         !getDirective(schema, fieldConfig, "cursor_backward")?.[0]
        //     ) {
        //         return fieldConfig;
        //     }
        //     Logger.info({
        //         message: "Yes",
        //         fieldConfig,
        //         fieldName,
        //         typeName,
        //         schema,
        //     });

        //     return fieldConfig;
        // },
        // Executes once for each object field in the schema
        // [MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName, schema) => {
        //     Logger.info({
        //         message: MapperKind.OBJECT_FIELD,
        //         fieldName,
        //         typeName,
        //         schema,
        //     });
        //     return fieldConfig;
        //     Check whether this field has the specified directive
        //     const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

        //     if (!upperDirective) {
        //         return;
        //     }
        //     // Get this field's original resolver
        //     const { resolve = defaultFieldResolver } = fieldConfig;

        //     // Replace the original resolver with a function that *first* calls
        //     // the original resolver, then converts its result to upper case
        //     return {
        //         ...fieldConfig,
        //         resolve: async function (
        //             source,
        //             args,
        //             context,
        //             info
        //         ): Promise<string | unknown> {
        //             const result = await resolve(source, args, context, info);
        //             return result;
        //         },
        //     };
        // },
        // [MapperKind.ROOT_FIELD]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.ROOT_FIELD,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.QUERY_ROOT_FIELD]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.QUERY_ROOT_FIELD,

        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.MUTATION_ROOT_FIELD]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.MUTATION_ROOT_FIELD,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.SUBSCRIPTION_ROOT_FIELD]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.SUBSCRIPTION_ROOT_FIELD,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.INTERFACE_FIELD]: (fieldConfig, fieldName, typeName, schema) => {
        //     fieldConfig;
        //     fieldName;
        //     typeName;
        //     schema;
        //     Logger.info({
        //         message: MapperKind.INTERFACE_FIELD,
        //         fieldConfig,
        //         fieldName,
        //         typeName,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.COMPOSITE_FIELD]: (type, schema) => {
        //     Logger.info({
        //         message: MapperKind.COMPOSITE_FIELD,
        //         type,
        //         schema,
        //     });
        //     return null;
        // },
        // [MapperKind.INPUT_OBJECT_FIELD]: (fieldConfig, fieldName, typeName, schema) => {
        //     Logger.info({
        //         message: MapperKind.INPUT_OBJECT_FIELD,
        //         fieldConfig,
        //         fieldName,
        //         typeName,
        //         schema,
        //     });
        //     return fieldConfig;
        // },
        // [MapperKind.ARGUMENT]: (argumentConfig, fieldName) => {
        //     if (
        //         !getDirective(schema, argumentConfig, "cursor_forward")?.[0] &&
        //         !getDirective(schema, argumentConfig, "cursor_backward")?.[0]
        //     ) {
        //         return argumentConfig;
        //     }
        //     Logger.info({
        //         message: MapperKind.ARGUMENT,
        //         argumentConfig,
        //         type: argumentConfig.type,
        //         astNode: argumentConfig.astNode,
        //         fieldName,
        //         // typeName,
        //         // schema,
        //     });
        //     return {
        //         ...argumentConfig,
        //         type: argumentConfig.type,
        //     };
        // },
        // [MapperKind.DIRECTIVE]: (directive, schema) => {
        //     Logger.info({
        //         message: MapperKind.DIRECTIVE,
        //         directive,
        //         schema,
        //     });
        //     return null;
        // },
    });

export const customDirective = () =>
    ({
        customDirectiveTypeDefs: gql`
            directive @cursor_forward on FIELD_DEFINITION | INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
            directive @cursor_backward on FIELD_DEFINITION | INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
        `,
        customDirectiveTransformer,
    } as const);
