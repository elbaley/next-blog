import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80%]">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Bulunamadı</h2>
        <p className="text-lg mb-6">Aradığınız sayfa bulunamadı.</p>
        <Link href="/">
          <Button>Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </div>
  );
}
