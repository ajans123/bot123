var app = new Vue({el: '#app', data: {fiiller: fiiller, request: "", response: ""}, mounted() {document.getElementsByClassName('request')[0].focus()},
    methods: {
        getResponse: function () {
            this.response = "";

            let req = this.request, type, zamir, zamir_cevap;

            if (req.includes(" mi") || req.includes(" mı") || req.includes(" mu") || req.includes(" mü")) type = "soru";
            else type = "cümle";

            req = req.replace(/ mi/g, "").replace(/ mı/g, "").replace(/ mu/g, "").replace(/ mü/g, "");
            req = req.replace(/ lan/g, "").replace(/ la/g, "").replace(/ amk/g, "").replace(/ aq/g, "").replace(/ yani/g, "");

            console.log(req);

            let request = req.split(" "), fiiller = this.fiiller;
            let fiil = request[request.length - 1], fiilLen = 0, fiil_i;
            req = request.join(" ");

            if (req.includes("ben ") || req.includes(" ben") || req.includes("yım") || req.includes("yim")) zamir = "ben";
            if (req.includes("sen ") || req.includes(" sen")) zamir = "sen";
            if (req.includes("o ") || req.includes(" o")) zamir = "o";
            if (req.includes("biz ") || req.includes(" biz")) zamir = "biz";
            if (req.includes("siz ") || req.includes(" siz")) zamir = "siz";
            if (req.includes("onlar ") || req.includes(" onlar")) zamir = "onlar";

            if (req.includes("beni ") || req.includes(" beni")) zamir = "beni";
            if (req.includes("seni ") || req.includes(" seni")) zamir = "seni";
            if (req.includes("onu ") || req.includes(" onu")) zamir = "onu";
            if (req.includes("bizi ") || req.includes(" bizi")) zamir = "bizi";
            if (req.includes("sizi ") || req.includes(" sizi")) zamir = "sizi";
            if (req.includes("onları ") || req.includes(" onları")) zamir = "onları";

            if (zamir === "ben") zamir_cevap = "sen";
            else if (zamir === "sen") zamir_cevap = "ben";
            else if (zamir === "biz") zamir_cevap = "siz";
            else if (zamir === "siz") return "siz kim amk";
            else if (zamir === "beni") zamir_cevap = "seni";
            else if (zamir === "seni") zamir_cevap = "beni";
            else if (zamir === "bizi") zamir_cevap = "sizi";
            else if (zamir === "sizi") return "siz kim lan";
            else zamir_cevap = zamir;

            let samimiyet_no = Math.floor((Math.random() * 17) + 1);
            let samimiyet = samimiyet_no === 1 ? "bence " : samimiyet_no === 2 ? "sanırım " : samimiyet_no === 3 ? "yani " : samimiyet_no === 4 ? "yahu " : samimiyet_no === 5 ? "hmm " : samimiyet_no === 6 ? "bilmem belki " : samimiyet_no === 7 ? "belki " : samimiyet_no === 8 ? "benim fikrim " : samimiyet_no === 9 ? "anladım  " : "";

            let rsamimiyet_no = Math.floor((Math.random() * 17) + 1);
            let rsamimiyet = rsamimiyet_no === 1 ? " lan" : rsamimiyet_no === 2 ? " yani" : rsamimiyet_no === 3 ? " amk" : rsamimiyet_no === 4 ? " yahu" : rsamimiyet_no === 5 ? " yav" : rsamimiyet_no === 6 ? " aq" : rsamimiyet_no === 7 ? " abi" : rsamimiyet_no === 8 ? " aga" : rsamimiyet_no === 9 ? " sanki" : "";

            if (req.includes(" sik")) return "küfür etme " + rsamimiyet;

            if (req.includes("selam")) return "selam";
            if (req.includes("naber")) return "iyidir";
            if (req.includes("nasılsın")) return "iyi";
            if (req.includes("merhaba")) return "merhaba";
            if (req.includes("nerede")) return "ne bilim" + rsamimiyet;
            if (req.includes("nerde")) return "ne bilim" + rsamimiyet;
            if (req.includes("nasıl")) return "bilmiyorum" + rsamimiyet;
            if (req.includes("napıyor")) return "bilmiyorum" + rsamimiyet;
            if (req.includes("hangi")) return "bilmiyorum" + rsamimiyet;
            if (req === "") return "?";

            for (let f in fiiller) if (fiil.substring(0, f.length).includes(f) && f.length > fiilLen) { fiilLen = f.length; fiil_i = f }

            if (!fiil_i) for (let f in fiiller) {
                if (fiil.substring(0, f.length).includes(f.substring(0, f.length - 1)) && f.length >= fiilLen) {
                    fiilLen = f.length;
                    fiil_i = f
                }
            }

            let soru = "";

            if (type==="soru") {
                let soru_no = Math.floor((Math.random() * 9) + 1);
                soru = soru_no === 1 ? "aynen " : soru_no === 2 ? "evet " : soru_no === 3 ? "doğru " : soru_no === 4 ? "hayır " : soru_no === 5 ? "yok " : "";
            }

            let lm = "";

            let kain = false, olumsuz = "";
            let olumsuz_no = Math.floor((Math.random() * 2));
            if (fiil_i.includes('a') || fiil_i.includes('ı') || fiil_i.includes('o') || fiil_i.includes('u')) kain = true;
            if (fiil_i.includes('e') || fiil_i.includes('i') || fiil_i.includes('ö') || fiil_i.includes('ü')) kain = false;

            if (kain) {
                if (zamir === "biz") lm = "yın";
                if (zamir === "sen" || zamir === "seni") lm = "m";
                if (zamir === "o" || zamir === "onlar") lm = "sın";
                olumsuz = "ma" + lm;
            } else {
                if (zamir === "biz") lm = "yin";
                if (zamir === "sen" || zamir === "seni") lm = "m";
                if (zamir === "o" || zamir === "onlar") lm = "sin";
                olumsuz = "me" + lm;
            }

            let response = soru + samimiyet + zamir_cevap + " " + fiil_i + (olumsuz_no ? olumsuz : "") + rsamimiyet; // + " " + type;

            if (response === "undefined") response = "ne diyon" + rsamimiyet;

            response = response.replace("undefined","").replace("undefined","").replace("undefined","").replace("undefined","").replace("undefined","").replace("undefined","");

            this.request = "";
            console.log(response);
            if (response === "") return "?";

            return response;
        }
    }
});
