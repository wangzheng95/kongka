console.log("项目成功");

define(["jquery", "jquery-cookie"], function($) {
    function navDownload() {
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function(result) {
                var navArr = result;
                navArr.push({ title: "大宗采购" }, { title: "服务" })
                    // navArr.unshift({ title: "首页" })
                for (var i = 0; i < navArr.length; i++) {
                    var node = $(` <li><a href="">${navArr[i].title}</a></li>`)
                    node.appendTo(".header-nav .header-nav-list")

                    var navlistArr = navArr[i].child
                        // var navlistArr = JSON.parse(navArr[i].child)
                    var node1 = $(`<ul class="header-nav-downlist-ul"></ul>`)
                    node1.appendTo(".header-nav-downlist")
                    for (var j = 0; j < navlistArr.length; j++) {
                        var node2 = $(`<li>
                            <a href=""><img src="${navlistArr[j].img}" alt=""></a>
                            <h4>${navlistArr[j].desig}</h4>
                            <p>${navlistArr[j].itro}</p>
                            <span>${navlistArr[j].price}</span>
                        </li>`)
                        node2.appendTo(".header-nav-downlist  .header-nav-downlist-ul")
                    }
                }

            },
            error: function(msg) {
                console.log(msg);

            }
        })
    }

    return {
        navDownload: navDownload
    }
})