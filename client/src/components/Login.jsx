import styles from '../style';


const Login = () => {
  
  
  return (
    <section id="home" className={`  ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col center`}>     
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]
          text-white ss:leading-[100px] leading-[75px]">
            Login <br className="sm:block hidden" /> {" "} 
          </h1>
        </div>
      </div>
    </section> 
  )
}

export default Login;
