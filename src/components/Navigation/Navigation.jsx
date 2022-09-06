import { useMediaQuery } from "react-responsive";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export const drawerWidth = 240;
export const topbarHeight = 60;

const Navigation = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return isTabletOrMobile ? (
        <MobileNavigation topbarHeight={topbarHeight} />
    ) : (
        <DesktopNavigation drawerWidth={drawerWidth} />
    );
};

export default Navigation;
