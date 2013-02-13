import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.event.*;



/**
 * This class is responsible for displaying the maze race game. It should
 * set up the maze window when the game is started and update the display 
 * with each move.
 */
public class MazeRaceWindow extends JFrame {
   
  /*
   * The game MazeRace.
   */
  MazeRace maze;
  
  /*
   * The Jlabel array that represents each position in the maze.
   */
  JLabel[][] board;
  
 /**
   * Constructor that creates a GUI window for the Mazerace game.
   * @param m the MazeRace class representing the game.
   * @param l the MazeRaceListener class that listens for key strokes.
   */
  public MazeRaceWindow (MazeRace m, MazeRaceListener l) {
    //Initialize the instance variable.
    maze = m;
    
    //Initialize the listener.
    //Set this window instance as the window that keylistener listens to.
    l.setMazeRaceWindow(this);
    this.addKeyListener(l);
    
    
    //Gets the size of the board and store them in 2 int variables.
    int length = maze.getGrid().length;
    int width = maze.getGrid()[0].length;
    
    //Gets the windows content pane and sets its layout to a grid 
    Container c = this.getContentPane();
    c.setLayout( new GridLayout(length ,width));
    
    //Initialize the JLabel array with given length and width.
    board = new JLabel[length][width];
    
    for (int i = 0 ; i < length ; i++) {
      for (int j = 0 ; j < width ; j++) {
        //Inside this loop, we can access every element of the grid. 
        
        //Set the Jlabel to display appropriate Maze symbol.
        board[i][j] = new JLabel("" + maze.getGrid()[i][j]);
        
       
       //Set the Jlabel's alignment and adds it to the content pane.
        board[i][j].setHorizontalAlignment( SwingConstants.CENTER );
        board[i][j].setVerticalAlignment( SwingConstants.CENTER );
        c.add( board[i][j] );
      }
    }
    
    this.pack(); //packs the jlabels
    this.setVisible(true); // make the window visible
    this.setTitle("THE MAZE GAME"); //set the title of the window
    //set the window to mazimum size.
    this.setExtendedState(JFrame.MAXIMIZED_BOTH); 
    
  }
  
  /**
   * Updates the window if a C or A moves.
   * @param row the row where the player has moved to.
   * @param column the column where the player has moved to.
   */
  public void updateWindow(int row, int column){
    
    //updates the selected Jlabel to the corrosponding value in the Maze grid.
    board[row][column].setText( String.valueOf(maze.getGrid()[row][column]));
    
    
  }
   
  
}

