#include <iostream>
#include <vector>

using namespace std;

bool isValid(vector<vector<int>> &board, int row, int col, int num)
{
    for (int i = 0; i < 9; i++)
    {
        if (board[i][col] == num)
            return false; // Check column
        if (board[row][i] == num)
            return false; // Check row
        // Check 3x3 box
        if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == num)
            return false;
    }
    return true;
}

bool solveSudoku(vector<vector<int>> &board)
{
    for (int i = 0; i < board.size(); i++)
    {
        for (int j = 0; j < board[0].size(); j++)
        {
            if (board[i][j] == 0)
            { // 0 indicates an empty cell
                for (int num = 1; num <= 9; num++)
                { // Try numbers 1 to 9
                    if (isValid(board, i, j, num))
                    {
                        board[i][j] = num;      // Place the number
                        if (solveSudoku(board)) // Recursively try to solve
                            return true;
                        else
                            board[i][j] = 0; // Reset if it didn't work
                    }
                }
                return false; // Trigger backtracking
            }
        }
    }
    return true; // Solved
}