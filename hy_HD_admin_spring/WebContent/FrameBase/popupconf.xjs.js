//XJS=popupconf.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        this.gfn_initForm = function(objForm, objConfig)
        {
        	objForm.config = objConfig;
        }

        this.gfn_showModal = function (sPopupId, arrArguments, sPopupUrl, popupCallback, obj, nPopupWidth, nPopupHeight, bShowFrameTitle, bShowFrameStatus, sAlignType)
        {
        	// 현재 구동되는 정보를 업데이트 한다.
        	var childFrame = new ChildFrame();
        	var parentFrame = obj.getOwnerFrame();

        	var sOpenAlignType = "center middle";

        	// TO-DO 팝업사이즈 미지정 시 디폴트 값 적용
        	if (this.gfn_isNull(nPopupWidth))
        	{
        		nPopupWidth = obj.confing.popupWidth;
        	}

        	if (this.gfn_isNull(nPopupHeight))
        	{
        		nPopupHeight = obj.confing.popupHeight;
        	}

        	var sShowStatus;
        	if (this.gfn_isNull(bShowFrameStatus) || bShowFrameStatus == false)
        	{
        		sShowStatus = false;
        	}
        	else if (bShowFrameStatus == true)
        	{
        		sShowStatus = true;
        	}

        	if (!this.gfn_isNull(sAlignType))
        	{
        		sOpenAlignType = sAlignType;
        	}

        	var nPopupLeft = "";
        	var nPopupTop = "";

        	// 팝업 포지션 값 위치 설정
        	nPopupLeft = 0;
        	nPopupTop = 0;

        	/* ===== Statusbar 옵션 추가 - Start ===== */
        	if (sShowStatus == true)
        	{
        		childFrame.init(sPopupId, nPopupLeft, nPopupTop, nexacro.toNumber(nPopupWidth) + 4, nexacro.toNumber(nPopupHeight) + 20 + 4 + 25, null, null, sPopupUrl);
        		childFrame.set_statusbarheight(25);
        		childFrame.set_showstatusbar(true);
        	}
        	else
        	{
        		childFrame.init(sPopupId, nPopupLeft, nPopupTop, nexacro.toNumber(nPopupWidth) + 4, nexacro.toNumber(nPopupHeight) + 20 + 4, null, null, sPopupUrl);
        	}

        	/* ===== Statusbar 옵션 추가 - End   ===== */
        	childFrame.set_openalign(sOpenAlignType);
        	// 색상정보 6자리 + 투명도 2자리
        	// childFrame.style.set_overlaycolor("#ffffff39");
        	//childFrame.set_overlaycolor("RGBA(30, 144, 255, 0.75)");
        	childFrame.set_autosize(false);
        	childFrame.set_dragmovetype("normal");

        	if (this.gfn_isNull(bShowFrameTitle) || bShowFrameTitle == true)
        	{
        		childFrame.set_showtitlebar(true);
        		childFrame.set_border("3 solid #351b6f");
        		childFrame.set_border("normal");
        	}else{
        		childFrame.set_showtitlebar(false);
        	}

        	// 동적으로 생성한 ChildFrame을 Modal Dialog로 보여줌.
        	childFrame.showModal(parentFrame, arrArguments, obj, popupCallback, true);

        	/*
        	if (!this.gfn_isNull(bShowFrameTitle) || bShowFrameTitle)
        	{
        		// childframe 에 연결 된 Form titletext 를 적용하지 않기 위해 추가
        		// Popupid 를 결합한 Title 지정
        		var sPopupTitle = "[" + sPopupId + "]" + " " + bShowFrameTitle;

        		childFrame.set_titletext(sPopupTitle);
        		childFrame.set_titlebarheight(28);
        	}
        	*/
        };


        this.gfn_isNull = function (Val)
        {
        	if (new String(Val).valueOf() == "undefined") return true;
        	if (Val == null) return true;
        	if (("x" + Val == "xNaN") && (new String(Val.length).valueOf() == "undefined")) return true;
        	if (Val.length == 0) return true;

        	return false;
        }

        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
