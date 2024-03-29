import sgMail from '@sendgrid/mail';
import { appEnv } from './env';
import { IEmail } from '../types/common';
sgMail.setApiKey(appEnv.SENDGRID_KEY!);

export const sendEmail = async (email: IEmail) => {
  try {
    const msg = {
      to: email.receiver,
      from: appEnv.SENDGRID_EMAIL!,
      templateId: email.templateId,
      dynamic_template_data: email.templateData
    };
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
}