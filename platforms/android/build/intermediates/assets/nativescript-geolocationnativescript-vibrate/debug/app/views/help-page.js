function pageLoaded(args) {
    page = args.object;

    loadUi(page);
    var label = page.getViewById("labelHelpFirst");
    var label1 = page.getViewById("labelHelpSecond");
    var label2 = page.getViewById("labelHelpThird");
    var label3 = page.getViewById("labelHelpFourth");
    var label4 = page.getViewById("labelHelpFifth");
    var label5 = page.getViewById("labelHelpSixth");
    label.animate({
        opacity: 1,
        duration: 2000,
    }).then(function() {
        return label1.animate({
            opacity: 1,
            duration: 1000
        });
    }).then(function() {
        return label2.animate({
            opacity: 1,
            duration: 1000
        });
    }).then(function() {
        return label3.animate({
            opacity: 1,
            duration: 1000
        });
    }).then(function() {
        return label4.animate({
            opacity: 1,
            duration: 1000
        });
    }).then(function() {
        return label5.animate({
            opacity: 1,
            duration: 1000
        });
    });
}

function loadUi(page) {

    var myPage = page.getViewById("stackHelp");
    myPage.backgroundImage = "~/eee.jpg";

}
exports.pageLoaded = pageLoaded;