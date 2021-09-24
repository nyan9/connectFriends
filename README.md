<!-- markdownlint-disable-file MD033 -->

<h1 align="center"> Connect4riends </h1> <br>
<p align="center">
    <a href="https://connect4riends.herokuapp.com/">
        <img alt="Connect 4riends" title="Connect4riends" src="app/assets/images/logo.svg" width="200">
    </a>
</p>

<p align="center" > Play against friends locally, online, or challenge the AI </p>
<p align="center" > <a href="https://connect4riends.herokuapp.com/"> :red_circle: :yellow_circle: LINK TO LIVE SITE :red_circle: :yellow_circle: </a></p>

## Table of Contents

1. [Overview](#overview)
    - [Technologies](#technologies)
    - [Libraries & Methodologies](#libraries--methodologies)
2. [Features](#features)
3. [Technical Implementation Details](#technical-implementation-details)
    - [User Authentication](#user-authentication)
    - [Socket.IO](#socket.io)
    - [Minmax Algorithm for the AI Player](#minmax-algorithm-for-the-ai-player)
4. [Sources](#sources)
5. [TODOs / Features to implement](#todos--features-to-implement)
6. [Author Info](#author-info)


## Overview

Connect4riends is a full stack online implementation of the Connect Four game. Four talented engineers [(check authors' info :arrow_down_small:)](#author-info) collaborated to support real time chat and a live game room. Compete against another player online to improve your ranking and move up on the global leaderboard.

### Technologies

- React
- Redux
- Node.js
- Express.js
- MongoDB

### Libraries & Methodologies

- [Axios-HTTP](https://github.com/axios/axios) for sending and requesting data asynchronously.
- [Mongoose](https://github.com/Automattic/mongoose) for a straight-forward, schema-based solution to model user data.
- [JWT Web Tokens](https://jwt.io/) for secure user authentication.


## Features

- *USER AUTH*
  - Login, Create Account
  - or play as guest / demo-user

- *GAME MODES*
  - Local multiplayer 
  - Online multiplayer
  - AI single-player

- *LEADERBOARD*
  - Global player rankings


[Back To The Top :arrow_up_small:](#table-of-contents)

## Technical Implementation Details

### User Authentication

After I completed building the comments feature, I was going to create a seperate Like model for comments since I already had an existing Like model for videos. However, I knew this wasn't ***DRY***.<br> 
Polymorphic associations became the perfect solution to my problem.

```RUBY
# app/models/like.rb
class Like < ApplicationRecord
  validates :liker_id, uniqueness: { scope: [:likeable_id, :likeable_type] }
  validates :version, inclusion: { in: %w(like dislike), 
    message: "%{value} is not a valid version, must be like or dislike"}

  belongs_to :likeable, polymorphic: true
  
  belongs_to :user,
    foreign_key: :liker_id,
    class_name: :User
end

# app/models/user.rb
class User < ApplicationRecord
  has_many :likes,
    foreign_key: :liker_id,
    class_name: :Like,
    dependent: :destroy

  has_many :liked_videos,
    through: :likes,
    source: :likeable,
    source_type: :Video
end
```

The Like model is associated not only with the Like button, but also with the Dislike button through the `version` column.
User`liker_id` is limited to one like/dislike on the same comment or video by validating uniqueness of the `likeable_id` and `likeable_type` in Like.

```RUBY
# app/models/comment.rb
class Comment < ApplicationRecord
  has_many :likes, as: :likeable, dependent: :destroy
end

# app/models/video.rb
class Video < ApplicationRecord
  has_many :likes, as: :likeable, dependent: :destroy
end
```

Instances of Like now belong to either Video or Comment on a single association as `likeable`.

[Back To The Top :arrow_up_small:](#table-of-contents)


### Socket.IO

In order for me to avoid `overflow: hidden` `z-index` issues, the Notification component has to sit on top of the entire application rather than inside of the application.

```html
<body>
    <!-- Notifications need to go here --> 
    <main id="root">
        <!-- Application gets rendered here --> 
    </main>
</body>
```

`React.createPortal()` in conjunction with `document.createElement()` allow me to do just that.

```javascript
// components/noti_portal/noti_portal.jsx
const [loaded, setLoaded] = useState(false);
const [portalId] = useState(`noti-portal-${uuid()}`);

useEffect(() => {
  const div = document.createElement("div");
  div.id = portalId;
  div.style = "position: fixed; bottom: 20px; left: 30px; z-index: 300";
    
  document.getElementsByTagName("body")[0].prepend(div);
  setLoaded(true);

  return () => document.getElementsByTagName("body")[0].removeChild(div);
}, [portalId]);

return (
  loaded && createPortal(
    <div className='noti'>
      {notis.map((noti) => (
        <Noti
          key={noti.id}
          mode={noti.mode}
          message={noti.message}
          onClose={() => removeNoti(noti.id)}
        />
      ))}
    </div>,
      
  document.getElementById(portalId)
)
```

A new dom element is created with `document.createElement("div")`. It gets injected as a first child of `<body>` with an unique ID.
The Notification component is then rendered inside the newly created `<div>` sitting on top of the application with the magic of `React Portals`. <br>

Now I needed to call `addNotis()` function inside of the Notifications component from the Root component to be able to provide the function to other components in the App using `React Context`.
This is when `React.forwardRef()` and `React.useImperativeHandle()` come in to make the functions inside the child component accessible from a parent component.

```javascript
// components/root.jsx
import { NotiContext } from "../context/noti_context"

const Root = ({ store }) => {
  const notiRef = useRef(null);

  const addNoti = ({ mode, message }) => {
    notiRef.current.addMessage({ mode, message });
  };
  
  return (
    <>
      <NotiContext.Provider value={{ addNoti }}>
        <App />
      </NotiContext.Provider>
      <NotiPortal ref={notiRef} autoClose={true} />
    </>
  );
}

// components/noti_portal/noti_portal.jsx
const NotiPortal = forwardRef((props, ref) => {
  const [notis, setNotis] = useState([]); // contains message and color(mode)
  
  useImperativeHandle(ref, () => ({
    addMessage(noti) {
      setNotis([{ ...noti, id: uuid() }, ...notis]);  // takes in message and mode; generates unique id
    },
  }));
    
  return (
    // create portal...
    // render Notifications
  )
});
```
The combination of `ref` `forwardRef` and `useImperativeHandle` allows the Root component to get access to `addNotis()` function inside the Notifications components whenever it gets renderd.

### Minmax Algorithm for the AI Player

[Back To The Top :arrow_up_small:](#table-of-contents)

## Sources

- https://stackoverflow.com/a/25821830
  padStart fix for hex code length issue when generating random colors.


[Back To The Top :arrow_up_small:](#table-of-contents)

## TODOs / Features to implement



[Back To The Top :arrow_up_small:](#table-of-contents)

---

## Author Info

-  [Ryan Naing](www.ryannaing.com)
-  [John Cheung]()
-  [Kenny Li]()
-  [Andrew Kim]()


[Back To The Top :arrow_up_small:](#table-of-contents)
