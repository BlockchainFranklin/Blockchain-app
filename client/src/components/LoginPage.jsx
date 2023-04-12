import styles from "../style";
import { 
  Navbar2,
  Login
  
} from '../components'

const LoginPage = () =>  (
    <div className="bg-primary w-full overflow-visible">
    
    <div className={`sticky top-0 ${styles.paddingX} ${styles.flexCenter} bg-black`} style={{ zIndex: 9999 }}>
      <div className={`${styles.boxWidth} `}>      
        <Navbar2 />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`} >
    <div className={`${styles.boxWidth} `}>
      <Login />
    </div>    
  </div>


  </div>
  )

export default LoginPage