#include "crow.h"
#include <nlohmann/json.hpp> // nlohmann/json
#include <vector>
#include "sudoku.h"

int main()
{

    crow::SimpleApp app;
    // Handle POST request with matrix input
    CROW_ROUTE(app, "/matrix")
        .methods(crow::HTTPMethod::POST)(
            [](const crow::request &req)
            {
                // Parse incoming JSON
                auto body = nlohmann::json::parse(req.body, nullptr, false);
                nlohmann::json response;

                if (body.is_discarded() || !body.contains("matrix"))
                {
                    response["status"] = "error";
                    response["message"] = "Invalid JSON format or missing 'matrix'";
                    return crow::response{400, response.dump()}; // Bad Request
                }

                // Extract the matrix
                auto matrix = body["matrix"];
                if (!matrix.is_array())
                {
                    response["status"] = "error";
                    response["message"] = "'matrix' should be a 2D array";
                    return crow::response{400, response.dump()};
                }

                // Do something with the matrix
                std::vector<std::vector<int>> board;
                for (const auto &row : matrix)
                {
                    std::vector<int> vec = row.get<std::vector<int>>();
                    board.push_back(vec);
                }

                if (solveSudoku(board))
                {
                    response["status"] = "success";
                    response["received_matrix"] = board;
                }
                else
                {
                    response["status"] = "success";
                    response["received_matrix"] = "No solution exists.";
                }

                return crow::response{response.dump()};
            });

    app.port(8080).multithreaded().run();
}
