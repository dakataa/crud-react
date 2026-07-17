export {default as Crud, CrudConfiguration, CrudRequester} from "./Crud.tsx";
export {Environment, ConfigProvider} from "./context/ConfigContext.tsx";
export type {Config, ConfigLink} from "./context/ConfigContext.tsx";
export {UseConfig} from "./context/ConfigContext.tsx";

export {default as CrudProvider} from "./context/CrudProvider.tsx";
export {
    default as CrudLoader, CurrentActionRequestProvider, UseCurrentActionRequest, UseCurrentActionCollection
} from "./component/crud/CrudLoader.tsx";
export type {CurrentActionRequestProviderRef} from "./component/crud/CrudLoader.tsx";
export {default as Modify} from "./component/crud/Modify.tsx";
export type {ModifyType} from "./type/ModifyType.tsx";
export {default as List, ListInner, WithListProvider} from "./component/crud/List.tsx";
export {default as GridView} from "./component/crud/GridView.tsx";
export {default as ListView} from "./component/crud/ListView.tsx";
export {default as ListItem} from "./component/crud/ListItem.tsx";
export {default as Paginator} from "./component/crud/Paginator.tsx"
export {UseList, ListProvider} from "./context/ListContext.tsx"
export {UseListItem} from "./context/ListItemContext.tsx"

// CRUD Form
export {default as CrudForm, UseFormView, FormViewProvider} from "./component/crud/form/Form.tsx"
export type {FormViewContextType, ModifyFormRefType} from "./component/crud/form/Form.tsx";
export {default as FormFieldViewLoader} from "./component/crud/form/FormGroupViewLoader.tsx";
export {default as FormGroup} from "./component/crud/form/FormGroup.tsx";
export {default as FormField} from "./component/crud/form/FormField.tsx";
export {default as FormLabel} from "./component/crud/form/FormLabel.tsx";
export {default as FormRest} from "./component/crud/form/FormRest.tsx";
export {default as FormError} from "./component/crud/form/FormError.tsx";
export {default as FormRestError} from "./component/crud/form/FormRestError.tsx";

export {default as DynamicView, UseDynamicView} from "./component/crud/DynamicView.tsx";
export {ViewLoader} from "./component/crud/ViewLoader.tsx";

// Templates
export {AsTemplate, Template, Block, Extend, Parent} from "./component/templating/Template.tsx";

export {default as TemplateBlock} from "./component/templating/TemplateBlock.tsx";
export {default as TemplateExtend} from "./component/templating/TemplateExtend.tsx";
export {default as TemplateParentBlock} from "./component/templating/TemplateParentBlock.tsx";

// Router
export {Router, Route, Outlet} from "./component/router/Route.tsx";

export {default as Modal} from "./component/Modal.tsx";
export type {ModalType} from "./component/Modal.tsx";
export {ModalProvider, UseModal} from "./context/ModalContext.tsx";
export type {ModalActionType, ModalContextType} from "./context/ModalContext.tsx";
export {UseAlert, AlertProvider, WithAlertProvider, Icon as AlertIcon} from "./context/AlertContext.tsx";
export {UseActions, ActionProvider, WithActionProviderContext} from "./context/ActionContext.tsx";
export type {AlertConfigType, Animation, Result} from "./context/AlertContext.tsx";
export type {ActionRequestType} from "./type/ActionRequestType.tsx";
export type {ActionType} from "./type/ActionType.tsx";
export type {RouteType} from "./type/RouteType.tsx";

export {default as HttpException} from "./component/error/HttpException.tsx";
export {default as Exception} from "./component/error/Exception.tsx";
export {default as ErrorBoundary} from "./component/error/ErrorBoundary.tsx";
export {default as Link} from "./component/Link.tsx";
export {default as Button} from "./component/Button.tsx"
export type {ButtonPropsType} from "./component/Button.tsx"
export type {ButtonContentProps} from "./component/BaseButtonContent.tsx"

export {default as Translation} from "./component/Translation.tsx";
export type {TranslationProps} from "./component/Translation.tsx";
export {default as ActionLink} from "./component/crud/ActionLink.tsx";
export {default as ItemAction} from "./component/crud/ItemAction.tsx";
export {default as IsListItemActionGranted} from "./component/crud/IsListItemActionGranted.tsx";

// Form
export {FormSetting, UseFormSettings} from "./component/form/FormSetting.tsx";
export type {FormSettingContextType} from "./component/form/FormSetting.tsx";
export {UseForm, Form, nameToId} from "./component/form/Form.tsx";
export type {FormRef} from "./component/form/Form.tsx";
export {default as BaseFormGroup} from "./component/form/FormGroup.tsx"
export {default as BaseFormFieldError} from "./component/form/FormFieldError.tsx"
export {default as BaseFormLabel} from "./component/form/FormLabel.tsx"
export {default as BaseFormHelp} from "./component/form/FormHelp.tsx"
export {
    default as Choice, ChoiceOption, ChoiceGroupOption, SelectOption, SelectGroupOption
} from "./component/form/Choice.tsx"
export {
    default as Collection, CollectionItem, CollectionList, UseCollection, UseCollectionItem
} from "./component/form/Collection.tsx"
export type {CollectionContextType, CollectionItemContextType} from "./component/form/Collection.tsx"

export {default as Input} from "./component/form/Input.tsx";
export type {InputProps, FormFieldProps} from "./component/form/Input.tsx";
export type {
    FormViewType, FormViewErrorType, ChoiceType, ChoiceGroupType, ChoiceUnionType
} from "./type/FormViewType.tsx";
export {FormViewTypeEnum} from "./type/FormViewType.tsx";

export {default as BaseLayout} from "./layout/default/Base.tsx";
export {default as MainLayout} from "./layout/default/Main.tsx";
export {UseDataProvider, DataProvider, DataContextProvider, GetData, GetDataByAction, WithDataProvider} from "./context/GetData.tsx";
export type {GetDataType, GetDataProps, GetDataByActionRequestProps} from "./context/GetData.tsx";
export type {ListType} from "./type/ListType.tsx"
export type {ViewType} from "./type/ViewType.tsx"
export type {ListContextPropsType} from "./context/ListContext.tsx"
export type {ListItemContextType} from "./context/ListItemContext.tsx"

export {default as Money} from "./component/Money.tsx";

// Dropdown
export {default as Dropdown, DropdownContent, DropdownButton} from "./component/Dropdown"

export {maskEmail, capitalize, titlize} from "./helper/StringUtils.tsx"

// Lottie
export {default as LottieAnimation} from "./component/LottieAnimation.tsx";

export {objectRemoveEmpty, objectKeyIntersect, objectKeyDiff} from "./helper/ObjectUtils.tsx";
