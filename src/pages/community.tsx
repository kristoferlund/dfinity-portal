import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import { Stat, StatsPanel } from "../components/Common/Stats";
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import { SpringCounter } from "../components/LandingPage/PreHero/Counters";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);

type Hub = {
  name: string;
  location?: string;
  description: string;
  image: string;
  link: string;
  coordinates?: [number, number];
};
const hubs: Hub[] = [
  {
    name: "SynergyLabs TH MY ICP.Hub",
    location: "Malaysia / Thailand / Phuket",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [7.9519, 98.3381],
    image: "/img/community/hub-synergylabs.webp",
    link: "",
  },
  {
    name: "ICP.Hub Italia",
    location: "Italy:  Milan / Rome",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [41.9028, 12.4964],
    image: "/img/community/hub-italia.webp",
    link: "",
  },
  {
    name: "ICP.Hub North America",
    location: "Canada / Vancouver",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [49.2827, -123.1207],
    image: "/img/community/hub-north-america.webp",
    link: "",
  },
  {
    name: "ICP.Hub Philippines",
    location: "Philippines",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [14.5995, 120.9842],
    image: "/img/community/hub-philippines.webp",
    link: "",
  },

  {
    name: "ICP.Hub Turkey (Middle East)",
    location: "Turkey / Cyprus",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [39.9334, 32.8597],
    image: "/img/community/hub-turkey.webp",
    link: "",
  },

  {
    name: "Disruptives ICP.Hub Indonesia",
    location: "Indonesia / Bali / Canggu",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [-8.6478, 115.1385],
    image: "/img/community/hub-indonesia.webp",
    link: "",
  },

  {
    name: "ICP.Hub Korea",
    location: "Seoul",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [37.5665, 126.978],
    image: "/img/community/hub-korea.webp",
    link: "",
  },

  {
    name: "Kushite ICP.Hub East Africa",
    location: "East Africa",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [1.2921, 36.8219],
    image: "/img/community/hub-east-africa.webp",
    link: "",
  },

  {
    name: "Sahara ICP.Hub (West Africa)",
    location: "West Africa",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [9.082, 8.6753],
    image: "/img/community/hub-sahara.webp",
    link: "",
  },

  {
    name: "ICP.Hub GCC",
    location: "GCC",
    description:
      "loreum ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
    coordinates: [24.4539, 54.3773],
    image: "/img/community/hub-gcc.webp",
    link: "",
  },
];

const upcomingHubs: Hub[] = [
  {
    name: "ICP. Hub launch event",
    description: "loreum ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/img/community/hub-placeholder.webp",
    link: "",
  },
  {
    name: "ICP. Hub launch event",
    description: "loreum ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/img/community/hub-placeholder.webp",
    link: "",
  },
  {
    name: "ICP. Hub launch event",
    description: "loreum ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/img/community/hub-placeholder.webp",
    link: "",
  },
];

const communityGallery: {
  image: string;
  title: string;
  description: string;
  heightUnits: number;
}[] = [
  {
    image: "/img/community/image-7.webp",
    description: "Location | Example description",
    title: "Image Title",
    heightUnits: 3,
  },
  {
    image: "/img/community/image-1.webp",
    description: "Location | Example description",
    title: "Image Title",
    heightUnits: 2,
  },
  {
    image: "/img/community/image-8.webp",
    description: "Location | Example description",
    title: "Image Title",
    heightUnits: 3,
  },
  {
    image: "/img/community/image-6.webp",
    description: "Location | Example description",
    title: "Image Title",
    heightUnits: 2,
  },
  {
    image: "/img/community/image-4.webp",
    description: "Location | Example description",
    title: "Image Title",
    heightUnits: 2,
  },
  {
    image: "/img/community/image-5.webp",
    description: "Location | Example description",
    title: "Image Title",
    heightUnits: 2,
  },
  {
    image: "/img/community/image-3.webp",
    description: "Location | Example description",
    title: "Image Title",
    heightUnits: 1,
  },
];

const CommunityGalleryImage: React.FC<{
  item: (typeof communityGallery)[0];
}> = ({ item }) => {
  return (
    <motion.div
      variants={transitions.item}
      className={clsx(
        `overflow-hidden rounded-xl flex flex-col bg-white group relative cursor-pointer`,
        [
          "row-end-auto",
          "row-end-[span_1]",
          "row-end-[span_2]",
          "row-end-[span_3]",
          "row-end-[span_4]",
          "row-end-[span_5]",
        ][item.heightUnits]
      )}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover object-center"
      ></img>
      <div className="absolute bottom-0 left-0 right-0 rounded-xl bg-white/30 backdrop-blur-md opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto text-white p-8">
        <h4 className="tw-heading-5 mb-3">{item.title}</h4>
        <p className="tw-lead-sm mb-0">{item.description}</p>
      </div>
    </motion.div>
  );
};

const Globe: React.FC<{
  className?: string;
}> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    let phi = 0;

    canvasRef.current.width =
      canvasRef.current.clientWidth * window.devicePixelRatio;
    canvasRef.current.height =
      canvasRef.current.clientHeight * window.devicePixelRatio;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: window.devicePixelRatio,
      width: canvasRef.current.width,
      height: canvasRef.current.height,
      phi: 0,
      theta: 0.42,
      dark: 1,
      diffuse: 1.75,
      mapSamples: 43000,
      mapBrightness: 7.3,
      baseColor: [0.23, 0.0, 0.72], // #3b00b9 with each byte represented as 0..1
      markerColor: [1, 1, 1],
      // glowColor: [0.23, 0.0, 0.72],
      glowColor: [0.8, 0.8, 0.8],
      opacity: 0.41,
      // longitude latitude
      // { location: [37.7595, -122.4367], size: 0.03 },
      markers: hubs.map((hub) => ({
        location: hub.coordinates,
        size: 0.03,
      })),
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.0025;
        state.width = canvasRef.current.clientWidth * window.devicePixelRatio;
        state.height = canvasRef.current.clientHeight * window.devicePixelRatio;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return <canvas className={className} ref={canvasRef}></canvas>;
};

const HubCard: React.FC<{
  hub: Hub;
}> = ({ hub }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl flex flex-col bg-white"
      variants={transitions.item}
    >
      <img
        src={hub.image}
        alt={hub.name}
        loading="lazy"
        className="h-[200px] object-cover"
      />
      <div className="tw-title-navigation-on-page rounded-full mx-4 px-3 py-1 bg-white/60 backdrop-blur-2xl -translate-y-1/2 inline-flex gap-3 items-center self-start">
        {hub.location}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 13.9332L11.2998 10.6333C13.1223 8.8109 13.1223 5.85611 11.2998 4.03366C9.4774 2.21122 6.52261 2.21122 4.70017 4.03366C2.87772 5.85611 2.87772 8.8109 4.70017 10.6333L8 13.9332ZM8 15.8188L3.75736 11.5762C1.41421 9.23296 1.41421 5.434 3.75736 3.09086C6.10051 0.747709 9.89947 0.747709 12.2427 3.09086C14.5858 5.434 14.5858 9.23296 12.2427 11.5762L8 15.8188ZM8 8.66683C8.7364 8.66683 9.33333 8.0699 9.33333 7.3335C9.33333 6.59712 8.7364 6.00016 8 6.00016C7.2636 6.00016 6.66667 6.59712 6.66667 7.3335C6.66667 8.0699 7.2636 8.66683 8 8.66683ZM8 10.0002C6.52724 10.0002 5.33333 8.80623 5.33333 7.3335C5.33333 5.86074 6.52724 4.66683 8 4.66683C9.47273 4.66683 10.6667 5.86074 10.6667 7.3335C10.6667 8.80623 9.47273 10.0002 8 10.0002Z"
            fill="black"
          />
        </svg>
      </div>
      <h3 className="tw-heading-6 mb-4 mx-6">{hub.name}</h3>
      <p className="flex-1 tw-paragraph-sm text-black/60 mx-6 mb-3">
        {hub.description}
      </p>
      <p className="mb-8 mx-6">
        <Link className="button-round-icon" href="">
          <svg
            width="16"
            height="21"
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.60718 13.9316H9.45173V20.3247H6.60718V13.9316Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.030082 7.38579H4.86365L1.42228 4.12851L3.31864 2.19604L6.59276 5.54477V0.779785H9.43732V5.54357L12.7102 2.19484L14.6066 4.12731L11.1652 7.38458H16V10.0787H11.1351L14.5922 13.4275L12.6958 15.3154L7.9994 10.6118L3.303 15.3154L1.40663 13.4275L4.86365 10.0787H0V7.38579H0.030082Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </p>
    </motion.div>
  );
};

const UpcomingHubCard: React.FC<{
  hub: Hub;
}> = ({ hub }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl flex flex-col bg-white"
      variants={transitions.item}
    >
      <img
        src={hub.image}
        alt={hub.name}
        loading="lazy"
        className="h-[200px] object-cover"
      />
      <h3 className="tw-heading-5 mb-3 mx-6 mt-8">{hub.name}</h3>
      <p className="flex-1 tw-paragraph-sm text-black/60 mx-6 mb-11">
        {hub.description}
      </p>
      <p className="mb-8 mx-6">
        <Link className="button-outline button-small" href="">
          Learn more
        </Link>
      </p>
    </motion.div>
  );
};

const stats: {
  title: string;
  value: string;
  fallbackValue: string;
}[][] = [
  [
    { title: "Active Countries", value: "30", fallbackValue: "" },
    { title: "Web3 Community Grants", value: "76", fallbackValue: "" },
    { title: "Events Organized", value: "20", fallbackValue: "" },
    { title: "Official ICP.Hubs", value: "15", fallbackValue: "" },
  ],

  [
    { title: "PR & Media Exposure", value: "15000000", fallbackValue: "" },
    { title: "N. of Universities", value: "32", fallbackValue: "" },
    { title: "Entreperneurs Engaged", value: "2000", fallbackValue: "" },
    { title: "Users Onboarded", value: "25000", fallbackValue: "" },
  ],

  [
    { title: "Crypto Communities", value: "50", fallbackValue: "" },
    { title: "Ecosystem Partnerships", value: "12", fallbackValue: "" },
    { title: "Conferences Participated", value: "15", fallbackValue: "" },
    { title: "Content Created", value: "30", fallbackValue: "" },
  ],
  [
    { title: "N. of Hackathons", value: "5", fallbackValue: "" },
    { title: "Educational Courses", value: "4", fallbackValue: "" },
    { title: "Devs Trained", value: "600", fallbackValue: "" },
    { title: "Projects Incubated - MVPs", value: "60", fallbackValue: "" },
  ],
];

const FadeInOutTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [nextTitle, setNextTitle] = useState(title);

  useEffect(() => {
    setNextTitle(title);
    const handle = setTimeout(() => {
      setCurrentTitle(title);
    }, 300);
    return () => clearTimeout(handle);
  }, [title]);

  return (
    <span className="inline-grid text-center">
      <span
        className={clsx(
          "col-start-1 row-start-1 duration-300",
          currentTitle !== nextTitle
            ? "opacity-0 transition-opacity"
            : "opacity-1 transition-none"
        )}
      >
        {currentTitle}
      </span>
      {currentTitle !== nextTitle && (
        <span className="col-start-1 row-start-1 stat-fade-in">
          {nextTitle}
        </span>
      )}
    </span>
  );
};

const rotationIndexes = [2, 0, 1, 3];

const RotatingStatPanel: React.FC<{}> = () => {
  const [activeIndexes, setActiveIndexes] = useState([0, 0, 0, 0]);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [windowFocused, setWindowFocused] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!windowFocused) {
        return;
      }

      const newActiveIndexes = [...activeIndexes];
      newActiveIndexes[rotationIndexes[rotationIndex]] =
        (newActiveIndexes[rotationIndexes[rotationIndex]] + 1) % stats.length;
      setActiveIndexes(newActiveIndexes);
      setRotationIndex((i) => (i + 1) % rotationIndexes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndexes, rotationIndex, windowFocused]);

  useEffect(() => {
    const onVisibilityChange = () => setWindowFocused(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const statsToDisplay = activeIndexes.map((index, i) => stats[index][i]);

  return (
    <StatsPanel>
      {statsToDisplay.map((stat, index) => (
        <Stat
          key={index}
          title={<FadeInOutTitle title={stat.title} />}
          titleClassName="whitespace-nowrap"
          value={
            <SpringCounter
              initialValue={+stat.value}
              initialTarget={+stat.value}
              target={+stat.value}
              format={(value) =>
                value > 1000000
                  ? `${(value / 1000000).toFixed(0)} mil`
                  : value.toString()
              }
              springConfig={[3, 1, 10]}
            />
          }
          fallbackValue={stat.fallbackValue}
        />
      ))}
    </StatsPanel>
  );
};

function CommunityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Community"
      description={`Build next generation enterprise systems on autonomous cloud, powered by chain-key cryptography and secure multiparty computation.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-enterprise.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className=" bg-infinite text-white pt-20 relative"
          ref={heroRef}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="blob blob-purple blob-xl md:blob-xl blob-x-5 blob-y-5 md:blob-x-6 md:blob-y-10 opacity-50"></div>
          </div>
          <AnimateSpawn
            className="container-12 pt-20 md:pt-36 relative md:flex md:-mb-40"
            variants={transitions.container}
          >
            <div className="md:flex-1"></div>
            <div className="sm:w-6/10 md:w-auto md:flex-[5] relative pb-[55%] sm:pb-[20%] md:pb-20">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Global
                <br />
                Community
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                The Internet Computer adds autonomous serverless cloud
                functionality to the public internet – making it possible to
                build almost any system or service entirely on a decentralized
                network using.
              </motion.p>
            </div>
            <Globe className="min-w-[380px] sm:min-w-0 w-[80vw] md:h-full md:flex-[6] aspect-square -mt-8 sm:mt-0 absolute -right-3/10 md:right-auto bottom-0 md:bottom-auto translate-y-1/2 md:static md:-mt-60 md:translate-y-40" />
          </AnimateSpawn>
        </section>
        <div className="bg-page">
          <div className="container-10 -translate-y-[110px] -mb-7 md:translate-y-10">
            <RotatingStatPanel />
          </div>
        </div>

        <AnimateSpawn
          className="container-10 md:mt-48 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-8/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-60 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              We are building a global community, and we would like you to join.
            </motion.h2>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 flex flex-col md:flex-row gap-5"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-education.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Education</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Explore transformative education programs within our global hubs,
              empowering individuals to gain knowledge, skills, and perspectives
              that transcend borders and ignite positive change.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Education programme
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-hubs.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">ICP hubs</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Our hubs serve as pulsating hubs of diverse cultures and ideas,
              fostering a rich tapestry of connections that fuel innovation and
              drive collective growth
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Join a Hub
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-events.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Community events</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Immerse yourself in a tapestry of engaging community events, where
              our global family comes together to celebrate, learn, and forge
              lifelong connections.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Come to an event
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 mt-20 md:mt-48 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-8/10 md:mx-auto text-center">
            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Build the community
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead mb-0"
              variants={transitions.item}
            >
              Understand the benefits and limitations of each custody option so
              you can choose the wallet that best suits your needs.
            </motion.p>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 flex flex-col md:flex-row gap-5 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-launch.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Launch an ICP hub</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Embark on a journey of leadership and impact by launching your own
              hub, a gateway to catalyzing local talent and global
              collaboration.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Build a hub
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-grants.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Apply for a grant</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Turn your vision into reality – apply for our empowering grants to
              fuel your initiatives and amplify their positive influence within
              our global community.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Apply Here
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-ambassador.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">
              Become an ambassador
            </h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Join us as an ambassador, championing the spirit of our global
              community and fostering meaningful connections across borders.
            </p>
            <p className="mb-0">
              <Link className="link-primary-disabled link-with-icon">
                Coming soon
                {/* <LinkArrowUpRight /> */}
              </Link>
            </p>
          </motion.div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 mt-52 md:mt-[400px] relative mb-20"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-7/10 md:mx-auto text-center text-white relative">
            <div className="blob blob-purple blob-xl blob-x-5 blob-y-5 z-[-1] opacity-75 md:opacity-95"></div>

            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Find your community hub
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead-sm mb-0 md:w-8/10 md:mx-auto"
              variants={transitions.item}
            >
              We are building communities in these areas all around the globe
              and it would be nice to have a two line sentence here
            </motion.p>

            <motion.div
              variants={transitions.fadeIn}
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-[-1] [mask-image:linear-gradient(to_bottom,black_40%,transparent_60%)]"
            >
              <Globe className="w-[320px] md:w-[660px] aspect-square" />
            </motion.div>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 relative"
          el={motion.section}
          variants={transitions.container}
        >
          {hubs.map((hub) => (
            <HubCard hub={hub} />
          ))}
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 mt-20 md:mt-40 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="blob blob-infinite blob-md blob-x-10 blob-y-8 z-[-1]"></div>
          <div className="md:w-7/10">
            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Upcoming ICP Hub initiative
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead mb-0"
              variants={transitions.item}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium iure laudantium doloremque. Labore optio placeat modi,
              porro doloribus dolorem minima molestias voluptates amet ad
              nesciunt maxime ea perferendis eos officia.
            </motion.p>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 relative"
          el={motion.section}
          variants={transitions.container}
        >
          {upcomingHubs.map((hub) => (
            <UpcomingHubCard hub={hub} />
          ))}
        </AnimateSpawn>

        <section className="bg-infinite text-white my-20 md:my-40 py-20 md:py-40">
          <AnimateSpawn
            className="container-10   relative"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="blob blob-white blob-md blob-x-10 blob-y-0"></div>
            <div className="md:w-7/10">
              <motion.h2
                className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
                variants={transitions.item}
              >
                Our Global Community
              </motion.h2>
              <motion.p
                className="tw-paragraph md:tw-lead mb-10"
                variants={transitions.item}
              >
                Welcome to our vibrant global community where people from all
                corners of the world come together to connect, collaborate, and
                create.
              </motion.p>

              <p className="mb-0 flex flex-col md:flex-row gap-8 items-start md:items-center">
                <MotionLink
                  className="button-outline-white"
                  variants={transitions.item}
                >
                  Subscribe for alerts
                </MotionLink>
                <MotionLink
                  className="link-white link-with-icon"
                  variants={transitions.item}
                >
                  Propose an event <LinkArrowUpRight />
                </MotionLink>
              </p>
            </div>
          </AnimateSpawn>

          <AnimateSpawn
            className="container-12 mt-10 md:mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[minmax(20px,auto)] justify-center"
            el={motion.section}
            variants={transitions.container}
          >
            {communityGallery.map((item) => (
              <CommunityGalleryImage item={item} />
            ))}
          </AnimateSpawn>
        </section>

        <section className="container-12 relative mt-40">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm blob-x-5 blob-y-7 z-[-1] md:blob-xl"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-6/12"
              variants={transitions.item}
            >
              Get familiar with the Internet Computer
            </motion.h2>
          </AnimateSpawn>

          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Join the community telegram channels"
              description=""
              href=""
            />

            <CardWithDescription
              title="Follow us on Twitter for more"
              description=""
              href=""
            />
            <CardWithDescription
              title="Join our latest global events"
              description=""
              href=""
            />
          </AnimateSpawn>
        </section>
        <NewsletterSection />
      </main>
    </Layout>
  );
}

export default CommunityPage;
