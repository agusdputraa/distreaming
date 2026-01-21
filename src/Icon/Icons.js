import { FaHome, FaUser, FaSearch, FaBell } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { 
  FiLogOut, FiUser, FiX, FiSearch, FiFilter, 
  FiChevronDown, FiChevronLeft, FiChevronRight,
  FiPlus, FiFilm, FiTag, FiSave, FiTrash2,
  FiFacebook, FiTwitter, FiInstagram, FiYoutube,
  FiPlay
} from "react-icons/fi";

export const icons = {
  // Navigation
  home: FaHome,
  hamMenu: GiHamburgerMenu,
  
  // User
  user: FiUser,
  logout: FiLogOut,
  
  // Actions
  search: FiSearch,
  filter: FiFilter,
  plus: FiPlus,
  save: FiSave,
  trash: FiTrash2,
  x: FiX,
  
  // Arrows
  chevronDown: FiChevronDown,
  chevronLeft: FiChevronLeft,
  chevronRight: FiChevronRight,
  
  // Media
  film: FiFilm,
  tag: FiTag,
  play: FiPlay,
  
  // Social
  facebook: FiFacebook,
  twitter: FiTwitter,
  instagram: FiInstagram,
  youtube: FiYoutube,
  google: FcGoogle,
  
  // Other
  email: MdEmail,
  bell: FaBell,
  shopping: CiShoppingCart,
};

export default icons;