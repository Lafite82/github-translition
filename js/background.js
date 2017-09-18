function get(url, callback) {
    var xhr = new XMLHttpRequest;
    xhr.responseType = "blob",
    xhr.addEventListener("load",function() {
        var reader = new FileReader();
            reader.readAsText(xhr.response); 
            reader.onloadend = function() {
                var base64data = reader.result;
                callback(base64data);
            }       
    }),
    xhr.open("GET", url, true),
    xhr.send()
}

function request(url, callback) {
    var xhr = new XMLHttpRequest;
    xhr.addEventListener("load",function() {
        callback(xhr.responseText)
    }),
    xhr.open("GET", url, true),
    xhr.send()
}

chrome.runtime.onMessage.addListener(function(e, t, r) {
    
})
// chrome.runtime.setUninstallURL(uninstallUrl);
chrome.browserAction.onClicked.addListener(function(tab){
    
    console.log(tab);
    var url = tab.url;
    var json = null;
    var dom = null;
    if(url.indexOf("github.com")>0){
        //加载公共字典
        get("../json/common.json",function(data){
            data = JSON.parse(data);
            sendMsg(tab.id,data);
        })

        get("../json/profile.json",function(data){
            data = JSON.parse(data);
            sendMsg(tab.id,data);
        })

        if(url.indexOf("tab=repositories")>0||url.indexOf("tab=stars")>0||url.indexOf("tab=followers")>0||url.indexOf("tab=following")>0){
            get("../json/profile.json",function(data){
                data = JSON.parse(data);
                sendMsg(tab.id,data);
            })
        }

        //进入个人设置页面
        if(url.indexOf("/settings")>0){
            get("../json/setting-sider.json",function(data){
                data = JSON.parse(data);
                sendMsg(tab.id,data);
            })

            if(url.indexOf("/settings/profile")>0){
                get("../json/setting-profile.json",function(data){
                    data = JSON.parse(data);
                    sendMsg(tab.id,data);
                })
            }

            if(url.indexOf("/settings/admin")>0){
                get("../json/setting-admin.json",function(data){
                    data = JSON.parse(data);
                    sendMsg(tab.id,data);
                })
            }
        }

    }


    
})

function sendMsg(tabId,data){
    chrome.tabs.sendMessage(tabId,data);
}