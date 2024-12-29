"use client"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { useRef } from "react";

const SECTION_HEIGHT = 1500;

export const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <div className="sticky top-0 h-screen w-full">
      <motion.div
        style={{
          clipPath,
          opacity,
        }}
        className="absolute inset-0 h-full w-full overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/2849988/2849988-uhd_2560_1440_24fps.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-x-0 bottom-10 sm:bottom-20 md:bottom-36 flex justify-center px-4">
        <h1 className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-[200px] cursor-pointer font-bold hover:text-yellow-500 transition-all text-center">Arc Coffee</h1>
      </div>
    </div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[100px] sm:pt-[150px] md:pt-[200px]">
      <ParallaxImg
        src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="A space launch example"
        start={-200}
        end={200}
        className="w-1/2 sm:w-1/3"
      />
      <ParallaxImg
        src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Another space launch example"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/2 sm:w-1/3"
      />
      <ParallaxImg
        src="https://images.pexels.com/photos/2067628/pexels-photo-2067628.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Another orbiting satellite"
        start={0}
        end={-500}
        className="ml-12 sm:ml-24 w-7/12 sm:w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }: any) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

export const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-24 sm:py-36 md:py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-10 sm:mb-16 md:mb-20 text-2xl sm:text-3xl md:text-4xl font-black uppercase text-zinc-50"
      >
        Launch Schedule
      </motion.h1>
      <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
      <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
      <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
      <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
      <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
      <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
      <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
    </section>
  );
};

export const ScheduleItem = ({ title, date, location }: any) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-6 sm:mb-9 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-800 px-3 pb-6 sm:pb-9"
    >
      <div className="mb-2 sm:mb-0">
        <p className="mb-1 text-lg sm:text-xl text-zinc-50">{title}</p>
        <p className="text-xs sm:text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-start sm:text-end text-xs sm:text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};

