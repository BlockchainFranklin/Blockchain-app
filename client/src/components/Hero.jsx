import styles from '../style';
import { heroText } from '../constants';
import { tempMuscular } from '../assets';

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} `}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 `}>     
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]
                text-white ss:leading-[100px] leading-[75px]" style={{ zIndex: 1 }}>
                  {heroText.find(btn => btn.id === 'title1').content}
                  <br className="sm:block hidden" /> {" "} 
                  <span className="text-gradient-main" style={{ zIndex: 1 }}>
                    {heroText.find(btn => btn.id === 'title2').content}
                  </span> {" "} 
                </h1>
            </div>
            <p className={`${styles.paragraph} max-w-[470px] mt-5 text-white`}  style={{ zIndex: 10 }}>
              {heroText.find(btn => btn.id === 'description').content}
            </p>
            <div className="absolute z-[0] w-[50%] h-[100%] right-140 top-40 rounded-full lightblue__gradient" />
            {/*<div className="absolute z-[0] w-[5%] h-[40%] left-0 top-60 rounded-full bottom-40 yellow__gradient" /> */}
        </div>
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
          <img src={tempMuscular} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />
          {/*<div className="absolute z-[0] w-[10%] h-[35%] top-0 yellow__gradient" />*/}
          <div className="absolute z-[2] w-[50%] h-[50%] left-80 rounded-full white__gradient bottom-40" />

          {/* <div className="absolute z-[3] w-[50%] h-[30%] left-10 bottom-20 darkblue__gradient" /> */}
        </div>
    </section>
  );
};
export default Hero