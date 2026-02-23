import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "254105575260";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WhatsAppFloat = () => {
  const handleClick = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Talk to us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-medium">Talk to us</span>
    </button>
  );
};
