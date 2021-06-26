interface IMailContact {
  name: string;
  address: string;
}

interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  text: string;
}

export { ISendMailDTO };
