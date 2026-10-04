export function whatsappNumber() {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348061542075').replace(/\D/g, '');
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}
