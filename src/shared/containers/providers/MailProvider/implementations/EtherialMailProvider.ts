import nodemailer from 'nodemailer';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

class EtherialMailProvider implements IMailProvider {
  private client: nodemailer.Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    text,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Tog.design',
        address: from?.address || 'equipe@togdesign.com.br',
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      text,
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherialMailProvider };
