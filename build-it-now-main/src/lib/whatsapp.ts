// Central WhatsApp Business configuration.
// Override via VITE_WHATSAPP_NUMBER in the environment (Lovable project settings / Cloudflare
// Pages build variables) if the number ever changes, so it never needs to be edited in code.
const DEFAULT_WHATSAPP_NUMBER = "263776727967";
export const WHATSAPP_NUMBER = (import.meta.env["VITE_WHATSAPP_NUMBER"] ?? DEFAULT_WHATSAPP_NUMBER).trim();

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Haki Systems, I'd like to discuss an AI or automation project for my organisation.";

export const WHATSAPP_BOOKING_MESSAGE = "Hi Haki Systems, I'd like to book a consultation.";

/** Official WhatsApp click-to-chat URL. Returns null if no number is configured. */
export function getWhatsAppUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
