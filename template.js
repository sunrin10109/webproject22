module.exports = {
    HTML: function (list, button) {
        return `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JOURNAL</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="./css/journal.css">
    <base href="/" />
</head>

<body>
    <!-- header -->
    <header>
        <div class="container">
            <h1><button onclick="location.href='main.html'"><img src="./images/logo.png" alt="로고"></button></h1>
            <nav>
                <ul>
                    <li><button onclick="location.href='main.html'">MAIN</button></li>
                    <li><button onclick="location.href='journal.html'"><span>JOURNAL</span></button></li>
                    <li><button onclick="location.href='ware.html'">WARE</button></li>
                    <li><button onclick="location.href='mypage.html'">MYPAGE</button></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- main -->
    <section id="journal">
        <div class="container">
            <div class="left">
                <div class="title">
                    <h1>My Journal</h1>    
                </div>
                <div class="content">
                    <table border="1">
                        <tr>
                            <th>title</th>
                            <th>date</th>
                        </tr>
                        ${list}
                    </table>
                </div>
            </div>
            <div class="right">
                <div class="title">
                    <h1>Write</h1>
                </div>
                <div class="content">
                    ${button}
                </div>
            </div>
        </div>
    </section>
</body>

</html>
        `;
    }, list: function(files) {
        let list = '';
        for (i = 0; i < files.length; i++) {
            list = list + `
            <tr>
                <td><a href="/journal.html?id=${files[i].id}">${files[i].title}</a></td>
                <td>${files[i].adddate}</td>
            </tr>
            `;
        };
        return list;

    }, update: function(name, content) {
        return `
        <form action="/update_process" method="post">
        <p><input type="text" name="name" placeholder="" value="${name}"></p>
        <p><textarea name="content" placeholder="description">${content}</textarea></p>
        <p><button type="submit">send</button></p>
    </form>
    `;
    }
}