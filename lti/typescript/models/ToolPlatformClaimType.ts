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

import { HttpFile } from '../http/http';

/**
* The set of claims for the properties associated with the platform initiating the launch.
*/
export class ToolPlatformClaimType {
    /**
    * Model Primitive Datatype = String. A stable locally unique, to the 'iss' identifier, for an instance of the tool platform.
    */
    'guid': string;
    /**
    * Model Primitive Datatype = String. Administrative contact email for the platform instance.
    */
    'contactEmail'?: string;
    /**
    * Model Primitive Datatype = String. A human readable description of the platform instance.
    */
    'description'?: string;
    /**
    * Model Primitive Datatype = String. Name for the platform instance.
    */
    'name'?: string;
    /**
    * Model Primitive Datatype = String. Home HTTPS URL endpoint for the platform instance.
    */
    'url'?: string;
    /**
    * Model Primitive Datatype = String. Vendor product family code for the type of platform.
    */
    'productFamilyCode'?: string;
    /**
    * Model Primitive Datatype = String. Vendor product version for the platform.
    */
    'version'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "guid",
            "baseName": "guid",
            "type": "string",
            "format": ""
        },
        {
            "name": "contactEmail",
            "baseName": "contact_email",
            "type": "string",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": ""
        },
        {
            "name": "url",
            "baseName": "url",
            "type": "string",
            "format": ""
        },
        {
            "name": "productFamilyCode",
            "baseName": "product_family_code",
            "type": "string",
            "format": ""
        },
        {
            "name": "version",
            "baseName": "version",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ToolPlatformClaimType.attributeTypeMap;
    }

    public constructor() {
    }
}
