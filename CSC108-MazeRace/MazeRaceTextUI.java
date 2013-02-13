import java.io.*;

/**
 *  This class implements a text-based user interface for the maze
 *  race game. 
 */
public class MazeRaceTextUI {
  
  /** 
   * Reference to the underlying MazeRace object which needs to be
   * updated when either player moves
   */  
  private MazeRace maze;
  

  /** 
   * Class constructor for the text UI object
   * @param maze the underlying MazeRace object
   */
  public MazeRaceTextUI( MazeRace maze ) {
    this.maze = maze;
  }
  
  /**
   * A method to be called to get the game running. 
   */
  public void startGame() throws IOException {
    System.out.println("Let's play the maze game.");
    

    /* loop to continue to accept moves as long as there is at least one
     * player able to move and no one has won yet
     */
    while ( !maze.isBlocked() && maze.hasWon() == 0  ) {

      // prints out current state of maze
      System.out.println( maze.toString() );
      System.out.println();

      // gets next move from players
      System.out.println("Next move?");
      System.out.print("> ");    
      char [] words = new char[]{'H','i','\n'};
      BufferedReader buffer = 
        new BufferedReader( new InputStreamReader( System.in ) );
      String moveText = "";
      moveText = buffer.readLine();
      System.out.println();
      
      // note that even if a string of more than one character is entered,
      // only the first character is used
      if ( moveText.length() >= 1 ) {
        char move = moveText.charAt( 0 );
        boolean validMove = maze.move( move );
      }
    }

    // The game has finished, so we output the final state of the maze, and
    // a message describing the outcome.
    System.out.println( maze );
    int status = maze.hasWon();
    if ( status == 1 ) {
      System.out.println( "Congratulations Ada! You won the maze in " 
                           + maze.numAdaMoves() + " moves!" );
    } else if ( status == 2 ) {
      System.out.println( "Congratulations Charles! You won the maze in " 
                           + maze.numCharlesMoves() + " moves!" );
    } else {
      System.out.println( "Stalemate! Both players are stuck. " 
                           + "Better luck next time." );
    }
  }  
}

