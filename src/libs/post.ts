import { User } from './user';

export class Post {
  private _content: string;
  private _postAuthor: User;
  private _postPrivacy: User[];
  private _datepost: Date;
  private _like: number;
  private _comments: Comment[];

  constructor(content: string) {
    this._content = content;
    this._postAuthor = new User('Anonymous User');
    this._postPrivacy = [];
    this._datepost = new Date();
    this._like = 0;
    this._comments = [];
  }

  get content() {
    return this._content;
  }
};
