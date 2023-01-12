import { FcDepartment } from "react-icons/fc";
import { FaBuilding } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "Fakultetet", path: "/", icon: <FaBuilding /> },
  {
    id: 2,
    text: "Departamentet",
    path: "departamentet",
    icon: <FcDepartment />,
  },
  { id: 3, text: "Programet", path: "programet", icon: <IoBookSharp /> },
  { id: 4, text: "profili", path: "profili", icon: <ImProfile /> },
];

export default links;
