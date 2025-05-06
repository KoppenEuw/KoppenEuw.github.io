use tokio;
use warp::{http::Response, Filter};

#[tokio::main]
async fn main() {
    ensure_static_dir();

    // Serve static files from the "docs" directory
    let static_files = warp::fs::dir("docs");

    // Serve the index.html file for the root path
    let index = warp::path::end().map(|| {
        let index_path = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("../index.html");
        let index_content = std::fs::read_to_string(index_path).expect("Failed to read index.html");
        Response::builder()
            .header("content-type", "text/html")
            .body(index_content)
    });

    // Combine the routes
    let routes = index.or(static_files);

    // Start the server
    warp::serve(routes)
        .run(([127, 0, 0, 1], 3030))
        .await;
}

// Ensure the static directory exists
fn ensure_static_dir() {
    let static_dir = std::path::Path::new("static");
    if !static_dir.exists() {
        std::fs::create_dir(static_dir).expect("Failed to create static directory");
    }
}
