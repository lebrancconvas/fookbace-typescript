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

  addFriend(friend: User) {
    if(this._friends.find(friend => friend._username === friend._username)) {
      throw new Error(`${friend._username} is already in the friend list`);
    }

    this._friends.push(friend);
  }

  viewFriendList() {
    return this._friends;
  }

  checkFriendRequest() {
    return this._friendRequests;
  }

  acceptFriendRequest(friendRequest: User) {
    if(this._friendRequests.length === 0) {
      throw new Error(`You don't have any friend request`);
    }

    if(!this._friendRequests.find(friend => friend._username === friend._username)) {
      throw new Error(`You don't have friend request from ${friendRequest._username}`);
    }

    this._friends.push(friendRequest);
  }

  declineFriendRequest(friendRequest: User) {
    if(this._friendRequests.length === 0) {
      throw new Error(`You don't have any friend request`);
    }

    if(!this._friendRequests.find(friend => friend._username === friend._username)) {
      throw new Error(`You don't have friend request from ${friendRequest._username}`);
    }

    this._friendRequests = this._friendRequests.filter(friend => friend._username !== friendRequest._username);
  }

  unfriend(friend: User) {
    if(this._friends.length === 0) {
      throw new Error(`You don't have any friend`);
    }

    if(!this._friends.find(friend => friend._username === friend._username)) {
      throw new Error(`You don't have friend with ${friend._username}`);
    }

    this._friends = this._friends.filter(friend => friend._username !== friend._username);
  };

  viewAllPost(friend?: User) {
    if(!friend) {
      return this._posts;
    }

    if(this._friends.length === 0) {
      throw new Error(`You don't have any friend`);
    }

    if(!this._friends.find(friend => friend._username === friend._username)) {
      throw new Error(`You don't have friend with ${friend._username}`);
    }

    let friendTarget = this._friends.find(friend => friend._username === friend._username);

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

  searchPostByKeyword(keyword: string) {
    if(!keyword) {
      return this._posts;
    }

    return this._posts.filter(post => post.content.includes(keyword));
  };
};
