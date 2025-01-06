import { DaysSince } from "./DaysSince";

export default function Page() {
  return (
    <article className="prose max-w-[80ch] dark:prose-invert prose-inline-code:border prose-inline-code:before:hidden prose-inline-code:after:hidden prose-inline-code:p-1 prose-inline-code:border-secondary/40 prose-inline-code:rounded-md prose-inline-code:bg-secondary/20 prose-pre:ps-0 prose-pre:pe-0 prose-pre:p-0 prose-pre:py-2">
      <h1>Hakkımda</h1>
      <div>
        <p>
          Kişisel blogumda JavaScript, React, Node.js ve diğer teknolojiler
          hakkında yazılar, rehberler ve ipuçları bulabilirsiniz.
        </p>
        <DaysSince />
      </div>
    </article>
  );
}

export async function generateMetadata() {
  return {
    title: "Hakkımda - Furkan Leba",
    description:
      "Kişisel blogumda JavaScript, React, Node.js ve diğer teknolojiler hakkında yazılar, rehberler ve ipuçları bulabilirsiniz.",
  };
}
