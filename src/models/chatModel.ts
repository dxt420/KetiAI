export interface IChat {
  id : string;
  message : string;
  isMe : boolean;
  createdAt : string;
  type : 'human' | 'bot',
  extra? : object,
  kind : any
}
