import {  facebook, 
          instagram, 
          linkedin, 
          twitter, 
          adam, 
          julia, 
          milosz,
          phantom,
          metamask,
} from "../assets";
import { injected } from "../hooks";


{/* HOMEPAGE */}
export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "vision",
    title: "Vision",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "highlights",
    title: "Highlights",
  },
  {
    id: "partners",
    title: "Partners",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const buttonText = [
  {
    id: "connect",
    title: "Connect",
    content: "Connect to Wallet"
  },
  {
    id: "return",
    title: "Return",
    content: "Return to home"
  },
]

export const heroText = [
  {
    id: "title1",
    title: "Title1",
    content: "Sweat it out, "
  },
  {
    id: "title2",
    title: "Title2",
    content: "cash it in."
  },
  {
    id: "description",
    title: "Description",
    content: "Step into the gym world every day and capture the moment.\
     Make it a part of your life story and share it with the world."
  },
]

export const visionText = [
  {
    id: "ourvision",
    title: "Our Vision",
    content: "Welcome to ChainFit, the revolutionary new application that \
    allows you to earn money while you work out at the gym. ChainFit uses \
    blockchain technology to reward users for their physical activity and \
    motivate them to stay active and healthy. With ChainFit, all you need \
    to do is download the app, connect it to your gym or fitness center, \
    and start logging your workouts. Every time you complete a workout, you \
    will earn ChainFit tokens, which can be redeemed for real-world rewards \
    like gift cards, merchandise, and even cryptocurrency. ChainFit uses \
    state-of-the-art blockchain technology to ensure that your data is secure \
    and that your rewards are distributed fairly. Plus, the app is easy to use \
    and integrates seamlessly with your existing fitness routine. So why wait? \
    Download ChainFit today and start earning money while you get fit!",
  },
];

export const keyFeaturesText = [
  {
    id: "keyfeatures",
    title: "Key Features",
    content: "With ChainFit, you can expect a cutting-edge application that offers \
    features like workout tracking, social sharing, community building, and secure \
    payments. Our team will work with you to identify the key features that matter \
    most to your business and deliver an application that exceeds your expectations.",
  },
];

export const workText = [
  {
    id: "howitworks",
    title: "How it works!",
  },
  {
    id: "workfirsttitle1",
    title: "Go to",
  },
  {
    id: "workfirsttitle2",
    title: "the gym",
    content: "Users can choose from a list of participating gyms on the app and \
    check-in when they arrive at the gym."
  },
  {
    id: "worksecondtitle1",
    title: "Generate QR",
  },
  {
    id: "worksecondtitle2",
    title: "code to wallet",
    content: "After checking in, the user can generate a unique QR code that is \
    linked to their digital wallet on the app."
  },
  {
    id: "workthirdtitle1",
    title: "Share QR",
  },
  {
    id: "workthirdtitle2",
    title: "on social media",
    content: "Users have the option to share their QR code on their social media \
    profiles, inviting friends and followers to join the app and earn tokens together."
  },
  {
    id: "workfourthtitle1",
    title: "Earn",
  },
  {
    id: "workfourthtitle2",
    title: "money",
    content: "Each time the user completes a workout session and checks out of \
    the gym, they earn tokens which can be exchanged for real money or used to \
    access various fitness-related products and services on the app."
  },
];

export const contactWithUs = [
  {
    id: "contactwithus",
    title: "Contact with us!",
  },
];

export const contactPeople = [
  {
    id: "adam",
    name: "Adam Miernicki",
    content: "Udaję frontendowca",
    photo: adam,
    social: [
      { id: 1, icon: facebook , link: "https://www.facebook.com/adam.miernicki.fb" },
      { id: 2, icon: instagram , link: "https://www.instagram.com/madam_duck_lover/" },
      { id: 3, icon: linkedin , link: "https://www.linkedin.com/in/adam-miernicki/" },
    ]
  },
  {
    id: "julia",
    name: "Julia Błaszczyk",
    content: "Rozliczam ludzi i podatki",
    photo: julia,
    social: [
      { id: 1, icon: facebook , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { id: 2, icon: instagram , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { id: 3, icon: linkedin , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ]
  },
  {
    id: "milosz",
    name: "Miłosz",
    content: "Krypto master",
    photo: milosz,
    social: [
      { id:1, icon: facebook , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { id:2, icon: instagram , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { id:3, icon: linkedin , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ]
  },
]

export const footerName = [
  {
    id: "chainfit",
    title: "Copyright Ⓒ 2023 ChainFit. All Rights Reserved."
  }
]

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];


{/* LOGIN */}
export const buttonList = [
    {
      id: "phantom",
      name: "Phantom",
      icon: phantom,
      connector: injected,
    },
    {
      id: "metamask",
      name: "MetaMask",
      icon: metamask,
      connector: injected,
    },
];

export const loginText = [
    {
      id: "start",
      content: "Start your practise today"
    },
    {
      id: "choose",
      content: "Choose Wallet to continue"
    }
];


{/* NOTFOUNDPAGE */}
export const error404 = [
  {
    id: "404",
    content: "We are proud of you for breaking new boundaries!\n\nYou have just broken the boundaries of our site\nand the page you entered does not exist.",
    button: "Take me away"
  },
];