# Sudoku Solver

This is a simple sudoku solver that uses a backtracking algorithm to solve the puzzle. The solver is implemented in C++ and the server is implemented in C++ using the `pthread` library. And also used `crow` library for the server, `nlohmann/json` for `json` format response and request.The server is a simple REST API that takes a JSON object as input and returns a JSON object as output like express.js.

## Installation or setup(Only for linux)
[Crow library](#install-crow-library)<br>
[Nlohman/json library](#install-nlohmannjson-library)

### Install `crow` library

1. goto the [release section](https://github.com/CrowCpp/Crow/releases/tag/v1.2.0)
2. Download `Crow-1.2.0.zip` file and extract it.
 ```bash
   unzip Crow-1.2.0.zip
   cd crow-1.2.0
   ```
3. Copy the `include` folder to `/usr/local/include` directory and `lib` folder to `/usr/local/lib` directory.
4. Run the following command to copy the library.
 ```bash
   sudo cp -r include/* /usr/local/include
   sudo cp -r lib/* /usr/local/lib
   ```
5. Now you can include the library in your code using the following code `server.cpp`.
```cpp
#include "crow.h"

int main()
{
    crow::SimpleApp app; //define your crow application

    //define your endpoint at the root directory
    CROW_ROUTE(app, "/")([](){
        return "Hello world";
    });

    //set the port, set the app to run on multiple threads, and run the app
    app.port(18080).multithreaded().run();
}
```
6. Now you can compile the server using the following command.
```bash
g++ -o server server.cpp -lpthread
```
### Install `nlohmann/json` library
1. goto the [release section](https://github.com/nlohmann/json/releases)
2. Download `include.zip` file and extract it.
```bash
unzip include.zip
cd include/include
```
3. Copy the `nlohmann` folder to `/usr/local/include` directory.
```bash
sudo cp -r nlohmann /usr/local/include
```
4. Now you can include the library in your code using the following code `server.cpp`.
```cpp
#include "crow.h"
#include <nlohmann/json.hpp>  // nlohmann/json

int main()
{
    crow::SimpleApp app;

    // Handle GET request
    CROW_ROUTE(app, "/json")
    ([](){
        nlohmann::json response;
        response["status"] = "success";
        response["message"] = "Hello from C++ backend!";
        return crow::response{response.dump()};  // Send JSON response as string
    });

    // Handle POST request
    CROW_ROUTE(app, "/json") 
    .methods(crow::HTTPMethod::POST)([](const crow::request& req){
        // Parse incoming JSON
        auto body = nlohmann::json::parse(req.body, nullptr, false);
        nlohmann::json response;

        if (body.is_discarded()) {
            response["status"] = "error";
            response["message"] = "Invalid JSON format";
        } else {
            response["status"] = "success";
            response["received"] = body;  // Echo received JSON back
        }

        return crow::response{response.dump()};
    });

    app.port(8080).multithreaded().run();
}
```
5. Now you can compile the server using the following command.
```bash
g++ -o server server.cpp -lpthread
```

---
Note: If you are facing any issue while installing the library, you can refer to the official documentation of the library.
- [crow](https://crowcpp.org/master/getting_started/setup/linux/)
- [nlohmann/json](https://github.com/nlohmann/json?tab=readme-ov-file)