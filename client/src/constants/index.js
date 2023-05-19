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
import moment from "moment/moment";


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
    id: "strategy",
    title: "Strategy",
  },
  {
    id: "economic",
    title: "Economic",
  },
  {
    id: "roadmap",
    title: "Roadmap",
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
    content: "ChainFit is the innovative app that rewards your workouts with real-world benefits. Earn money as you exercise at the gym, thanks to blockchain technology. Simply download the app and start logging your activities. With each completed workout, you'll be able to accumulate ChainFit tokens, which can be redeemed for exciting rewards like gift cards, merchandise or you can just sell them on market. Your data is securely stored using blockchain tech, ensuring fairness and privacy. Start maximizing your fitness journey today with ChainFit!",
  },
];

export const keyFeaturesText = [
  {
    id: "keyfeatures",
    title: "Key Features",
    content: "Our application combines the elements of a gym,\
    a token collection system, and blockchain technology to\
    create an innovative and rewarding user experience.\
    Start your fitness journey, earn tokens, and embrace the\
    future of secure and immersive applications with us!",
  },
];

export const workText = [
  {
    id: "howitworks",
    title: "How it works!",
  },
  {
    id: "workfirsttitle1",
    title: "Go to ",
  },
  {
    id: "workfirsttitle2",
    title: "the gym",
    content: "Find and check in to participating gyms:\
    Easily locate and select from a list of partner gyms\
    in our app. Users can select their preferred gym and\
    seamlessly check in when they arrive, making it easy\
    to track gym sessions and progress. Start your fitness\
    routine by accessing our app and effortlessly connect\
    with a network of participating gyms."
  },
  {
    id: "worksecondtitle1",
    title: "Take ",
  },
  {
    id: "worksecondtitle2",
    title: "a photo",
    content: "Take photos to document your gym attendance\
    and share them with us via the app. By demonstrating\
    your active participation, you become eligible for\
    exciting rewards and incentives. Our app makes it\
    easy to record and share your journey to the gym,\
    ensuring that your progress is recognized and rewarded."
  },
  {
    id: "workthirdtitle1",
    title: "Share the photo ",
  },
  {
    id: "workthirdtitle2",
    title: "on social media",
    content: "When you upload your gym photo to our app,\
    it will generate your unique QR code, which will be added\
    to the photo when you share it on social media. This QR code\
    serves a dual purpose - it acts as an invitation for others to\
    join the app and participate, while also allowing you to easily\
    confirm your gym attendance. Share your achievements with your\
    friends and followers, encouraging them to join your fitness journey.\
    With our web app, sharing your fitness progress and inviting others\
    has never been easier or more engaging."
  },
  {
    id: "workfourthtitle1",
    title: "Earn ",
  },
  {
    id: "workfourthtitle2",
    title: "money",
    content: "Maximize your motivation and engagement by earning tokens\
    through our web app. Every time you complete a workout, check in at\
    the gym, share photos and it is confirmed by other users you will\
    accumulate tokens. With our token system, your dedication is recognized\
    and rewarded, creating a more rewarding and engaging fitness experience.\
    Start earning tokens and reaping the benefits of your hard work with our web app."
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
    content: "It student, interested in web technologies, internet of things and devops.",
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
    content: "A student of economic studies. Interested in finances and managment.",
    photo: julia,
    social: [
      { id: 1, icon: facebook , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { id: 2, icon: instagram , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { id: 3, icon: linkedin , link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ]
  },
  {
    id: "milosz",
    name: "Miłosz Szkudlarek",
    content: "Management student. Interested in personal development.",
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
      name: "Phantom (coming soon)",
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

export const cardsData = [
  {
    title: "Revenue",
    change: 24,
    amount: 42056,
  },
  {
    title: "Orders",
    change: -14,
    amount: 52125.03,
  },
  {
    title: "Expenses",
    change: 18,
    amount: 1216.5,
  },
  {
    title: "Profit",
    change: 12,
    amount: 10125.0,
  },
];

export const ordersData = [
  {
    name: "Skatebnoard",
    type: "Illustration",
    items: 58,
    change: 290,
  },
  {
    name: "Language courses",
    type: "Illustration",
    items: 12,
    change: 72
  },
  {
    name: "Office Collaboration",
    type: "Illustration",
    items: 7,
    change: 70
  },
  {
    name: "Robot",
    type: "Illustration",
    items: 21,
    change: 15
  }
]


//* get the value in group number format
export const groupNumber = (number) => {
  return parseFloat(number.toFixed(2)).toLocaleString("en", {
    useGrouping: true,
  });
};


//* calendar Events
let eventGuid = 0
let todayStr = moment().format("YYYY-MM-DD")  // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Lunch Pary',
    start: todayStr + 'T09:00:00',

  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: moment(todayStr).add(1, "days").format("YYYY-MM-DD") + 'T16:00:00'
  },
  {
    id: createEventId(),
    title: "Head Meetup",
    start: moment(todayStr).add(2, "days").format("YYYY-MM-DD") + 'T20:00:00'
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(3, "days").format("YYYY-MM-DD") + 'T09:00:00'
  },
  {
    id: createEventId(),
    title: "Payment Shedules",
    start: moment(todayStr).add(5, "days").format("YYYY-MM-DD") + 'T13:00:00'
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(6, "days").format("YYYY-MM-DD") + 'T13:00:00'
  },
]

export function createEventId() {
  return String(eventGuid++)
}


// * tasks
export const boardData = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Database Setup",
          description: "Firebase Integration"
        },
        {
          id: 2,
          title: "Data Flow",
          description: "Setup Diagram with other developers"
        },
      ]
    },
    {
      id: 2,
      title: "TODO",
      cards: [
        {
          id: 9,
          title: "Data Table Page",
          description: "Server side Pagination",
        }
      ]
    },
    {
      id: 3,
      title: "Doing",
      cards: [
        {
          id: 10,
          title: "Full Calendar Extension",
          description: "Make new events and store in global states"
        },
        {
          id: 11,
          title: "Custom Kanban Board",
          description: "Setup react-kanban dep within Dashboard as seperate page"
        }
      ]
    },
    {
      id: 4,
      title: "Completed",
      cards: [
        {
          id: 12,
          title: "Vite Server Setup",
          description: "Configure required modules and starters"
        },
        {
          id: 13,
          title: "Modular structre",
          description: "Write css in form of modules to reduce the naming conflicts"
        }
      ]
    }
  ]
}


// * user table data
export const userData = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  }, {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
]

export const quotes = [

{
       "quote":"Life isn’t about getting and having, it’s about giving and being.","author":"Kevin Kruse"},
{
       "quote":"Whatever the mind of man can conceive and believe, it can achieve.","author":"Napoleon Hill"},
{
       "quote":"Strive not to be a success, but rather to be of value.","author":"Albert Einstein"},
{
       "quote":"Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.","author":"Robert Frost"},
{
       "quote":"I attribute my success to this: I never gave or took any excuse.","author":"Florence Nightingale"},
{
       "quote":"You miss 100% of the shots you don’t take.","author":"Wayne Gretzky"},
{
       "quote":"I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.","author":"Michael Jordan"},
{
       "quote":"The most difficult thing is the decision to act, the rest is merely tenacity.","author":"Amelia Earhart"},
{
       "quote":"Every strike brings me closer to the next home run.","author":"Babe Ruth"},
{
       "quote":"Definiteness of purpose is the starting point of all achievement.","author":"W. Clement Stone"},
{
       "quote":"We must balance conspicuous consumption with conscious capitalism.","author":"Kevin Kruse"},
{
       "quote":"Life is what happens to you while you’re busy making other plans.","author":"John Lennon"},
{
       "quote":"We become what we think about.","author":"Earl Nightingale"},
{
       "quote":"Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover.","author":"Mark Twain"},
{
       "quote":"Life is 10% what happens to me and 90% of how I react to it.","author":"Charles Swindoll"},
{
       "quote":"The most common way people give up their power is by thinking they don’t have any.","author":"Alice Walker"},
{
       "quote":"The mind is everything. What you think you become.","author":"Buddha"},
{
       "quote":"The best time to plant a tree was 20 years ago. The second best time is now.","author":"Chinese Proverb"},
{
       "quote":"An unexamined life is not worth living.","author":"Socrates"},
{
       "quote":"Eighty percent of success is showing up.","author":"Woody Allen"},
{
       "quote":"Your time is limited, so don’t waste it living someone else’s life.","author":"Steve Jobs"},
{
       "quote":"Winning isn’t everything, but wanting to win is.","author":"Vince Lombardi"},
{
       "quote":"I am not a product of my circumstances. I am a product of my decisions.","author":"Stephen Covey"},
{
       "quote":"Every child is an artist.  The problem is how to remain an artist once he grows up.","author":"Pablo Picasso"},
{
       "quote":"You can never cross the ocean until you have the courage to lose sight of the shore.","author":"Christopher Columbus"},
{
       "quote":"I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.","author":"Maya Angelou"},
{
       "quote":"Either you run the day, or the day runs you.","author":"Jim Rohn"},
{
       "quote":"Whether you think you can or you think you can’t, you’re right.","author":"Henry Ford"},
{
       "quote":"The two most important days in your life are the day you are born and the day you find out why.","author":"Mark Twain"},
{
       "quote":"Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it.","author":"Johann Wolfgang von Goethe"},
{
       "quote":"The best revenge is massive success.","author":"Frank Sinatra"},
{
       "quote":"People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily.","author":"Zig Ziglar"},
{
       "quote":"Life shrinks or expands in proportion to one’s courage.","author":"Anais Nin"},
{
       "quote":"If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.","author":"Vincent Van Gogh"},
{
       "quote":"There is only one way to avoid criticism: do nothing, say nothing, and be nothing.","author":"Aristotle"},
{
       "quote":"Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.","author":"Jesus"},
{
       "quote":"The only person you are destined to become is the person you decide to be.","author":"Ralph Waldo Emerson"},
{
       "quote":"Go confidently in the direction of your dreams.  Live the life you have imagined.","author":"Henry David Thoreau"},
{
       "quote":"When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me.","author":"Erma Bombeck"},
{
       "quote":"Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.","author":"Booker T. Washington"},
{
       "quote":"Certain things catch your eye, but pursue only those that capture the heart.","author":" Ancient Indian Proverb"},
{
       "quote":"Believe you can and you’re halfway there.","author":"Theodore Roosevelt"},
{
       "quote":"Everything you’ve ever wanted is on the other side of fear.","author":"George Addair"},
{
       "quote":"We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.","author":"Plato"},
{
       "quote":"Teach thy tongue to say, “I do not know,” and thous shalt progress.","author":"Maimonides"},
{
       "quote":"Start where you are. Use what you have.  Do what you can.","author":"Arthur Ashe"},
{
       "quote":"When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy’.  They told me I didn’t understand the assignment, and I told them they didn’t understand life.","author":"John Lennon"},
{
       "quote":"Fall seven times and stand up eight.","author":"Japanese Proverb"},
{
       "quote":"When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.","author":"Helen Keller"},
{
       "quote":"Everything has beauty, but not everyone can see.","author":"Confucius"},
{
       "quote":"How wonderful it is that nobody need wait a single moment before starting to improve the world.","author":"Anne Frank"},
{
       "quote":"When I let go of what I am, I become what I might be.","author":"Lao Tzu"},
{
       "quote":"Life is not measured by the number of breaths we take, but by the moments that take our breath away.","author":"Maya Angelou"},
{
       "quote":"Happiness is not something readymade.  It comes from your own actions.","author":"Dalai Lama"},
{
       "quote":"If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.","author":"Sheryl Sandberg"},
{
       "quote":"First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.","author":"Aristotle"},
{
       "quote":"If the wind will not serve, take to the oars.","author":"Latin Proverb"},
{
       "quote":"You can’t fall if you don’t climb.  But there’s no joy in living your whole life on the ground.","author":"Unknown"},
{
       "quote":"We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.","author":"Marie Curie"},
{
       "quote":"Too many of us are not living our dreams because we are living our fears.","author":"Les Brown"},
{
       "quote":"Challenges are what make life interesting and overcoming them is what makes life meaningful.","author":"Joshua J. Marine"},
{
       "quote":"If you want to lift yourself up, lift up someone else.","author":"Booker T. Washington"},
{
       "quote":"I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.","author":"Leonardo da Vinci"},
{
       "quote":"Limitations live only in our minds.  But if we use our imaginations, our possibilities become limitless.","author":"Jamie Paolinetti"},
{
       "quote":"You take your life in your own hands, and what happens? A terrible thing, no one to blame.","author":"Erica Jong"},
{
       "quote":"What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.","author":"Bob Dylan"},
{
       "quote":"I didn’t fail the test. I just found 100 ways to do it wrong.","author":"Benjamin Franklin"},
{
       "quote":"In order to succeed, your desire for success should be greater than your fear of failure.","author":"Bill Cosby"},
{
       "quote":"A person who never made a mistake never tried anything new.","author":" Albert Einstein"},
{
       "quote":"The person who says it cannot be done should not interrupt the person who is doing it.","author":"Chinese Proverb"},
{
       "quote":"There are no traffic jams along the extra mile.","author":"Roger Staubach"},
{
       "quote":"It is never too late to be what you might have been.","author":"George Eliot"},
{
       "quote":"You become what you believe.","author":"Oprah Winfrey"},
{
       "quote":"I would rather die of passion than of boredom.","author":"Vincent van Gogh"},
{
       "quote":"A truly rich man is one whose children run into his arms when his hands are empty.","author":"Unknown"},
{
       "quote":"It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.","author":"Ann Landers"},
{
       "quote":"If you want your children to turn out well, spend twice as much time with them, and half as much money.","author":"Abigail Van Buren"},
{
       "quote":"Build your own dreams, or someone else will hire you to build theirs.","author":"Farrah Gray"},
{
       "quote":"The battles that count aren’t the ones for gold medals. The struggles within yourself–the invisible battles inside all of us–that’s where it’s at.","author":"Jesse Owens"},
{
       "quote":"Education costs money.  But then so does ignorance.","author":"Sir Claus Moser"},
{
       "quote":"I have learned over the years that when one’s mind is made up, this diminishes fear.","author":"Rosa Parks"},
{
       "quote":"It does not matter how slowly you go as long as you do not stop.","author":"Confucius"},
{
       "quote":"If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough.","author":"Oprah Winfrey"},
{
       "quote":"Remember that not getting what you want is sometimes a wonderful stroke of luck.","author":"Dalai Lama"},
{
       "quote":"You can’t use up creativity.  The more you use, the more you have.","author":"Maya Angelou"},
{
       "quote":"Dream big and dare to fail.","author":"Norman Vaughan"},
{
       "quote":"Our lives begin to end the day we become silent about things that matter.","author":"Martin Luther King Jr."},
{
       "quote":"Do what you can, where you are, with what you have.","author":"Teddy Roosevelt"},
{
       "quote":"If you do what you’ve always done, you’ll get what you’ve always gotten.","author":"Tony Robbins"},
{
       "quote":"Dreaming, after all, is a form of planning.","author":"Gloria Steinem"},
{
       "quote":"It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live.","author":"Mae Jemison"},
{
       "quote":"You may be disappointed if you fail, but you are doomed if you don’t try.","author":"Beverly Sills"},
{
       "quote":"Remember no one can make you feel inferior without your consent.","author":"Eleanor Roosevelt"},
{
       "quote":"Life is what we make it, always has been, always will be.","author":"Grandma Moses"},
{
       "quote":"The question isn’t who is going to let me; it’s who is going to stop me.","author":"Ayn Rand"},
{
       "quote":"When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.","author":"Henry Ford"},
{
       "quote":"It’s not the years in your life that count. It’s the life in your years.","author":"Abraham Lincoln"},
{
       "quote":"Change your thoughts and you change your world.","author":"Norman Vincent Peale"},
{
       "quote":"Either write something worth reading or do something worth writing.","author":"Benjamin Franklin"},
{
       "quote":"Nothing is impossible, the word itself says, “I’m possible!”","author":"–Audrey Hepburn"},
{
       "quote":"The only way to do great work is to love what you do.","author":"Steve Jobs"},
{
       "quote":"If you can dream it, you can achieve it.","author":"Zig Ziglar"}
]