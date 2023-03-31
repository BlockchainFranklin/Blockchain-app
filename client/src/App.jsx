import styles from "./style";

import { Billing, Business, Button, Clients, CTA, FeedbackCard, AboutUs,
         Footer, GetStarted, Hero, Navbar, Stats, KeyFeatures } from './components'

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div> 


    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>    
    </div>


    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <AboutUs />
        <KeyFeatures />
        <Business />
        <Billing />
        <Clients /> 
        <CTA /> 
      </div>    
    </div>


  </div>
  );

export default App