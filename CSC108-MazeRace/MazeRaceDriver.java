import javax.swing.*;
import java.io.*;


/** 
 * This class is the starting point for the maze race game. It is invoked 
 * from the command line, along with the location of the layout file and 
 * the desired interface type. Its main purpose is to initialize the 
 * components needed for the game and the specified interface.
 */
public class MazeRaceDriver {
  
  
  /**
   * A 2d array that stores the layout from a file.
   */
  public static char[][] layOut ;
 
  /** 
   * A method that takes a text file representation of the maze and 
   * produces a 2D array of characters to represent the same maze.
   * @param layoutFileName location of the file with the maze layout
   * @return The maze layout.
   */
  public static char[][] getLayoutFromFile( String layoutFileName ) 
    throws IOException {
    char[][] maze ;
    
    //Create filereader and buffered reader.
    FileReader f = new FileReader(layoutFileName);
    BufferedReader bf = new BufferedReader(f);
    
   //how many rows are in the layout.
    int row = 0;
    
    //Get the first line of the layout file.
    String line = bf.readLine();
    
    //how many columns are in the layout.
    int column = line.length();
    
    //Obtain the number of rows in the layout file
    while ( line != null) {
      //this loop will repeat for every role of the layout.
      line = bf.readLine();
      row++;
    }
   
    
    //Construct a 1D String array to represent the layout.
    String[] layOut = new String[row];
    
    //Create a new buffered reader to read the file again.
    //But this time we store the information in layOut array.
    FileReader f2 = new FileReader(layoutFileName);
    BufferedReader bf2 = new BufferedReader(f2);
    String line2 = bf2.readLine();
    
    //Use this counter to locate each element in the array.
    int counter = 0;
    while (line2 != null) {
      //Assign the value of each line to each element in the array.
      layOut [counter] = line2;
      line2 =bf2.readLine();
      counter++;
    }
    bf.close();
    bf2.close();
    

    //Construct the array by using the specified rows and columns.
    maze = new char[row][column];
    
    for (int i = 0 ; i < row ; i++) {
      for (int j = 0 ; j < column ; j++) {
        //assign the character to each element in the 3D array maze.
        maze[i][j] = layOut[i].charAt(j);
      }
    }
    
    return maze;
  }
  

  /** 
   * The main method of your program.
   * @param args command-line arguments provided by the user
   */
  public static void main( String[] args ) throws IOException {
    
    // check for too few or too many command line arguments
    if ( args.length != 2 ) {
      System.out.println( "Usage: " +
                         "java MazeRaceDriver <location> <interface type>" );
      return;
    } 
  
    if ( args[1].toLowerCase().equals( "text" ) ) {
      char[][] layout = getLayoutFromFile( args[0] );
      MazeRace maze = new MazeRace( layout );
      MazeRaceTextUI game = new MazeRaceTextUI( maze );
      game.startGame();  
    } else if ( args[1].toLowerCase().equals( "gui" ) ) {
       
      //get the filename using a JFileChooser
      JFileChooser chooser = new JFileChooser("");
      int returnVal = chooser.showOpenDialog(null);
        
      //Stores the file chosen by the user.
      File grid = null;
        
      //If the user pressed Ok
      if ( returnVal == JFileChooser.APPROVE_OPTION) {
        grid = chooser.getSelectedFile();
        
        /*Reads the layout from the file 
         *create a new MazeGame using array produced from the layout.*/
          
        /*grid.getAbsolutePath() method is used to get the directory
        /and the name of the file as a string. */
        layOut = getLayoutFromFile (grid.getAbsolutePath());
        MazeRace game = new MazeRace(layOut);
          
        //start the window-based maze game.
        MazeRaceListener ml = new MazeRaceListener (game);
        MazeRaceWindow gui = new MazeRaceWindow (game ,ml);
          
        } else {
          System.out.println ("You canceled the file selection."); 
        }
      
      //End of the GUI segment
      
    } else {
      System.out.println ( "Invalid interface for game." +
                         " Please user either TEXT or GUI." );
    }

    return;
  }
}

