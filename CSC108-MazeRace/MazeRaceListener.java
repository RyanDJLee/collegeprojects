import java.awt.event.*;
import java.awt.*;
import javax.swing.*;

/** Listens for keystrokes from the GUI interface to the MazeRace game. */
public class MazeRaceListener extends KeyAdapter{
  
  /** 
   * Reference to the underlying MazeRace object which needs to be updated
   * when either player moves
   */
  private MazeRace maze;
  
  /** 
   * Reference to the MazeRaceWindow object that displays the state of
   * the game
   */
  private MazeRaceWindow mazeWindow;

  /**
   * Class constructor for the key listener object
   * @param maze the underlying MazeRace object
   */
  public MazeRaceListener( MazeRace maze ) {
    this.maze = maze;
  }

  /**
   * A method that sets which JFrame will display the game and need to be
   * updated with each move.
   * @param window the JFrame object that displays the state of the game
   */
  public void setMazeRaceWindow( MazeRaceWindow window ) {
    mazeWindow = window;
  }

  /**
   * A method that will be called each time a key is pressed on the active
   * game display JFrame.
   * @param event contains the pertinent information about the keyboard 
   * event
   */
  public void keyTyped( KeyEvent event ) {
    
    
    //Get the typed Char.
    char typedChar = event.getKeyChar();
    
    //If the game is not done.
    if (!maze.isBlocked() && maze.hasWon() == 0) {
  
      //Get Ada and Charle's current position.
      int adaRow =  maze.getAdasRow();
      int adaCol = maze.getAdasColumn();
      int charRow = maze.getCharlesRow();
      int charCol =maze.getCharlesCol();
      
      //Make the corrosponding move.
      maze.move(typedChar);
      
      //Get Ada and Charle's current position.
      int newAdaRow =  maze.getAdasRow();
      int newAdaCol = maze.getAdasColumn();
      int newCharRow = maze.getCharlesRow();
      int newCharCol =maze.getCharlesCol();
      
      //Update the old charle's and Ada's position.
      mazeWindow.updateWindow(adaRow,adaCol);
      mazeWindow.updateWindow(charRow,charCol);
      
      //Update the new Charle's and Ada's position.
      mazeWindow.updateWindow(newAdaRow,newAdaCol);
      mazeWindow.updateWindow(newCharRow,newCharCol);
    } 
       
    // Check for winner.
    if ( maze.isBlocked() || maze.hasWon() != 0 ){
      
      //Create an integer variable that stores the response
      //from the user, to see if they want to play again.
      int n = -100;
      int status = maze.hasWon();
      if ( status == 1 ) {
            
        //Display a message if Charles won.
        n = JOptionPane.showConfirmDialog( null, 
                                          "Way to go Charles, you beast!" 
                                               + "\n Wanna play again?",
                                             "Game Over"
                                               , JOptionPane.YES_NO_OPTION );
           
      } else if ( status == 2 ) {
           
          //Display a message if Ada won.
          n = JOptionPane.showConfirmDialog( null, 
                                            "Way to go Ada, you go girl!"
                                               + "\n Wanna play again?",
                                             "Game Over"
                                               , JOptionPane.YES_NO_OPTION );
           
          //It's a stalement if the maze is blocked and nobody won.  
      } else if (status == 0 && maze.isBlocked()) {
          n = JOptionPane.showConfirmDialog( null, "Stalemate, you guys blow!"
                                               + "\n Wanna play again?",
                                             "Game Over"
                                               , JOptionPane.YES_NO_OPTION );
      }
          
      //Check if the user wants to play again
      if ( n == JOptionPane.YES_OPTION ) {
            
      //remove the gui window so a new one can be created.
      mazeWindow.removeKeyListener( this );
      mazeWindow.dispose();
      
      //Recreate a new maze race using the layOut stored in MazeRaceDriver
      //as a static 2d array.
      MazeRace newMaze = new MazeRace (MazeRaceDriver.layOut);
      
      //replaces the maze in this class with the new maze.
      maze = newMaze;
      
      //replaces the currrent window with a new window
      //to re-configurate the positions
      mazeWindow = new MazeRaceWindow(maze,this);
            
      } else if (n == JOptionPane.NO_OPTION) {
            
        //remove the gui window.
        mazeWindow.removeKeyListener( this );
        mazeWindow.dispose();
      } 
    }
  }
}





