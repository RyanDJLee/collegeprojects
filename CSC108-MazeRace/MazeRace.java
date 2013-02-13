/**
 * The MazeRace class represents the basic functionality of the game.
 */
public class MazeRace {
  
  
  //Represents the maze grid.
  private char[][] maze; 
  
  //Represents Ada's position.
  private int adaRow;
  private int adaColumn;
  
  //Represents Charles' position.
  private int charRow;
  private int charColumn;
  
  //Represents Goal's position.
  private int goalRow;
  private int goalColumn;
  
  //Represents the position of the grid a move would lead to.
  private int futureRow;
  private int futureColumn;
  
  // Represents the empty grid.
  private static char Empty = ' ';
  
  //Represents the walls.
  private static char Wall = 'X';
  
  //Represents Ada's position.
  private static char Ada = 'A';
  
  //Represents Charle's position.
  private static char Charles = 'C';
  
  //Represents the goal.
  private static char Goal = 'G';
  
  //Represents a made move.
  private static char MadeMove = '.';
  
  //Represents the number of moves ada has made.
  private int adaMoves = 0;
  
  //Represents the number of moves charles has made.
  private int charlesMoves = 0;
  
  
  /**
   * The constructor for this class. 
   * This constructor takes in a two-dimensional array of characters, 
   * and uses this array to initialize its internal maze grid.
   * @param m the array representing the maze grid.
   */
  public MazeRace ( char[][] m ) {
    
    //Copy the content of m into the maze array.
     maze = new char[m.length][m[0].length];
    for ( int i = 0; i < m.length; i++ ) {
       //this is every row of the 2d array.
      for ( int j = 0; j < m[i].length; j++ ) {
        //this is every column of the 2d array.
        maze[i][j] = m[i][j]; 
        
        //store Ada's "coordinate".
        if ( m[i][j] == 'A' ) {
          adaRow = i;
          adaColumn = j;
        }
        
        //store Charle's "coordinate".
        if ( m[i][j] == 'C' ) {
          charRow = i;
          charColumn = j;
        }
        
        //store the Goal's "coordinate".
        if ( m[i][j] == 'G' ) {
          goalRow = i;
          goalColumn = j;
        }
      }
    }
    
  }
  
  /**
   * A helper method that returns where a move would lead to.
   * It also update the coordinates of the future spot which was stored
   * in the instance variables.
   * @param m the move represented by a character
   * @return a character representing the future position.
   */
  public char moveInto( char m ) {
    char grid = ' ';
    //check if ada's moving up.
    if ( m == 'w' ) {
      
      //find the array above ada's position.
      //update the future position.
      grid = maze[adaRow - 1][adaColumn];
      futureRow = adaRow - 1;
      futureColumn = adaColumn;
    }
    
    //check if ada's moving down.
    if ( m == 's' ) {
      
      //find the array below ada's position.
      //update the future position.
      grid = maze[adaRow + 1][adaColumn];
      futureRow = adaRow + 1;
      futureColumn = adaColumn;
    }
    
    //check if ada's moving left.
    if ( m == 'a' ) {
      
      //find the array left to ada's position.
      //update the future position.
      grid = maze[adaRow][adaColumn - 1];
      futureRow = adaRow;
      futureColumn = adaColumn - 1;
    }
    
    //check if ada's moving right.
    if ( m == 'd') {
      
      //find the array right to ada's position.
      //update the future position.
      grid = maze[adaRow][adaColumn + 1];
      futureRow = adaRow;
      futureColumn = adaColumn + 1;
    }
   
    //check if charles is moving up.
    if ( m == 'i' ) {
      
      //find the array above charles's position.
      //update the future position.
      grid = maze[charRow - 1][charColumn];
      futureRow = charRow - 1;
      futureColumn = charColumn;
    }
    
    //check if charles's moving down.
    if ( m == 'k' ) {
      
      //find the array below charless position.
      //update the future position.
      grid = maze[charRow + 1][charColumn];
      futureRow = charRow + 1;
      futureColumn = charColumn;
    }
    
    //check if charles's moving left.
    if ( m == 'j' ) {
      
      //find the array left to charles's position.
      //update the future position.
      grid = maze[charRow][charColumn - 1];
      futureRow = charRow;
      futureColumn = charColumn - 1;
    }
    
    //check if charles's moving right.
    if ( m == 'l' ) {
      
      //find the array right to ada's position.
      //update the future position.
      grid = maze[charRow][charColumn+1];
      futureRow = charRow;
      futureColumn = charColumn + 1;
    }
    return grid;
  }
  
  /**
   * This method takes in a single character value that indicates a move,
   * and updates the player's position if the move is legal.
   * @param c the character that represents the direction of the move.
   * @return true if the move is successful, false otherwise.
   */
  public boolean move(char c) {
    boolean legal = false;
    
    //check if the move input was legal.
    if( c == 'a' || c == 's' || c == 'w' || c == 'd'
         || c == 'j' || c == 'k' || c == 'l' || c == 'i' ){
      
      //check if the spot to be moved to is possible.
      //find the futurespot.
      char futureSpot = this.moveInto(c);
      
      //make sure the future spot is movable
      if ( futureSpot != Wall && futureSpot != MadeMove
           && futureSpot != Charles 
           && futureSpot != Ada ) {
        
        //set this move to be legal.
        legal = true;
        
        //update the player's position
        if ( c == 'a' || c == 's' || c == 'w' || c == 'd' ) {
          
          //update Ada's position.
          maze[futureRow][futureColumn] = maze[adaRow][adaColumn];
          
          //update the old Ada's position.
          maze[adaRow][adaColumn] = MadeMove;
          
          //update the new Ada position coordinate.
          adaRow = futureRow;
          adaColumn = futureColumn;
          
          //update the number of Ada's moves.
          adaMoves++;
        }
        
        if ( c == 'j' || c == 'k' || c == 'l' || c == 'i' ) {
          
          //update Charles's position.
          maze[futureRow][futureColumn] = maze[charRow][charColumn];
          
          //update the old Charles's position.
          maze[charRow][charColumn] = MadeMove;
          
          //update the new Charle's position coordinate.
          charRow = futureRow;
          charColumn = futureColumn;
          
          //update the number of Charles' moves.
          charlesMoves++;
        }
      }
    }  
    return legal;
  
  }
  
  /**
   * This method returns an int to indicate whether the current 
   * maze configuration is a winning configuration for either player or not. 
   * @return 1 if Ada won, 2 if Charles won, and 0 if neither player won. 
   */
  public int hasWon() {
    int winner = 0;
    
    //Check Ada's position with Goal's position.
    if ( adaRow == goalRow && adaColumn == goalColumn ) {
      winner = 1; 
    }
    
    //Check Charle's position with Goal's position.
    if ( charRow == goalRow && charColumn == goalColumn ) {
      winner = 2; 
    }
    return winner;
  }
  
  /**
   * This method  returns a boolean value to indicate whether 
   * in the current maze configuration both players are caught in dead ends.
   * @return true if both of them are blocked and false otherwise. 
   */
  public boolean isBlocked() {
    
    //initialize a variable that stores whether the gris is blocked or not
    //set it to true
    boolean blocked = true;
    
    //If a player is not blocked, he must have at least
    //1 empty char around it.
    
    //Check the 8 characters surrounding charles and ada
    //If any of these character is empty or goal, then they are not blocked.
  
    //Check above Charle.
    if ( maze[charRow - 1][charColumn] == Empty 
         ||maze[charRow - 1][charColumn] == Goal ) {
      blocked = false;
    }
    
    //Check below Charle.
    if ( maze[charRow + 1][charColumn] == Empty
         || maze[charRow + 1][charColumn] == Goal ) {
      blocked = false;
    }
    //Check left of Charle.
    if ( maze[charRow][charColumn - 1] == Empty
         || maze[charRow][charColumn - 1] == Goal ) {
      blocked = false;
    }
    //Check right of Charle.
    if ( maze[charRow][charColumn + 1] == Empty 
         || maze[charRow][charColumn + 1] == Goal ) {
      blocked = false;
    }
    
     //Check above Ada.
    if ( maze[adaRow - 1][adaColumn] == Empty
         || maze[adaRow - 1][adaColumn] == Goal ) {
      blocked = false;
    }
    
    //Check below Ada.
    if ( maze[adaRow + 1][adaColumn] == Empty
         || maze[adaRow + 1][adaColumn] == Goal ) {
      blocked = false;
    }
    //Check left of Ada.
    if ( maze[adaRow][adaColumn - 1] == Empty
         || maze[adaRow][adaColumn - 1] == Goal ) {
      blocked = false;
    }
    //Check right of Ada.
    if ( maze[adaRow][adaColumn + 1] == Empty
         || maze[adaRow][adaColumn + 1] == Goal ) {
      blocked = false;
    }
    
    return blocked;
    
  }
  
  /**
   * This method returns the number of moves Ada has made so far.
   * @return the number of moves Ada has made.
   */
  public int numAdaMoves() {
    return adaMoves;
  }
  
  /**
   * This method returns the number of moves Charles has made so far.
   * @return the number of moves Charles has made.
   */
  public int numCharlesMoves() {
    return charlesMoves; 
  }
  
  /**
   * This is a helper method that returns Charle's row
   * @return charles row as an int
   */
  public int getCharlesRow() {
     return charRow;
  }
  
  /**
   * This is a helper method that returns Charle's column
   * @return charles column as an int
   */
  public int getCharlesCol() {
     return charColumn;
  }
 
  /**
   * This is a helper method that returns Ada's row
   * @return ada's row as an int
   */
  public int getAdasRow() {
     return adaRow;
  }
  
  /**
   * This is a helper method that returns Ada's column
   * @return ada's column as an int
   */
  public int getAdasColumn() {
     return adaColumn;
  }
 
  /**
   * This method returns a two-dimensional array of chars that 
   * represents the current configuration of the maze.
   * @return the current configuration of the maze in a two-dimensional array.
   */
  public char[][] getGrid() {
    return maze; 
  }
  
  /**
   * This method compares the contents of this MazeRace object to 
   * the given MazeRace to see if they are equal.
   * @param m the maze being compared to.
   * @return true if the configurations match, false otherwise.
   */
  public boolean isEqual( MazeRace m ) {
     boolean equal = true;
     
     //get the array that contains the grid from the other maze instance.
     char[][] otherMaze = m.getGrid();
     
     //Check if the 2 mazes contain the same dimension.
     if ( otherMaze.length == maze.length 
           && otherMaze[0].length == maze[0].length ) {
       
       // If two mazes are of euqal dimension:
       //Use a nested for loop to check every element in the array m and maze.
       //If a difference is detected, the equal variable is set to false.
       for ( int i = 0 ; i <  otherMaze.length && equal ; i++ ) {
         for ( int j = 0 ; j <  otherMaze[i].length && equal ; j++ ) {
           
           //check if this character equals to the
           //corrosponding character in the current maze. 
           if ( otherMaze[i][j] != maze[i][j] ) {
             
             //set equal to false.
             equal = false;
           }
         }
       }
     } else {
       //if two mazes don't have equal dimension, set equal to false
       equal = false; 
     }
    return equal;
  }
  
  /**
   * Returns a String that represents the current state of the 
   * maze in String form. 
   * @return the current state of the maze in a string.
   */
  public String toString() {
    String toString = "";
    
    //break the maze array into rows.
    for ( int i = 0 ; i < maze.length ; i++ ) {
      
       //break the maze array into each character.
      for ( int j = 0 ; j < maze[i].length ; j++ ) {
        
        //No new line character will be added if the character is at the
        //end of the maze.
        if ( j == maze[i].length - 1 && i == maze.length - 1 ) {
          toString = toString + maze[i][j];
        
        //A new line character will be added if the character is at the
        //end of a row.
        } else if ( j == maze[i].length - 1 ) {
          toString = toString + maze[i][j] + "\n";
        } else {
          toString = toString + maze[i][j]; 
        }
      }
    }
    
    return toString;
  }
  
  
  
}