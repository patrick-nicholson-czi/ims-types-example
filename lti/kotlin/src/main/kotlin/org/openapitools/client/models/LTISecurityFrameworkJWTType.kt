/**
 *
 * Please note:
 * This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit this file manually.
 *
 */

@file:Suppress(
    "ArrayInDataClass",
    "EnumEntryName",
    "RemoveRedundantQualifierName",
    "UnusedImport"
)

package org.openapitools.client.models


import kotlinx.serialization.*
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*

/**
 * This is the set of claims as defined by the IMS Security Framework.
 *
 * @param iss Model Primitive Datatype = String. Issuer Identifier for the Issuer of the token. The iss value is a case sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components.
 * @param aud Model Primitive Datatype = String. Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the tool provider. It MAY also contain identifiers for other audiences. In the general case, the aud value is an array of case sensitive strings. In the common special case when there is one audience, the aud value MAY be a single case sensitive string.
 * @param exp Model Primitive Datatype = Integer. Expiration time on or after which the ID Token MUST NOT be accepted for processing. The processing of this parameter requires that the current date/time MUST be before the expiration date/time listed in the value. Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. See RFC 3339 [RFC3339] for details regarding date/times in general and UTC in particular.
 * @param iat Model Primitive Datatype = Integer. Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
 * @param nonce Model Primitive Datatype = String. String value used to associate a Client session with an ID Token, and to mitigate replay attacks.
 * @param httpsColonPurlImsglobalOrgSpecLtiClaimVersion This required attribute indicates the version of LTI to which the message conforms.
 * @param httpsColonPurlImsglobalOrgSpecLtiClaimDeploymentId Model Primitive Datatype = String. This required attribute contains a string that defines the platform-tool integration governing the message.
 * @param sub Model Primitive Datatype = String. A locally unique and never reassigned identifier within the Issuer for the End-User, which is intended to be consumed by the Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It MUST NOT exceed 255 ASCII characters in length. The sub value is a case sensitive string.
 * @param azp Model Primitive Datatype = String. Authorized party - the party to which the ID Token was issued. If present, it MUST contain the OAuth 2.0 Client ID of this party.
 */
@Serializable

data class LTISecurityFrameworkJWTType (

    /* Model Primitive Datatype = String. Issuer Identifier for the Issuer of the token. The iss value is a case sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components. */
    @SerialName(value = "iss") @Required val iss: kotlin.String,

    /* Model Primitive Datatype = String. Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the tool provider. It MAY also contain identifiers for other audiences. In the general case, the aud value is an array of case sensitive strings. In the common special case when there is one audience, the aud value MAY be a single case sensitive string. */
    @SerialName(value = "aud") @Required val aud: kotlin.collections.List<kotlin.String>,

    /* Model Primitive Datatype = Integer. Expiration time on or after which the ID Token MUST NOT be accepted for processing. The processing of this parameter requires that the current date/time MUST be before the expiration date/time listed in the value. Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. See RFC 3339 [RFC3339] for details regarding date/times in general and UTC in particular. */
    @SerialName(value = "exp") @Required val exp: kotlin.Int,

    /* Model Primitive Datatype = Integer. Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. */
    @SerialName(value = "iat") @Required val iat: kotlin.Int,

    /* Model Primitive Datatype = String. String value used to associate a Client session with an ID Token, and to mitigate replay attacks. */
    @SerialName(value = "nonce") @Required val nonce: kotlin.String,

    /* This required attribute indicates the version of LTI to which the message conforms. */
    @SerialName(value = "https://purl.imsglobal.org/spec/lti/claim/version") @Required val httpsColonPurlImsglobalOrgSpecLtiClaimVersion: LTISecurityFrameworkJWTType.HttpsColonPurlImsglobalOrgSpecLtiClaimVersion,

    /* Model Primitive Datatype = String. This required attribute contains a string that defines the platform-tool integration governing the message. */
    @SerialName(value = "https://purl.imsglobal.org/spec/lti/claim/deployment_id") @Required val httpsColonPurlImsglobalOrgSpecLtiClaimDeploymentId: kotlin.String,

    /* Model Primitive Datatype = String. A locally unique and never reassigned identifier within the Issuer for the End-User, which is intended to be consumed by the Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It MUST NOT exceed 255 ASCII characters in length. The sub value is a case sensitive string. */
    @SerialName(value = "sub") val sub: kotlin.String? = null,

    /* Model Primitive Datatype = String. Authorized party - the party to which the ID Token was issued. If present, it MUST contain the OAuth 2.0 Client ID of this party. */
    @SerialName(value = "azp") val azp: kotlin.String? = null

) {

    /**
     * This required attribute indicates the version of LTI to which the message conforms.
     *
     * Values: _1period3Period0
     */
    @Serializable
    enum class HttpsColonPurlImsglobalOrgSpecLtiClaimVersion(val value: kotlin.String) {
        @SerialName(value = "1.3.0") _1period3Period0("1.3.0");
    }
}
