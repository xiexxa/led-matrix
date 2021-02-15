# 卒業研究報告書
## 研究題目: Node.jsによるRGBマトリクスLED制御システム開発

1. まえがき

本研究はRGBマトリクスLEDパネル(以下、LEDパネル)をWebブラウザから制御するシステムを開発するテーマである。Webブラウザから操作を受け付けてLEDパネルにテキストを表示するアプリケーションの作成を行った。

2. 使用装置
本システムは以下の装置によって構成される。  
2.1 RGBフルカラードットマトリクスLEDパネル 32x16ドット  
本システムの主要な出力装置である。このパネルを横に3枚デイジーチェーンして連続してテキストが表示される。2.2のHATを接続してRaspberry Piからの入力を受け取る。  

2.2 RGB Matrix HAT + RTC  
このRGB Matrix HAT + RTCはRaspberry PiでRGBマトリクスLEDパネルを操作する拡張ボード型のコントローラである。  
Raspberry Pi Foundationが公開しているHAT(Hardware Attached on Top)の仕様に準拠しているため、本研究で使用したモデル以外のRaspberry Piでも利用できる。  
装置名にあるようにRTCを搭載しているため、Raspberry Piの電源が切断されていても、時刻の表示などが可能である。  
16x32, 32x32, 32x64, 64x64のHUB75規格のパネルに対応しており、デイジーチェーンで接続すれば更なる表示領域の拡張にも対応する。  

2.3 Raspberry Pi 3 Model B Rev 1.2  
ARMプロセッサ搭載の教育用シングルボードコンピュータであり、本システムのパネル制御、Web機能の提供を行う。  
以下表1は今回使用するモデルの仕様である。  
表1. Raspberry Pi 3 Model B+の仕様

|  項目  |  仕様  |
| ---- | ---- |
|  CPU  |  Broadcom BCM2837 1.2GHz 64-bit quad-core ARMv8 Cortex-A53  |
|  RAM  |  1GB  |
|  USB  |  USB2.0 x4  |
|  LAN  |  RJ-45 x1 (IEEE802.3i(10BASE-T), IEEE802.3u(100BASE-TX)), 無線LAN(IEEE802.11b/g/n(2.4GHz))  |
|  その他外部接続  | HDMI、 microSDカードスロット、 3.5mmジャック、 40pin GPIO、 Bluetooth v4.1(Bluetooth Low Energy)  |

2.4 使用装置一覧

|  装置名  |  メーカ名  |  型番  |  用途  |
| ---- | ---- | ---- | ---- | ---- |
|  RGBフルカラードットマトリクスLEDパネル  |  不明  |  不明  |    |
|  RGB Matrix HAT + RTC for Raspberry Pi  |  Adafruit  |  2345  |    |
|  Raspberry Pi 3 Model B Rev 1.2  |  Raspberry Pi Foundation  |    |    |
|  ACアダプタ  |  不明  |    |    |
|  USB ACアダプタ  |    |    |    |
|  フラットケーブル  |    |    |    |
|  LANケーブル  |    |    |    |    |

3. 使用ソフトウェア  
本システムは以下のソフトウェアによって構成される。
3.1 Raspberry Pi OS  
Raspberry PiのOSにはRaspberry Pi OSを採用した。DebianベースのOSでapt等のパッケーマネージャを採用する。  
使用したバージョンは10(Buster)である。
3.2 Node.js  
Node.jsはサーバサイドでJavaScriptを実行する環境を提供するソフトウェアである。付属するパッケーマネージャnpm(Node Package Manager)を使用してモジュールを追加してシステムを構築した。本システムでは3.3のドライバモジュールと組み合わせることでLEDパネルを操作するシステムの基本となっている。
3.3 node-rpi-rgb-led-matrix  
Node.jsからLEDパネルを制御するモジュールである。Raspberry Pi 3 Model Bまたは4にNode.js v8、10、13での動作が検証されている。本モジュールではLEDパネルの制御をLEDの座標と色を指定することでプログラムから行うことができる。また、BDF形式のフォントをサポートしており、テキストの表示も可能である。本システムの主要な機能であるテキスト表示機能はこのモジュールを使用した。
3.4 Vue.js  
Webブラウザでのユーザインタフェースを構築するためのJavaScriptフレームワークである。SPA(Single Page Application)の作成が可能であるため、ページの遷移をすることなくWebアプリケーションを操作できる。また、コンポーネントごとにWebページ内の要素を独立して作成することが可能なため、コードの再利用などにおいて特に記述が容易になる。本システムのWeb側のフロントエンドはすべてVue.jsで作成した。
3.5 UFO(Unicode Font, Organized)  
BDF(Bitmap Distribution Format)フォントで作成されたフォントである。本システムでテキストをLEDパネルに表示する機能はこのフォントを採用している。BDFフォントはテキストファイルにビットマップの文字データを16進化して記録されている。(図にBDFの例を載せる)  
本研究で採用したUFOフォントはUnicodeで記述されたフォントである。これは3.3のモジュールに収録されているBDFフォントを表示する関数がUnicodeにしか対応しておらず、日本語対応のUnicodeで記述されたBDFフォントは他に類を見なかったためである。Unicodeの基本多言語面の文字をサポートしているため、英語、日本語のみならず、その他の外国語や一部の絵文字も表示可能である。  
3.6 使用ソフトウェア一覧  

    |  ソフトウェア名  |  開発者名  |  URL  |  用途  |
    |  ----  |  ----  |  ----  |  ----  |
    |  Raspberry Pi OS  |    |    |    |
    |  Node.js  |    |    |    |
    |  node-rpi-rgb-led-matrix  |    |    |    |
    |  Vue.js  |    |    |    |
    |  MariaDB  |    |    |    |  
    |  UFO  |    |    |    |  
その他、本システムに使用しているNode.jsのプラグインに関しては、プロジェクトディレクトリ内のpackage.jsonを参照されたい。  
4. 配線  
本システムのハードウェアの配線について説明する。  
以下の図Xは配線の概略図である。  
![代替テキスト](./img/hw_map.png)
4.1 RGB Matrix HAT + RTCの接続  
本システムはRaspberry Piを中心にすべてのパーツが接続されている。  
Raspberry Piの上にRGB Matrix HAT + RTCを接続する。  
マトリクスLEDの制御用にHUB75のポートにフラットケーブルを接続する。  
Output 5Vのターミナルの+-それぞれに赤と黒のケーブルを接続する。  
4.2 マトリクスLEDとHATの接続  
マトリクスLED裏面左部のINのポートに4.1で接続したフラットケーブルの片側を接続する。
同様に裏面中央にある4pin電源コネクタに電源ピンを接続する。  
このマトリクスLEDはデイジーチェーンで接続できるので、裏面右部のOUTから2枚目のマトリクスLEDのINにかけてフラットケーブルを接続する。  
2枚目の電源は1枚めと同様に接続した。  
この操作を必要なパネル数繰り返す。今回は3枚接続した。  
必要に応じてマトリクスLED裏面4隅の穴にマグネット付きネジを取り付け展示しやすいように加工する。  
4.3 入出力機器の接続  
Raspberry Piにディスプレイ、マウス、キーボード、LANケーブル、OSインストール済みのmicroSDカードを接続する。  
4.4 電源の接続  
Raspberry PiにはUSBACアダプタから供給しているmicroUSBから、RGB Matrix HAT + RTCにはACアダプタからの電源を接続する。  

5. セットアップ
本章ではRaspberry　PiへのOSのセットアップから本研究テーマで作成したソフトウェアの導入までを解説する。  
5.1 Raspberry Pi OSのインストール  
Raspberry Pi OSのインストール手順を解説する。  
今回はRaspberry Pi Imagerを使用する。  
5.1.1 Raspberry Pi Imagerのインストール  
Raspberry Pi FoundationのWebサイト(https://www.raspberrypi.org/software/)からインストーラをダウンロードする。  
インストーラに従い、インストールを行う。
5.1.2 SDカードへのOSの書き込み  
Raspberry Pi Imagerのインストールが完了したら、インストールするOSの種類を選択する。  
以下画面において、Oparation Systemの項目でRaspberry Pi OS(32bit)を選択する。  
Choose SD cardでは書き込みたいSDカードを選択する。  

5.2 Raspberry Pi OSの起動  



6. 操作方法

7. 課題

8. おわりに

9. 謝辞

9. 参考文献
Adafruit RGB Matrix HAT + RTC for Raspberry Pi - Mini Kit, Adafruit, https://www.adafruit.com/product/2345.

10. 書くこと  
- HEX to BinaryのBDFフォントデコーダを載せる。
