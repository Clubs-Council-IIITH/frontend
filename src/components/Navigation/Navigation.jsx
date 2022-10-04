import { useContext } from "react";
import { NavigationContext } from "contexts/NavigationContext";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export const drawerWidth = 240;
export const topbarHeight = 60;

const Navigation = () => {
    const { isTabletOrMobile } = useContext(NavigationContext);

    return isTabletOrMobile ? (
        <MobileNavigation topbarHeight={topbarHeight} />
    ) : (
        <DesktopNavigation drawerWidth={drawerWidth} />
    );
};

export default Navigation;
