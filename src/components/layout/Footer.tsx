import NextLink from "next/link";
import Image from "next/image";

export function Footer() {
  const studioLinks = [
    { label: "Our Team", href: "/people" },
    { label: "Our Process", href: "/about" },
    { label: "Our Philosophy", href: "/about" }
  ];

  return (
    <footer className="bg-black text-white py-10">
      <div className="w-full mx-auto px-10">
        <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 ">
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
                <a href="mailto:scott@da-designinc.com" className="hover:text-white transition-colors">
                  scott@da-designinc.com
                </a>
              </p>
            </div>
          </div>

          {/* Empty column for spacing */}
          <div></div>
        </div>
        </div>

        {/* Logo and Credits */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <Image
                src="/DAd LOGO copy-03.svg"
                alt="DA+D"
                width={200}
                height={77}
                className="h-16 w-auto"
              />
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p className="text-gray-400 text-sm">
                Scott DeLoache, AIA, LEED GA, NCARB
              </p>
              <p className="text-gray-500 text-xs mt-1">
                © {new Date().getFullYear()} DA+D Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}