import ChildSchema from "./ChildSchema.js";

export const code = "Child";
export const label = "Child Entity";
export const formFields = [
  {
    label: "Child Entity",
    fields: [
      {"disabled":false,"code":"StringFieldSingle","description":"String Field Single","fieldType":"STRING","appliesTo":"CE_Child","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Child Entity:0;field:0","allowEdit":true,"hideOnNew":false,"maxValue":255,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"String Field Single"},
      {"disabled":false,"code":"BooleanFieldSingle","description":"Boolean Field Single","fieldType":"BOOLEAN","appliesTo":"CE_Child","valueRequired":false,"matrixColumns":[],"versionable":false,"defaultValue":"false","useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Child Entity:0;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Boolean Field Single"},
      {"disabled":false,"code":"DateFieldSingle","description":"Date Field Single","fieldType":"DATE","appliesTo":"CE_Child","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Child Entity:0;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Date Field Single","displayFormat":"dd-M-yyyy hh:mm:ss"},
    ]
  },
];
export default class Child {
	schema = ChildSchema;
	endpoints = {
    DETAIL: {
      getEndpointConfig: ({ parameters }) => ({
        OFFLINE: {
          execute: () => ({ detail: { result: {} } }),
        },
      }),
    },
    LIST: {
      getEndpointConfig: ({ parameters }) => ({
        OFFLINE: {
          execute: () => ({ detail: { result: {} } }),
        },
      }),
    },
    NEW: {
      getEndpointConfig: ({ parameters }) => ({
        OFFLINE: {
          execute: () => ({ detail: { result: {} } }),
        },
      }),
    },
    UPDATE: {
      getEndpointConfig: ({ parameters }) => ({
        OFFLINE: {
          execute: () => ({ detail: { result: {} } }),
        },
      }),
    },
    DELETE: {
      getEndpointConfig: ({ parameters }) => ({
        OFFLINE: {
          execute: () => ({ detail: { result: {} } }),
        },
      }),
    },
  };

	refSchemas = [	];
}
