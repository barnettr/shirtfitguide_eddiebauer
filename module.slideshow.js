(function (jQuery, idx) {
    /* slideshow by Keith Childers */
    /* updated 5/9/2011 - jmcmurdo */
    /* modified 7/5/2011 - Rick Young to support AJAX slide content */
    /* modified 04/10/2012 - Rob Barnett loading slides with AJAX - paging through image Array for categories	*/
    /* modified 04/11/2012 - jmcmurdo to remove <strong> tags from x of n slides */
    jQuery.fn.slideshow = function (interval, xrun, idx) {

        function getUrlVars() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }

        var params = {};
        var params_rel = jQuery(this).attr('rel');
        if (params_rel) {
            params = eval('(' + params_rel + ')');
        };
        /*  FIT TOOL MEN'S & WOMENS'S JEANS  */
        var $womensDetailFitGuide = jQuery(this).parent();
        var $mensDetailFitGuide = jQuery(this).parent();
        var $isGuideTrue = false;
        switch (true) {
            case ($womensDetailFitGuide):
                var $wrapperContainerZero = $womensDetailFitGuide.children("#straightShapeWrapper");
                var $wrapperContainerOne = $womensDetailFitGuide.children("#slightlyCurveyWrapper");
                var $wrapperContainerTwo = $womensDetailFitGuide.children("#curveyWrapper");
                var $slideContainer0 = this.children("div.straightShapeWrapper");
                var $slideContainer1 = this.children("div.slightlyCurveyWrapper");
                var $slideContainer2 = this.children("div.curveyWrapper");
                var $isSlide0 = this.children("div.straightShapeWrapper").children("div.carousel");
                var $isSlide1 = this.children("div.slightlyCurveyWrapper").children("div.carousel");
                var $isSlide2 = this.children("div.curveyWrapper").children("div.carousel");
                $isGuideTrue = true;
                break;
            case ($mensDetailFitGuide):
                var $wrapperContainerZero = $mensDetailFitGuide.children("#looseFitWrapper");
                var $wrapperContainerOne = $mensDetailFitGuide.children("#relaxedFitWrapper");
                var $wrapperContainerTwo = $mensDetailFitGuide.children("#classicFitWrapper");
                var $wrapperContainerThree = $mensDetailFitGuide.children("#traditionalFitWrapper");
                var $wrapperContainerFour = $mensDetailFitGuide.children("#straightFitWrapper");
                var $wrapperContainerFive = $mensDetailFitGuide.children("#slimFitWrapper");
                var $slideContainer0 = this.children("div.looseFitWrapper");
                var $slideContainer1 = this.children("div.relaxedFitWrapper");
                var $slideContainer2 = this.children("div.classicFitWrapper");
                var $slideContainer3 = this.children("div.traditionalFitWrapper");
                var $slideContainer4 = this.children("div.straightFitWrapper");
                var $slideContainer5 = this.children("div.slimFitWrapper");
                var $isSlide0 = this.children("div.looseFitWrapper").children("div.carousel");
                var $isSlide1 = this.children("div.relaxedFitWrapper").children("div.carousel");
                var $isSlide2 = this.children("div.classicFitWrapper").children("div.carousel");
                var $isSlide3 = this.children("div.traditionalFitWrapper").children("div.carousel");
                var $isSlide4 = this.children("div.straightFitWrapper").children("div.carousel");
                var $isSlide5 = this.children("div.slimFitWrapper").children("div.carousel");
                $isGuideTrue = true;
                break;
        }
        /*  END FIT TOOL MEN'S & WOMENS'S JEANS  */
        var hashidx = getUrlVars()["selectedIndex"];
        var wrapper = jQuery('<div class="wrapper"></div>');
        var pager = jQuery('<div class="controller"></div>');
        var span1 = jQuery('<span class="current-slide"></span>');
        var span3 = jQuery('<span class="static-of"></span>').html("of");
        var span2 = jQuery('<span class="total-slides"></span>');
        var controls = jQuery('<div class="controls"></div>');
        var leftPaddle = jQuery('<a name="slideshow:leftpaddle" class="paddle-left" href="javascript:void(0)"> </a>');
        var rightPaddle = jQuery('<a name="slideshow:rightpaddle" class="paddle-right" href="javascript:void(0)"> </a>');
        var slideContainer = this.children('div.slides');
        var slides = this.children('div.slides').children('div');
        var allslides = jQuery('div.slideshow span.total-slides').html(slides.length);

        /*  FIT TOOL MEN'S SHIRTS  */
        var $relaxed = this.children('div.slides').children('div.relaxed');
        var $classic = this.children('div.slides').children('div.classic');
        var $slim = this.children('div.slides').children('div.slim');
        var $formOne = jQuery('div.slideshow div.slides #formOne');
        var $formTwo = jQuery('div.slideshow div.slides #formTwo');
        var $formThree = jQuery('div.slideshow div.slides #formThree');
        var $jNiceWrapper1 = jQuery('div.slideshow div.slides #formOne span.jNiceWrapper');
        var $jNiceWrapper2 = jQuery('div.slideshow div.slides #formTwo span.jNiceWrapper');
        var $jNiceWrapper3 = jQuery('div.slideshow div.slides #formThree span.jNiceWrapper');
        var $relaxedOverlay = jQuery('div.slideshow div.slides ul.relaxedOverlay');
        var $classicOverlay = jQuery('div.slideshow div.slides ul.classicOverlay');
        var $slimOverlay = jQuery('div.slideshow div.slides ul.slimOverlay');
        /*  END FIT TOOL MEN'S SHIRTS  */

        var auto = true;
        if (params.idx) {
        } else {
            var idx = 0;
        }
        if (hashidx) {
            var idx = parseInt(hashidx);
            auto = false;
        }
        var idx2 = 0;
        var SlideContent = '';
        var hoverStopSlide = params.hoverStopSlide;
        if (hoverStopSlide == 'undefined' || hoverStopSlide === 'undefined' || hoverStopSlide == undefined || hoverStopSlide === undefined) {
            hoverStopSlide = 'true';
        };

        if (hoverStopSlide == 'false') {
            slideContainer.mouseover(function () {
                auto = false; //hoverStopSlide;
                clearTimeout(timeOut);
            });
        }

        // get content for slide here using AJAX
        // check to see if slides have a var tag if so load content
        slides.each(function (index) {
            var slide = jQuery(this);
            var VarInfo = slide.find('var');
            //alert(slide.find('var'));
            if (VarInfo) { // var in div exists load content
                // get url from var to load content
                var ContentURL = jQuery.trim(VarInfo.html());
                if (ContentURL != "") {
                    slide.load(ContentURL, function (responseText, statusText, xhr) {
                        if (statusText == "error")
                            b.text("<b>Error loading slide content: " + xhr.status + " " + xhr.statusText + "</b>");
                        var slideTags = jQuery('.slides .control-button');
                        // loop over each tag found
                        slideTags.each(function (index) {
                            var slideTagElement = jQuery(this);
                            var indexId = parseInt(slideTagElement.attr('index'));
                            slideTagElement.click({ index: indexId }, controlButtonClickHandler);
                        });
                    });
                }
            }

        });

        var interval_param = params.interval;
        if (interval_param == 'undefined' || interval_param === 'undefined' || interval_param == undefined || interval_param === undefined) {
            interval_param = 3000;
        };
        var autoInterval = interval_param;

        var timesRun_param = params.xrun;
        if (timesRun_param == 'undefined' || timesRun_param === 'undefined' || timesRun_param == undefined || timesRun_param === undefined) {
            timesRun_param = 1;
        };
        var timesRun = timesRun_param;

        var timeOut;

        if (!slides || slides.length == 0)
            return;

        var current = "";
        var allslides = [];
        var gotoSlide = function (i) {
            var e = slides.eq(i);
            var slideId = e.attr('id');
            var slideClass = e.attr('class');
            var s = slides.filter('.selected');
            var c = controls.children().filter('.selected');
            var a = controls.children().eq(i);
            current = span1.html((i + 1));
            allslides = span2.html(slides.length);
            if (e.hasClass('selected'))
                return;
            s.stop(true, true).fadeOut(400, function () {
                s.removeClass('selected');
            });
            e.stop(true, true).fadeIn(400, function () {
                e.addClass('selected');
                /*  FIT TOOL MEN'S SHIRTS  */
                var $relaxedSelected = $relaxed.hasClass('selected');
                var $classicSelected = $classic.hasClass('selected');
                var $slimSelected = $slim.hasClass('selected');
                switch (true) {
                    case ($relaxedSelected):
                        $formOne.add($jNiceWrapper1).add($relaxedOverlay).addClass('selected').css({ display: "block" });
                        $formTwo.add($formThree).add($classicOverlay).add($slimOverlay).add($jNiceWrapper2).add($jNiceWrapper3).removeClass('selected').css({ display: "none" });
                        break;
                    case ($classicSelected):
                        $formTwo.add($jNiceWrapper2).add($classicOverlay).addClass('selected').css({ display: "block" });
                        $formOne.add($jNiceWrapper1).add($formThree).add($jNiceWrapper3).add($relaxedOverlay).add($slimOverlay).removeClass('selected').css({ display: "none" });
                        break;
                    case ($slimSelected):
                        $formThree.add($jNiceWrapper3).add($slimOverlay).addClass('selected').css({ display: "block" });
                        $formOne.add($jNiceWrapper1).add($formTwo).add($jNiceWrapper2).add($relaxedOverlay).add($classicOverlay).removeClass('selected').css({ display: "none" });
                        break;
                }
                /*  END FIT TOOL MEN'S SHIRTS  */
            });
            c.removeClass('selected');
            a.addClass('selected');
            /*  FIT TOOL MEN'S & WOMEN'S JEANS  */
            if ($isGuideTrue) {
                switch (i) {
                    case 0:
                        var $notSelected = $wrapperContainerOne.add($slideContainer1).add($wrapperContainerTwo).add($slideContainer2).add($wrapperContainerThree).add($slideContainer3).add($wrapperContainerFour).add($slideContainer4).add($wrapperContainerFive).add($slideContainer5);
                        var $isSelected = $wrapperContainerZero.add($slideContainer0).add($isSlide0);
                        $notSelected.removeClass('selected').css({ display: "none" });
                        $isSelected.addClass('selected').css({ display: "block" });
                        break;
                    case 1:
                        var $notSelected = $wrapperContainerZero.add($slideContainer0).add($wrapperContainerTwo).add($slideContainer2).add($wrapperContainerThree).add($slideContainer3).add($wrapperContainerFour).add($slideContainer4).add($wrapperContainerFive).add($slideContainer5);
                        var $isSelected = $wrapperContainerOne.add($slideContainer1).add($isSlide1);
                        $notSelected.removeClass('selected').css({ display: "none" });
                        $isSelected.addClass('selected').css({ display: "block" });
                        break;
                    case 2:
                        var $notSelected = $wrapperContainerZero.add($slideContainer0).add($wrapperContainerOne).add($slideContainer1).add($wrapperContainerThree).add($slideContainer3).add($wrapperContainerFour).add($slideContainer4).add($wrapperContainerFive).add($slideContainer5);
                        var $isSelected = $wrapperContainerTwo.add($slideContainer2).add($isSlide2);
                        $notSelected.removeClass('selected').css({ display: "none" });
                        $isSelected.addClass('selected').css({ display: "block" });
                        break;
                    case 3:
                        var $notSelected = $wrapperContainerZero.add($slideContainer0).add($wrapperContainerOne).add($slideContainer1).add($wrapperContainerTwo).add($slideContainer2).add($wrapperContainerFour).add($slideContainer4).add($wrapperContainerFive).add($slideContainer5);
                        var $isSelected = $wrapperContainerThree.add($slideContainer3).add($isSlide3);
                        $notSelected.removeClass('selected').css({ display: "none" });
                        $isSelected.addClass('selected').css({ display: "block" });
                        break;
                    case 4:
                        var $notSelected = $wrapperContainerZero.add($slideContainer0).add($wrapperContainerOne).add($slideContainer1).add($wrapperContainerTwo).add($slideContainer2).add($wrapperContainerThree).add($slideContainer3).add($wrapperContainerFive).add($slideContainer5);
                        var $isSelected = $wrapperContainerFour.add($slideContainer4).add($isSlide4);
                        $notSelected.removeClass('selected').css({ display: "none" });
                        $isSelected.addClass('selected').css({ display: "block" });
                        break;
                    case 5:
                        var $notSelected = $wrapperContainerZero.add($slideContainer0).add($wrapperContainerOne).add($slideContainer1).add($wrapperContainerTwo).add($slideContainer2).add($wrapperContainerThree).add($slideContainer3).add($wrapperContainerFour).add($slideContainer4);
                        var $isSelected = $wrapperContainerFive.add($slideContainer5).add($isSlide5);
                        $notSelected.removeClass('selected').css({ display: "none" });
                        $isSelected.addClass('selected').css({ display: "block" });
                        break;
                }
            }
            /*  END FIT TOOL MEN'S & WOMEN'S JEANS  */
            if (i == 0) {
                if (auto) {
                    timeOut = setTimeout(autoAdvance, 5000);
                }
            } else if (i > 0) {
                if (auto) {
                    timeOut = setTimeout(autoAdvance, autoInterval);
                }
            } else {
                clearTimeout(timeOut);
            }
        };


        var nextSlide = function () {
            //alert("idx = " + idx);
            //alert("slides length = " + (slides.length));
            if (idx == (slides.length - 1)) {
                idx = 0;
            } else if (idx == (slides.length)) {
                idx = 0;
            } else {
                idx = (idx + 1);
            }
            return gotoSlide(idx);
        };

        var prevSlide = function () {
            if (idx == 0) {
                idx = (slides.length - 1);
            } else if (idx == (slides.length)) {
                idx = 0;
            } else {
                idx = (idx - 1);
            }
            return gotoSlide(idx);
        };


        leftPaddleClickHandler = function (event) {
            auto = false;
            prevSlide();
        };

        rightPaddleClickHandler = function (event) {
            auto = false;
            nextSlide();
        };

        controlButtonClickHandler = function (event) {
            auto = false;
            idx = event.data.index;
            gotoSlide(idx);
        };
        var stopSlideId = params.stopSlideId;
        if (stopSlideId == 'undefined' || stopSlideId === 'undefined' || stopSlideId == undefined || stopSlideId === undefined) {
            stopSlideId = '';
        };

        autoAdvance = function (event) {
            if (auto) {
                if (idx == slides.length - 1) {
                    idx2 = idx2 + 1;
                    if (idx2 >= timesRun) {
                        auto = false;
                        if (stopSlideId != "") {
                            gotoSlide(stopSlideId - 1);
                        }
                    } else {
                        nextSlide();
                    }
                } else {
                    nextSlide();
                }
            };
        };


        slides.each(function () {
            var i = slides.index(this);
            var a = jQuery('<a class="control-button" href="javascript:void(0)" index="' + i + '"> </a>');
            a.click({ index: i }, controlButtonClickHandler);
            controls.append(a);
        });

        leftPaddle.click(leftPaddleClickHandler);
        rightPaddle.click(rightPaddleClickHandler);

        this.append(wrapper);
        wrapper.append(pager);
        pager.append(span1);
        pager.append(span3);
        pager.append(span2);
        wrapper.append(leftPaddle);
        wrapper.append(controls);
        wrapper.append(rightPaddle);

        //alert(idx);
        gotoSlide(idx);

    };

})(jQuery);