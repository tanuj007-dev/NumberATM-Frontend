import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  EmailShareButton,
  RedditShareButton,
} from "react-share";

import { RxCross1 } from "react-icons/rx";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaTelegramPlane,
  FaLinkedin,
  FaEnvelope,
  FaRedditAlien,
  FaCopy
} from "react-icons/fa";

export default function SharePopup({ url, onClose }) {

  // Copy Link Function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link Copied!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#F5C037] p-1.5 rounded-md text-gray-700 text-xl"
        >
          <RxCross1 />
        </button>

      <div className="flex items-center my-6 w-full">

  {/* Left Line */}
  <div className="flex-1 h-[3px] bg-[#F5C037]"></div>

  {/* Middle Circle with Heading */}
  <div className="mx-4 flex items-center justify-center">
    
      <h2 className="text-xl font-semibold text-[#17565D]">
        NumberATM
      </h2>
   
  </div>

  {/* Right Line */}
  <div className="flex-1 h-[3px] bg-[#F5C037]"></div>

</div>


        {/* Share Buttons */}
        <div className="grid grid-cols-4 gap-12 text-center">
{/* WhatsApp */}
<a 
  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center"
>
  <FaWhatsapp  className="text-green-600 text-3xl sm:text-5xl" />
</a>

{/* Facebook */}
<a 
  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center"
>
  <FaFacebook className="text-blue-600 text-3xl sm:text-5xl" />
</a>

{/* Twitter */}
<a 
  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center"
>
  <FaTwitter className="text-sky-500 text-3xl sm:text-5xl" />
</a>

{/* Telegram */}
<a 
  href={`https://t.me/share/url?url=${encodeURIComponent(url)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center"
>
  <FaTelegramPlane className="text-blue-500 text-3xl sm:text-5xl" />
</a>

{/* LinkedIn */}
<a 
  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center"
>
  <FaLinkedin className="text-blue-700 text-3xl sm:text-5xl" />
</a>

{/* Email */}
<a 
  href={`mailto:?subject=Check this out&body=${encodeURIComponent(url)}`}
  className="flex flex-col items-center"
>
  <FaEnvelope className="text-red-600 text-3xl sm:text-5xl" />
</a>

{/* Reddit */}
<a 
  href={`https://www.reddit.com/submit?url=${encodeURIComponent(url)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center"
>
  <FaRedditAlien className="text-orange-600 text-3xl sm:text-5xl" />
</a>

          {/* Copy Link */}
        <button
  onClick={copyToClipboard}
  className="flex flex-col items-center bg-white border hover:border-white"
>
  <FaCopy className="text-gray-700 text-3xl sm:text-5xl" />
</button>

        </div>
      </div>
    </div>
  );
}
