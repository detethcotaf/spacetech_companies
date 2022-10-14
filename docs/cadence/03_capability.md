## Capability の使い方

- Capability とは

  - アカウントのストレージにアクセスするには、そのアカウントの所有者から明示的に許可を取る必要がある
  - その許可は Capability という外部への公開 API のようなものを作ることで可能になる
  - アカウントの所有者がトランザクションとしてストレージへの Capability を作成し、署名・実行することで外部ユーザーはその Capability を使えるようになる

- Capability の作り方

  - トランザクションを作成する
  - link 関数を使いアカウントのリソースオブジェクトへのパブリックリンクを作成する
  - そしてそのリンクを使いリソースオブジェクトへの参照権限を一時的にもらい、hello()関数が呼び出せるようになる
  - ただし、リソースオブジェクトの移動や destroy、コピー、変更などはできない

  ```cadence
  import HelloWorld from 0x01

  transaction {
    prepare(account: AuthAccount) {
      /* capabilityを生成
         /public/にCapabilityを配置し、targetで対象のリソースを指定している
         referenceを得るだけなので型で&を利用している
      */
      let capability = account.link<&HelloWorld.HelloAsset>(/public/HelloAssetTutorial, target: /strorage/HelloAssetTutorial)

      /* borrowメソッドを使ってリソースへのリファレンスリンクを生成している
      */
      let HelloReference = capability!.borrow()
        ?? panic("Could not borrow a reference to the hello capability")

      /* リソースのメソッドを使用
      */
      log(helloReference.hello())
    }

    /* helloReferenceはトランザクションの最後に自動的に破棄されるため、明示的な操作は必要ない
    */
  }

  ```

  - capability の生成コードについて

    - link を生成する時には、&を使って型を指定している。これでポインタのように参照していることを示している。
    - ここでは HelloAsset の link を生成しているので、HelloAsset が持つオブジェクト全てにアクセスできるようになる。
    - なお、`account.link<&HelloWorld.HelloAsset>`で指定した型は、リンク先のオブジェクトのサブタイプでなければならず、それ以外のフィールドや関数は含められない。

  - borrow メソッドについて

    - borrow()メソッドはリソースや Capability に対して利用できる
    - 上記では force-unwrap と`??`によるチェインを使っている
    - これはストレージが空だったり、すでに borrow していたり、型が許可されているものを超えていた場合、`nil`になるため。
    - つまり、一度 borrow したら nil になるため、たとえば上記トランザクションコードの２回目の実行時には `Error > unexpectedly found nil while forcing an Optional value` というエラーが発生する
    - このように一度 borrow した後は nil になる制約は、リエントランシー攻撃（reentrancy attacks）という攻撃手法を防ぐために作られている。
    - リエントランシー攻撃は一度のトランザクションで同じオブジェクトを複数回呼び出し悪意ある攻撃（たとえば何度もリソースを引き出す）をすること。上記の制約によりオブジェクトは一度のトランザクションで１つしか link できないため防ぐことができている。（という理解であっている？？）
    - リエントランシー攻撃については　[スマートコントラクトセキュリティ講座〜リエントランシー編〜Qiita]（https://qiita.com/Ogtsn99/items/559ffaed745af971856f） が分かりやすい。

  - オブジェクトのオーナー側は link されているオブジェクトを移動したり、link を破壊したりできる。

- scripts を使って capability を利用する

  - public 領域に生成された capability は誰でも使える
  - その capability を scripts を使って利用することができる
  - scripts とは
    - ブロックチェーンへの書き込みはできず、アカウントやコントラクトの状態だけを読み取れる
    - アカウントの許可なく実行するため、signer などはいない
  - scripts の例

  ```cadence
  import HelloWorld from 0x01

  pub fun main() {
    /* PublicAccountオブジェクトを取得（※AuthAccountとは異なり、public領域にしかアクセスできない）
    */
    let helloAccount = getAccount(0x01)
    /* アカウントオブジェクトのgetCapabilityメソッドを使ってpublicのCapabilityを取得
    */
    let helloCapability = helloAccount.getCapability<&HelloWorld.HelloAsset>(/public/HelloAssetTutorial)
    /* Capabilityをborrowし、リソースオブジェクトへのlinkを得る
    */
    let helloReference = helloCapability.borrow()
        ?? panic("Could not borrow a reference to the hello capability")
    /* リソースオブジェクトのメソッドを利用する
    */
    log(helloReference.hello())
  }
  ```

  - `helloCapability.borrow()`は force-unwrap になっていないので optional 型ではない？ただの書き忘れ？
