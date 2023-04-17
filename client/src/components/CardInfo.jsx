import React from 'react';

const CardInfo = ({ photo, name, content, social }) => {

  return (
    <div
      data-aos="fade-top"
      data-aos-delay="100"
      className="flex px-10 py-6 rounded-[20px] max-w-[300px] md:mr-10 sm:mr-5 mr-0 my-5 center feedback-card"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px', padding: '30px' }}
    >
      <img src={photo} alt="adam" className="w-[60%] h-[60%] rounded-full" />
      <br />
      <div className="text-center" style={{ marginTop: '1rem' }}>
        <div className="font-poppins font-semibold text-[20px] leading-[32px] text-white text-center">
          {name}
        </div>
        <br />
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">{content}</p>
      </div>
      <br />
      <div className="text-center" style={{ marginTop: '1rem' }}>
        <div className="">
          <section className="row">
            {social.map((item) => (
              <a key={item.id} className="btn btn-outline-light btn-floating m-1" href={item.link} target="_blank" role="button" style={{margin: '15px'}}>
                <img src={item.icon} alt="" className="w-[100%] h-[100%]" />
              </a>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
