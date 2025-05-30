use tokio;
use warp::{http::Response, Filter};

#[tokio::main]
async fn main() {
    // Serve static files from the "docs" directory under both "/docs" and root paths
    let static_files_docs = warp::path("docs").and(warp::fs::dir("/home/koppen/git/running/docs"));
    let static_files_root = warp::fs::dir("/home/koppen/git/running/docs");

    // Serve the index.html file for the root path
    let index = warp::path::end().and(warp::fs::file("/home/koppen/git/running/index.html"));

    // Serve the manifest.json file from the root directory
    let manifest = warp::path("manifest.json").and(warp::fs::file("/home/koppen/git/running/manifest.json"));

    // Combine the routes
    let routes = index.or(static_files_docs).or(static_files_root).or(manifest);

    // Start the server
    warp::serve(routes)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
