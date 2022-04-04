---
sidebar_position: 2
---

# Spacetech companies

---

## a.i. solutions

### 会社概要

- HP：https://ai-solutions.com/
- 設立：1996、アメリカ
- 規模：社員数 500 人以下

### サービスの特徴

国の宇宙および防衛機関をサポートし、宇宙ミッションエンジニアリング、ロケットサービス、ミッションシステム保証、および FreeFlyer® 宇宙力学ソフトウェアにまたがる製品とサービスを製造。ソフトウェア開発だけなく、ミッションのモデリングとシミュレーションもサービスとして提供。

#### Mission Engineering & Technology

- ミッションライフサイクル全て（衛星運用、飛行解析、地上局システム開発など）に関わるエンジニアリング
- ミッションのモデリングとシミュレーションサービス（spacecraft flight dynamics analysis and algorithm development for flight projects, formation and constellation design, coverage and communication analysis, launch window analysis and sensor monitoring）
- 品質マネジメント関連の証明を受けている（certified to CMMI Level 3 and AS9100 standards）
- 軌道と姿勢の決定、マヌーバ計画、追跡、データ取得・評価、衝突リスク評価の分析と回避操作ができる

#### Mission Systems Assurance

- ミサイル防御や宇宙機への攻撃を防ぐためのサービスを提供
- マテリアルエンジニアリングに必要な、偽造部品の検出、防止、材料の陳腐化の検出評価を提供
- サプライチェーンマネジメントに関わるシステム構成の監査と立証、リスク評価、飛行テスト計画なども実施

#### Launch Service

- ロケットエンジニアリング、分析、サポートを提供
- 例えば飛行計画、構造ダイナミクス、GNC などなどの専門知識を提供する End2End のサービス
- 33 の NASA ミッション、297 の打ち上げ操作、および 100,000 時間以上のテレメトリ記録をサポートして、99％を超える稼働率を達成

#### Space Software Application

- MERIDIAN：Flight Dynamics Operator
  225 を超えるミッションで使用される宇宙ミッションの設計、分析、および運用ソフトウェアである FreeFlyer がパッケージ化されいる。
  軌道決定、操縦計画、軌道伝搬、軌道イベント（日食、センサー侵入、表示期間、太陽通過など）、軌道比較、操縦キャリブレーション、および寿命分析が含まれる。

<img
src={require('./img/aisolutions_meridian.png').default}
alt="サイズ変えたい画像"
style={{ width: '800px' }}
/>

- OBSSIM:OBSSIM：Observation Simulator
  FreeFlyer を利用した物理ベースの観測データを生成し、米国の宇宙監視ネットワーク（SSN）の地上および宇宙ベースのセンサーをシミュレートできる。モデル化された物理的制限には、太陽光照明の制約、範囲の制約、センサーのスルーレート、センサーの滞留時間が含まれる。

<img
src={require('./img/aisolutions_obssim.png').default}
alt="サイズ変えたい画像"
style={{ width: '800px' }}
/>

- ATLAS Displays
  ミッションを可視化できる。https://ai-solutions.com/atlas/

- DSTE
  軌道設計ができる。https://ai-solutions.com/dste/

#### FreeFlyer

- 宇宙ミッションの設計、分析、運用などミッションの全てのフェーズで利用できるソフトウェア。Youtube で使い方を公開している。顧客のソフトに組み込んで API 利用できる。
  デスクトップソフトウェアとしても使える。ライセンス型で利用可能。
- NASA や NOAA なども活用し、ISS や GNSS でもこのソフトウェアが使われている（https://www.youtube.com/watch?v=OW4pq3C3UCw&ab_channel=aisolutionsinc）。
  この動画によると，衛星の姿勢などもモデリング出来るとあるので，物理エンジンを使っていそう。

### 顧客・パートナー

NASA、NOAA、US Air Force、US Space Force、衛星ベンダーなど。

---

## AGI

### 会社概要

- Multi-domain mission-level software for system design, operations, and analysis
- Exton アメリカ

### プロダクト

主に４つのプロダクトを開発している。

- STK – Systems Tool Kit
- ODTK – Orbit Determination Tool Kit
- TETK – Test and Evaluation Tool Kit
- Moxie – Moxie

また、パートナー企業の COMSPOC も代理販売している。

### ソリューション

衛星運用に関連しそうな Solution は以下。

- AGI: Space Operations

  - ミッションの計画、設計、構築、運用をするための単一プラットフォーム
  - プロトタイプ・シミュレーションによって設計段階で実現可能性をテストできる
  - 運用中の正確なモデリングにより、安全な運用を維持できる
  - 軌道設計には STK Astrogator が利用できる
  - 観測に基づいた軌道推定には ODTK が利用できる
  - 操縦計画策定には STK Astrogator が利用できる

- AGI: Space Situational Awareness

  - 宇宙のどこに何があるかがまとまっているサービス
  - COMSPOC：衛星やデブリを追跡するツール？サービス？
  - SOTA(Space Object Threat Assesment)：衛星のリスクと脆弱性を評価
  - SSA software suite：このサービスのエンタープライズパッケージ

### STK

AGI: Systems Tool Kit (STK)

システムを分析し可視化するためのプラットフォーム。航空宇宙、防衛、電気通信などのデータを利用する。
ミッションをシミュレーションし、レポート出力や 3D 可視化、グラフ作成などを実施する。
基本はデスクトップアプリ。

- STK Pro がコア機能と可視化機能を持っている。モデルを構築するか取り込み、宇宙を模した環境に適用し、シミュレーションを実行できる。
- STK Systems Bundle で物理モデルの強化や統合ができ、環境の忠実度を高められる。
- STK Specialized Modules でドメイン固有の機能を自由に追加できる。また他のアプリと連携させられる。
- STK Cloud によりブラウザで利用することも可能。AGI STK Cloud
- STK Cloud なら 21 日間の無料の試用版が使える．https://licensing.agi.com/stk/
- STK SatPro でより精密な軌道変化を計算できる。
- STK Astrogator で衛星の操縦や軌道設計ができる。
- STK SOLIS で衛星自体の姿勢や熱などサブシステムを統合してシミュレーションできる。
- STK SEET 宇宙機に与える影響をシミュレーションできる。

### ODTK

AGI: Orbit Determination Tool Kit (ODTK)

軌道決定ソフトウェア。さまざまな形式の追跡データを読み込み、軌道を計算できる。実データがないミッション設計フェーズでも、シミュレーションによる計算が可能。

---

## Bright Ascension

### 会社概要

- HP： https://www.brightascension.com/products/
- 設立：2011、イギリス
- 規模：社員数 50 人以下

### サービスの特徴

宇宙業界だけでなく他のハイテク業界にも精通し、高性能なソフトウェアや衛星、サブシステムを提供。主要プロダクトとしては以下の二つ：

- Mission Control Software: 宇宙機の監視とコマンド送信、自動操作ができるソフトウェア。様々な地上局と繋げられる IF を持つ。
- Flight Software Development Kit: 用意したコンポーネントを使って宇宙機の飛行ソフトを作成できる開発環境（コンポーネント、フレームワーク、テストツールなどを提供）。

SI のように顧客特化のソフトウェアやハードウェア開発、コンサルもやっている。

### 顧客・パートナー

顧客は不明、インフォステラと提携している。

---

## GMV

### 会社概要

- HP：https://www.gmv.com/en/
- 設立：1984、スペイン
- 規模：2000 人、300 億円の売り上げ（2019 年）
- 航空宇宙、防衛・安全保障、サイバーセキュリティ、高度道路交通システム、自動車、電気通信、IT など、多岐にわたる分野で行政機関や大手企業を対象に取引を行っている

### サービスの特徴

そのうち、宇宙関連としては、商業通信衛星の管制センターを提供する世界初の独立サプライヤーであるとともに、衛星ナビゲーションシステム（EGNOS や Galileo など）の分野で欧州をリードしている存在。山ほどサービス/ツールがある…。ただ全てが新しくて力を入れている、というわけではなさそう。

- Space Segment:
  - Mission Analysis and Systems Engineering
    - 軌道設計・分析・ミッション解析：astrotool, orbimat, eotool
  - Guidance, Navigation and Control Systems (GNC)
    - 飛行、ランデブー、再突入、探査などのシナリオ作成、GNC の設計開発検証：gncde, platform, moonhound, optlab,cleon
  - Autonomy and Robotics
  - Satellite and Mission Simulators
    - Sentinel などで使われている
    - ミッションパフォーマンスシミュレータ：様々な観点からミッションのパフォーマンスを測定
    - 機器性能シミュ：ミッションの要件と比較して、機器のパフォをチェック
    - 運用衛星シミュ：ミッション制御システムのテストや地上局との運用手順の検証などに使われるシミュレータ
  - On-Board Software and Independent Validation
- Satellite Navigation Systems:
  - Satellite Navigation Systems Engineering
  - Satellite Navigation Algorithms
  - Large Navigation Processing Facilities and Navigation Signal Generation
  - Precise Positioning and Augmentation Solutions
  - GNSS Tools Development
  - GNSS Receiver Development
  - GNSS-based Applications Development
- Ground Segment:
  - Ground Segment Design and Integration
  - Ground Control Systems
  - Earth Observation Payload Data Processing Systems
  - Science Operation Centers
  - Payload Management Systems for Telecom
  - Ground Stations Monitoring and Control Systems
  - Flight Dynamics Systems
  - Mission Planning Systems
- Data Processing:
  - Instrument Prototype Processors
  - Operational Instrument Processing Facilities
  - Calibration and Quality Control Systems
  - Hosted Processing Systems

使われてはいそう ↓

- https://twitter.com/infoGMV_es/status/1365225369373007874
- https://twitter.com/infoGMV_es/status/1365225369373007874
- https://twitter.com/infoGMV/status/1364862869163159552
- https://twitter.com/infoGMV/status/1364862869163159552

### 顧客・パートナー

https://www.gmv.com/en/Sectors/space/references/

- Space Agencies: NASA、ROSCOSMOS、ESA、INTA スペイン、DLR ドイツ、CNES フランス
- 地球観測：Aemet、Eumetsat、NOAA など
- 通信衛星：多数
- そのほか：三菱電機、ボーイング、ロッキードマーチンなど多数

---

## Spaceit

### 会社概要

- HP：https://spaceit.eu/
- 設立：2015 年、エストニア
- 規模：社員数 10 人以下

### 背景

ミッションコントロールのソフトウェアやオペレーションは、現在でも衛星のミッションごとに一から開発されているものがほとんどで、
このようなソリューションに関連するコストは、ミッション全体の予算 50%に達することもあり、大きな投資となっている。
Spaceit はこの部分の一気通貫のサービスを使うことで、コストの最大 80%減に貢献している。

### サービスの特徴

サービスとして Mission Control、Ground Stations、Supportive Tools and Services を提供している

- Mission Control

  衛星‐地上間通信のソリューション「Mission Control as a Service」を提供

- Ground Stations

  地上局サービスのブローカー（マーケットプレイスとして機能している）

- Supportive Tools and Services

  SatOpSim: 衛星運用シミュレーターとして衛星開発のテストに利用できる。サイバー攻撃の防御もシミュレートできる。

### 顧客・パートナー

    インフォステラと提携。
    ESA Space SolutionsとESA BIC Estonia、Starburst Acceleratorから投資を受けている。
    2019年6月に $135K = 1500万円くらいの投資を受けている（https://pitchbook.com/profiles/company/433492-03#overview）。

    また、ESAとサイバーセキュリティ衛星シミュレータの契約をした（https://news.err.ee/1160765/estonian-companies-sign-european-space-agency-cyber-security-deal）。
    CybExer TechnologiesとCGI Estoniaという会社とコンソーシアムを組んでサイバーセキュリティ周りの衛星シミュレータを開発している。

---

## KUBOS

### 会社概要

- HP：https://www.kubos.com/
- 設立：2014、アメリカ
- 規模：社員数 10 人くらい、$2.8M=3 億円の資金調達

### サービスの特徴

Major Tom Platform というサービス名。
どんな衛星でもどんなコンステでもサポート対象
管制コントロールサービスとしてクラウドベースで作られている。他のアプリやサービスと連携させて使える。地上局パートナーと組んでサービスを使えるようにしている。
Azure の地上局サービスと提携している会社の１つ。
かなり作り込まれていそうでいろいろ書いてあるが更新されているかどうかが不明。
KubOS がオープンソースとして Github で開発されているのでソースコードを読むことはできる。

### 顧客・パートナー

DARPA、Planet、Azure、NASA

すでにいくつかの衛星で使われている

---

## Mission Control Space Services inc

### 会社概要

- HP：https://missioncontrolspaceservices.com/
- 設立：2015、カナダ
- 規模：社員数 11-50 名

### サービスの特徴

マイクロローバーのソフトウェアとそれを地上から管理する MCaaS を開発している。
ローバーに乗せるソフトウェアに AI を導入しているっぽい。
MCaaS は従量課金。
2019 年に 2500 万円の資金調達。

### 顧客・パートナー

インドの研究機関と提携している。

---

## KRATOS

### 会社概要

- HP：https://www.kratosdefense.com/
- 設立：アメリカ
- 規模：1000~5000 名

### サービスの特徴

NationalSecurity や通信関連のシステムやプロダクトを扱う大企業。注力分野は、unmanned systems, satellite communications, C4ISR, warfighter training and combat systems.

- Webic：web ベースのサービス．EPOCH と同等の機能を持つ．

- EPOCH IPS：LEO, GEO, 深宇宙向けのコマンド＆コントロールサービス。スカパーも使っている。JAXA として標準になるかも。

  https://www.kratosdefense.com/products/space/satellites/command-and-control/epoch-ips

- quantumCMD：小型衛星向けのコマンド＆コントロールサービス。

  https://www.kratosdefense.com/products/space/satellites/command-and-control/quantumcmd

- OASYS：宇宙船ミッション分析環境を提供するサービス（軌道決定とか衝突回避とか）

  https://www.kratosdefense.com/products/space/satellites/command-and-control/oasys

### 顧客・パートナー

NASA、Azure と提携

---

## exotrail

### 会社概要

- HP：https://exotrail.com/
- 設立：2017 年、フランス
- 規模：30 人、22 億の資金調達

### サービスの特徴

小型衛星が宇宙を移動するためのサービスを展開している。

- ExoMG：小型衛星に取り付ける推進スラスタ製品。物理的なプロダクト。
- ExoOPS：上記スラスタと連携して、ミッションシミュレーションおよび操作ができるソフトウェア。
- SpaceVan：軌道移動ビークル。

ExoOPS は ExoMG 専用のツールっぽい。汎用性はなさそう。

### 顧客・パートナー

Airbus や EC から支援を受けている

---

## Hypergiant

### 会社概要

- HP：http://www.hypergiant.com/
- 設立：2018 年
- 規模：社員 200 人以下

### サービスの特徴

http://interactive.satellitetoday.com/via/october-2020/10-ways-ai-is-making-a-difference-in-the-satellite-industry/
の記事の一部より ↓

> 高い精度で低軌道（LEO）内の衛星と破片の位置を予測する、ML ベースの軌道予測アルゴリズムを実装している。
> また、畳み込みニューラルネットワークを介して、衛星自体にオブジェクトの検出、分類、およびローカリゼーションのアルゴリズムを実装。
> これにより、衛星は、地上局からの通信を待たずに、搭載されたセンサーで観測した物体を識別して応答することができる。
> 衛星と地上システムを自動的に監視、保守、およびタスクするアルゴリズムを開発し、衛星コンステを管理するオペレーターを支援しようとしている。

### 顧客・パートナー

NASA、SAP、NVIDIA、Adobe など
