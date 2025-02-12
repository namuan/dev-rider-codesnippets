package dev.deskriders.devrider.citi;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

class Solution {
    private static final int[] dx = {-1, 1, 0, 0};
    private static final int[] dy = {0, 0, -1, 1};

    public int solution(String S, String[] grid) {
        if (S.isEmpty()) return 0;
        int N = grid.length;

        // State: x, y, collected string, moves
        Queue<State> queue = new LinkedList<>();
        // visited[x][y][collected string length]
        Set<String> visited = new HashSet<>();

        // Find starting positions
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (grid[i].charAt(j) != '.') {
                    State initial = new State(i, j, "", 0);
                    queue.offer(initial);
                    visited.add(getVisitedKey(initial));
                }
            }
        }

        while (!queue.isEmpty()) {
            State current = queue.poll();
            char currentChar = grid[current.x].charAt(current.y);

            // Try to append current character
            if (canAppendChar(S, current.collected, currentChar)) {
                String newCollected = current.collected + currentChar;
                if (newCollected.equals(S)) {
                    return current.moves;
                }

                State newState = new State(current.x, current.y, newCollected, current.moves);
                String newKey = getVisitedKey(newState);
                if (!visited.contains(newKey)) {
                    queue.offer(newState);
                    visited.add(newKey);
                }
            }

            // Try moving in all four directions
            for (int dir = 0; dir < 4; dir++) {
                int newX = current.x + dx[dir];
                int newY = current.y + dy[dir];

                if (isValid(newX, newY, N)) {
                    State newState = new State(newX, newY, current.collected, current.moves + 1);
                    String newKey = getVisitedKey(newState);
                    if (!visited.contains(newKey)) {
                        queue.offer(newState);
                        visited.add(newKey);
                    }
                }
            }
        }

        return -1;
    }

    private boolean canAppendChar(String target, String current, char c) {
        if (current.length() >= target.length()) return false;
        return target.charAt(current.length()) == c;
    }

    private String getVisitedKey(State state) {
        return state.x + "," + state.y + "," + state.collected;
    }

    private boolean isValid(int x, int y, int N) {
        return x >= 0 && x < N && y >= 0 && y < N;
    }

    private static class State {
        int x, y;
        String collected;
        int moves;

        State(int x, int y, String collected, int moves) {
            this.x = x;
            this.y = y;
            this.collected = collected;
            this.moves = moves;
        }
    }
}