import styles from "../style";
import PreLoader from "../hooks/PreLoader"; 
import { 
  Navbar,
  Hero,
  AboutUs,
  KeyFeatures,
  HowWorks,
  WorkFirst,
  WorkSecond,
  WorkThird,
  WorkFourth,
  ContactUs,
  Footer,
} from '../components'

const HomePage = () => (
  <div className="bg-primary w-full overflow-visible">
    

    {/*---------------------------------------- */}
    {/* NAVBAR */}
    <div className={`sticky top-0 
                     ${styles.paddingX} 
                     ${styles.flexCenter} 
                     bg-black`} 
        style={{ zIndex: 9999 }}>
      <div className={`${styles.boxWidth} `}>      
        <Navbar type="navbar" />
      </div>
    </div>
    {/*---------------------------------------- */}


    {/*---------------------------------------- */}
    {/* HERO */}
    <div className={`bg-primary 
                    ${styles.flexStart}`} >
      <div className={`${styles.boxWidth} `}>
        <Hero />
      </div>    
    </div>


    {/*---------------------------------------- */}
    {/*
        ABOUTUS
        KEYFEATURES
        HOWWORKS
        WORKFIRST
        WORKSECOND
        WORKTHIRD
        WORKFOURTH
        CONTACTUS
    */}

    <div className={`bg-primary 
                     ${styles.paddingX} 
                     ${styles.flexCenter} `}>
      <div className={`${styles.boxWidth} `}>
        <div style={{ margin: '320px 0' }}>
        </div>  
        <AboutUs />
        <div style={{ margin: '80px 0' }}></div> 
        <KeyFeatures />
        <HowWorks />
        <WorkFirst />
        <WorkSecond />
        <WorkThird />
        <WorkFourth />
        <div style={{ margin: '80px 0' }}></div>    
        <ContactUs />
      </div>    
    </div>
    {/*---------------------------------------- */}


    {/*---------------------------------------- */}
    {/* FOOTER */}
    <div className={`bg-primary 
                     ${styles.paddingX} 
                     ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>

  </div>
  );

export default HomePage