window.onload = function () {
  var sources,
    taglist = [],
    onlist = [],
    reslist = [];
  var currentTime = new Date(); // 创建一个 Date 对象
  var currentHour = currentTime.getHours(); // 获取当前时间（小时）
  // 自动切换夜间模式，如果当前时间在晚上 23 点到早上 8 点之间，则进入夜间模式
  if (currentHour >= 22 || currentHour < 8) {
    // 更改页面的背景颜色为深色
    document.getElementById("darkcss").href = "/css/dark.css";
    document.getElementById("icon").src = "/svg/moon.svg";
  } else {
    document.getElementById("darkcss").href = "/css/daytime.css";
    document.getElementById("icon").src = "/svg/sun.svg";
  }
  document.getElementById("darkbtn").onclick = function () {
    //夜间模式按钮功能
    if (document.getElementById("darkbtn").className == "daytime") {
      document.getElementById("darkbtn").className = "dark";
      document.getElementById("darkcss").href = "/css/dark.css";
      document.getElementById("icon").src = "/svg/moon.svg";
    } else {
      document.getElementById("darkbtn").className = "daytime";
      document.getElementById("darkcss").href = "/css/daytime.css";
      document.getElementById("icon").src = "/svg/sun.svg";
    }
  };
  function randomSort(arr) {
    //创建随机函数
    for (let i = 0, l = arr.length; i < l; i++) {
      let rc = parseInt(Math.random() * l);
      // 让当前循环的数组元素和随机出来的数组元素交换位置
      const empty = arr[i];
      arr[i] = arr[rc];
      arr[rc] = empty;
    }
    return arr;
  }
  function unique(arr) {
    return Array.from(new Set(arr));
  } // 数组去重方法的定义
  function renderWebs(list) {
    //创建包含网站信息的列表
    for (l in list) {
      var a = document.createElement("a");
      a.id = "web";
      a.href = list[l].data.链接.value;
      a.target = "_blank";
      a.innerHTML = list[l].data.标题.value;
      a.title = list[l].data.简要.value;
      document.getElementById("webs-container").appendChild(a);
    }
  }
  fetch("https://sevenchan07.github.io/data.json") //从服务器上获取数据
    .then((response) => response.json())
    .then((data) => {
      sources = data.data.rows;

      renderWebs(randomSort(unique(sources)));
      sources.forEach((s) => {
        const tags = s.data.标签.value;
        const tagsSplit = tags.split(",");
        taglist = [...taglist, ...tagsSplit];
      });

      taglist = randomSort(unique(taglist));
      for (let i = 0; i < taglist.length; i++) {
        var button = document.createElement("button");
        button.id = "tag" + i;
        button.innerHTML = taglist[i];
        button.className = "tag off";
        document.getElementById("tags-container").appendChild(button);
        document.getElementById("tag" + i).onclick = function () {
          if (document.getElementById("tag" + i).className == "tag off") {
            document.getElementById("tag" + i).className = "tag on";
            onlist.push(document.getElementById("tag" + i).textContent);
          } else {
            document.getElementById("tag" + i).className = "tag off";
            onlist.splice(
              onlist.indexOf(document.getElementById("tag" + i).textContent),
              1
            );
          }
          reslist = [];
          sources.forEach((r) => {
            if (
              onlist.filter(function (val) {
                return r.data.标签.value.indexOf(val) > -1;
              }).length == onlist.length
            ) {
              reslist.push(r);
            }
          });
          document.getElementById("webs-container").innerHTML = "";
          if (reslist.length == 0) {
            document.getElementById("webs-container").innerHTML =
              "未找到符合条件的网页";
          }
          renderWebs(randomSort(unique(reslist)));
        };
      }
      document.getElementById("s-btn").onclick = function () {
        //定义搜索按钮功能
        var keyword = document.getElementById("s-in").value;
        keyword = keyword.toLowerCase();
        reslist = [];
        sources.forEach((s) => {
          //遍历资源搜索
          n = s.data.标题.value.toLowerCase();
          b = s.data.简要.value.toLowerCase();
          if (n.indexOf(keyword) !== -1 || b.indexOf(keyword) !== -1) {
            reslist.push(s);
          }
        });
        document.getElementById("webs-container").innerHTML = "";
        if (reslist.length == 0) {
          document.getElementById("webs-container").innerHTML =
            "未找到符合条件的网页";
        }
        renderWebs(randomSort(unique(reslist)));
      };
      document.getElementById("c-btn").onclick = function () {
        document.getElementById("s-in").value = "";
        document.getElementById("webs-container").innerHTML = "";
        renderWebs(randomSort(unique(sources)));
      };
      document.addEventListener("keydown", (event) => {
        //按下了回车键，执行搜索
        if (event.keyCode === 13) {
          document.getElementById("s-btn").click();
        }
      });
    });
};
