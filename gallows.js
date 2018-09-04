var password = "Bez pracy nie ma kołaczy";
password = password.toUpperCase();
var new_password = "";
var passwordLength = password.length;
var misses = 0;
var yes = new Audio("music/yes.wav");
var no = new Audio("music/no.wav");
var letters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ź", "Ż"];

for (var i = 0; i < passwordLength; i++) {
    if (password.charAt(i) == " ") new_password += " ";
    else new_password += "-";
}

function wtritePassword() {
    document.getElementById("board").innerHTML = new_password;
}
window.onload = start;

function start() {
    var div_content = "";
    for (var i = 0; i <= 34; i++) {
        var element = "lit" + i;
        div_content += '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>';
        if ((i + 1) % 7 == 0) div_content += '<div style="clear:both;"></div>';
    }
    document.getElementById("alphabet").innerHTML = div_content;
    wtritePassword();
}

String.prototype.setSign = function (position, sign) {
    if (position > this.length - 1) {
        return this.toString();
    } else {
        return this.substr(0, position) + sign + this.substr(position + 1);
    }
}

function check(nr) {
    var hit = false;
    for (i = 0; i < passwordLength; i++) {
        if (password.charAt(i) == letters[nr]) {
            new_password = new_password.setSign(i, letters[nr]);
            hit = true;
        }
    }
    if (hit == true) {
        yes.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00CC00";
        document.getElementById(element).style.border = "3px solid #00CC00";
        document.getElementById(element).style.cursor = "default";
        wtritePassword();
    } else {
        no.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");

        misses++;
        document.getElementById("gallows").innerHTML = '<img src="img/s' + misses + '.jpg" alt="">';
    }

    //wygrana 
    if (password == new_password) {
        document.getElementById("alphabet").innerHTML = "Tak jest! Podano prawidłowe hasło: " + password + '<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }

    //przegrana 
    if (misses >= 9) {
        document.getElementById("alphabet").innerHTML = "Przegrana! Prawidłowe hasło: " + password + '<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }
}