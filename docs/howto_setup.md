# マトリクスLEDパネルWebシステムセットアップ解説  
Raspberry PiにLEDマトリクスLEDパネルを制御するWebシステムを構築する手順を記す。  
## 必要機材  
- Raspberry Pi 3 Model B Rev 1.2
- 16x32LEDパネル x3
- パラレルケーブル x3
- LEDパネル用電源ケーブル
- microSDカード 16GB
- RGB Matrix HAT+RTC
- HAT用電源
- Raspberry Pi用電源
- USBマウス
- USBキーボード
- HDMIケーブル
- ディスプレイ
- LANケーブル
- インターネット環境
- Webブラウザの動くPC

## Raspberry Pi OSのインストール
1. Raspberry Pi Imagerのインストール  
Raspberry PiにOSをインストールする。  
OSをSDカードに書き込むためにRaspberry Pi Imagerを使用する。  
https://www.raspberrypi.org/software/にアクセスして、Install Raspberry Pi OS using Raspberry Pi Imagerの章から、Download for <使用しているOS名>をクリックして、Raspberry Pi Imagerをダウンロードする。  
以下図Xは上記URLの画面である。  
![](./img/howto/raspberrypi_imager_install_link.png)  

2. Raspberry Pi Imagerのインストール  
ダウンロードしたimager_1.5.exeを実行する。  
インストーラに従ってインストールする。  
インストール完了後、起動すると以下の図Xのような画面が出現する。  
![](./img/howto/raspberrypi_imager.png)  

3. Raspberry Pi OSの書き込み  
PCにmicroSDカードを挿入する。  
Raspberry Pi ImagerのOperating System以下のCHOOSE OSをクリックすると図Xのような画面が現れるので、OSタイプを選択する。  
![](./img/howto/raspberrypi_imager_ostype.png)  
今回はRaspberry Pi OS (32-bit)を選択する。  
次にSD Card以下のCHOOSE SD CARDをクリックして出現する以下図Xの画面から、インストール先のSDカードを選択する。  
![](./img/howto/raspberrypi_imager_sdcard.png)  
ここまで選択が完了したら、WRITEボタンを押して、以下の図XのようにSDカード内のデータが削除される警告に承諾するならば、YESを押してOSを書き込む。  
![](./img/howto/raspberrypi_imager_warning.png)  