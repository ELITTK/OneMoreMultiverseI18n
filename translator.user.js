// ==UserScript==
// @name         One More Multiverse
// @updateURL    https://github.com/ELITTK/OneMoreMultiverseI18n/raw/refs/heads/main/translator.user.js
// @downloadURL  https://github.com/ELITTK/OneMoreMultiverseI18n/raw/refs/heads/main/translator.user.js
// @namespace    https://github.com/ELITTK/OneMoreMultiverseI18n#
// @version      0.1
// @description  超简易汉化项目
// @author       ELITTK
// @match        *://www.playmultiverse.com/verses/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // 1. 汉化字典：在此处维护你的翻译对照表
    const i18n = {
        "Pan": "平移",
        "Select": "选择",
        "Assets": "素材",
        "Pixel-perfect": " 像素保真",
        "Grid-based": "基于网格",
        "Unconstrained": "不受限制",
        "Tiles": "地块",
        "Eyedropper": "吸管",
        "Asset Eraser": "素材橡皮擦",
        "Environment": "环境",
        "Character": "角色",
        "Wall": "墙壁",
        "Tiles": "地块",
        "Dynamic": "动态",
        "Pointer": "指针",
        "Ruler": "标尺",
        "Vanishing Ink": "消失墨水",
        "Snap to Grid": "吸附到网格",
        "Use Euclidean Grid Measurement": "使用欧几里得网格测量",
        "Clear All": "全部清除",
        "Grid": "网格",
        "Snap to Grid Movement": "吸附到网格移动",
        "Color": "颜色",
        "Thick Grid Marker": "粗网格标记",
        "Thickness": "厚度",
        "Size": "大小",
        "SM": "小",
        "MD": "中",
        "LG": "大",
        "Text Sticker": "文本贴纸",
        "Take Polaroid": "拍一张",
        "Draw": "绘制",
        "Thickness": "粗细",
        "Clear": "清除",
        "Erase": "橡皮擦",
        "Region": "区域",
        "View All Regions": "查看所有区域",
        "On by default": "默认开启",
        "Undo": "撤销",
        "Redo": "重做",
        "Open Dice Roller": "打开掷骰器",
        "Public Roll": "公骰",
        "Secret Roll": "私骰",
        "GM Roll": "GM 骰",
        "NPC Library": "NPC库",

        "Max": "最大值",
        "Min": "最小值",
        "Profile": "个人资料",
        "Log Out": "退出登录",
        "Save Changes": "保存更改",
        // 支持部分匹配或正则的思路可以在这里扩展
    };

    // 2. 核心翻译函数：处理单个文本节点
    function translateText(textNode) {
        const originalText = textNode.nodeValue.trim();

        // 如果文本为空或不在字典中，直接返回
        if (!originalText || !i18n[originalText]) return;

        // 执行替换
        textNode.nodeValue = textNode.nodeValue.replace(originalText, i18n[originalText]);
    }

    // 3. 遍历 DOM 树并翻译
    function traverseAndTranslate(node) {
        // 如果是文本节点，且父元素不是脚本或样式标签
        if (node.nodeType === Node.TEXT_NODE) {
            const parentTag = node.parentNode.tagName.toUpperCase();
            if (parentTag !== 'SCRIPT' && parentTag !== 'STYLE' && parentTag !== 'TEXTAREA') {
                translateText(node);
            }
        } else {
            // 递归遍历子节点
            node.childNodes.forEach(traverseAndTranslate);
        }
    }

    // 4. 初始化：初次加载时的全量翻译
    // 建议延迟一点执行，等待页面主要内容加载
    setTimeout(() => {
        traverseAndTranslate(document.body);
    }, 1000);

    // 5. 监听动态变化 (针对 React/Vue 等动态网页)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                traverseAndTranslate(node);
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();