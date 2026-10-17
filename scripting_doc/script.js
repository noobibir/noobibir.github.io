function autoGenerateCodeStyle(div, code) {
    const keywords = [ "and", "end", "in", "repeat", "break", "false", "local", "return", "do", "for", "nil", "then", "else", "function", "not", "true", "elseif", "if", "or", "until", "while" ];;
    const libs = [ "world", "module_manager", "player", "client" ];
    const opers = [ "=", ">", "<", "+", "-", "*", "/", "(", ")", "{", "}", "[", "]", "%", "^", "#", "~" ];
    const bufBreak = [ ".", " ", "\t", ",", `"` ];

    var html = "";
    html += `<div class="code-left">`;
    for (var line of code.split("\n")) {
        html += `<div class="code-line">`

        var buff = "";
        var isString = false;
        for (var char of line) {
            var isOp = opers.includes(char);
            var isBreak = bufBreak.includes(char);
            if (isOp || isBreak) {
                if (buff != "") {
                    if (isString) {
                        html += `<code class="lt">${buff}</code>`;
                    }
                    else if (keywords.includes(buff)) {
                        html += `<code class="kw">${buff}</code>`;
                    }
                    else if (libs.includes(buff)) {
                        html += `<code class="lb">${buff}</code>`;
                    }
                    else if (char == "(") {
                        html += `<code class="fn">${buff}</code>`;
                    }
                    else {
                        html += `<code class="vr">${buff}</code>`
                    }
                    buff = "";
                }

                if (isBreak) {
                    if (char == `"`) {
                        html += `<code class="lt">${char}</code>`;
                        isString = !isString;
                    } else if (char == " ") {
                        html += `<code>&nbsp;</code>`;
                    }
                    else if (char == "\t") {
                        html += `<code>&ensp;</code>`;
                    }
                    else {
                        html += `<code>${char}</code>`;
                    }
                } else {
                    html += `<code class="op">${char}</code>`;
                }
            }
            else {
                buff += char;
            }
        }

        if (buff != "") {
            if (keywords.includes(buff)) {
                html += `<code class="kw">${buff}</code>`;
            }
            else if (libs.includes(buff)) {
                html += `<code class="lb">${buff}</code>`;
            }
            else if (char == "(") {
                html += `<code class="fn">${buff}</code>`;
            }
            else if (char == `"`) {
                html += `<code class="lt">${buff}</code>`;
            }
            else {
                html += `<code class="vr">${buff}</code>`
            }
            buff = "";
        }

        html += "</div>";
    }
    html += "</div>";
    html += 
    `<div class="code-right">
    <button class="button-copy" onclick='navigator.clipboard.writeText(\`${code}\`)'>copy</button>
    </div>`;
    div.innerHTML = html;
}

autoGenerateCodeStyle(document.getElementById("creating-a-script-example-1"), `local m = {}`);
autoGenerateCodeStyle(document.getElementById("creating-a-script-example-2"), `module_manager.register("script", m)`);
autoGenerateCodeStyle(document.getElementById("events-example-1"),
`local m = {
  on_enable = function ()
    client.print("bivir")
  end
}
module_manager.register("script", m)`);
autoGenerateCodeStyle(document.getElementById("events-example-2"),
`local m = {
  on_key = function (key, action)
    client.print("key: " + key + " action: " + action)
  end
}
module_manager.register("script", m)`);