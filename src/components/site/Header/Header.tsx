import Link from "next/link";

export const Header = () => {
  return (
    <div className="min-h-16 border-b flex  items-center  w-full">
      <header className=" px-6 flex items-center gap-2">
        <Link href="/">
          <div id="logo" className="flex gap-1 items-center">
            <span className="text-4xl">⌘</span>
            <span className="font-bold text-lg">furkan leba</span>
          </div>
        </Link>
        <div id="navbar-links" className="text-sm">
          <Link
            className="text-secondary hover:text-secondary-foreground"
            href="/"
          >
            Hakkımda
          </Link>
        </div>
      </header>
    </div>
  );
};
