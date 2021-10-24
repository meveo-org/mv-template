import ParentSchema from "./ParentSchema.js";
import ChildSchema from "./ChildSchema.js";

export const code = "Parent";
export const label = "Parent Entity";
export const formFields = [
	{
		label: "Binary",
		fields: [
			{"disabled":false,"code":"BinarySingle","description":"Binary Single","fieldType":"BINARY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Test Entity:0;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Binary Single"},
			{"disabled":false,"code":"BinaryList","description":"Binary List","fieldType":"BINARY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Test Entity:0;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Binary List"},
			{"disabled":false,"code":"BinaryMap","description":"Binary Map","fieldType":"BINARY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Test Entity:0;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Binary Map"},
			{"disabled":false,"code":"BinaryMatrix","description":"Binary Matrix","fieldType":"BINARY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"BinaryMatrix1","label":"BinaryMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"BinaryMatrix2","label":"BinaryMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Test Entity:0;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Binary Matrix"},
		]
	},

	{
		label: "Boolean",
		fields: [
			{"disabled":false,"code":"BooleanSingle","description":"Boolean Single","fieldType":"BOOLEAN","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"defaultValue":"false","useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Boolean:1;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Boolean Single"},
			{"disabled":false,"code":"BooleanList","description":"Boolean List","fieldType":"BOOLEAN","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"defaultValue":"false","useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Boolean:1;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Boolean List"},
			{"disabled":false,"code":"BooleanMap","description":"Boolean Map","fieldType":"BOOLEAN","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"defaultValue":"false","useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Boolean:1;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Boolean Map"},
			{"disabled":false,"code":"BooleanMatrix","description":"Boolean Matrix","fieldType":"BOOLEAN","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"BooleanMatrix1","label":"BooleanMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"BooleanMatrix2","label":"BooleanMatrix2","keyType":"RON"}],"versionable":false,"defaultValue":"false","useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Boolean:1;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Boolean Matrix"},
		]
	},

	{
		label: "Child Entity",
		fields: [
			{"disabled":false,"code":"ChildSingle","description":"Child Entity Single","fieldType":"CHILD_ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Child Entity:2;field:0","allowEdit":true,"hideOnNew":false,"childEntityFields":"StringFieldSingle","unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Child Entity Single","name":"Child","entitySchema":"Child"},
			{"disabled":false,"code":"ChildList","description":"Child Entity List","fieldType":"CHILD_ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Child Entity:2;field:1","allowEdit":true,"hideOnNew":false,"childEntityFields":"StringFieldSingle","unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Child Entity List","name":"Child","entitySchema":"Child"},
		]
	},

	{
		label: "Date",
		fields: [
			{"disabled":false,"code":"DateSingle","description":"Date Single","fieldType":"DATE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Date:3;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Date Single","displayFormat":"dd-M-yyyy hh:mm:ss"},
			{"disabled":false,"code":"DateList","description":"DateList","fieldType":"DATE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Date:3;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Date List","displayFormat":"dd-M-yyyy hh:mm:ss"},
			{"disabled":false,"code":"DateMap","description":"Date Map","fieldType":"DATE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Date:3;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Date Map","displayFormat":"dd-M-yyyy hh:mm:ss"},
			{"disabled":false,"code":"DateMatrix","description":"DateMatrix","fieldType":"DATE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"DateMatrix1","label":"DateMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"DateMatrix2","label":"DateMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Date:3;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Date Matrix","displayFormat":"dd-M-yyyy hh:mm:ss"},
		]
	},

	{
		label: "Double",
		fields: [
			{"disabled":false,"code":"DoubleSingle","description":"Double Single","fieldType":"DOUBLE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Double:4;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Double Single"},
			{"disabled":false,"code":"DoubleList","description":"Double List","fieldType":"DOUBLE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Double:4;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Double List"},
			{"disabled":false,"code":"DoubleMap","description":"Double Map","fieldType":"DOUBLE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Double:4;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Double Map"},
			{"disabled":false,"code":"DoubleMatrix","description":"Double Matrix","fieldType":"DOUBLE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"DoubleMatrix1","label":"DoubleMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"DoubleMatrix2","label":"DoubleMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Double:4;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Double Matrix"},
		]
	},

	{
		label: "Embedded Entity",
		fields: [
			{"disabled":false,"code":"EmbeddedEntitySingle","description":"Embedded Entity Single","fieldType":"EMBEDDED_ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Embedded Entity:5;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Embedded Entity Single"},
			{"disabled":false,"code":"EmbeddedEntityList","description":"Embedded Entity List","fieldType":"EMBEDDED_ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Embedded Entity:5;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Embedded Entity List"},
			{"disabled":false,"code":"EmbeddedEntityMap","description":"Embedded Entity Map","fieldType":"EMBEDDED_ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Embedded Entity:5;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Embedded Entity Map"},
			{"disabled":false,"code":"EmbeddedEntityMatrix","description":"Embedded Entity Matrix","fieldType":"EMBEDDED_ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"EmbeddedEntityMat1","label":"EmbeddedEntityMat1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"EmbeddedEntityMat2","label":"EmbeddedEntityMat2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Embedded Entity:5;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Embedded Entity Matrix"},
		]
	},

	{
		label: "Reference To Entity",
		fields: [
			{"disabled":false,"code":"RefEntitySingle","description":"Reference to Entity Single","fieldType":"ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Reference to Entity:6;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Ref Entity Single","name":"Child","entitySchema":"Child"},
			{"disabled":false,"code":"RefEntityList","description":"Reference to Entity List","fieldType":"ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Reference to Entity:6;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Ref Entity List","name":"Child","entitySchema":"Child"},
			{"disabled":false,"code":"RefEntityMap","description":"Reference to Entity Map","fieldType":"ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Reference to Entity:6;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Ref Entity Map","name":"Child","entitySchema":"Child"},
			{"disabled":false,"code":"RefEntityMatrix","description":"Reference to Entity Matrix","fieldType":"ENTITY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"RefEntityMatrix1","label":"RefEntityMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"RefEntityMatrix2","label":"RefEntityMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Reference to Entity:6;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Ref Entity Matrix","name":"Child","entitySchema":"Child"},
		]
	},

	{
		label: "Expression",
		fields: [
			{"disabled":false,"code":"ExpressionSingle","description":"Expression Single","fieldType":"EXPRESSION","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Expression:7;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Expression Single"},
			{"disabled":false,"code":"ExpressionList","description":"Expression List","fieldType":"EXPRESSION","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Expression:7;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Expression List"},
			{"disabled":false,"code":"ExpressionMap","description":"Expression Map","fieldType":"EXPRESSION","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Expression:7;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Expression Map"},
			{"disabled":false,"code":"ExpressionMatrix","description":"Expression Matrix","fieldType":"EXPRESSION","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"ExpressionMatrix1","label":"ExpressionMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"ExpressionMatrix2","label":"ExpressionMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Expression:7;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Expression Matrix"},
		]
	},

	{
		label: "Selection From List",
		fields: [
			{"disabled":false,"code":"SelectionSingle","description":"Selection from List Single","fieldType":"LIST","appliesTo":"CE_Parent","valueRequired":false,"listValues":{"123":"123","234":"234","abc":"abc","bcd":"bcd","cde":"cde","def":"def","efg":"efg"},"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Selection from List:8;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Selection Single"},
			{"disabled":false,"code":"SelectionList","description":"List of Selection from List","fieldType":"LIST","appliesTo":"CE_Parent","valueRequired":false,"listValues":{"123":"123","234":"234","abc":"abc","bcd":"bcd","cde":"cde","def":"def","efg":"efg"},"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Selection from List:8;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Selection List"},
			{"disabled":false,"code":"SelectionMap","description":"Selection from List Map","fieldType":"LIST","appliesTo":"CE_Parent","valueRequired":false,"listValues":{"123":"123","234":"234","abc":"abc","bcd":"bcd","cde":"cde","def":"def","efg":"efg"},"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Selection from List:8;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Selection Map"},
			{"disabled":false,"code":"SelectionMatrix","description":"Selection from List Matrix","fieldType":"LIST","appliesTo":"CE_Parent","valueRequired":false,"listValues":{"123":"123","234":"234","abc":"abc","bcd":"bcd","cde":"cde","def":"def","efg":"efg"},"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"Selection1","label":"Selection1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"Selection2","label":"Selection2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Selection from List:8;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Selection Matrix"},
		]
	},

	{
		label: "Long",
		fields: [
			{"disabled":false,"code":"LongSingle","description":"Long Single","fieldType":"LONG","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Long:9;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Long Single"},
			{"disabled":false,"code":"LongList","description":"Long List","fieldType":"LONG","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Long:9;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Long List"},
			{"disabled":false,"code":"LongMap","description":"Long Map","fieldType":"LONG","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Long:9;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Long Map"},
			{"disabled":false,"code":"LongMatrix","description":"Long Matrix","fieldType":"LONG","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"LongMatrix1","label":"LongMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"LongMatrix2","label":"LongMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Long:9;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Long Matrix"},
		]
	},

	{
		label: "Long Text",
		fields: [
			{"disabled":false,"code":"LongTextSingle","description":"Long Text Single","fieldType":"LONG_TEXT","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Long Text:10;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Long Text Single"},
			{"disabled":false,"code":"LongTextList","description":"Long Text List","fieldType":"LONG_TEXT","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Long Text:10;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Long Text List"},
			{"disabled":false,"code":"LongTextMap","description":"Long Text Map","fieldType":"LONG_TEXT","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Long Text:10;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Long Text Map"},
			{"disabled":false,"code":"LongTextMatrix","description":"LongTextMatrix","fieldType":"LONG_TEXT","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"LongTextMatrix1","label":"LongTextMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"LongTextMatrix2","label":"LongTextMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Long Text:10;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Long Text Matrix"},
		]
	},

	{
		label: "Multi Value",
		fields: [
			{"disabled":false,"code":"MultiValue","description":"MultiValue","fieldType":"MULTI_VALUE","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"MultiValueKey1","label":"MultiValueKey1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"MultiValueKey2","label":"MultiValueKey2","keyType":"RON"},{"columnUse":"USE_VALUE","position":1,"code":"MultiValueString","label":"MultiValueString","keyType":"STRING"},{"columnUse":"USE_VALUE","position":2,"code":"MultiValueTextArea","label":"MultiValueTextArea","keyType":"TEXT_AREA"},{"columnUse":"USE_VALUE","position":3,"code":"MultiValueLong","label":"MultiValueLong","keyType":"LONG"},{"columnUse":"USE_VALUE","position":4,"code":"MultiValueDouble","label":"MultiValueDouble","keyType":"DOUBLE"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Multi value:11;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Multi Value"},
		]
	},

	{
		label: "Secret",
		fields: [
			{"disabled":false,"code":"SecretSingle","description":"Secret Single","fieldType":"SECRET","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Secret:12;field:0","allowEdit":true,"hideOnNew":false,"maxValue":255,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Secret Single"},
			{"disabled":false,"code":"SecretList","description":"Secret List","fieldType":"BINARY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Secret:12;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Secret List"},
			{"disabled":false,"code":"SecretMap","description":"Secret Map","fieldType":"BINARY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Secret:12;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Secret Map"},
			{"disabled":false,"code":"SecretMatrix","description":"Secret Matrix","fieldType":"BINARY","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"SecretMatrix1","label":"SecretMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"SecretMatrix2","label":"SecretMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Secret:12;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Secret Matrix"},
		]
	},

	{
		label: "String",
		fields: [
			{"disabled":false,"code":"StringSingle","description":"String Single","fieldType":"STRING","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:String:13;field:0","allowEdit":true,"hideOnNew":false,"maxValue":255,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"String Single"},
			{"disabled":false,"code":"StringList","description":"String List","fieldType":"STRING","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:String:13;field:1","allowEdit":true,"hideOnNew":false,"maxValue":255,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"String List"},
			{"disabled":false,"code":"StringMap","description":"String Map","fieldType":"STRING","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:String:13;field:2","allowEdit":true,"hideOnNew":false,"maxValue":255,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"String Map"},
			{"disabled":false,"code":"StringMatrix","description":"String Matrix","fieldType":"STRING","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"StringMatrix1","label":"StringMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"StringMatrix2","label":"StringMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:String:13;field:3","allowEdit":true,"hideOnNew":false,"maxValue":255,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"String Matrix"},
		]
	},

	{
		label: "Textarea",
		fields: [
			{"disabled":false,"code":"TextareaSingle","description":"Textarea Single","fieldType":"TEXT_AREA","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"SINGLE","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Textarea:14;field:0","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Textarea Single"},
			{"disabled":false,"code":"TextareaList","description":"Textarea List","fieldType":"TEXT_AREA","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"LIST","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Textarea:14;field:1","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Textarea List"},
			{"disabled":false,"code":"TextareaMap","description":"Textarea Map","fieldType":"TEXT_AREA","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MAP","mapKeyType":"STRING","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Textarea:14;field:2","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Textarea Map"},
			{"disabled":false,"code":"TextareaMatrix","description":"TextareaMatrix","fieldType":"TEXT_AREA","appliesTo":"CE_Parent","valueRequired":false,"matrixColumns":[{"columnUse":"USE_KEY","position":1,"code":"TextareaMatrix1","label":"TextareaMatrix1","keyType":"STRING"},{"columnUse":"USE_KEY","position":2,"code":"TextareaMatrix2","label":"TextareaMatrix2","keyType":"RON"}],"versionable":false,"useInheritedAsDefaultValue":false,"storageType":"MATRIX","triggerEndPeriodEvent":false,"isInDraft":false,"guiPosition":"tab:Textarea:14;field:3","allowEdit":true,"hideOnNew":false,"unique":false,"filter":true,"summary":false,"identifier":false,"storages":["SQL"],"contentTypes":[],"fileExtensions":[],"saveOnExplorer":false,"samples":[],"audited":false,"persisted":true,"hasReferenceJpaEntity":false,"label":"Textarea Matrix"},
		]
	},
];

export class ModelClass {
	schema = ParentSchema;
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

	refSchemas = [
		ChildSchema,
	];

	constructor(auth){
		this.code = code;
		this.label = label;
		this.formFields = formFields;
	}
}
