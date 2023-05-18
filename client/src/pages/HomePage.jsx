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
  Economic,
  Roadmap,
  ContactUs,
  Footer,
} from '../components'

const HomePage = () => (


  <div className="bg-primary w-full overflow-visible">
    <div style={{zIndex: 100}}>
      <PreLoader/>
    </div>
    {/*---------------------------------------- */}
    {/* NAVBAR */}
    <div className={`sticky top-0 
                     ${styles.paddingX} 
                     ${styles.flexCenter} 
                     bg-navbar`} 
        style={{ zIndex: 99, backdropFilter: 'blur(15px)'}}>
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
        <div style={{ margin: '15vh 0' }}>
        </div>  
        <AboutUs />
        <div style={{ margin: '15vh 0' }}></div> 
        <KeyFeatures />
        <div style={{ margin: '15vh 0' }}></div> 
        <HowWorks />
        <div style={{ margin: '15vh 0' }}></div> 
        {/*
        <WorkFirst />
        <WorkSecond />
        <WorkThird />
        <WorkFourth />
        */}

        <Economic />
        <div style={{ margin: '15vh 0' }}></div> 
        <Roadmap />
        <div style={{ margin: '15vh 0' }}></div>    
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