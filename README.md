The goal is to create a very simple two-player in-browser game.

#### The game

The game is simple. Two players placed into the same maze (in different locations) and should find the way out. The first player, who finds the way out, wins.
Player can navigate the maze by issuing a commands to move up/down/left/right.
Players should perform their turns in order. As said before, the first player, who finds the way out, wins.

### User flow

#### Opening the app

User opens a project’s web page (should be implemented as a React SPA). If this is a first visit, user is presented with a simple dialog asking for a name.
Next, user is presented with a dashboard.

#### Dashboard

The dashboard UI consists of:
personalized greeting (Hello, <username>) on top
list of games waiting for a second player
New game button

#### Starting a new game

After pressing the New game button, user is taken on the waiting screen, and the game initiated by the user, should appear in the dashboard’s waiting list. The information to present on a waiting screen: You started a new game <human_readable_time_interval> ago. Waiting for a second player…

#### Joining the game via the “waiting list”

The information to present in a waiting list (on a dashboard) is: date/time of a game initiation and the name of a player who initiated the game. Upon clicking on the game, user is taken into the game page, and the game begins for both players.
Playing the game
The elements to show on a screen are:
the indication of a player whose turn it currently is (Now its your turn or Now its opponent's turn); it would be good to also have some kind of visual indication to quickly figure out whether it is your turn.

“chat” (more like messages/commands log)

Give up button

Exit button (initially disabled)

The “chat” consists of the log, message input field and a “send” button. User can either enter movement commands (starts with slash, there should be only four supported: /up, /down, /left, /right) or messages for other player in chat (should not start with slash). Log should display both kind of messages with a timestamp. Commands should be presented in a format (going <direction>). Player messages should be prepended with a sender name (<player_name>: <message>). Log should display a scroll when messages are not fitting; also, it should be auto-scrolled to the last entry upon sending a message/command.

Player should only be able to enter movement commands in their own turn.
After one of the players reached the exit, the Player X has won! message should be shown in log, all further movement commands (but not the chat messages) should be ignored from both players, and the Exit button should become active.
Give up button should only be shown if the game has not been finished. Upon pressing this button, the confirmation should be shown, and if confirmed, both player should get the Player X gave up message in the log, all further movement commands (but not the chat messages) should be ignored from both players, and the Exit button should become active.
