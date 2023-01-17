window.swaggerSpec={
  "openapi" : "3.0.0",
  "info" : {
    "version" : "1.0.0",
    "title" : "Assignment and Grade Services",
    "description" : "Assignment and Grade Services allow a tool the ability to manage their line items (traditionally gradebook columns), publish scores and get current results. The path for lineitems and lineitem are for illustration purposes. The path for results and scores MUST be the url of the relevant line item resource appended respectively with /results and /scores.\n"
  },
  "paths" : {
    "/{contextId}/lineitems" : {
      "summary" : "Returns all the line items for the tool in the specified learning context. This specification does not mandate any particular URL template for such endpoints, and the path templates used in this documentation are given for illustrative purposes and to fit in the OpenAPI specification framework. Results are always filtered based on the key of the caller, i.e. a caller must never be able to see or alter any Line Items that has not a direct relationship with the tool as identified by the access key.\n",
      "parameters" : [ {
        "name" : "contextId",
        "in" : "path",
        "description" : "Learning Context for this request. Passed here as example as path parameter purely for illustration. It is up to the implementer to decide how to include the context in the request.\n",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      } ],
      "get" : {
        "summary" : "returns all the line items associated to tool in the specified learning context. Results may be broken in multiple pages in particular if a limit parameter is present.\n",
        "operationId" : "LineItems.GET",
        "parameters" : [ {
          "name" : "limit",
          "in" : "query",
          "description" : "restricts the maximum number of items to be returned. The response may be further constrained.\n",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "minimum" : 0,
            "exclusiveMinimum" : true,
            "format" : "int32"
          }
        }, {
          "name" : "page",
          "in" : "query",
          "description" : "indicates the offset for which this page should start containing items. Used exclusively by the nextPage URL. For illustration purposes only. It is up to the tool platform to decide how to encode the offset in the next page URL.\n",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "minimum" : 0,
            "exclusiveMinimum" : true,
            "format" : "int32"
          }
        }, {
          "name" : "resource_link_id",
          "in" : "query",
          "description" : "limit the line items returned to only those which have been associated with the specified tool platform's resource link\n",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "tag",
          "in" : "query",
          "description" : "limit the line items returned to only those which have been associated with the specified tag\n",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        }, {
          "name" : "resource_id",
          "in" : "query",
          "description" : "limit the line items returned to only those which have been associated with the specified tool resource ID\n",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/vnd.ims.lis.v2.lineitemcontainer+json" : {
                "schema" : {
                  "description" : "A simple paged collections of line items.\n",
                  "type" : "array",
                  "items" : {
                    "allOf" : [ {
                      "type" : "object",
                      "required" : [ "id" ],
                      "properties" : {
                        "id" : {
                          "type" : "string",
                          "format" : "uri",
                          "pattern" : "^https?://",
                          "description" : "URL end point for the resource. It must be present on all responses containing the resource and may be used for subsequent operations on that resource.\n"
                        }
                      }
                    }, {
                      "allOf" : [ {
                        "type" : "object",
                        "properties" : {
                          "startDateTime" : {
                            "description" : "Date and time in ISO 8601 format when a submission can start being submitted by learner",
                            "type" : "string",
                            "format" : "date-time"
                          },
                          "endDateTime" : {
                            "description" : "Date and time in ISO 8601 format when a submission can last be submitted by learner",
                            "type" : "string",
                            "format" : "date-time"
                          }
                        }
                      }, {
                        "type" : "object",
                        "required" : [ "label", "scoreMaximum" ],
                        "properties" : {
                          "scoreMaximum" : {
                            "type" : "number",
                            "minimum" : 0,
                            "exclusiveMinimum" : true
                          },
                          "label" : {
                            "description" : "label to use in the Tool Consumer UI (Gradebook)",
                            "type" : "string"
                          },
                          "tag" : {
                            "description" : "additional information about the line item; may be used by the tool to identify line items attached to the same resource or resource link (example: grade, originality, participation)\n",
                            "type" : "string",
                            "maxLength" : 256
                          },
                          "resourceId" : {
                            "description" : "Tool resource identifier for which this line item is receiving scores from\n",
                            "type" : "string",
                            "maxLength" : 256
                          },
                          "resourceLinkId" : {
                            "description" : "Id of the tool platform's resource link to which this line item is attached to\n",
                            "type" : "string"
                          }
                        }
                      } ]
                    } ]
                  }
                }
              }
            },
            "headers" : {
              "Link" : {
                "type" : "string",
                "description" : "Link header as per https://tools.ietf.org/html/rfc8288. A URL with rel=\"next\" MUST be included if the data is not complete and data included in the response is not the final page. Other relations (prev, first, last) MAY also be included.\n"
              }
            }
          },
          "400" : {
            "description" : "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          },
          "401" : {
            "description" : "The client did not authenticate properly."
          },
          "404" : {
            "description" : "The server has not found anything matching the request URI."
          },
          "500" : {
            "description" : "The server encountered an unexpected condition which prevented it from fulfilling the request."
          }
        }
      },
      "post" : {
        "summary" : "add a new line item; the created line item is returned with an id property being the url to be used to later update, delete the item, post new scores (by appending /scores to the path), or getting the current results associated with that lineitem (by appending /results to the path).\n",
        "operationId" : "LineItems.POST",
        "requestBody" : {
          "content" : {
            "application/vnd.ims.lis.v2.lineitem+json" : {
              "schema" : {
                "allOf" : [ {
                  "type" : "object",
                  "properties" : {
                    "startDateTime" : {
                      "description" : "Date and time in ISO 8601 format when a submission can start being submitted by learner",
                      "type" : "string",
                      "format" : "date-time"
                    },
                    "endDateTime" : {
                      "description" : "Date and time in ISO 8601 format when a submission can last be submitted by learner",
                      "type" : "string",
                      "format" : "date-time"
                    }
                  }
                }, {
                  "type" : "object",
                  "required" : [ "label", "scoreMaximum" ],
                  "properties" : {
                    "scoreMaximum" : {
                      "type" : "number",
                      "minimum" : 0,
                      "exclusiveMinimum" : true
                    },
                    "label" : {
                      "description" : "label to use in the Tool Consumer UI (Gradebook)",
                      "type" : "string"
                    },
                    "tag" : {
                      "description" : "additional information about the line item; may be used by the tool to identify line items attached to the same resource or resource link (example: grade, originality, participation)\n",
                      "type" : "string",
                      "maxLength" : 256
                    },
                    "resourceId" : {
                      "description" : "Tool resource identifier for which this line item is receiving scores from\n",
                      "type" : "string",
                      "maxLength" : 256
                    },
                    "resourceLinkId" : {
                      "description" : "Id of the tool platform's resource link to which this line item is attached to\n",
                      "type" : "string"
                    }
                  }
                } ]
              }
            }
          }
        },
        "responses" : {
          "201" : {
            "description" : "Successful operation, line item was created.",
            "content" : {
              "application/vnd.ims.lis.v2.lineitem+json" : {
                "schema" : {
                  "allOf" : [ {
                    "type" : "object",
                    "required" : [ "id" ],
                    "properties" : {
                      "id" : {
                        "type" : "string",
                        "format" : "uri",
                        "pattern" : "^https?://",
                        "description" : "URL end point for the resource. It must be present on all responses containing the resource and may be used for subsequent operations on that resource.\n"
                      }
                    }
                  }, {
                    "allOf" : [ {
                      "type" : "object",
                      "properties" : {
                        "startDateTime" : {
                          "description" : "Date and time in ISO 8601 format when a submission can start being submitted by learner",
                          "type" : "string",
                          "format" : "date-time"
                        },
                        "endDateTime" : {
                          "description" : "Date and time in ISO 8601 format when a submission can last be submitted by learner",
                          "type" : "string",
                          "format" : "date-time"
                        }
                      }
                    }, {
                      "type" : "object",
                      "required" : [ "label", "scoreMaximum" ],
                      "properties" : {
                        "scoreMaximum" : {
                          "type" : "number",
                          "minimum" : 0,
                          "exclusiveMinimum" : true
                        },
                        "label" : {
                          "description" : "label to use in the Tool Consumer UI (Gradebook)",
                          "type" : "string"
                        },
                        "tag" : {
                          "description" : "additional information about the line item; may be used by the tool to identify line items attached to the same resource or resource link (example: grade, originality, participation)\n",
                          "type" : "string",
                          "maxLength" : 256
                        },
                        "resourceId" : {
                          "description" : "Tool resource identifier for which this line item is receiving scores from\n",
                          "type" : "string",
                          "maxLength" : 256
                        },
                        "resourceLinkId" : {
                          "description" : "Id of the tool platform's resource link to which this line item is attached to\n",
                          "type" : "string"
                        }
                      }
                    } ]
                  } ]
                }
              }
            }
          },
          "400" : {
            "description" : "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          },
          "401" : {
            "description" : "The client did not authenticate properly."
          },
          "404" : {
            "description" : "The line item could not be added; for example the context or the resource link if present in the JSON payload do not exist in the tool platform.\n"
          },
          "500" : {
            "description" : "The server encountered an unexpected condition which prevented it from fulfilling the request."
          }
        }
      }
    },
    "/{contextId}/lineitems/{lineItemId}" : {
      "summary" : "represents of a particular line item instance",
      "parameters" : [ {
        "name" : "contextId",
        "in" : "path",
        "description" : "Learning Context for this request. Passed here as example as path parameter purely for illustration. It is up to the implementer to decide how to include the context in the request.\n",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      }, {
        "name" : "lineItemId",
        "in" : "path",
        "description" : "Id of the line item. For illustration purposes. How the line item identifier is included in the link is up to the implementer.\n",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      } ],
      "get" : {
        "summary" : "returns the current value for the line item.\n",
        "operationId" : "LineItem.GET",
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/vnd.ims.lis.v2.lineitem+json" : {
                "schema" : {
                  "allOf" : [ {
                    "type" : "object",
                    "required" : [ "id" ],
                    "properties" : {
                      "id" : {
                        "type" : "string",
                        "format" : "uri",
                        "pattern" : "^https?://",
                        "description" : "URL end point for the resource. It must be present on all responses containing the resource and may be used for subsequent operations on that resource.\n"
                      }
                    }
                  }, {
                    "allOf" : [ {
                      "type" : "object",
                      "properties" : {
                        "startDateTime" : {
                          "description" : "Date and time in ISO 8601 format when a submission can start being submitted by learner",
                          "type" : "string",
                          "format" : "date-time"
                        },
                        "endDateTime" : {
                          "description" : "Date and time in ISO 8601 format when a submission can last be submitted by learner",
                          "type" : "string",
                          "format" : "date-time"
                        }
                      }
                    }, {
                      "type" : "object",
                      "required" : [ "label", "scoreMaximum" ],
                      "properties" : {
                        "scoreMaximum" : {
                          "type" : "number",
                          "minimum" : 0,
                          "exclusiveMinimum" : true
                        },
                        "label" : {
                          "description" : "label to use in the Tool Consumer UI (Gradebook)",
                          "type" : "string"
                        },
                        "tag" : {
                          "description" : "additional information about the line item; may be used by the tool to identify line items attached to the same resource or resource link (example: grade, originality, participation)\n",
                          "type" : "string",
                          "maxLength" : 256
                        },
                        "resourceId" : {
                          "description" : "Tool resource identifier for which this line item is receiving scores from\n",
                          "type" : "string",
                          "maxLength" : 256
                        },
                        "resourceLinkId" : {
                          "description" : "Id of the tool platform's resource link to which this line item is attached to\n",
                          "type" : "string"
                        }
                      }
                    } ]
                  } ]
                }
              }
            }
          },
          "400" : {
            "description" : "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          },
          "401" : {
            "description" : "The client did not authenticate properly."
          },
          "404" : {
            "description" : "The server has not found anything matching the request URI."
          },
          "500" : {
            "description" : "The server encountered an unexpected condition which prevented it from fulfilling the request."
          }
        }
      },
      "put" : {
        "summary" : "updates the line item\n",
        "operationId" : "LineItems.PUT",
        "requestBody" : {
          "content" : {
            "application/vnd.ims.lis.v2.lineitem+json" : {
              "schema" : {
                "allOf" : [ {
                  "type" : "object",
                  "properties" : {
                    "startDateTime" : {
                      "description" : "Date and time in ISO 8601 format when a submission can start being submitted by learner",
                      "type" : "string",
                      "format" : "date-time"
                    },
                    "endDateTime" : {
                      "description" : "Date and time in ISO 8601 format when a submission can last be submitted by learner",
                      "type" : "string",
                      "format" : "date-time"
                    }
                  }
                }, {
                  "type" : "object",
                  "required" : [ "label", "scoreMaximum" ],
                  "properties" : {
                    "scoreMaximum" : {
                      "type" : "number",
                      "minimum" : 0,
                      "exclusiveMinimum" : true
                    },
                    "label" : {
                      "description" : "label to use in the Tool Consumer UI (Gradebook)",
                      "type" : "string"
                    },
                    "tag" : {
                      "description" : "additional information about the line item; may be used by the tool to identify line items attached to the same resource or resource link (example: grade, originality, participation)\n",
                      "type" : "string",
                      "maxLength" : 256
                    },
                    "resourceId" : {
                      "description" : "Tool resource identifier for which this line item is receiving scores from\n",
                      "type" : "string",
                      "maxLength" : 256
                    },
                    "resourceLinkId" : {
                      "description" : "Id of the tool platform's resource link to which this line item is attached to\n",
                      "type" : "string"
                    }
                  }
                } ]
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "Successful operation, line item was updated.",
            "content" : {
              "application/vnd.ims.lis.v2.lineitem+json" : {
                "schema" : {
                  "allOf" : [ {
                    "type" : "object",
                    "required" : [ "id" ],
                    "properties" : {
                      "id" : {
                        "type" : "string",
                        "format" : "uri",
                        "pattern" : "^https?://",
                        "description" : "URL end point for the resource. It must be present on all responses containing the resource and may be used for subsequent operations on that resource.\n"
                      }
                    }
                  }, {
                    "allOf" : [ {
                      "type" : "object",
                      "properties" : {
                        "startDateTime" : {
                          "description" : "Date and time in ISO 8601 format when a submission can start being submitted by learner",
                          "type" : "string",
                          "format" : "date-time"
                        },
                        "endDateTime" : {
                          "description" : "Date and time in ISO 8601 format when a submission can last be submitted by learner",
                          "type" : "string",
                          "format" : "date-time"
                        }
                      }
                    }, {
                      "type" : "object",
                      "required" : [ "label", "scoreMaximum" ],
                      "properties" : {
                        "scoreMaximum" : {
                          "type" : "number",
                          "minimum" : 0,
                          "exclusiveMinimum" : true
                        },
                        "label" : {
                          "description" : "label to use in the Tool Consumer UI (Gradebook)",
                          "type" : "string"
                        },
                        "tag" : {
                          "description" : "additional information about the line item; may be used by the tool to identify line items attached to the same resource or resource link (example: grade, originality, participation)\n",
                          "type" : "string",
                          "maxLength" : 256
                        },
                        "resourceId" : {
                          "description" : "Tool resource identifier for which this line item is receiving scores from\n",
                          "type" : "string",
                          "maxLength" : 256
                        },
                        "resourceLinkId" : {
                          "description" : "Id of the tool platform's resource link to which this line item is attached to\n",
                          "type" : "string"
                        }
                      }
                    } ]
                  } ]
                }
              }
            }
          },
          "400" : {
            "description" : "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          },
          "401" : {
            "description" : "The client did not authenticate properly."
          },
          "404" : {
            "description" : "The server has not found anything matching the request URI."
          },
          "500" : {
            "description" : "The server encountered an unexpected condition which prevented it from fulfilling the request."
          }
        }
      },
      "delete" : {
        "summary" : "removes the line item. While no more associated with the tool, the tool platform may decide to keep the line item around (unassociated)\n",
        "operationId" : "LineItem.DELETE",
        "responses" : {
          "204" : {
            "description" : "Successful operation, line item was removed."
          },
          "400" : {
            "description" : "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          },
          "401" : {
            "description" : "The client did not authenticate properly."
          },
          "404" : {
            "description" : "The server has not found anything matching the request URI."
          },
          "500" : {
            "description" : "The server encountered an unexpected condition which prevented it from fulfilling the request."
          }
        }
      }
    },
    "/{contextId}/lineitems/{lineItemId}/results" : {
      "summary" : "Represents all results for a given line item.\n",
      "parameters" : [ {
        "name" : "contextId",
        "in" : "path",
        "description" : "Learning Context for this request. Passed here as example as path parameter purely for illustration. It is up to the implementer to decide how to include the context in the request.\n",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      }, {
        "name" : "lineItemId",
        "in" : "path",
        "description" : "Id of the line item. For illustration purposes. How the line item identifier is included in the link is up to the implementer.\n",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      } ],
      "get" : {
        "summary" : "returns all the results for the line item (results for all the students in the current context for this line item) Results may be broken in multiple pages in particular if a limit parameter is present.\n",
        "operationId" : "Results.GET",
        "parameters" : [ {
          "name" : "limit",
          "in" : "query",
          "description" : "restricts the maximum number of items to be returned. The response may be further constrained.\n",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "minimum" : 0,
            "exclusiveMinimum" : true,
            "format" : "int32"
          }
        }, {
          "name" : "page",
          "in" : "query",
          "description" : "indicates the offset for which this page should start containing items. Used exclusively by the nextPage URL. For illustration purposes only. It is up to the tool platform to decide how to encode the offset in the next page URL.\n",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "minimum" : 0,
            "exclusiveMinimum" : true,
            "format" : "int32"
          }
        }, {
          "name" : "user_id",
          "in" : "query",
          "description" : "limit the line items returned to only those which have been associated with this user. Results must contain at most one result.\n",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Successful operation",
            "content" : {
              "application/vnd.ims.lis.v2.resultcontainer+json" : {
                "schema" : {
                  "description" : "A simple paged collections of results.\n",
                  "type" : "array",
                  "items" : {
                    "allOf" : [ {
                      "type" : "object",
                      "required" : [ "id" ],
                      "properties" : {
                        "id" : {
                          "type" : "string",
                          "format" : "uri",
                          "pattern" : "^https?://",
                          "description" : "URL end point for the resource. It must be present on all responses containing the resource and may be used for subsequent operations on that resource.\n"
                        }
                      }
                    }, {
                      "type" : "object",
                      "properties" : {
                        "userId" : {
                          "type" : "string",
                          "description" : "recipient of the result, usually a student"
                        },
                        "resultScore" : {
                          "type" : "number",
                          "format" : "float",
                          "description" : "Current score for this line item and user, in scale with resultMaximum\n"
                        },
                        "resultMaximum" : {
                          "type" : "number",
                          "format" : "float",
                          "minimum" : 0,
                          "exclusiveMinimum" : true,
                          "description" : "Maximum possible score for this result; 1 is the default value and will be assumed if not specified otherwise.\n"
                        },
                        "comment" : {
                          "type" : "string",
                          "description" : "Comment visible to the student about the Result."
                        },
                        "scoreOf" : {
                          "type" : "string",
                          "format" : "uri",
                          "pattern" : "^https?://",
                          "description" : "URL of the line item this result belongs to; must be the same as the url property of the line item.\n"
                        }
                      }
                    } ]
                  }
                }
              }
            },
            "headers" : {
              "Link" : {
                "type" : "string",
                "description" : "Link header as per https://tools.ietf.org/html/rfc8288. A URL with rel=\"next\" MUST be included if the data is not complete and data included in the response is not the final page. Other relations (prev, first, last) MAY also be included.\n"
              }
            }
          },
          "400" : {
            "description" : "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          },
          "401" : {
            "description" : "The client did not authenticate properly."
          },
          "404" : {
            "description" : "The server has not found anything matching the request URI."
          },
          "500" : {
            "description" : "The server encountered an unexpected condition which prevented it from fulfilling the request."
          }
        }
      }
    },
    "/{contextId}/lineitems/{lineItemId}/scores" : {
      "summary" : "Allows the tool to publish score updates (including statuses of the activity and the grading process) to the tool platform. Score updates should be sent in timestamp order, and the tool platform should discard scores with an earlier timestamp than the last one processed.\n",
      "parameters" : [ {
        "name" : "contextId",
        "in" : "path",
        "description" : "Learning Context for this request. Passed here as example as path parameter purely for illustration. It is up to the implementer to decide how to include the context in the request.\n",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      }, {
        "name" : "lineItemId",
        "in" : "path",
        "description" : "Id of the line item. For illustration purposes. How the line item identifier is included in the link is up to the implementer.\n",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      } ],
      "post" : {
        "summary" : "publishes a score update. Tool platform may decide to change the result value based on the updated score.\n",
        "operationId" : "Scores.POST",
        "requestBody" : {
          "content" : {
            "application/vnd.ims.lis.v1.score+json" : {
              "schema" : {
                "type" : "object",
                "required" : [ "userId", "activityProgress", "gradingProgress", "timestamp" ],
                "properties" : {
                  "userId" : {
                    "type" : "string",
                    "description" : "recipient of the score, usually a student. Must be present when publishing a score update through Scores.POST operation.\n"
                  },
                  "scoreGiven" : {
                    "type" : "number",
                    "format" : "float",
                    "description" : "Current score received in the tool for this line item and user, in scale with scoreMaximum\n"
                  },
                  "scoreMaximum" : {
                    "type" : "number",
                    "format" : "float",
                    "minimum" : 0,
                    "exclusiveMinimum" : true,
                    "description" : "Maximum possible score for this result; It must be present if scoreGiven is present.\n"
                  },
                  "comment" : {
                    "type" : "string",
                    "description" : "Comment visible to the student about this score."
                  },
                  "timestamp" : {
                    "type" : "string",
                    "format" : "date-time",
                    "description" : "Date and time when the score was modified in the tool. Should use subsecond precision."
                  },
                  "activityProgress" : {
                    "type" : "string",
                    "enum" : [ "Initialized", "Started", "InProgress", "Submitted", "Completed" ],
                    "description" : "indicate to the tool platform the status of the user towards the activity's completion."
                  },
                  "gradingProgress" : {
                    "type" : "string",
                    "enum" : [ "NotReady", "Failed", "Pending", "PendingManual", "FullyGraded" ],
                    "description" : "indicate to the platform the status of the grading process, including allowing to inform when human intervention is needed. A value other than FullyGraded may cause the tool platform to ignore the scoreGiven value if present.\n"
                  }
                }
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "Successful operation, score update has been received."
          },
          "201" : {
            "description" : "Successful operation, score update has been received. A new result was created.\n"
          },
          "202" : {
            "description" : "The server has accepted the request, but the processing is not complete."
          },
          "204" : {
            "description" : "Successful operation, score update has been received.\n"
          },
          "400" : {
            "description" : "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          },
          "401" : {
            "description" : "The client did not authenticate properly."
          },
          "403" : {
            "description" : "The score update cannot be applied. For example, an activity may be closed and no more accept grade changes. The platform should describe the reason of the rejection in its response.\n"
          },
          "404" : {
            "description" : "The server has not found anything matching the request URI."
          },
          "409" : {
            "description" : "The Score has an earlier timestamp than the last one successfully processed"
          },
          "500" : {
            "description" : "The server encountered an unexpected condition which prevented it from fulfilling the request."
          }
        }
      }
    }
  }
}