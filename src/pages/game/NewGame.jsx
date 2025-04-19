// TODO -- new game
/*
* New Game and Game Page
URL structure - /game/{game_id}

When a user clicks on the new game button, your app should create a brand new game with a unique ID.  This will create a new entry in the “All Games Page”, and when you create a new game, the user will need to wait for a second player to join (see below).  If there is only one user in the game, we would consider the game “Open”; if there are two players in the game, but the game is not over, this is called “Active”; if the game is completed, we call this “Completed”.  When a player starts or joins a game, the pieces of their board should be randomized.  The logged in player’s board should also be the second game board shown, no matter if they were the player to create the game or the player to join the game.  Otherwise the rules should stay the same and the players should not be able to see where their opponents pieces are.

Once a player has won, display “{Username} Wins” at the top of the page.

There will be no free play mode anymore (you can include it if you wish, but it is not necessary.  Any be careful about any unintended interactions.)  You can also remove the timer and the reset button.

If a logged out user visits this page, there should be NO interaction (even mouse hover interactions.)  Additionally, only show the “hit” spots on both player boards: we don’t any cheating!
* */