var URL_POST_COMMENT="/ajax/postComment";var URL_DELETE_COMMENT="/ajax/deleteComment";var URL_FLAG_COMMENT="/ajax/flagComment";function reloadCaptcha(B,A){if(A==null){$("captchatext").clear();postComment(B,"none","none")}else{if(A>0){$("captchatext").clear();sendInvite(A)}else{$("emailshare_captchatext").clear();$("overlayLoadingTextSnd").style.display="none";$("overlayLoadingCaptcha").style.display="block";sendShare()}}if(jQuery("#saveCommentForm_button").length){jQuery("#saveCommentForm_button").removeClass("disabled")}}function switchCaptcha(C,A){var B="";if(A<0){B="emailshare_"}if($(B+"captcha_type").getAttribute("value")=="image"){$(B+"captcha_type").setAttribute("value","audio")}else{if($(B+"captcha_type").getAttribute("value")=="audio"){$(B+"captcha_type").setAttribute("value","image")}else{return }}alert(B);reloadCaptcha(C,A)}function postComment(D,C,F,A,E){pageTracker._trackPageview("/pageTracker/ajax/comment/postComment");clearFeedback();var B=$(D);if(jQuery("#saveCommentForm_button").length&&jQuery("#saveCommentForm_button").hasClass("disabled")){return }else{if(jQuery("#saveCommentForm_button").length){jQuery("#saveCommentForm_button").addClass("disabled")}}if(B.subject!=null&&B.subject.value==""){displayFeedback("2"+GT.gettext("Please enter your subject"));if(jQuery("#saveCommentForm_button").length){jQuery("#saveCommentForm_button").removeClass("disabled")}hidePleaseWait();return }if(B.comment_content.value==""){displayFeedback("3"+GT.gettext("Please enter your message"));if(jQuery("#saveCommentForm_button").length){jQuery("#saveCommentForm_button").removeClass("disabled")}hidePleaseWait();return }path=URL_POST_COMMENT;if(A=="false"){path=URL_POST_COMMENT+"/false/"+E}new Ajax.Request(path,{method:"post",parameters:$(D).serialize(),onSuccess:function(H){var G=H.responseText;postCommentComplete(G,D,C,F)},onFailure:function(){displayFeedback("1Error contacting the server");$(D).enable();hidePleaseWait()}});$(D).disable()}function postCommentComplete(C,B,A,D){parseResponse(C);$(B).enable();switch(responseArray.code){case"0":pageTracker._trackPageview("/pageTracker/ajax/comment/postComplete");responseArray.json.error=GT.gettext("Comment successfully posted");displayFeedback(responseArray.code+responseArray.json.error);if(A=="append"||A=="prepend"){displayComment(responseArray.html,A,D)}else{if(A=="redirect"){window.location=responseArray.json.url}}resetCommentForm(B);document.saveCommentForm.comment_content.disabled="disabled";if(typeof document.saveCommentForm.Post!="undefined"){document.saveCommentForm.Post.disabled="disabled";$("recaptcha").style.display="none"}$(B).reset();break;case"1":$("recaptcha").style.display="block";break;case"2":$("captcha_type").setAttribute("value","audio");$("captcha_id").setAttribute("value",responseArray.json.session_id);$("captcha_audio").innerHTML=getAudioEmbedString(responseArray.json.url);$("comment_captcha").style.display="block";$("image_captcha").style.display="none";$("audio_captcha").style.display="block";break;case"3":$(B).reset();document.saveCommentForm.comment_content.disabled="disabled";if(document.saveCommentForm.Post){document.saveCommentForm.Post.disabled="disabled"}$("recaptcha").style.display="none";default:displayFeedback(responseArray.code+responseArray.json.error);resetCommentForm(B);break}hidePleaseWait();resetResponse()}function getAudioEmbedString(A){return'<object classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="application/x-oleobject" height="40" width="170"><param name="autoplay" value="true"><param name="src" value="'+A+'"><param name="autoStart" value="1"><embed height="40" autostart="true" bgcolor="white" src="'+A+'" type="application/x-mplayer2"/></object>'}function resetCommentForm(A){$("captcha_id").setAttribute("value","");$("captcha_type").setAttribute("value","");$("captcha_image").setAttribute("src","");$("comment_captcha").style.display="none";$("image_captcha").style.display="none";$("audio_captcha").style.display="none"}function displayComment(A,B,C){if(B=="prepend"){newHtml=A+$(C).innerHTML}else{newHtml=$(C).innerHTML+A}$(C).innerHTML=newHtml}function deleteComment(C,A,B){var D=GT.gettext("Are you sure to delete this Comment/Post?");if(!confirm(D)){return }new Ajax.Request(URL_DELETE_COMMENT+"/"+C+"/"+B,{method:"post",onSuccess:function(F){var E=F.responseText;deleteCommentComplete(E,A)},onFailure:function(){displayFeedback("1Error contacting the server")}})}function deleteCommentComplete(B,A){parseResponse(B);if(typeof responseArray.json.url!="undefined"){window.location=responseArray.json.url}else{if(responseArray.code=="0"){if(jQuery){jQuery("#"+A).fadeOut(300,function(){jQuery(this).remove()})}else{$(A).remove()}displayFeedback("0"+GT.gettext("Comment has been deleted"))}else{displayFeedback(responseArray.code+responseArray.json.error)}}resetResponse()}function flagComment(A){new Ajax.Request(URL_FLAG_COMMENT+"/"+A,{method:"post",onSuccess:function(C){var B=C.responseText;flagCommentComplete(B)},onFailure:function(){displayFeedback("1Error contacting the server")}})}function flagCommentComplete(A){parseResponse(A);if(typeof responseArray.json.url!="undefined"){window.location=responseArray.json.url}else{if(responseArray.code=="0"){displayFeedback(responseArray.code+GT.gettext("Comment flagged as inappropriate"))}else{displayFeedback(responseArray.code+responseArray.json.error)}}resetResponse()}function showCommentContent(B,A,C){if($(B).innerHTML=="show"){$(B).innerHTML="hide";$(A).show();$(C).show()}else{$(B).innerHTML="show";$(A).hide();$(C).hide()}}function showUserCommentForm(A){var C={broadcast:false,title:null};jQuery.extend(C,A);var B=jQuery("#comment_form_container");jQuery("#comment_form_subject").show();B.find("#to_fans").attr("disabled",(C.broadcast)?false:"disabled");if(C.title){B.find(".title").html(C.title)}if(C.id){B.find("#comment_form_id").val(C.id)}jQuery("#comment_content").attr("disabled",false);jQuery("#comment_form button").attr("disabled",false);jQuery.blockUI({message:jQuery("#comment_form_container"),css:{border:"none",width:"500px",top:"20%",cursor:"auto"}});jQuery("#comment_content").focus()}function hideUserCommentForm(){jQuery.unblockUI();if(Recaptcha){Recaptcha.destroy()}jQuery("#comment_form .error_message").html("");jQuery("#to_fans").attr("disabled","disabled");jQuery("#comment_content").attr("disabled",true);jQuery("#comment_form button").attr("disabled",true);document.getElementById("comment_form").reset()}function postUserComment(B,A){clearFeedback();jQuery("#"+B+"_form .error_message").html("");if(jQuery("#"+B+"_content").val()==""){jQuery("#"+B+"_form .error_message").html(GT.gettext("Please enter your message"));jQuery("#"+B+"_content").focus();return }jQuery.post(URL_POST_COMMENT,jQuery("#"+B+"_form").serialize(),function(D){parseResponse(D);switch(responseArray.code){case"0":if(jQuery("#to_fans").length){var C=!jQuery("#to_fans").attr("disabled")}else{var C=false}if(A){jQuery("#"+B+"_content").attr("disabled",false).attr("value","");jQuery("#"+B+"_form button").attr("disabled",false);jQuery("#message_content_container .messages").append(responseArray.html).children(":first").hide().animate({opacity:"show",height:"show"});jQuery("#message_content_container .messages:last").find(".message .type").remove().end().find(".message .comment_control").remove().end().find(".messages .message").css("padding-bottom","10px").end().find(".message .comment_content p").css("margin","0px");jQuery("#recaptcha_message_div").html("")}else{hideUserCommentForm()}if(C){displayFeedback("0"+GT.gettext("Message is successfully submitted and will be broadcasted soon"))}else{displayFeedback("0"+GT.gettext("Message successfully posted"))}break;case"1":showRecaptcha(B);if(jQuery("#saveCommentForm_button").length){jQuery("#saveCommentForm_button").removeClass("disabled")}jQuery("#"+B+"_content").attr("disabled",false);jQuery("#"+B+"_form button").attr("disabled",false);break;default:hideUserCommentForm();displayFeedback(responseArray.code+responseArray.json.error)}});jQuery("#"+B+"_content").attr("disabled",true);jQuery("#"+B+"_form button").attr("disabled",true)}function showRecaptcha(A){Recaptcha.create(Recaptcha_Public_Key,"recaptcha_"+A+"_div",{theme:"red",callback:Recaptcha.focus_response_field})};
