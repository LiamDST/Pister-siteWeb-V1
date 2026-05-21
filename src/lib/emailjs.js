import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Envoie un email via EmailJS.
 * @param {{ name: string, email: string, company: string, message: string, type: string }} params
 */
export async function sendContactEmail(params) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
}
