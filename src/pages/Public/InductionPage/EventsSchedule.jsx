import { AbcOutlined, RemoveOutlined, SportsSoccerOutlined, PrecisionManufacturing, EscalatorWarningOutlined, CameraEnhanceOutlined, TodayOutlined, PlayCircleFilledOutlined, Computer, Groups2Outlined, TravelExploreOutlined, VideogameAssetOutlined, PeopleOutlined, NightlifeOutlined, EmojiEmotionsOutlined, BrushOutlined, ColorLensOutlined, PsychologyOutlined, QuizOutlined, BorderColorOutlined, LanguageOutlined, MovieCreationOutlined } from "@mui/icons-material";
import { Divider } from "@mui/material";

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const eventsData = [
    // blue,red,yellow,pink,green
    {
        "className": "empty"
    },
    {
        "className": "red",
        "date": "30 October, 9am - 12:30pm",
        "title": "Intro to Student Bodies",
        "subtitle": "Session - 1",
        "description": "",
        "icon": Groups2Outlined
    },
    {
        "className": "blue",
        "date": "30 October, 2pm - 4pm",
        "title": "Linux Fest",
        "subtitle": "OSDG",
        "description": "Introduction Session",
        "icon": Computer
    },
    {
        "className": "pink",
        "date": "30 October, 4pm - 8pm",
        "title": "Treasure Hunt",
        "subtitle": "LitClub",
        "description": "",
        "icon": TravelExploreOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "red",
        "date": "31 October, 5:30pm - 8:00pm",
        "title": "Intro to Student Bodies",
        "subtitle": "Session - 2",
        "description": "",
        "icon": Groups2Outlined
    },
    {
        "className": "yellow",
        "date": "31 October, 9pm",
        "title": "Karaoke Night",
        "subtitle": "APEX",
        "description": "",
        "icon": PlayCircleFilledOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "yellow",
        "date": "1 November, 5:30pm",
        "title": "Spotlight",
        "subtitle": "APEX",
        "description": "",
        "icon": NightlifeOutlined
    },    
    {
        "className": "date"
    },
    {
        "className": "green",
        "date": "2 November, 3:30pm - 5:30pm",
        "title": "Clash of Clusters Photo Contest",
        "subtitle": "Pentaprism",
        "description": "",
        "icon": CameraEnhanceOutlined
    },
    {
        "className": "red",
        "date": "2 November, 5:30pm - 7:30pm",
        "title": "Intro to Arduino",
        "subtitle": "ERC",
        "description": "",
        "icon": PrecisionManufacturing
    },
    {
        "className": "pink",
        "date": "2 November, 7pm",
        "title": "Halloween Gaming Event",
        "subtitle": "Gaming Club",
        "description": "",
        "icon": VideogameAssetOutlined
    },
    {
        "className": "blue",
        "date": "2 November, 8:30pm - 11pm",
        "title": "Linux Fest",
        "subtitle": "OSDG",
        "description": "Doubt Session",
        "icon": Computer
    },
    {
        "className": "date"
    },
    {
        "className": "green",
        "date": "3 November, 5:30pm - 7:30pm",
        "title": "Just Dance",
        "subtitle": "Dance Crew",
        "description": "",
        "icon": NightlifeOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "blue",
        "date": "4 November, 5:30pm - 7:30pm",
        "title": "Funbits",
        "subtitle": "Decore",
        "description": "",
        "icon": EmojiEmotionsOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "red",
        "date": "5 November, 2pm",
        "title": "Pumpkin Carving",
        "subtitle": "Art Society",
        "description": "",
        "icon": BrushOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "blue",
        "date": "6 November, 9am - 12:30pm",
        "title": "Fresher's Quiz",
        "subtitle": "TVRQC",
        "description": "",
        "icon": QuizOutlined
    },
    {
        "className": "red",
        "date": "6 November, 2:30pm - 5:30pm",
        "title": "Face Painting",
        "subtitle": "Art Society",
        "description": "",
        "icon": ColorLensOutlined
    },
    {
        "className": "green",
        "date": "6 November, 3:30pm - 5:30pm",
        "title": "Puzzle Solving Session ",
        "subtitle": "Chess Club",
        "description": "",
        "icon": PsychologyOutlined
    },
    {
        "className": "pink",
        "date": "6 November, 6pm - 8pm",
        "title": "Halloween Event",
        "subtitle": "Language Club",
        "description": "",
        "icon": LanguageOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "red",
        "date": "7 November, 5:30pm - 7:30pm",
        "title": "Clash of Clusters Futsal",
        "subtitle": "ASEC",
        "description": "Part - 1",
        "icon": SportsSoccerOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "red",
        "date": "8 November, 5:30pm - 7:30pm",
        "title": "Clash of Clusters Futsal",
        "subtitle": "ASEC",
        "description": "Part - 2",
        "icon": SportsSoccerOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "green",
        "date": "9 November",
        "title": "Shark Tank",
        "subtitle": "E-Cell",
        "description": "",
        "icon": BorderColorOutlined
    },
    {
        "className": "date"
    },
    {
        "className": "pink",
        "date": "10 November",
        "title": "Clash of Clusters Debate",
        "subtitle": "Debate Society",
        "description": "",
        "icon": PeopleOutlined
    },
    {
        "className": "empty"
    },
]

const TimelineElement = ({
    title,
    subtitle,
    description,
    className = "others",
    date,
    icon: Icon,
}) => (
    (className === "empty") ?
        <VerticalTimelineElement
            iconStyle={{ background: 'rgb(0,0,0)', color: '#fff' }}
            icon={< RemoveOutlined />}
        />
        :
        (className === "date") ?
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(0,0,0)', color: '#fff' }}
                icon={< TodayOutlined />}
            />
            :
            ((className === "blue") ?
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "rgb(18, 110, 184)", color: '#fff' }}
                    contentArrowStyle={{ borderRight: "7px solid rgb(18, 110, 184)" }}
                    date={date}
                    dateClassName="timelineDate"
                    iconStyle={{ background: "rgb(18, 110, 184)", color: '#fff' }}
                    icon={< Icon />}
                >
                    <h3 className="vertical-timeline-element-title">{title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{subtitle}</h4>
                    <p>
                        {description}
                    </p>
                </VerticalTimelineElement >
                :
                ((className === "red") ?
                    < VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        contentStyle={{ background: "rgb(233, 30, 90)", color: '#fff' }}
                        contentArrowStyle={{ borderRight: "7px solid rgb(233, 30, 90)" }}
                        date={date}
                        dateClassName="timelineDate"
                        iconStyle={{ background: "rgb(233, 30, 90)", color: '#fff' }}
                        icon={< Icon />}
                    >
                        <h3 className="vertical-timeline-element-title">{title}</h3>
                        <h4 className="vertical-timeline-element-subtitle">{subtitle}</h4>
                        <p>
                            {description}
                        </p>
                    </VerticalTimelineElement >
                    :
                    ((className === "yellow") ?
                        < VerticalTimelineElement
                            className="vertical-timeline-element--education"
                            contentStyle={{ background: "rgb(168, 157, 5)", color: '#fff' }}
                            contentArrowStyle={{ borderRight: "7px solid rgb(168, 157, 5)" }}
                            date={date}
                            dateClassName="timelineDate"
                            iconStyle={{ background: "rgb(168, 157, 5)", color: '#fff' }}
                            icon={< Icon />}
                        >
                            <h3 className="vertical-timeline-element-title">{title}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{subtitle}</h4>
                            <p>
                                {description}
                            </p>
                        </VerticalTimelineElement >
                        :
                        ((className === "green") ?
                            < VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: "rgb(16, 204, 82)", color: '#fff' }}
                                contentArrowStyle={{ borderRight: "7px solid rgb(16, 204, 82)" }}
                                date={date}
                                dateClassName="timelineDate"
                                iconStyle={{ background: "rgb(16, 204, 82)", color: '#fff' }}
                                icon={< Icon />}
                            >
                                <h3 className="vertical-timeline-element-title">{title}</h3>
                                <h4 className="vertical-timeline-element-subtitle">{subtitle}</h4>
                                <p>
                                    {description}
                                </p>
                            </VerticalTimelineElement >
                            :
                            < VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: "rgb(176, 9, 127)", color: '#fff' }}
                                contentArrowStyle={{ borderRight: "7px solid rgb(176, 9, 127)" }}
                                date={date}
                                dateClassName="timelineDate"
                                iconStyle={{ background: "rgb(176, 9, 127)", color: '#fff' }}
                                icon={< Icon />}
                            >
                                <h3 className="vertical-timeline-element-title">{title}</h3>
                                <h4 className="vertical-timeline-element-subtitle">{subtitle}</h4>
                                <p>
                                    {description}
                                </p>
                            </VerticalTimelineElement >)
                    )
                )
            )
);

const EventSchedule = () => {
    return (
        <>
            <VerticalTimeline lineColor="black">
                {
                    eventsData.map((member, key) => (
                        <TimelineElement {...member} key={key}>
                        </TimelineElement>
                    ))
                }
            </VerticalTimeline>
            <Divider /></>
    );
};

export default EventSchedule;
