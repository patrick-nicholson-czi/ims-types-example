
# LaunchPresentationClaimType

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**documentTarget** | [**inline**](#DocumentTarget) | The kind of browser window or frame from which the user launched inside the message sender&#39;s system. |  [optional]
**height** | **kotlin.Int** | Model Primitive Datatype &#x3D; Integer. The height of the window or frame where the content from the message receiver will be displayed to the user. |  [optional]
**width** | **kotlin.Int** | Model Primitive Datatype &#x3D; Integer. The width of the window or frame where the content from the message receiver will be displayed to the user. |  [optional]
**returnUrl** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Fully qualified HTTPS URL within the message sender&#39;s user experience to where the message receiver can redirect the user back. |  [optional]
**locale** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Language, country and varuiant as represented using the IETF Best Practices for Tags for Identifying Languages. |  [optional]


<a name="DocumentTarget"></a>
## Enum: document_target
Name | Value
---- | -----
documentTarget | frame, iframe, window



