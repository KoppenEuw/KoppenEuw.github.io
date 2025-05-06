# running
App to help intervall running

## Build Instructions

To build the project, follow these steps:

1. Ensure you have [Rust](https://www.rust-lang.org/) installed on your system. You can install it using [rustup](https://rustup.rs/).

2. Navigate to the project directory:
   ```bash
   cd iphone_counter_app
   ```

3. Build the project using Cargo:
   ```bash
   cargo build --release
   ```

4. The compiled binary will be located in the `target/release` directory.

## Running the Application

To run the application, follow these steps:

1. Build the project as described in the "Build Instructions" section.

2. Navigate to the `target/release` directory:
   ```bash
   cd iphone_counter_app/target/release
   ```

3. Start the server:
   ```bash
   ./iphone_counter_app
   ```

4. Open your browser and navigate to `http://127.0.0.1:3030/` to access the application.
