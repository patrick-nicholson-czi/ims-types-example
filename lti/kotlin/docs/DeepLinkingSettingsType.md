
# DeepLinkingSettingsType

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**deepLinkReturnUrl** | **kotlin.String** | Model Primitive Datatype &#x3D; String. This is a fully qualified URL where the Platform redirects the user back to the tool interface. This URL can be use once the Platform is finished. | 
**acceptTypes** | **kotlin.collections.List&lt;kotlin.String&gt;** | Model Primitive Datatype &#x3D; String. The set of types accepted. | 
**acceptPresentationDocumentTargets** | **kotlin.collections.List&lt;kotlin.String&gt;** | Model Primitive Datatype &#x3D; String. The set of documents supported e.g. &#39;iframe&#39;, &#39;window&#39;, etc. | 
**acceptMediaTypes** | **kotlin.collections.List&lt;kotlin.String&gt;** | Model Primitive Datatype &#x3D; String. The set of media types (as defined in RFC 7321) the Platform accepts. This only applies to the file types. |  [optional]
**acceptMultiple** | [**inline**](#AcceptMultiple) | Whether the Platform allows multiple content items to be submitted in a single response. |  [optional]
**autoCreate** | [**inline**](#AutoCreate) | Whether any content items returned by the Tool would be automatically persisted without any option for the user to cancel the operation. |  [optional]
**title** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Default text to be used as the title or alt text for the content item returned by the Tool. This value is normally short in length, for example, suitable for use as a heading. |  [optional]
**text** | **kotlin.String** | Model Primitive Datatype &#x3D; String. Default text to be used as the visible text for the content item returned by the Tool. If no text is returned by the Tool, the Platform may use the value of the &#39;title&#39; parameter instead (if any). This value may be a long description of the content item. |  [optional]
**&#x60;data&#x60;** | **kotlin.String** | Model Primitive Datatype &#x3D; String. An opaque value which must be returned by the Tool in its response if it was passed in on the request. |  [optional]


<a name="AcceptMultiple"></a>
## Enum: accept_multiple
Name | Value
---- | -----
acceptMultiple | true, false


<a name="AutoCreate"></a>
## Enum: auto_create
Name | Value
---- | -----
autoCreate | true, false



