# Flow と Cadense について

## Cadense のプレイグラウンド

スマートコントラクトを実際に書いて試せる Palyground を Flow 公式が用意している ↓

https://play.onflow.org/local-project

## Cadense の特徴

- 強力な静的型付け言語

  Swift や Kotlin、TypeScript など最近の構文を取り入れている

- リソース志向プログラミング

- 関数とトランザクションの前後条件

  関数とトランザクションの前後に条件を記述して、テストができる

- 更新可能

  一定の条件下でコントラクトをアップデート可能

## 開発する時には

### 参考にできるソースコード

- Cadense で書かれた NFT マーケットプレイスのサンプルプロジェクト

  https://github.com/onflow/kitty-items

  これをベースに自社サービス用にカスタマイズすれば OK なのかも

- NBA Top Shot のコントラクトの実装

  https://github.com/dapperlabs/nba-smart-contracts

- FanTop のコントラクト部分

  https://github.com/mediadotech/smart-contracts

### Flow の人がレビューしてくれる

- 自分で開発したスマートコントラクトは、最終的にセキュリティ上のリスクがないか Dapper Labs 社の Flow チームが直々にチェックしてくれる
- レビューの過程では、それぞれの定義の要件やどのように設計したのかを文面で確認されるそう
- 最終的に OK になれば、Flow の人がメインネットにデプロイしてくれる

### テストネット

- Flow のテストネット：https://docs.onflow.org/concepts/accessing-testnet/

# 参考

- [Flow ブロックチェーンと Cadence 言語の実用 ― FanTop の裏側](https://techdo.mediado.jp/entry/2022/05/11/150000)
