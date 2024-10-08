import logo_big from "../assets/logo_big.png";
import instagram_icon from "../assets/instagram_icon.png";
import pintester_icon from "../assets/pintester_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";
const Footer = () => {
  return (
    <div className="footer flex flex-col justify-center items-center gap-7 p-7 bg-gray-50">
      <div className="footer-logo flex items-center gap-3">
        <img src={logo_big} alt="Footer Logo" />
        <p className=" text-zinc-900 text-3xl font-bold">Super Dress</p>
      </div>
      <ul className="footer-links flex list-none gap-5 text-gray-800 text-lg">
        <li className=" cursor-pointer transition-colors hover:text-red-600">
          Company
        </li>
        <li className=" cursor-pointer transition-colors hover:text-red-600">
          Products
        </li>
        <li className=" cursor-pointer transition-colors hover:text-red-600">
          Offices
        </li>
        <li className=" cursor-pointer transition-colors hover:text-red-600">
          About
        </li>
        <li className=" cursor-pointer transition-colors hover:text-red-600">
          Contact
        </li>
      </ul>
      <div className="footer-social-icon flex items-center gap-4">
        <div className="footer-icons-container p-2 bg-white border border-solid border-gray-400 rounded-lg cursor-pointer">
          <img src={instagram_icon} alt="Instagram Icon" />
        </div>
        <div className="footer-icons-container p-2 bg-white border border-solid border-gray-400 rounded-lg cursor-pointer">
          <img src={pintester_icon} alt="Pintrest Icon" />
        </div>
        <div className="footer-icons-container p-2 bg-white border border-solid border-gray-400 rounded-lg cursor-pointer">
          <img src={whatsapp_icon} alt="Whatsapp Icon" />
        </div>
        <div className="footer-copyright flex flex-col items-center gap-5 w-full mb-5 text-gray-600 text-base">
          <hr className="flex self-start w-1/2 border-none rounded-md h-0.5 bg-gray-300" />
          <p>Copyright @ {new Date().getFullYear()} - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
