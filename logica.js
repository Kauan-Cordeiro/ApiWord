function view() {
    let val1 = document.getElementById("cadastroForm");
    let val2 = document.getElementById("loginForm");
    let text1 = document.getElementById("log");
    let text2 = document.getElementById("cad");

    val1.style.display = "block";
    val2.style.display = "none";
    text2.style.display = "block";
    text1.style.display = "none";
}