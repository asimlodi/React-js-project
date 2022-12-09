import { categories } from "../constants"
import { usePathname } from "next/navigation"
import Navlink from "./Navlink"

const Navlinks = () => {
  return (
    <nav>
        {categories.map((category) => (
          <Navlink key={category} category={category} isActive={true} />
        ))}
    </nav>
  )
}

export default Navlinks