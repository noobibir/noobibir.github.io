function isDec(x) {
    for (var char of x) {
        if (char != "0" && char != "1" && char != "2" && char != "3" && char != "4" && char != "5" && char != "6"
            && char != "7" && char != "8" && char != "9"
        ) {
            return false
        }
    }
    return true;
}

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
                    else if (isDec(buff)) {
                        if (char == ".") {
                            html += `<code class="lt">${buff}.</code>`;
                            buff = "";
                            continue;
                        } else {
                            html += `<code class="lt">${buff}</code>`;
                        }
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
            else if (isDec(buff)) {
                html += `<code class="lt">${buff}</code>`;
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
autoGenerateCodeStyle(document.getElementById("player-example-1"),
`spaceHeld = false
sneakHeld = false
local simpleFly = {
  on_key = function (key, action)
    if key == 44 then
      client.print(action)
      spaceHeld = action == 1
    end
    if key == 225 then
      sneakHeld = action == 1
    end
  end,
  on_tick = function ()
    x, _, z = player.get_motion()
    verticalMotion = 0

    if spaceHeld then
      verticalMotion = 0.5
    end
    if sneakHeld then
      verticalMotion = -0.5
    end

    player.set_motion(x, verticalMotion, z)
  end
}
module_manager.register("simpleFly", simpleFly)`);
autoGenerateCodeStyle(document.getElementById("world-example-1"),
`local m = {
  on_enable = function ()
    world.set_timer(3)
  end,
  on_disable = function ()
    world.set_timer(1)
  end
}

module_manager.register("timer3", m)`);
autoGenerateCodeStyle(document.getElementById("rendering-example-1"),
`local m = {
  on_render = function ()
    local font = rendering.get_font("productSansMedium")
    rendering.text(font, "bivir", 10, 10, 0.5, 0xFFFFFFFF)
  end
}
module_manager.register("bivirText", m)`);