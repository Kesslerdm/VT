function pngFix(A){var G=navigator.appVersion.split("MSIE");var H=parseFloat(G[1]);if((H>=5.5)&&(H<7)&&(document.body.filters)){var E=$(A);if(E!=null){var K=E.src.toUpperCase();var J=K.indexOf("?");if(J==-1){J=K.length}if(K.substring(J-3,J)=="PNG"){var F=(E.id)?"id='"+E.id+"' ":"";var L=(E.className)?"class='"+E.className+"' ":"";var D=(E.title)?"title='"+E.title+"' ":"title='"+E.alt+"' ";var M=E.getAttribute("onmouseover");var C=E.getAttribute("onmouseout");var I="display:inline-block;"+E.style.cssText;if(E.align=="left"){I="float:left;"+I}if(E.align=="right"){I="float:right;"+I}if(E.parentElement.href){I="cursor:hand;"+I}var B="<span "+F+L+D+' onmouseover="'+M+'" ommouseout="'+C+'" style="width:'+E.width+"px; height:"+E.height+"px;"+I+";filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+E.src.substring(0,J)+"', sizingMethod='scale');\"></span>";E.outerHTML=B}}}};
