const path = require("path");

//dodavanje webpack pluginova
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //CSS pakiranje
const HtmlWebpackPlugin = require("html-webpack-plugin"); //generiranje HTML datoteka
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //bundle analiza u pregledniku

module.exports = {
    mode: "development", //production (default) ili development
    entry: {
        bundle: path.resolve(__dirname, "src/js/index.js"),
        //par ime_izlazne_datoteke - putanja_do_ulazne_datoteke
        //za entry putanju, path moze biti relativan ili apsolutan
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        //putanja gdje se sprema izlazna datoteka
        //za output putanju koristimo path.resolve() zato sto putanja do izlaznih datoteka mora biti apsolutna
        //ne hardcodiramo path nego koristimo path.resolve() zato sto putanja nece biti ista na svim operacijskim sustavima
        filename: "js/[name][contenthash].js",
        //[name] osigurava da imena izlaznih datoteka budu onakva kako je zadano u entry parovima
        //[contenthash] osigurava da svaka izlazna webpack datoteka u imenu ima hash -> pomaze prilikom cachiranja
        clean: true,
        //budući da smo sa [contenthash] zadali da izlazne datoteke imaju hash u imenu, svaki put kada webpack zapakira izlazne datoteke, neće pobrisati stare jer ce se razlicito zvati
        //zbog toga se stavlja opcija "clean: true" koja govori da se treba spremiti samo najnovija verzija izlaznih datoteka
        assetModuleFilename: "assets/[name][ext]",
        //ako ne stavimo ovu liniju, svi staticki resursi koje webpack pronađe i zapakira, će dobiti nova imena i bit ce smjesteni direktno u dist folder
        //ovo osigurava da se premjesteni resursi isto zovu kao i originali i da se smjeste u assets folder unutar dist foldera
    },
    //konfiguracija loadera
    module: {
        rules: [
            {
                //loader za CSS datoteke
                test: /\.css$/, //regularni izraz kojim se prepoznaju CSS datoteke
                use: ["style-loader", "css-loader"],
                //dva loadera potrebna za pakiranje CSS datoteka
                //bitno je prvo navesti css-loader, pa nakon njega style-loader buduci da webpack primjenjuje loadere pocevsi od kraja liste
                //ovdje je koristen style-loader, a mogao se koristiti i MiniCssExtractPlugin -> daju razlicite rezultate
            },
            {
                //loader za SASS datoteke -> sass je knjiznica za lakse pisanje CSS-a
                test: /\.scss$/, //regularni izraz kojim se prepoznaju SASS datoteke
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                //za datoteke prepoznate regularnim izrazom, koriste se loaderi navedeni u listi
                //ovdje je koristen MiniCssExtractPlugin, a mogao se koristiti i style-loader -> daju razlicite rezultate
            },
            {
                //loader za staticke resurse, npr. slike
                test: /\.(png|svg|jpg|jpeg|gif)$/i, //regularni izraz koji pronalazi sve slike
                type: "asset/resource", //loader za staticke resurse je ugrađen u webpack
            },
            {
                //babel loader koji će novu JavaScript sintaksu pretvoriti u stariju tako da kod bude izvediv i na starijim preglednicima
                test: /\.js$/, //regularni izraz koji pronalazi JavaScript datoteke
                exclude: /node_modules/, //isključujemo node_modules folder jer ne želimo mijenjati JavaScript sintaksu u NPM paketima
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [
        //na temelju template.html datoteke generira .html datoteku u dist folderu
        new HtmlWebpackPlugin({
            title: "Don't Laugh Challenge", //postavlja vrijednost HTML title taga
            filename: "index.html", //ime .html datoteke koja će se generirati u dist folderu
            template: "src/html/template.html", //lokacija template.html datoteke
            chunks: ["bundle"], //izlazne .js datoteke koje stvorena .html datoteka mora uključiti
        }),
        //
        new HtmlWebpackPlugin({
            title: "Users",
            filename: "users.html",
            template: "src/html/users.html",
            chunks: [], //users.html datoteka ne uključuje nikakve .js datoteke zbog čega je njena "chunks" lista prazna
        }),
        //koristi se umjesto style-loadera, svaku .css ili .scss datoteku pakira u vlastitu datoteku unutar dist foldera
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            //filename definira kako ce se zvati zapakirane .css datoteke
            //ekstenzija je uvijek .css zato jer se i .css i .scss datoteke prevode u .css datoteke
            //svaka je .css ili .scss datoteka importana u neku .js datoteku i kod pakiranja, svaka .css datoteka ima isto ime kao i .js datoteka kojoj pripada tj. u koju je importana
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "", //opcije: disabled | json | server | static
            //disabled - nakon pakiranja ne otvara se preglednik u kojemu se prikazuje bundle analiza
            //server - nakon svakog pakiranja otvara se preglednik u kojemu se prikazuje bundle analiza
        }),
    ],
    //konfiguracija webpack servera
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"), //putanja do direktorija koji server mora posluživati
        },
        port: 3000, //port na kojem server poslužuje
        open: true, //kada se pokrene skripta --> npm run dev, automatski otvori preglednik na http://localhost:<port>
        hot: true, //ponovno pokretanje servera na svaku spremljenu promjenu
        compress: true, //?
        historyApiFallback: true, //?
    },
    devtool: "source-map", //u slučaju errora, preglednik prikazuje error iz ulaznih datoteka koje smo mi pisali, a ne iz izlaznih datoteka koje je generirao webpack
};
