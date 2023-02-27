import { GraphQLSchema, defaultFieldResolver } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils/typings";
import { Logger } from "../../common";

export const upperDirectiveTransformer = (
    schema: GraphQLSchema,
    directiveName: string
): GraphQLSchema =>
    mapSchema(schema, {
        [MapperKind.TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.SCALAR_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.SCALAR_TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.ENUM_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.ENUM_TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.COMPOSITE_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.COMPOSITE_TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.OBJECT_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.OBJECT_TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.INPUT_OBJECT_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.INPUT_OBJECT_TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.ABSTRACT_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.ABSTRACT_TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.UNION_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.UNION_TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.INTERFACE_TYPE]: (type, schema) => {
            Logger.info({
                message: MapperKind.INTERFACE_TYPE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.ROOT_OBJECT]: (type, schema) => {
            Logger.info({
                message: MapperKind.ROOT_OBJECT,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.QUERY]: (type, schema) => {
            Logger.info({
                message: MapperKind.QUERY,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.MUTATION]: (type, schema) => {
            Logger.info({
                message: MapperKind.MUTATION,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.SUBSCRIPTION]: (type, schema) => {
            Logger.info({
                message: MapperKind.SUBSCRIPTION,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.ENUM_VALUE]: (type, schema) => {
            Logger.info({
                message: MapperKind.ENUM_VALUE,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.FIELD]: (type, schema) => {
            Logger.info({
                message: MapperKind.FIELD,
                type,
                schema,
            });
            return null;
        },
        // Executes once for each object field in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName, schema) => {
            Logger.info({
                message: MapperKind.OBJECT_FIELD,
                fieldName,
                typeName,
                schema,
            });
            // Check whether this field has the specified directive
            const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

            if (!upperDirective) {
                return;
            }
            // Get this field's original resolver
            const { resolve = defaultFieldResolver } = fieldConfig;

            // Replace the original resolver with a function that *first* calls
            // the original resolver, then converts its result to upper case
            return {
                ...fieldConfig,
                resolve: async function (
                    source,
                    args,
                    context,
                    info
                ): Promise<string | unknown> {
                    const result = await resolve(source, args, context, info);
                    return typeof result === "string" ? result.toUpperCase() : result;
                },
            };
        },
        [MapperKind.ROOT_FIELD]: (type, schema) => {
            Logger.info({
                message: MapperKind.ROOT_FIELD,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.QUERY_ROOT_FIELD]: (type, schema) => {
            Logger.info({
                message: MapperKind.QUERY_ROOT_FIELD,

                type,
                schema,
            });
            return null;
        },
        [MapperKind.MUTATION_ROOT_FIELD]: (type, schema) => {
            Logger.info({
                message: MapperKind.MUTATION_ROOT_FIELD,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.SUBSCRIPTION_ROOT_FIELD]: (type, schema) => {
            Logger.info({
                message: MapperKind.SUBSCRIPTION_ROOT_FIELD,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.INTERFACE_FIELD]: (fieldConfig, fieldName, typeName, schema) => {
            fieldConfig;
            fieldName;
            typeName;
            schema;
            Logger.info({
                message: MapperKind.INTERFACE_FIELD,
                fieldConfig,
                fieldName,
                typeName,
                schema,
            });
            return null;
        },
        [MapperKind.COMPOSITE_FIELD]: (type, schema) => {
            Logger.info({
                message: MapperKind.COMPOSITE_FIELD,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.INPUT_OBJECT_FIELD]: (type, schema) => {
            Logger.info({
                message: MapperKind.INPUT_OBJECT_FIELD,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.ARGUMENT]: (type, schema) => {
            Logger.info({
                message: MapperKind.ARGUMENT,
                type,
                schema,
            });
            return null;
        },
        [MapperKind.DIRECTIVE]: (directive, schema) => {
            Logger.info({
                message: MapperKind.DIRECTIVE,
                directive,
                schema,
            });
            return null;
        },
    });
