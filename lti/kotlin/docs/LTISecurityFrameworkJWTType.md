
# LTISecurityFrameworkJWTType

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**iss** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Issuer Identifier for the Issuer of the token. The iss value is a case sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components. | 
**aud** | **kotlin.collections.List&lt;kotlin.String&gt;** | Model Primitive Datatype &#x3D; String. Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the tool provider. It MAY also contain identifiers for other audiences. In the general case, the aud value is an array of case sensitive strings. In the common special case when there is one audience, the aud value MAY be a single case sensitive string. | 
**exp** | **kotlin.Int** | Model Primitive Datatype &#x3D; Integer. Expiration time on or after which the ID Token MUST NOT be accepted for processing. The processing of this parameter requires that the current date/time MUST be before the expiration date/time listed in the value. Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. See RFC 3339 [RFC3339] for details regarding date/times in general and UTC in particular. | 
**iat** | **kotlin.Int** | Model Primitive Datatype &#x3D; Integer. Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. | 
**nonce** | **kotlin.String** | Model Primitive Datatype &#x3D; String. String value used to associate a Client session with an ID Token, and to mitigate replay attacks. | 
**httpsColonPurlImsglobalOrgSpecLtiClaimVersion** | [**inline**](#HttpsColonPurlImsglobalOrgSpecLtiClaimVersion) | This required attribute indicates the version of LTI to which the message conforms. | 
**httpsColonPurlImsglobalOrgSpecLtiClaimDeploymentId** | **kotlin.String** | Model Primitive Datatype &#x3D; String. This required attribute contains a string that defines the platform-tool integration governing the message. | 
**sub** | **kotlin.String** | Model Primitive Datatype &#x3D; String. A locally unique and never reassigned identifier within the Issuer for the End-User, which is intended to be consumed by the Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It MUST NOT exceed 255 ASCII characters in length. The sub value is a case sensitive string. |  [optional]
**azp** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Authorized party - the party to which the ID Token was issued. If present, it MUST contain the OAuth 2.0 Client ID of this party. |  [optional]


<a name="HttpsColonPurlImsglobalOrgSpecLtiClaimVersion"></a>
## Enum: https://purl.imsglobal.org/spec/lti/claim/version
Name | Value
---- | -----
httpsColonPurlImsglobalOrgSpecLtiClaimVersion | 1.3.0



