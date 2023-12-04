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
  favorite_list : string[];
  date_created : Date;
}