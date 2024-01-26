
// May not use this, I like doing CLI-first and then dynamically throwing away the console for UI mode
//#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


fn main() {
    let html_content = include_str!("www/index.html");
    web_view::builder()
        .title("My Project")
        .content(web_view::Content::Html(html_content))
        .size(320, 480)
        .resizable(true)
        .debug(true)
        .user_data(())
        //.invoke_handler(|_webview, _arg| Ok(()))
        .invoke_handler(invoke_handler)
        .run()
        .unwrap();
}

fn invoke_handler<T>(webview: &mut web_view::WebView<T>, arg: &str) -> Result<(), web_view::Error> {
  println!("invoke_handler run, arg: {:?}", arg);

  Ok(())
}
