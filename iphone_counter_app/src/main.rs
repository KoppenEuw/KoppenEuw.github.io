use tokio;
use warp::{http::Response, Filter};

#[tokio::main]
async fn main() {
    // Serve static files from the "docs" directory
    let static_files = warp::fs::dir("docs");

    // Serve the index.html file for the root path
    let index = warp::path::end().and(warp::fs::file("../index.html"));

    // Serve the manifest.json file from the root directory
    let manifest = warp::path("manifest.json").and(warp::fs::file("../manifest.json"));

    // Combine the routes
    let routes = index.or(static_files).or(manifest);

    // Start the server
    warp::serve(routes)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
