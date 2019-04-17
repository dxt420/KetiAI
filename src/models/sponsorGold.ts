  
  export interface GoldSponsor {
    name: string;
    desccription: string;
    email: string;
    imageurl: string;
    info: string;
    phone: string;
    website: string;
  }

  export interface SilverSponsor {
    name: string;
    desccription: string;
    email: string;
    imageurl: string;
    info: string;
    phone: string;
    website: string;
  }

  export interface PlatinumSponsor {
    name: string;
    desccription: string;
    email: string;
    imageurl: string;
    info: string;
    phone: string;
    website: string;
  }


  export interface Speaker {
    name: string;
    company: string;
    imageurl: string;
    info: string;
  }
  
  export interface Exhibitor {
    name: string;
    company: string;
    imageurl: string;
    info: string;
  }

  export interface Attendee {
    fisrtName: string;
    lastName: string;
    company: string;
    position: string;
    gender: string;
    imageurl: string;
   
  }

  export interface Schedule {
    name: string;
    time: string;
    speakers: any;  
   
  }
  

  export interface Post {
    fisrtName: string;
    lastName: string;
    company: string;
    position: string;
    body: string;
    id: string;
  }
  

  export interface Social {
    facebook: string;
    linkedin: string;
    twitter: string;
  }
  
  export interface Map {
    directions: string;
  }

  export interface Wifi {
    username: string;
    password: string;
  }

  export interface About {
    username: string;
    password: string;
  }


  export interface Rules {
    details: string;

  }

  export interface Notification {
    title: any;
    body: any;
    
  }
  