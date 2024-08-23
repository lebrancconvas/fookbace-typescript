import { Post } from './post';

export class User {
  private _username: string;
  private _fullName: string;
  private _friends: User[];
  private _friendRequests: User[];
  private _posts: Post[];

  constructor(username: string) {
    // Check if username is already exist : singleton.
    if(!username) {
      throw new Error(`Username can't be empty!`);
    }

    this._username = username;
    this._fullName = 'Anonymous User';
    this._friends = [];
    this._friendRequests = [];
    this._posts = [];
  }

  get username() {
    return this._username;
  }

  setName(firstName: string, lastName: string) {
    this._fullName = `${firstName} ${lastName}`;
  }

  get fullName() {
    return this._fullName;
  }

  addFriend(friendUsername: string) {
    if(this._friends.find(friend => friend._username === friendUsername)) {
      throw new Error(`${friendUsername} is already in the friend list`);
    }

    this._friends.push(new User(friendUsername));
  }

  viewFriendList() {
    return this._friends;
  }

  checkFriendRequest() {
    return this._friendRequests;
  }

  acceptFriendRequest(friendUsername: string) {
    if(this._friendRequests.length === 0) {
      throw new Error(`You don't have any friend request`);
    }

    if(!this._friendRequests.find(friend => friend._username === friendUsername)) {
      throw new Error(`You don't have friend request from ${friendUsername}`);
    }

    this._friends.push(new User(friendUsername));
  }

  declineFriendRequest(friendUsername: string) {
    if(this._friendRequests.length === 0) {
      throw new Error(`You don't have any friend request`);
    }

    if(!this._friendRequests.find(friend => friend._username === friendUsername)) {
      throw new Error(`You don't have friend request from ${friendUsername}`);
    }

    this._friendRequests = this._friendRequests.filter(friend => friend._username !== friendUsername);
  }

  unfriend(friendUsername: string) {
    if(this._friends.length === 0) {
      throw new Error(`You don't have any friend`);
    }

    if(!this._friends.find(friend => friend._username === friendUsername)) {
      throw new Error(`You don't have friend with ${friendUsername}`);
    }

    this._friends = this._friends.filter(friend => friend._username !== friendUsername);
  };

  viewAllPost(friendUsername?: string) {
    if(!friendUsername) {
      return this._posts;
    }

    if(this._friends.length === 0) {
      throw new Error(`You don't have any friend`);
    }

    if(!this._friends.find(friend => friend._username === friendUsername)) {
      throw new Error(`You don't have friend with ${friendUsername}`);
    }

    let friendTarget = this._friends.find(friend => friend._username === friendUsername);

    if(typeof friendTarget === 'object') {
      return friendTarget._posts;
    }

    return [];
  };

  createPost(postContent: string) {
    if(!postContent) {
      this._posts.push(new Post(''));
    }

    this._posts.push(new Post(postContent));
  };
};
