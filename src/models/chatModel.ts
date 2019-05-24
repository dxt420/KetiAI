// export interface IChatExtra {
//   id : string;
//   message : string;
//   isMe : boolean;
//   createdAt : string;
//   type : 'human' | 'bot',
//   extra? : object,
//   kind : any
// }

// export interface IChat {
//   id : string;
//   message : string;
//   isMe : boolean;
//   createdAt : string;
//   type : 'human' | 'bot',
//   extra? : IChatExtra[],
//   kind : any
// }


export interface IChat {
  id : string;
  message : string;
  isMe : boolean;
  createdAt : string;
  type : 'human' | 'bot',
  extra? : object,
  kind : any
}
