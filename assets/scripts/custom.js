
/*Variables*/
var workOpenControl = 0, itemId = 0;
var sections = {}, _height = $(window).height(), i = 0;

$(document).ready(function () {
    $('#contact-form label').labelOver('over');

    //Intro area slider starting.
    $('#introBg').maximage();

    setTimeout(function () {
        //Set width attribute for logo
        $('.logo').attr('width', $('.logo').width());

        resizeOperation();
    }, 500);

    getWorks();

    /*for select main menu operation*/
    $('select.mainMenu').change(function () {
        var selectedMenu = $(this).attr('value');
        var scrollToTop = $('#' + selectedMenu).offset().top - $('.mainMenuWrap').height();
        if (selectedMenu == "homePage")
            $('body').scrollTo(0, 800, { queue: true });
        else
            $('body').scrollTo(scrollToTop, 800, { queue: true });
    });

    /*for main menu scroll*/
    $('#siteMenu').localScroll(800);

    /*parallax operation for home page image*/
    $('.prlxImage.bg1').parallax("50%", 0.55);
    $('.prlxImage.bg2').parallax("100%", 0.01);

    /*post operation for contact page*/
    $("#contact-form a").click(function () {

        /*function which validates input with required class in contact page */
        var myform = $("#contact-form").validate({
            email: true,
            errorPlacement: function (error, element) {
                error.appendTo();
            }
        }).form();

        /*myform returns true if form is valid.*/
        if (myform) {
            var action = $("#contact-form").attr('action');
            $.post(action, {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            },
					function (data) {
					    d = data;
					    $('.response').remove();

					    $('#contact-form a').fadeOut('slow', function () {
					        if (data == 'Message sent!') {
					            $('#contact-form a').html('YOUR MESSAGE SENDED. THANKS').addClass('success');
					        }
					        else {
					            $('#contact-form a').html('SORRY, FAILED TO SEND YOUR MESSAGE.').addClass('error');
					        }
					    });
					    setTimeout(function () {
					        $('#contact-form a').addClass('dis').fadeIn('slow');
					    }, 800);
					});
        }
        return false;
    });
});

$(document).scroll(function () {
    wTop = $(document).scrollTop();

    var s1Top = 0;
    var s2Top = $('#aboutUs').offset().top - (($('#works').offset().top - $('#aboutUs').offset().top) / 2);
    var s3Top = $('#works').offset().top - (($('#contact').offset().top - $('#works').offset().top) / 2);
    var s4Top = $('#contact').offset().top - (($(document).height() - $('#contact').offset().top) / 2);

    $('#siteMenu a').removeClass('active');
    $('select.mainMenu option:selected').removeAttr('selected');

    if (wTop == s1Top) {
        $('#siteMenu a').eq(0).addClass('active');
        $('select.mainMenu option:nth(0)').attr("selected", "selected");
    }
    else if (wTop >= s2Top && wTop < s3Top) {
        $('#siteMenu a').eq(1).addClass('active');
        $('select.mainMenu option:nth(1)').attr("selected", "selected");
    }
    else if (wTop >= s3Top && wTop < s4Top) {
        $('#siteMenu a').eq(2).addClass('active');
        $('select.mainMenu option:nth(2)').attr("selected", "selected");
    }
    else if (wTop >= s4Top) {
        $('#siteMenu a').eq(3).addClass('active');
        $('select.mainMenu option:nth(3)').attr("selected", "selected");
    }
});

$(window).resize(function () {
    resizeOperation();
});

function resizeOperation() {
    var sWidth = $('.serviceItem').width();
    var radiusWidth = sWidth / 2;

    $('.serviceItem .serviceImage').each(function () {
        $(this).css('height', sWidth).css('-webkit-border-radius', radiusWidth).css('-moz-border-radius', radiusWidth).css('border-radius', radiusWidth);
    })

    $('.infoArea').css('margin-top', -(($('.infoArea').height() - $('.mainMenuWrap').height()) / 2));

    /*Set width and height for social icons for team item*/
    var teamRowCount = $('.teams').length;
    var teamItemWidth = $('.teams .teamItem').width();
    var socailIconCount = $('.teamItem:first-child').find('.teamSocial li').length;
    var socaialIconWidth = teamItemWidth / (socailIconCount / teamRowCount);

    if ($.browser.msie)
        $('.teamSocial li').css('width', (socaialIconWidth - 0.02));
    else
        $('.teamSocial li').css('width', socaialIconWidth);
    $('.teamSocial li').css('height', socaialIconWidth + 1);

    setWorkHoverButtonCss();
}

/*Set margins for works detail button*/
function setWorkHoverButtonCss() {
    $('.workItem .mask a').css('display', 'inline-block');

    var workItemHeight = $('.workItem').height();
    var buttonHeight = $('.workItem .mask a').height() + 34;
    var workSpaceHeight = workItemHeight - buttonHeight;

    $('.workItem .mask a').css('margin-top', (workSpaceHeight / 2)).css('float', 'none');
}

/*Functions for work page*/
function getWorks() {
    $.ajax({
        type: "GET",
        url: "works.xml",
        dataType: "xml",
        success: function (xml) {
            var content = "";
            var cssName = "span3";
            var counter = 0;

            content = "<div class='container'><div class='row-fluid works'>";

            $(xml).find('item').each(function () {
                var id = $(this).attr('id');
                var img = $(this).find('img').text();

                if (counter == 4) {
                    counter = 0;
                    content += "</div></div>";
                    content += "<div class='container'><div class='row-fluid works'>";
                }

                content += "<div class='" + cssName + " workItem'>";
                content += "<img src='" + img + "' alt='WorkItem' />";
                content += "<div class='mask'><a class='butn white' href='" + id + "'>MORE DETAIL</a></div>";
                content += "</div>";

                counter = counter + 1;
            });

            content += "</div></div>";

            $('#workItems').append(content);

            setTimeout(function () { setWorkHoverButtonCss(); }, 1000);

            $("#workItems .butn").click(function () {
                var parentObj = $(this).parents('.container');
                itemId = $(this).attr("href");

                if (workOpenControl == 0) {
                    workOpenControl = 1;

                    getWorkItem(itemId, parentObj);
                } else {
                    closeWorkContent();

                    setTimeout(function () {
                        getWorkItem(itemId, parentObj);
                    }, 1300);

                    workOpenControl = 1;
                }
                return false;
            });
        }
    });
}

function closeWorkContent() {
    workOpenControl = 0;
    $('#workContentWrap').animate({ height: "hide" }, 800, 'easeInOutQuint', function () { $('#workContentWrap').remove(); });
}

function getWorkItem(itemId, obj) {
    $.ajax({
        type: "GET",
        url: "works.xml",
        dataType: "xml",
        success: function (xml) {
            var content = "";

            $(xml).find('item').each(function () {
                var id = $(this).attr('id');

                if (id == itemId) {
                    var title = $(this).find('title').text();
                    var tag = $(this).find('tag').text();
                    var cont = $(this).find('content').text();
                    var image = $(this).find('image').text();
					var urlT = $(this).find('url').text();

                    content = "<div id='workContentWrap' style='display:none;'><div id='workContent'>";
                    content += "<div class='container'><div class='row-fluid'>";
                    content += "<div class='span6'><img src='" + image + "' alt='Work Image' /></div>";
                    content += "<div class='span6'><a class='close' href='javascript:closeWorkContent();'>Close</a><h2>" + title + "</h2><p>" + cont + "</p><span class='tags'>" + tag + "</span>";
					if(urlT != '')
						content +="<a class='butn black' href='" + urlT + "' target='_blank'>LAUNCH PROJECT</a></div>";
					else
						content +="</div>";
                    content += "</div></div></div></div>";

                    $(content).insertAfter($(obj));

                    $('#workContentWrap').animate({ height: "show" }, 500, 'easeInOutQuint', function () { $('body').scrollTo(($('#workContentWrap').offset().top - $('.mainMenuWrap').height()), 500, { queue: true }); });
                }
            });
        }
    });
}

function customScrollTo(id) {
    var toTop = $('#' + id).offset().top;

    $('body').scrollTo(toTop, 1500, { queue: true });
}

/* plugin for labels to be placed over input fields in contact page */
jQuery.fn.labelOver = function (overClass) {
    return this.each(function () {
        var label = jQuery(this);
        var f = label.attr('for');
        if (f) {
            var input = jQuery('#' + f);
            this.hide = function () {
                label.css({
                    textIndent: -10000
                })
            }
            this.show = function () {
                if (input.val() == '') label.css({
                    textIndent: 0
                })
            }
            // handlers
            input.focus(this.hide);
            input.blur(this.show);
            label.addClass(overClass).click(function () {
                input.focus()
            });
            if (input.val() != '') this.hide();
        }
    })
}