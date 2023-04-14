import React, { useEffect } from "react";
import styles from '../style';
import Aos from "aos";
import "aos/dist/aos.css";
import { facebook, instagram, linkedin, adam } from '../assets'


const ContactUs = () => {
    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])    
  
    return (
      
        <section id="contact" className={`${styles.paddingY}     
        ${styles.flexCenter} flex-col relative `}>

      
   
          {/*<div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" /> */}
            <div data-aos="fade-up" className="">
              <h2 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-main text-center">
                Contact with us! <br className="sm:block hidden" /> 
              </h2>
              <br />
              <br />
          </div>
    
          <br />
          <br />
    
          <div className="container">
            <div className="row">


              {/* 1*/}
              <div data-aos="fade-top" data-aos-delay="100" className="flex px-10 py-6 rounded-[20px]  max-w-[300px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
                <div className="center">
                <div>
                  <img src={adam} alt="adam" className="w-[100%] h-[100%] rounded-full" />
                </div>
                <br></br>
                
                <div className="text-center">
                  <div className="font-poppins font-semibold text-[20px] leading-[32px] text-white text-center">
                    Adam Miernicki
                  </div>
                  <br></br>
                  <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
                    Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja
                  </p>
                </div>
                <br></br>

                <div className="text-center">
                <div className="">
                <section className="row">
                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/adam.miernicki.fb" target="_blank" role="button"
                    ><img src={facebook} alt="facebookIcon" className="w-[100%] h-[100%] rounded-full " /></a>
            
                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.com/search?q=duck+meme&tbm=isch&ved=2ahUKEwiLpeezhJn-AhVOuyoKHULjA1gQ2-cCegQIABAA&oq=duck+meme&gs_lcp=CgNpbWcQAzIECCMQJzIFCAAQgAQyBQgAEIAEMgUIABCABDIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjoHCAAQigUQQzoKCAAQigUQsQMQQzoICAAQgAQQsQNQ3AlY9BNgqxVoAHAAeACAAU-IAeUFkgECMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=F7YwZMu9Bc72qgHCxo_ABQ&bih=979&biw=1920#imgrc=-5aTn88j4CtGAM" 
                  target="_blank" role="button"
                    ><img src={instagram} alt="instagramIcon" className="w-[100%] h-[100%] " /></a>

                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.com/search?q=duck+meme&tbm=isch&ved=2ahUKEwiLpeezhJn-AhVOuyoKHULjA1gQ2-cCegQIABAA&oq=duck+meme&gs_lcp=CgNpbWcQAzIECCMQJzIFCAAQgAQyBQgAEIAEMgUIABCABDIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjoHCAAQigUQQzoKCAAQigUQsQMQQzoICAAQgAQQsQNQ3AlY9BNgqxVoAHAAeACAAU-IAeUFkgECMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=F7YwZMu9Bc72qgHCxo_ABQ&bih=979&biw=1920#imgrc=-5aTn88j4CtGAM" 
                  target="_blank" role="button"
                    ><img src={linkedin} alt="linkedinIcon" className="w-[100%] h-[100%] " /></a>


                </section>
              </div>
              </div>


              </div>
            </div>





              {/* 2*/}
              <div data-aos="fade-top" data-aos-delay="100" className="flex px-10 py-6 rounded-[20px]  max-w-[300px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
                <div className="center">
                <div>
                  <img src={adam} alt="adam" className="w-[100%] h-[100%] rounded-full" />
                </div>
                <br></br>
                
                <div className="text-center">
                  <div className="font-poppins font-semibold text-[20px] leading-[32px] text-white text-center">
                    Adam Miernicki
                  </div>
                  <br></br>
                  <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
                    Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja
                  </p>
                </div>
                <br></br>

                <div className="text-center">
                <div className="">
                <section className="row">
                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/adam.miernicki.fb" target="_blank" role="button"
                    ><img src={facebook} alt="facebookIcon" className="w-[100%] h-[100%] rounded-full " /></a>
            
                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.com/search?q=duck+meme&tbm=isch&ved=2ahUKEwiLpeezhJn-AhVOuyoKHULjA1gQ2-cCegQIABAA&oq=duck+meme&gs_lcp=CgNpbWcQAzIECCMQJzIFCAAQgAQyBQgAEIAEMgUIABCABDIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjoHCAAQigUQQzoKCAAQigUQsQMQQzoICAAQgAQQsQNQ3AlY9BNgqxVoAHAAeACAAU-IAeUFkgECMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=F7YwZMu9Bc72qgHCxo_ABQ&bih=979&biw=1920#imgrc=-5aTn88j4CtGAM" 
                  target="_blank" role="button"
                    ><img src={instagram} alt="instagramIcon" className="w-[100%] h-[100%] " /></a>

                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.com/search?q=duck+meme&tbm=isch&ved=2ahUKEwiLpeezhJn-AhVOuyoKHULjA1gQ2-cCegQIABAA&oq=duck+meme&gs_lcp=CgNpbWcQAzIECCMQJzIFCAAQgAQyBQgAEIAEMgUIABCABDIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjoHCAAQigUQQzoKCAAQigUQsQMQQzoICAAQgAQQsQNQ3AlY9BNgqxVoAHAAeACAAU-IAeUFkgECMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=F7YwZMu9Bc72qgHCxo_ABQ&bih=979&biw=1920#imgrc=-5aTn88j4CtGAM" 
                  target="_blank" role="button"
                    ><img src={linkedin} alt="linkedinIcon" className="w-[100%] h-[100%] " /></a>


                </section>
              </div>
              </div>


              </div>
            </div>




              {/* 3*/}
              <div data-aos="fade-top" data-aos-delay="100" className="flex px-10 py-6 rounded-[20px]  max-w-[300px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
                <div className="center">
                <div>
                  <img src={adam} alt="adam" className="w-[100%] h-[100%] rounded-full" />
                </div>
                <br></br>
                
                <div className="text-center">
                  <div className="font-poppins font-semibold text-[20px] leading-[32px] text-white text-center">
                    Adam Miernicki
                  </div>
                  <br></br>
                  <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
                    Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja Depresja
                  </p>
                </div>
                <br></br>

                <div className="text-center">
                <div className="">
                <section className="row">
                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/adam.miernicki.fb" target="_blank" role="button"
                    ><img src={facebook} alt="facebookIcon" className="w-[100%] h-[100%] rounded-full " /></a>
            
                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.com/search?q=duck+meme&tbm=isch&ved=2ahUKEwiLpeezhJn-AhVOuyoKHULjA1gQ2-cCegQIABAA&oq=duck+meme&gs_lcp=CgNpbWcQAzIECCMQJzIFCAAQgAQyBQgAEIAEMgUIABCABDIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjoHCAAQigUQQzoKCAAQigUQsQMQQzoICAAQgAQQsQNQ3AlY9BNgqxVoAHAAeACAAU-IAeUFkgECMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=F7YwZMu9Bc72qgHCxo_ABQ&bih=979&biw=1920#imgrc=-5aTn88j4CtGAM" 
                  target="_blank" role="button"
                    ><img src={instagram} alt="instagramIcon" className="w-[100%] h-[100%] " /></a>

                  <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.com/search?q=duck+meme&tbm=isch&ved=2ahUKEwiLpeezhJn-AhVOuyoKHULjA1gQ2-cCegQIABAA&oq=duck+meme&gs_lcp=CgNpbWcQAzIECCMQJzIFCAAQgAQyBQgAEIAEMgUIABCABDIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjoHCAAQigUQQzoKCAAQigUQsQMQQzoICAAQgAQQsQNQ3AlY9BNgqxVoAHAAeACAAU-IAeUFkgECMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=F7YwZMu9Bc72qgHCxo_ABQ&bih=979&biw=1920#imgrc=-5aTn88j4CtGAM" 
                  target="_blank" role="button"
                    ><img src={linkedin} alt="linkedinIcon" className="w-[100%] h-[100%] " /></a>


                </section>
              </div>
              </div>


              </div>
            </div>



            </div>
          </div>
        </section>

  )
}

export default ContactUs