import { RegistryWidgetsType } from '@rjsf/utils';
import {
  TextWidget,
  SelectWidget,
  CheckboxWidget,
  TextareaWidget,
  EnvironmentVariablesWidget,
  EnvironmentVariablesField,
} from './widgets';
import {
  ArrayFieldTemplate,
  FieldTemplate,
  ObjectFieldTemplate,
  FormTemplate,
} from './templates';

export const customWidgets: RegistryWidgetsType = {
  TextWidget,
  SelectWidget,
  CheckboxWidget,
  TextareaWidget,
  textarea: TextareaWidget,
  EnvironmentVariablesWidget,
};

export const customFields = {
  EnvironmentVariablesField,
};

export const customTemplates = {
  ArrayFieldTemplate,
  FieldTemplate,
  ObjectFieldTemplate,
  FormTemplate,
};

export const shadcnTheme = {
  widgets: customWidgets,
  fields: customFields,
  templates: customTemplates,
};
