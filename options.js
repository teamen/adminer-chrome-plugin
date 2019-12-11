
var onSubtractButtonClickFn = function () {
    this.parentNode.parentNode.remove();
};
function appendSettingItem(server, alias) {
    var node = document.querySelector('.setting-block__item--clone').cloneNode(true)
    node.classList = 'setting-block__item';
    node.getElementsByClassName('js-btn-subtract')[0].addEventListener('click',  onSubtractButtonClickFn);
    typeof(server) !== 'undefined' && (node.getElementsByClassName('server-input')[0].value=server.trim());
    typeof(alias) !== 'undefined' && (node.getElementsByClassName('alias-input')[0].value=alias.trim());

    document.querySelector('.item-wrapper').appendChild(node);
}

document.querySelector('.js-btn-add-setting-item').addEventListener('click', function () {
   appendSettingItem();
});

document.querySelector('.js-btn-subtract').addEventListener('click', onSubtractButtonClickFn)

chrome.storage.local.get('map', function (result) {
    map = result.map || {}
    // restore
    Object.keys(map).forEach(function (server) {
        const alias = map[server]
        appendSettingItem(server, alias);
    });

    appendSettingItem();
});

document.querySelector('.js-btn-save-settings').addEventListener('click', function () {
    var serverList = document.querySelectorAll('input[name="server[]"');
    var aliasList = document.querySelectorAll('input[name="alias[]"');
    var map = {}
    // the last one is clone node
    var server;
    var alias;
    for (var i = 0; i < serverList.length - 1; i++) {
         server = serverList[i].value.trim();
         alias = aliasList[i].value.trim();
        if (server.length > 0) {
            alias = alias || server;
            map[server] = alias;
        }
    }
    chrome.storage.local.set({map: map}, function () {
        window.alert('已保存设置！');
    });
});