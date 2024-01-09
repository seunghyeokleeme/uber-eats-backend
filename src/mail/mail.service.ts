import got from 'got';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(name: string, template: string) {
    const form = new FormData();
    form.append('from', `Nuber <Nuber@${this.options.domain}>`);
    form.append('to', `devinan.hr@gmail.com`);
    form.append('subject', `Hello ${name}`);
    form.append('template', template);
    form.append('v:code', 'asasas');
    form.append('v:username', 'tester!!');

    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        method: 'post',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      },
    );
    console.log(response.body);
  }
}
