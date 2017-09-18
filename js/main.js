function loadScript(url) {
    var xhr, self = this;
    xhr = new XMLHttpRequest;
    xhr.open("GET", chrome.extension.getURL(url), true);
    xhr.onreadystatechange = function(data) {
        4 === xhr.readyState && 200 === xhr.status && eval.call(self, xhr.responseText)
    };
    xhr.send(null)
}
function sendMsg(msg, callback) {
    chrome.runtime.sendMessage(msg,function(data) {
        callback(data)
    })
}
console.log(123);

chrome.runtime.onMessage.addListener(function(data, t, r) {
    for(var k in data){
        var dom = $(k);
        var words = data[k];

        var i = 0;
        while(true){

            if(Object.prototype.toString.call(words[i])=='[object Array]'){
                //如果替换的字符串是正则表达式
                for(var j=0;j<dom.length;j++){
                    dom[j].innerHTML = dom[j].innerHTML.replace(words[i][0],words[i][1]);
                }
                
            }else{
                //如果替换的字符串是固定值
                if(i>=dom.length||i>=words.length){
                    break;
                }
                dom[i].innerHTML = words[i];
            }
            
            i++;
        }
    }
});