# coding: utf-8

from __future__ import annotations
from datetime import date, datetime  # noqa: F401

import re  # noqa: F401
from typing import Any, Dict, List, Optional  # noqa: F401

from pydantic import AnyUrl, BaseModel, EmailStr, Field, validator  # noqa: F401


class DeepLinkingSettingsType(BaseModel):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.

    DeepLinkingSettingsType - a model defined in OpenAPI

        deep_link_return_url: The deep_link_return_url of this DeepLinkingSettingsType.
        accept_types: The accept_types of this DeepLinkingSettingsType.
        accept_presentation_document_targets: The accept_presentation_document_targets of this DeepLinkingSettingsType.
        accept_media_types: The accept_media_types of this DeepLinkingSettingsType [Optional].
        accept_multiple: The accept_multiple of this DeepLinkingSettingsType [Optional].
        auto_create: The auto_create of this DeepLinkingSettingsType [Optional].
        title: The title of this DeepLinkingSettingsType [Optional].
        text: The text of this DeepLinkingSettingsType [Optional].
        data: The data of this DeepLinkingSettingsType [Optional].
    """

    deep_link_return_url: str = Field(alias="deep_link_return_url")
    accept_types: List[str] = Field(alias="accept_types")
    accept_presentation_document_targets: List[str] = Field(alias="accept_presentation_document_targets")
    accept_media_types: Optional[List[str]] = Field(alias="accept_media_types", default=None)
    accept_multiple: Optional[str] = Field(alias="accept_multiple", default=None)
    auto_create: Optional[str] = Field(alias="auto_create", default=None)
    title: Optional[str] = Field(alias="title", default=None)
    text: Optional[str] = Field(alias="text", default=None)
    data: Optional[str] = Field(alias="data", default=None)

DeepLinkingSettingsType.update_forward_refs()