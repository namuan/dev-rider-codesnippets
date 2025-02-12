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
}