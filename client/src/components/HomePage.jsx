import styles from "../style";
import { 
  Navbar,
  Hero,
  Billing,
  Business,
  AboutUs,
  KeyFeatures,
  HowWorks,
  WorkFirst,
  WorkSecond,
  WorkThird,
  WorkFourth,
  ContactUs,
  Stats,
  Footer,
} from '../components'

import PreLoader from "../components/PreLoader"; 


const HomePage = () => (
  <div className="bg-primary w-full overflow-visible">
    
    <div className={`sticky top-0 ${styles.paddingX} ${styles.flexCenter} bg-black`} style={{ zIndex: 9999 }}>
      <div className={`${styles.boxWidth} `}>      
        <Navbar />
      </div>
    </div>
    

    <div className={`bg-primary ${styles.flexStart}`} >
      <div className={`${styles.boxWidth} `}>
        <Hero />
      </div>    
    </div>


    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} `}>
      <div className={`${styles.boxWidth} `}>
        <div style={{ margin: '320px 0' }}>
        </div>  
        <AboutUs />
        <div style={{ margin: '80px 0' }}>    </div> 
        <KeyFeatures />
        <HowWorks />
        <WorkFirst />
        <WorkSecond />
        <WorkThird />
        <WorkFourth />
        <div style={{ margin: '80px 0' }}>    </div>    
        <ContactUs />
      </div>    
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
    <div className={`${styles.boxWidth}`}>
      <Footer />
    </div>
  </div>
  </div>

  );

export default HomePage