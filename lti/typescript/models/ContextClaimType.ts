/**
 * Learning Tools Interoperability Version 1.3 Final Release JSON Schema Binding (schema-deeplinkingrequest)
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { ContextClaimTypeTypeInner } from '../models/ContextClaimTypeTypeInner';
import { HttpFile } from '../http/http';

/**
* This is the container for the set of claims for the context from within which the resource link occurs.
*/
export class ContextClaimType {
    /**
    * Model Primitive Datatype = String. Stable identifier that uniquely identifies the context from which the LTI message initiates. This MUST be locally unique to the 'deployment_id.
    */
    'id': string;
    /**
    * Model Primitive Datatype = String. Short descriptive name for the context.
    */
    'label'?: string;
    /**
    * Model Primitive Datatype = String. Full descriptive name for the context.
    */
    'title'?: string;
    /**
    * An array of URI values for context types. The contained values come from either the associated enumerated vocabulary or a proprietary URI.
    */
    'type'?: Array<ContextClaimTypeTypeInner>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": ""
        },
        {
            "name": "label",
            "baseName": "label",
            "type": "string",
            "format": ""
        },
        {
            "name": "title",
            "baseName": "title",
            "type": "string",
            "format": ""
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "Array<ContextClaimTypeTypeInner>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ContextClaimType.attributeTypeMap;
    }

    public constructor() {
    }
}
