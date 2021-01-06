import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./styles.scss";

const TabBar = ({ tabs }) => {
    return (
        <Tabs>
            <TabList>
                {tabs.map((tab, key) => (
                    <Tab key={key}>{tab.title}</Tab>
                ))}
            </TabList>

            {tabs.map((tab, key) => (
                <TabPanel key={key}>{tab.component}</TabPanel>
            ))}
        </Tabs>
    );
};

export default TabBar;
