

const contactDetails = [
  {
    icon: "📍",
    text: "xyz,www,xyy",
  },
  {
    icon: "✉️",
    text: "contact@xyzpharmacy.in",
  },
  {
    icon: "📞",
    text: "+91 8130-811 911",
  },
];

const importantLinks = [
  "Online Doctor Consultation",
   "Pro Health Program",
     "All Doctors List",
     "Consult Physicians",
     "Consult Dermatologists",
];

const compliances = [
   "RT PCR Test At Home",
     "Book Lab Tests at Home",
     "Renal Profile (KFT, RFT Test)",
     "Hemogram Test",
];

const socialIcons = [
 {
   href: "#",
   label: "Facebook",
   icon: (
     <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
       <path d="M22.675 0h-21.35C.597 0 0 .6 0 1.326v21.348C0 23.4.597 24 1.325 24H12.82v-9.294H9.692V11.01h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116c.728 0 1.325-.6 1.325-1.326V1.326C24 .6 23.403 0 22.675 0"/>
     </svg>
   ),
 },
 {
   href: "#",
   label: "X",
   icon: (
     <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
       <path d="M24 4.557l-8.197 8.197 8.197 8.197-1.414 1.414-8.197-8.197-8.197 8.197-1.414-1.414 8.197-8.197-8.197-8.197L4.557 3.143l8.197 8.197 8.197-8.197z"/>
     </svg>
   ),
 },
 {
   href: "#",
   label: "LinkedIn",
   icon: (
     <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
       <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.036-1.849-3.036-1.851 0-2.132 1.445-2.132 2.939v5.666H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.369 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.07-.926-2.07-2.07 0-1.143.926-2.07 2.07-2.07 1.143 0 2.07.927 2.07 2.07 0 1.144-.927 2.07-2.07 2.07zm1.777 13.019H3.56V9h3.554v11.452z"/>
     </svg>
   ),
 },
 {
   href: "#",
   label: "YouTube",
   icon: (
     <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
       <path d="M23.498 6.186a2.993 2.993 0 0 0-2.107-2.117C19.153 3.5 12 3.5 12 3.5s-7.153 0-9.391.569A2.993 2.993 0 0 0 .502 6.186C0 8.424 0 12 0 12s0 3.576.502 5.814a2.993 2.993 0 0 0 2.107 2.117C4.847 20.5 12 20.5 12 20.5s7.153 0 9.391-.569a2.993 2.993 0 0 0 2.107-2.117C24 15.576 24 12 24 12s0-3.576-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
     </svg>
   ),
 },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm text-gray-700">
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              {contactDetails.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Lab Tests</h4>
            <ul className="space-y-2">
              {compliances.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Info */}
          <div>
            <h4 className="font-semibold mb-4">Other Info</h4>
            <div className="flex gap-4 mb-4">
              {socialIcons.map((icon) => (
                <a key={icon.label} href={icon.href} aria-label={icon.label}>
                  <span className="text-xl">{icon.icon}</span>
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-1">
              SEBI RA Reg. No. INH000012546
            </p>
            <p className="text-sm text-gray-500">Copyright © 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

