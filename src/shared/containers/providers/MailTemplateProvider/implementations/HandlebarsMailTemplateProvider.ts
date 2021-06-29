import fs from 'fs';
import handlebars from 'handlebars';

import { IParseMailTemplateDTO } from '../dtos/IParseMailTemplateDTO';
import { IMailTemplateProvider } from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    filepath,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(filepath, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export { HandlebarsMailTemplateProvider };
