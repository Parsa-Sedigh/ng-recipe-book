/* This model stores all of the core data which that data makes up a user and even helps us with validating whether that token is
still valid. Because the token that firebase gives us would expire after some time and therefore we'll need to also find out
not only if the token exists but also if it is still valid and is not expired yet. We want to manage all of these, in this model.

We used constructor() {} in this class, because we want to create instances of this class, therefore we needed that constructor()
for this class to instantiate this class with new keyword.
We will always create a new user object when a user logs in.

Now let's use typescript shortcut which would automatically storing arguments of () of the constructor in properties of that
class with the same names of those args in constructor, by adding an accessor in front of the argument name in () of constructor.

The _token is the token of that user.
Why using underscore and private for those args which would be props of that class too?
private, because the token should not be retrievable like that. Instead, when the user or you, as a developer, want to
get access to the token, you should be required to do that(accessing the token) in a way that will automatically check the
validity. So we don't need to use token directly to validate it manually. Instead checking the validity of token can be acheived
a getter in this file. The automatic way of getting the token and with checking validity is to declare a getter for token which
checks the validity of it too.

Learn:
 A getter looks like a function or a method, but you must access it like a property(so without it's parentheses). Why it is like
 that?
 Because a getter is a special type of property. In other words, it's a property where you can write code that runs, when you
 try to access this property.
 A getter also means that the user can't overwrite that getter. So if you declared a getter like: get token() {...} in a class,
 you can't write: this.token = ...; OR user.token = ...; (user is instance of that class which that token getter lives within it),
 because you are overwriting that getter in those examples and doing that, would throw an error, because token in those cases is
 a getter and not a setter.

Important: In JS, we can get the current date and time, by saying: new Date()

new Date() > this._tokenExpirationDate means the token exists(because we are comparing it to sth else right? So it does exist) and
it is smaller than the current time and date. So the user has a token but it's not valid because it's expiered. So in that case
we must return null, even we have a token.

Now let's store the authenticated user in the auth.service and we will store that authenticated user as a subject.
Important: A subject object is a generic type.*/

export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {
  }

  get token () {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    } else {
    return this._token;
    }
  }
}










