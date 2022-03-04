---
sidebar_position: 3
---

# NASA Earthdata

## 公式ページ

[Earthdata](https://earthdata.nasa.gov/)


## ABOUT
[Earth Science Data Systems (ESDS) Program | Earthdata](https://earthdata.nasa.gov/esds)

### ESDSプログラムとは

Earth Science Data Systemsの略称。NASAのプログラム。科学的利益を最大することが目的。データやソフトウェアをオープンに公開している。
継続的にデータを最新化し、OSSを更新する。ESDSプログラムにおいてESDR: Earth System Data Records を構築している。

### ESDSプログラムの構成要素

1. Data System Evolution(DSE)

	さまざまな研究機会に加えて、省庁間のイニシアチブ、および標準の開発と実装によるデータとサービスの相互運用性の促進に資金を提供する

	- Competitive programs

		新たなEarth science data products and innovative technologyの開発。

		今は[ACCESS](https://earthdata.nasa.gov/access), [CSESP](https://earthdata.nasa.gov/csesp), [MEaSUREs](https://earthdata.nasa.gov/measures)が開発段階。

	- [EGIST](https://earthdata.nasa.gov/esds/egist): Earth Science Data Systems Geographic Information Systems Team
	
		EOSDISの地球科学研究へ応用できるようにするために、GIS技術をもっと使っていこうと推進するチーム

	- [IMPACT]((https://earthdata.nasa.gov/esds/impact)): Interagency Implementation and Advanced Concepts Team

		外部機関とパートナー契約して、NASAのデータなどの資産を利用してもらえるようサポートするチーム

	- [Sea Level Change Portal](https://sealevel.nasa.gov/)
	
		科学ポータルは、研究および分析プログラムと協力して、特定のトピックに関する情報に包括的に対処する。最初のプロジェクトは海面上昇のトピックに対応したポータル。


2. Earth Science Data and Information System(ESDIS) Project

	[Earth Science Data and Information System (ESDIS) Project](https://earthdata.nasa.gov/esdis)

	科学調査員主導の処理システム（[SIPS](https://earthdata.nasa.gov/sips)）、分散アクティブアーカイブセンター（[DAAC](https://earthdata.nasa.gov/daacs)）、およびEOSの陸域・大気に近いリアルタイム機能（[LANCE](https://earthdata.nasa.gov/lance)）を含むEOSDISの運用が責務。

	ESDISはプロジェクト名で、[EOSDIS](https://earthdata.nasa.gov/eosdis)はシステム名。

3. [Commercial Smallsat Data Acquisition Program(CSDA)](https://earthdata.nasa.gov/esds/small-satellite-data-buy-program) 
	
	民間セクターの小型衛星の画像とデータを探し、評価し、取得するためのプログラム。NASAの地球科学研究とその応用に役立てることが目的。

4. [Harmonized Landsat Sentinel-2](https://earthdata.nasa.gov/esds/harmonized-landsat-sentinel-2) 

	LandsatとSentinel-2のデータを統合して分析可能にした製品を作るプログラム。

5. [MAAP: Multi-Mission Algorithm and Analysis Platform](https://earthdata.nasa.gov/esds/maap)

	NASAとESAの間の共同プロジェクトであり、地上のバイオマス研究をサポートするように設計されている。バイオマスのダッシュボードもこの１つ。

	[NASA, ESA Release Open-source Science Platform](https://www.nasa.gov/feature/nasa-esa-partnership-releases-platform-for-open-source-science-in-the-cloud)

	> MAAPは完全に機能しており、今後数か月でユーザーコミュニティを段階的に拡大していきます。2022年の春にMAAPバージョン2がリリースされると、データソースが追加され、科学者は地球科学の幅広い問題に取り組むことができます。 
	> MAAPの最初のアプリケーションは、地球の森林のサイズと炭素含有量を決定するための世界的な取り組みの一環として、地上のバイオマスの測定に焦点を当てています。

6. [ESDSWG](https://earthdata.nasa.gov/esdswg) 

	Earth Science Data System Working Groups の略称。ESFSの横断的なワーキンググループ。

## From Handbook

https://cdn.earthdata.nasa.gov/conduit/upload/11833/EOSDIS_Handbook_1.5.pdf

### System Architecture Overview

- 全体像

<img
  src={require('./img/earthdata_overview.png').default}
  alt="サイズ変えたい画像"
  style={{ width: '800px' }}
/>

　　　　　　　　　　　　　　　　　　出典：https://cdn.earthdata.nasa.gov/conduit/upload/11833/EOSDIS_Handbook_1.5.pdf

- DAACs

	NASAや他の研究機関、大学によって合計12ヶ所のデータセンターが運用されている。アーカイブ方法、配信方法は統一されている。
	また、EOSDIS common servicesへのデータ送信している。アーキテクチャはDAACそれぞれでミッションによって最適化されており、データタイプも異なるが、IFは統一されている。

- SIPS

	データをDAACで処理する（アーカイブ、配信など）ためのソフトウェアを開発している。
	DAACsに格納されたレベル0データをSIPSが取得し、上述のソフトウェアを通して、レベル1以上のデータに加工している。

- CMR

	CMRとは、DAACsのデータを検索し、取得するためのシステム。
	
	UMM:Unified Metadata Modelを通してメタデータを提供している。UMMはメタデータの表現方法をあらゆるデータで統一したもの。そのため標準的なメタデータ同士を変換できる。
	
	CMR APIの先にあるURSってなに？→User Registration System、つまりEarthdataのLoginを必要とする機能っぽい

	データがDAACで利用可能になるとメタデータが生成される。生成されたメタデータはCMRに送信され、クライアントが検出できるようにEOSDISカタログに取り込まれる。クライアントはAPIを使ってメタデータを検索したり取得できるようになる。

	CMRはEOSDISで用意しているデータやアプリのハブとして、利用者をナビゲートするシステムとなっている。

- Earthdata Web Site

	これは要するにEarthdataのサイトのこと。データや記事、ドキュメントやその組み合わせの検索や表示ができるダッシュボード。

	CMRを使ったデータ検索も可能。最新のニュースや情報とともにDAACsの情報を取得できるため、ユーザは探したい情報の関連データも取得できる。


- Earthdata Search

	[Earthdata Search](https://search.earthdata.nasa.gov/search)

	あらゆる角度でデータを検索できるサイト。Earthdata Web Siteの上記の子サイトみたいなイメージ。カテゴリ、特徴、キーワード、プラットフォーム、衛星、組織、プロジェクト、フォーマット、プロセスレベル、解像度などなど。

	CMRのメタデータも使える。S3からのダウンロードと直接ブラウザからダウンロードが可能。GIBSのタイル提供サービスを使っており、Webベースのマップを使ったデータ可視化ができる。→高速アクセスと高可用性が売り

	The Earthdata search client (http://search.earthdata.nasa.gov/) provides a familiar search interface exposing a map for visual spatial selection, calendar entries for time constraints, and a text field for free text searching.

- GIBS

	画像提供サービス。
	GIBS内部でデータを処理してモザイクタイルにし、それをWMS/WMTSサーバから配信している。
	[image:42CFE533-94A6-4BCF-9C5F-838D8EDE2C16-560-000006168C9CD33A/0C65D698-4019-4F16-AC43-5C45DCF19B1B.png]
	https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs

	WorldViewはGIBSからデータを取得しOpenLayersなどを使って可視化したソフトウェア
	OnEarthはrasterデータやvectorデータをフォーマットし、マップサーバとして提供できるように処理するためのライブラリ（サーバ側で稼働させる処理）
	→MRFデータを提供するサービスなので、サーバ側がリッチになっている

	WorldView(OpenLayer) -> OnEarth -> MRFデータ

- Worldview
	[EOSDIS Worldview](https://worldview.earthdata.nasa.gov/?)
	OSSのwebアプリで、衛星画像をインタラクティブに確認し、ダウンロードできる。
	ダウンロードするときはEarthdata Searchに飛ぶ。
	Worldviewではデータをレイヤーで重ねて表示したり、可視化結果を比較したりできる。
	また、時間変化具合をアニメーションとして再生して表示できる。
	[GitHub - nasa-gibs/worldview: Interactive interface for browsing global, full-resolution satellite imagery](https://github.com/nasa-gibs/worldview)
	強みは、観測後３時間以内にはWorldViewで見れるようになること。
	モバイル端末からもアクセスできるよう最適化されている。

	WMTSサーバへのリクエスト↓
	`https://gibs-b.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2021-09-30T00:00:00Z&layer=Reference_Features_15m&s`

	CMR使っている↓
	`https://cmr.earthdata.nasa.gov/search/granules.json?`

	データをダウンロードしようとするとEarthdataSearchに飛ばされる



### ESDISとEOSDIS

EOSDISというシステムを管理している組織。EOSDISは科学データを処理し格納し、配信している。

そのデータを扱うためのツールも提供している。[Data Tools | Earthdata](https://earthdata.nasa.gov/earth-observation-data/tools)

衛星データや航空データ、フィールドデータなど多種類のデータを利用できるようになっている。

DAACsのデータはネットワークを介して、さまざまな科学研究に使えるようになっている。

These capabilities include: 

- generation of higher level (levels 1-4) science data products for EOS missions
- archiving and distribution of data products from EOS and other satellite missions


### Key System Functions

- Ingest

	データプロバイダからDAACsやCMRにデータを格納する時の話。
	Ingest mechanisms are highly customized based on the needs of the data provider and the type of data being provided to the DAACs.

- Science Data Processing

	Level 0: raw data
	
	Most data sets are processed to Level 1B, which is calibrated and geolocated radiance.
	画像の切り出し、感度調整、結像、歪みの除去など補正が主になる

	Level 1B is processed to Level 2, which are geophysical parameters

	As a result, many of the science teams also create Level 3 products that aggregate the data files in space (i.e., on a regular grid) and time (e.g., averaged over a day or month) as shown in Figure 15. These files are generally easier for many users to work with, but usually at the cost of spatial resolution.