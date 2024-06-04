/**
 * 簡易スライドショー
 *
 * nextボタンを押したときに画像を切り替える簡単な
 * スライドショーのサンプルプログラムです。
 */

window.onload = function () {

    /*============================
     * 変数の定義
     *===========================*/

    // 画像のリストの定義
    var photoList = [
        { src: 'https://picsum.photos/id/219/1000/', title: '虎' },
        { src: 'img/pic01.jpg', title: '堂本剛' },
        { src: 'https://picsum.photos/id/109/2000/', title: '森' },
        { src: 'img/pic02.jpg', title: '堂本剛' },
        { src: 'https://picsum.photos/id/118/2000/', title: 'ひまわり' },
    ];
    var photoLength = photoList.length;

    // 要素の取得
    var photo = document.getElementById('photo');
    var nextBtn = document.getElementById('nextBtn');
    var title = document.getElementById('title');

    // 現在のインデックスを保存するための変数
    var currentIndex = 0;

    /*============================
     * 関数の定義
     *===========================*/

    // 指定の画像に表示を切り替える関数
    function showPhoto(index) {
        // すべての画像を非表示
        for (var i = 0; i < photoLength; i++) {
            photoList[i].elem.style.display = 'none';
        }

        // 表示する対象の要素を取得
        var targetPhoto = photoList[index];

        // タイトルの表示
        var viewNumber = index + 1;
        title.innerHTML = '[' + viewNumber + '] ' + targetPhoto.title;

        // 画像の表示
        targetPhoto.elem.style.display = 'inline';
    }

    /*============================
     * イベントの設定
     *===========================*/

    // nextボタンを押したときの処理
    nextBtn.onclick = function () {
        // 表示する画像のインデックスを計算
        currentIndex++;
        if (currentIndex === photoLength) {
            currentIndex = 0;
        }

        // 画像の切り替え
        showPhoto(currentIndex);
    };

    /*============================
     * 初期化処理
     *===========================*/

    // img要素をHTMLに追加
    var item, img;
    for (var i = 0; i < photoLength; i++) {
        item = photoList[i];

        // img要素の作成
        img = document.createElement('img');

        // 作成したimg要素に属性を設定
        img.src = item.src;
        img.alt = item.title;

        // 作成したimg要素をHTMLに追加
        photo.appendChild(img);

        // 作成したimg要素を保存
        item.elem = img;
    }

    // 初期表示のためにshowPhoto関数を実行する
    showPhoto(currentIndex);
};



// 地図埋め込み
var map;
var marker = [];
var infoWindow = [];
var markerData = [ // マーカーを立てる場所名・緯度・経度
    {
        name: 'あざみ野',
        lat: 35.5681697,
        lng: 139.5515594,
        // icon: 'jpg'
    },
    {
        name: '小田急相武台前校',
        lat: 35.49934693,
        lng: 139.4072539
    }, {
        name: '上溝校',
        lat: 35.55785435,
        lng: 139.3626063
    }, {
        name: '相模大野校',
        lat: 35.53267052,
        lng: 139.4373721
    }, {
        name: '相模原橋本校',
        lat: 35.59686267,
        lng: 139.3456401
    }, {
        name: '鷺沼校',
        lat: 35.57954506,
        lng:139.5721033
    },{
        name: '中央林間駅西口校',
        lat: 35.50774591,
        lng:139.4434049
    }, {
        name: '東急日吉校',
        lat: 35.55407203,
        lng:139.6461921
    }, {
        name: '長津田駅南口校',
        lat: 35.53046257,
        lng:139.4966201
    },  {
        name: '渕野辺校',
        lat: 35.56937466,
        lng: 139.3954036
    },  {
        name: '宮崎台駅北口校',
        lat: 35.58798592,
        lng: 139.5902014
    },  {
        name: '宮前平校',
        lat: 35.58430497,
        lng: 139.581835
    }, 
];

function initMap() {
    // 地図の作成
    var mapLatLng = new google.maps.LatLng({ lat: markerData[2]['lat'], lng: markerData[2]['lng'] }); // 緯度経度のデータ作成
    map = new google.maps.Map(document.getElementById('kanagawa'), { // #sampleに地図を埋め込む
        center: mapLatLng, // 地図の中心を指定
        zoom: 10 // 地図のズームを指定
    });

    // マーカー毎の処理
    for (var i = 0; i < markerData.length; i++) {
        markerLatLng = new google.maps.LatLng({ lat: markerData[i]['lat'], lng: markerData[i]['lng'] }); // 緯度経度のデータ作成
        marker[i] = new google.maps.Marker({ // マーカーの追加
            position: markerLatLng, // マーカーを立てる位置を指定
            map: map // マーカーを立てる地図を指定
        });

        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
        });

        markerEvent(i); // マーカーにクリックイベントを追加
    }

    marker[0].setOptions({// マーカーのオプション設定
        icon: {
            url: markerData[0]['icon']// マーカーの画像を変更
        }
    });
}

// マーカーにクリックイベントを追加
function markerEvent(i) {
    marker[i].addListener('click', function () { // マーカーをクリックしたとき
        infoWindow[i].open(map, marker[i]); // 吹き出しの表示
    });
}