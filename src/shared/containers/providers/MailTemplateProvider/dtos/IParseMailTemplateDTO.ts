interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplateDTO {
  filepath: string;
  variables: ITemplateVariables;
}

export { IParseMailTemplateDTO };
