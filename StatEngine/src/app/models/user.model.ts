export interface User {
  username: string;
  email: string;
  password : string;
  steamID : string;
  introduction : string;
  KD : number;
  likes : number;
  dislikes : number;
  karmaRatio : number;
  profile_img_url : string;
  friend_list : string[];
  date_created : Date;
}