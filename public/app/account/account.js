define(['plugins/router', 'knockout'], function (router, ko) {

    return {

        id: ko.observable(),
        appname: ko.observable("es137"),
        //username: ko.observable("developer"),
        //password: ko.observable("password"),
        username: ko.observable(),
        password: ko.observable(),
        firstName: ko.observable(),
        lastName: ko.observable(),
        email: ko.observable(),

        validated: ko.observable(false),
        show401: ko.observable(false),
        returnUrl: ko.observable(),
        development: ko.observable(false),

        logout: function (account) {
            account.password("");
            account.validated(false);
            document.cookie = "rbmData=";
            router.navigate("#account");
        },

        //  Global Authenticated AJAX call to backend resources 
        ajax: function(payload){

            var self = this;
            self.show401(false);

            var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

            var auth = Base64.encode(this.username() + ":" + this.password() + ":" + this.appname());

            $.ajax
            ({
                type: payload.method,
                url: payload.url,
                dataType: 'json',
                data: payload.data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", auth);
                },
                success: payload.success,
                error: function (jqXHR, textStatus, errorThrown) {

                    if(jqXHR.status == 401){
                        document.cookie = "rbmData=";
                        router.navigate("#account");

                        self.show401(true);

                    } else {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);

                    }



                }
            });


        },

        //  Validate the user
        validate: function () {

            var self = this;
            self.show401(false);

            //  Build payload object
            var payload = {
                url: "account/validate",
                method: "GET",
                data: {},
                success: function (resp) {

                    self.validated(resp.success);

                    if (resp.success) {

                        self.id(resp.data.Id);
                        self.firstName(resp.data.FirstName);
                        self.lastName(resp.data.LastName);
                        self.email(resp.data.Email);


                        var cookieData = {
                            Id:resp.data.Id,
                            firstName: resp.data.FirstName,
                            lastName: resp.data.LastName,
                            email: resp.data.Email,
                            username: self.username(),
                            password: self.password(),
                            validated: resp.success
                        };

                        document.cookie = "rbmData="+JSON.stringify(cookieData);


                        //  If we have a return url to navgate to, let's go.     
                        if (self.returnUrl() != "") {
                            var url = self.returnUrl();
                            self.returnUrl("");
                            router.navigate(url);
                        }

                    }
                    else {
                        self.show401(true);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 401) {
                        self.show401(true);
                    }
                }
            }

            //  Make call via gloabal authenticated AJAX call
            this.ajax(payload);

        },

        checkCookies: function (account) {

            var cookies = document.cookie.split(';');
            var cookie = "";
            var name = "rbmData";
            for (var i = 0; i < cookies.length; i++) {
                var c = cookies[i].trim();
                if (c.indexOf(name) == 0)
                    cookie = c.substring(name.length+1, c.length);
            }

            if (cookie.length != 0)
            {
                var cookieData = JSON.parse(cookie);

                account.id(cookieData.Id);
                account.firstName(cookieData.firstName);
                account.lastName(cookieData.lastName);
                account.email(cookieData.email);
                account.username(cookieData.username);
                account.password(cookieData.password);
                account.validated(cookieData.validated);

            }
        }
    }

});