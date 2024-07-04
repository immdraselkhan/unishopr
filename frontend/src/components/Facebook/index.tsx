import { useEffect } from "react";

/**
 *
 */
export function init() {
    var chatbox = document.getElementById("fb-customer-chat");
    // @ts-ignore
    chatbox.setAttribute("page_id", "302161337108629"); // TODO: move to args
    // @ts-ignore
    chatbox.setAttribute("attribution", "biz_inbox");

    // @ts-ignore
    window.fbAsyncInit = function () {
        // @ts-ignore
        FB.init({
            xfbml: true,
            version: "v11.0",
        });

        if (window.innerWidth <= 768) {
            // @ts-ignore
            FB.CustomerChat.hide();
        }
    };

    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        // @ts-ignore
        js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
        // @ts-ignore
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
}

/**
 *
 */
export function cleanup() {
    (function (d, id) {
        var target = d.getElementById(id);
        if (target) {
            // @ts-ignore
            target.parentNode.removeChild(target);
        }
    })(document, "facebook-jssdk");

    // @ts-ignore
    delete window.FB;
}

export function Facebook1() {
    useEffect(() => {
        console.log("Facebook1");
        init();

        return () => {
            cleanup();
        };
    }, []);

    return (
        <div>
            <div id="fb-root"></div>

            <div id="fb-customer-chat" className="fb-customerchat"></div>
        </div>
    );
}