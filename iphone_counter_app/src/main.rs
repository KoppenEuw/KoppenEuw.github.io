use tokio;
use warp::Filter;

#[tokio::main]
async fn main() {
    ensure_static_dir();

    // Serve static files (HTML, CSS, JS)
    let static_files = warp::fs::dir("static");

    // Start the server
    warp::serve(static_files)
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
