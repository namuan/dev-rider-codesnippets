package dev.deskriders.devrider.citi;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class SolutionTest {
    private Solution solution;

    @BeforeEach
    void setUp() {
        solution = new Solution();
    }

    @Test
    void testExample1() {
        String S = "ABCA";
        String[] grid = {".A.C", "..B.", "....", "...A"};
        assertEquals(6, solution.solution(S, grid),
                "Should find path for 'ABCA' in 6 moves");
    }

    @Test
    void testExample2() {
        String S = "KLLRML";
        String[] grid = {"K....", "S...L", "....R", "LX...", "XM..S"};
        assertEquals(13, solution.solution(S, grid),
                "Should find path for 'KLLRML' in 13 moves");
    }

    @Test
    void testExample3() {
        String S = "XZZY";
        String[] grid = {".Z.", "XBB", "..A"};
        assertEquals(-1, solution.solution(S, grid),
                "Should return -1 when letter 'Y' is missing from grid");
    }

    @Test
    void testSingleCharacter() {
        String S = "A";
        String[] grid = {"A"};
        assertEquals(0, solution.solution(S, grid),
                "Should require 0 moves for single character in starting position");
    }

    @Test
    void testEmptyGrid() {
        String S = "A";
        String[] grid = {"."};
        assertEquals(-1, solution.solution(S, grid),
                "Should return -1 for empty grid");
    }

    @Test
    void testMultiplePossiblePaths() {
        String S = "AB";
        String[] grid = {"AB", ".."};
        assertEquals(0, solution.solution(S, grid),
                "Should find minimum path when multiple paths exist");
    }

    @Test
    void testMaximumLengthString() {
        String S = "ABCDEFGHIJ";
        String[] grid = {
                "A....", "B....", "C....", "D....",
                "E....", "F....", "G....", "H....",
                "I....", "J...."
        };
        assertEquals(9, solution.solution(S, grid),
                "Should handle maximum length string");
    }

    @Test
    void testInsufficientLetters() {
        String S = "AAA";
        String[] grid = {"A..", ".A.", "..."};
        assertEquals(-1, solution.solution(S, grid),
                "Should return -1 when insufficient letters in grid");
    }

    @Test
    void testEmptyString() {
        String S = "";
        String[] grid = {"..."};
        assertEquals(0, solution.solution(S, grid),
                "Should handle empty string input");
    }

    @Test
    void testSingleDotGrid() {
        String S = "A";
        String[] grid = {"."};
        assertEquals(-1, solution.solution(S, grid),
                "Should return -1 for grid with only dots");
    }

    @Test
    void testLetterNotAtStartingPosition() {
        String S = "A";
        String[] grid = {"..", ".A"};
        assertEquals(1, solution.solution(S, grid),
                "Should find letter that requires one move to reach");
    }

    @Test
    void testMaxGridSize() {
        // Testing with 20x20 grid (maximum size according to constraints)
        String S = "AB";
        String[] grid = new String[20];
        for (int i = 0; i < 20; i++) {
            StringBuilder row = new StringBuilder();
            for (int j = 0; j < 20; j++) {
                row.append(".");
            }
            grid[i] = row.toString();
        }
        grid[0] = "A" + grid[0].substring(1);
        grid[19] = "B" + grid[19].substring(1);
        assertEquals(19, solution.solution(S, grid),
                "Should handle maximum grid size");
    }
}