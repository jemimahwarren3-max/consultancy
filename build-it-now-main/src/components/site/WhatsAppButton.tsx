import { MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

/**
 * WhatsApp click-to-chat button. Renders nothing if VITE_WHATSAPP_NUMBER is not configured,
 * so an unconfigured environment never shows a dead link.
 */
export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  variant = "outline",
  size = "default",
  className,
}: {
  message?: string;
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) {
  const url = getWhatsAppUrl(message);
  if (!url) return null;

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <MessageCircle /> {label}
      </a>
    </Button>
  );
}
