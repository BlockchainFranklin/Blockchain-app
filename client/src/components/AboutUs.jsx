import { aboutus } from '../constants'
import styles from '../style'

const AboutUs = () => (
  <section className={`${styles.flexDiv}}
  `}>    
         
      {/* colored horizontal line */}
      <hr
      style={{
        background: 'white',
        color: 'white',
        borderColor: 'white',
        height: '3px',
        margin: '10px',
      }}
    />

    <br />

    {aboutus.map((aboutus) =>(
      <div key={aboutus.id} className={`flex-1`}>
      <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white text-center">
        {aboutus.title}
      </h4>
      <br />
      <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient text-center">
        ChainFit
  </h4>
      </div>
    ))}

    <br />
    <br />

    {aboutus.map((aboutus) =>(
      <div key={aboutus.id} className={``}>
      <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-white text-center">
          Mopik był kotem o niezwykłym charakterze. Choć lubił spędzać czas sam na sam z myślami, to w wolnej chwili najchętniej przesiadywał na kanapie z właścicielem, łapiąc uchwyty na drucie i mizianie swojego puszystego futra.

Jednak Mopik miał też swoją mroczną stronę. Był ukrytym ninja, którego umiejętności walki były nie do przecenienia. Zawsze czuł się odpowiedzialny za obronę swojego terytorium i nigdy nie zawahał się, aby walczyć z każdym, kto zagrażał jego spokojowi.

Pewnego dnia Mopik usłyszał o kultowym przywódcy Janie Pawle, który przewodził tajemniczemu kultowi Wielkiej Kremówki. Mopik postanowił zbadać tę sprawę i szybko zorientował się, że Jan Paweł nie miał dobrych intencji. Chciał zniszczyć miasto i wprowadzić w nim chaos i anarchię.

Mopik postanowił, że musi powstrzymać tego złego człowieka i zaczął działać jako ukryty ninja. Potrafił bezszelestnie przemknąć się przez miasto i zbierać informacje o planach Jana Pawła. W końcu nadszedł dzień, kiedy Mopik miał stawić czoła Janowi Pawłowi i powstrzymać go przed dokonaniem swojego planu.

Walka była ciężka, ale Mopik nie zniechęcał się. W końcu udało mu się pokonać Jana Pawła, który uciekł z miasta w panice. Mopik odetchnął z ulgą, wiedząc, że znowu zapanuje spokój wśród mieszkańców.

Od tej pory Mopik kontynuował swoje tajne misje, ale już bez walki z Janem Pawłem. Teraz zajmował się pielegnowaniem swojego futra i spędzaniem czasu z ludźmi. Jednak gdy tylko zauważał jakieś zagrożenie dla swojego terytorium, gotów był na nową walkę, aby obronić swoich przyjaciół przed niebezpieczeństwem.
      </p>
      </div>
    ))}


  </section>



  
)


export default AboutUs