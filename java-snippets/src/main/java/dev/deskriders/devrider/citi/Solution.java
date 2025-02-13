package dev.deskriders.devrider.citi;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

class Solution {
    // Define which directions we can move: up, down, left, right
    public int solution(String wordToFind, String[] gameBoard) {
        // If there's no word to find, return 0
        if (wordToFind.isEmpty()) {
            return 0;
        }

        // Create lists to keep track of where we've been
        Queue<GamePosition> positionsToCheck = new LinkedList<>();
        Set<String> visitedPositions = new HashSet<>();

        // Look through the whole game board to find starting positions
        for (int row = 0; row < gameBoard.length; row++) {
            for (int column = 0; column < gameBoard.length; column++) {
                // If we find a letter (not a dot), add it as a starting position
                if (gameBoard[row].charAt(column) != '.') {
                    GamePosition startPosition = new GamePosition(row, column, "", 0);
                    positionsToCheck.add(startPosition);

                    // Mark this position as visited
                    String visitedKey = row + "," + column + ",";
                    visitedPositions.add(visitedKey);
                }
            }
        }

        // Keep checking positions until we run out
        while (!positionsToCheck.isEmpty()) {
            // Get the next position to check
            GamePosition currentPosition = positionsToCheck.remove();

            // Get the letter at current position
            char currentLetter = gameBoard[currentPosition.row].charAt(currentPosition.column);

            // Check if we can collect this letter
            if (currentPosition.collectedLetters.length() < wordToFind.length()) {
                // Check if this is the next letter we need
                if (wordToFind.charAt(currentPosition.collectedLetters.length()) == currentLetter) {
                    // Add this letter to our collection
                    String newCollectedLetters = currentPosition.collectedLetters + currentLetter;

                    // Check if we found the whole word
                    if (newCollectedLetters.equals(wordToFind)) {
                        return currentPosition.movesMade;
                    }

                    // Mark this new state as visited
                    String visitedKey = currentPosition.row + "," +
                            currentPosition.column + "," +
                            newCollectedLetters;

                    // If we haven't been here with these letters before
                    if (!visitedPositions.contains(visitedKey)) {
                        visitedPositions.add(visitedKey);
                        GamePosition newPosition = new GamePosition(
                                currentPosition.row,
                                currentPosition.column,
                                newCollectedLetters,
                                currentPosition.movesMade
                        );
                        positionsToCheck.add(newPosition);
                    }
                }
            }

            // Try moving in all four directions
            // Up
            tryMove(currentPosition.row - 1, currentPosition.column, currentPosition,
                    gameBoard, visitedPositions, positionsToCheck);
            // Down
            tryMove(currentPosition.row + 1, currentPosition.column, currentPosition,
                    gameBoard, visitedPositions, positionsToCheck);
            // Left
            tryMove(currentPosition.row, currentPosition.column - 1, currentPosition,
                    gameBoard, visitedPositions, positionsToCheck);
            // Right
            tryMove(currentPosition.row, currentPosition.column + 1, currentPosition,
                    gameBoard, visitedPositions, positionsToCheck);
        }

        // If we get here, we couldn't find the word
        return -1;
    }

    // Helper method to try moving to a new position
    private void tryMove(int newRow, int newColumn, GamePosition currentPosition,
                         String[] gameBoard, Set<String> visitedPositions,
                         Queue<GamePosition> positionsToCheck) {
        // Check if the new position is within the game board
        if (newRow >= 0 && newRow < gameBoard.length &&
                newColumn >= 0 && newColumn < gameBoard.length) {

            // Create a key to check if we've been here before
            String visitedKey = newRow + "," + newColumn + "," + currentPosition.collectedLetters;

            // If we haven't been here before with these letters
            if (!visitedPositions.contains(visitedKey)) {
                visitedPositions.add(visitedKey);
                GamePosition newPosition = new GamePosition(
                        newRow,
                        newColumn,
                        currentPosition.collectedLetters,
                        currentPosition.movesMade + 1
                );
                positionsToCheck.add(newPosition);
            }
        }
    }

    // Class to keep track of our position and progress
    private static class GamePosition {
        int row;
        int column;
        int movesMade;
        String collectedLetters;

        GamePosition(int row, int column, String collectedLetters, int movesMade) {
            this.row = row;
            this.column = column;
            this.collectedLetters = collectedLetters;
            this.movesMade = movesMade;
        }
    }
}