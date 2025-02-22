import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <article className="prose max-w-[80ch] dark:prose-invert">
      <h1>İletişim</h1>
      <form className="space-y-4 mt-6 min-w-80">
        <Input type="email" placeholder="E-posta adresiniz" required />
        <Textarea placeholder="Mesajınız" rows={4} required />
        <Button type="submit" className="w-full">
          Gönder
        </Button>
      </form>
    </article>
  );
}

export async function generateMetadata() {
  return {
    title: "Iletişim - Furkan Leba",
    description: "İletişim",
  };
}
