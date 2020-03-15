console.log("项目成功");

define(["jquery", "jquery-cookie"], function($) {
    // 下载顶部导航数据
    function navDownload() {
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function(result) {
                var navArr = result;
                navArr.push({ title: "大宗采购" }, { title: "服务" })
                navArr.unshift({ title: "首页" })
                for (var i = 0; i < navArr.length; i++) {
                    var node = $(` <li class="header-nav-list-item"><a href="">${navArr[i].title}</a></li>`)
                    node.appendTo(".header-nav .header-nav-list")
                        // var navlistArr = JSON.parse(navArr[i].child)
                    var node1 = $(`<ul class="header-nav-downlist-ul" style="display:${i==1 ? "block":"none"}"></ul>`)
                    node1.appendTo(".header-nav-downlist .downlist-container")
                    if (navArr[i].child) {
                        var navlistArr = navArr[i].child
                        for (var j = 0; j < 6; j++) {
                            $(`<li>
                                <a href=""><img src="${navlistArr[j].img}" alt=""></a>
                                <h4>${navlistArr[j].desig}</h4>
                                <p>${navlistArr[j].itro}</p>
                                <span>${navlistArr[j].price}</span>
                            </li>`)
                                .appendTo(node1)
                        }
                    }
                }
            },
            error: function(msg) {
                console.log(msg);
            }
        })
    }
    // 下载左侧商品列表数据
    function bannerList() {
        $.ajax({
            type: "get",
            url: "../data/banner.json",
            success: function(result) {
                var bannerArr = result;
                for (var i = 0; i < bannerArr.length; i++) {
                    var node = $(`<li class="banner-container-list-ul-item"><a href=""></a>${bannerArr[i].title}<span>&gt;</span></a></li>`);
                    node.appendTo(".banner-container .banner-container-list .banner-container-list-ul")
                }
            },
            error: function(msg) {
                console.log(msg);

            }
        })
    }



    // 给顶部导航添加移入移出事件
    function navTab() {
        $(".header-nav .header-nav-list").on("mouseenter", ".header-nav-list-item", function() {
            // $(this).addClass("header-nav-list-active")
            $(this).find("a").css({ color: "red", })
            $(this).css({ background: "#ffffff" })
            var index = $(this).index();
            // alert(index)
            $(".header-nav-downlist").css({ display: "block" })
            $(".header-nav-downlist .downlist-container").find(".header-nav-downlist-ul").eq(index).css("display", "block").siblings(".header-nav-downlist-ul ").css("display", "none")
        })
        $(".header-nav .header-nav-list").on("mouseleave", ".header-nav-list-item", function() {
            // $(this).removeClass("header-nav-list-active")
            $(this).find("a").css({ color: "#767676" })
            $(this).css({ background: "#f4f4f4" })

        })
        $(".header-nav-downlist").mouseleave(function() {
            $(".header-nav-downlist").css({ display: "none" })
        })
    }

    // 给搜索添加点击
    function searchHover() {
        $(".header-nav-searchicon").mouseenter(function() {
            $(".header-nav-searchicon").addClass("header-nav-seachicon-hover")
        })
        $(".header-nav-searchicon").mouseleave(function() {
            $(".header-nav-searchicon").removeClass("header-nav-seachicon-hover")
        })
    }

    function searchClick() {
        $(".header-nav .header-nav-searchicon img").click(function(click) {
            preDef(click)
                // $(".header-nav-search").addClass("header-nav-search-active")
            $(".header-nav-search").css({ display: "block" })
            $(".header-nav-list").css({ display: "none" })
            $(".header-nav-searchicon").css({ display: "none" })

        })
    }
    // 关闭搜索框
    function searchClose() {
        $(".header-nav-search .header-nav-search-close a").click(function(click) {
                preDef(click);
                $(".header-nav-search").css({ display: "none" })
                $(".header-nav-list").css({ display: "block" })
                $(".header-nav-searchicon").css({ display: "block" })
            })
            // $(document).click(function() {
            //     if ($(".header-nav-search").css.display == "block") {
            //         $(".header-nav-search").css({ display: "none" })
            //         $(".header-nav-list").css({ display: "block" })
            //         $(".header-nav-searchicon").css({ display: "block" })
            //     }

        // })

    }





    // 阻止默认新行为
    function preDef(ev) {
        if (ev.preventDefault) {
            ev.preventDefault();
        } else {
            window.event.returnValue = false;
        }
    }
    return {
        navDownload: navDownload,
        navTab: navTab,
        searchClick: searchClick,
        searchHover: searchHover,
        searchClose: searchClose,
        bannerList: bannerList,
    }
})