/**
 * Top bar Component to hold title, searchbar and updates button.
 *
 * props:
 *  - title (`string`): Title of the current page.
 *  - component (`component`): Optional. Custom component to render
 *                             on the topbar.
 */

import "./styles.scss";

const Topbar = ({ title, component }) => {
    return (
        <div className="topbar-column">
            <div className="topbar text-light">
                <div className="title-display">
                    {title && <div className="mr-4">{title}</div>}
                    {component && <div className="d-none d-md-block">{component}</div>}
                </div>
            </div>
            {component && <div className="d-md-none mt-3 mb-2">{component}</div>}
        </div>
    );
};

export default Topbar;
