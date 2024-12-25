// ==UserScript==
// @name         展开和获取下载链接
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  在指定页面插入按钮以展开所有“全文链接”元素和获取所有文献PDF文件的下载链接生成txt文件，并手动翻页
// @author       GitHub Copilot
// @match        https://pm.yuntsg.com/searchList.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建并插入“展开”按钮
    var expandButton = document.createElement('button');
    expandButton.innerHTML = '展开';
    expandButton.style.position = 'fixed';
    expandButton.style.top = '10px';
    expandButton.style.right = '10px';
    document.body.appendChild(expandButton);

    expandButton.addEventListener('click', function() {
        var fullTextLinks = document.querySelectorAll('li[i18n="list_qwlj"]');
        if (fullTextLinks.length > 0) {
            fullTextLinks.forEach(function(link) {
                link.click();
            });
        } else {
            alert('未找到“全文链接”元素');
        }
    });

    // 创建并插入“获取下载链接”按钮
    var downloadButton = document.createElement('button');
    downloadButton.innerHTML = '获取下载链接';
    downloadButton.style.position = 'fixed';
    downloadButton.style.top = '50px';
    downloadButton.style.right = '10px';
    document.body.appendChild(downloadButton);

    downloadButton.addEventListener('click', function() {
        var links = document.querySelectorAll('a.qwlja');
        var downloadLinks = [];
        links.forEach(function(link) {
            var href = link.href;
            if (href.startsWith('http://www.shmirror.com/attach/')) {
                downloadLinks.push(href);
            }
        });

        if (downloadLinks.length > 0) {
            var blob = new Blob([downloadLinks.join('\n')], { type: 'text/plain' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'download_links.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('未找到符合条件的下载链接');
        }
    });

    // 创建并插入“下一页”按钮
    var nextPageButton = document.createElement('button');
    nextPageButton.innerHTML = '下一页';
    nextPageButton.style.position = 'fixed';
    nextPageButton.style.top = '90px';
    nextPageButton.style.right = '10px';
    document.body.appendChild(nextPageButton);

    nextPageButton.addEventListener('click', function() {
        var nextPage = document.querySelector('li[title="下一页"]');
        if (nextPage) {
            nextPage.click();
            setTimeout(function() {
                expandButton.click(); // 等待页面加载完成后自动展开
            }, 2000);
        } else {
            alert('已到达最后一页');
        }
    });
})();
