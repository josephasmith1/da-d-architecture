import NextLink from "next/link";
import Image from "next/image";

export function Footer() {
  const studioLinks = [
    { label: "Our Team", href: "/people" },
    { label: "Our Process", href: "/about" },
    { label: "Our Philosophy", href: "/about" }
  ];

  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Studio Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wider">STUDIO</h2>
            <ul className="space-y-4">
              {studioLinks.map((link) => (
                <li key={link.label}>
                  <NextLink 
                    href={link.href}
                    className="text-gray-400 text-xl md:text-2xl font-light hover:text-white transition-colors"
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wider">CONTACT</h2>
            <div className="space-y-4">
              <p className="text-gray-400 text-lg font-light">
                <a href="tel:+12133040992" className="hover:text-white transition-colors">
                  213.304.0992
                </a>
              </p>
              <p className="text-gray-400 text-lg font-light">
                <a href="mailto:info@dadinc.com" className="hover:text-white transition-colors">
                  info@dadinc.com
                </a>
              </p>
            </div>
          </div>

          {/* Empty column for spacing */}
          <div></div>
        </div>

        {/* Logo */}
        <div>
          <Image
            src="/DAd LOGO copy-03.svg"
            alt="DA+D"
            width={200}
            height={77}
            className="h-16 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}