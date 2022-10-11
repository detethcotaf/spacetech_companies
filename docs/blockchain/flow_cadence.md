# Flow と cadence について

## cadence のプレイグラウンド

スマートコントラクトを実際に書いて試せる Palyground を Flow 公式が用意している ↓

https://play.onflow.org/local-project

## cadence の特徴

- 強力な静的型付け言語

  Swift や Kotlin、TypeScript など最近の構文を取り入れている

- リソース指向プログラミング

  リソースが一度に一箇所にしか存在できない、コピーできない、削除されない、といった特徴がある。これによってデジタルの所有権をモデリングしやすくなっている

- 関数とトランザクションの前後条件

  関数とトランザクションの前後に条件を記述して、テストができる

- 更新可能

  一定の条件下でコントラクトをアップデート可能

- 最小権限の原則

オブジェクトへのアクセスは所有者と参照を持つものに制限される

## 理解しておくべき用語

- アカウント

  ユーザーが持っているアカウント情報。通常はウォレットに格納して利用できる。

- コントラクト

  cadence におけるコントラクトとは、各アカウントのストレージに格納されているインターフェース、構造体、リソース、データ（アカウントの状態）、利用できる関数をひとまとめにしたもの。

- アセット

- リソース

- トランザクション

  コントラクトをオンチェーンで実行した結果。

## アカウントの特徴

Flow のアカウントは２つの領域に分かれている。

- コントラクト領域

  - スマートコントラクトのプログラムを格納する領域
  - アカウントの所有者はここにコントラクトを保存し、更新できる
  - トランザクションはこの領域には直接アクセスできない
  - 他のコントラクトから利用できるようインターフェースを定義している必要がある

- ファイルシステム

  - アカウントが所有するオブジェクトとそのアクセスを制御できる capabilities（実行可能な関数の一覧）を格納できる
  - トランザクションによってアクセスできる
  - ファイルシステムの root として `storage` `private` `public`という３つのドメインだけ指定できる。
    - `storage`: 全てのオブジェクト（token や NFT など）を保存する。アカウントの所有者のみがアクセスできるようになっている
    - `private`: アセットの capabilities（実行可能な関数の一覧）を保存する。capabilities の中の関数を使ってオブジェクトの参照などが可能になる。アカウントの所有者とアクセス権を持っている人だけがアクセスできる。
    - `public`: ネットワーク内の誰もがアカウントの情報を参照できるような capabilities（実行可能な関数の一覧）を保存する。

`private`と`public`の関数を使ってトランザクションコードを作成し、`storage`へアクセスするイメージ。

## コントラクト

https://developers.flow.com/cadence/language/contracts

cadence におけるコントラクトとは、各アカウントのストレージに格納されているインターフェース、構造体、リソース、データ（アカウントの状態）、利用できる関数をひとまとめにしたもの。

コントラクトは、アカウントのオーナーが追加、更新、削除できる。

加えて、Authorized Accounts も `contracts`オブジェクトを使えば、追加、更新、削除できる。

コントラクトのサンプル：

```cadence
pub contract HelloWorld {

    // Declare a stored state field in HelloWorld
    pub let greeting: String

    // Declare a function that can be called by anyone
    // who imports the contract
    pub fun hello(): String {
        return self.greeting
    }

    init() {
        self.greeting = "Hello World!"
    }
}
```

各アカウントのコントラクトは、トランザクションや他のアカウントから `import`することによって利用できる。ただし、`pub`がついている変数や関数のみ。

```cadence
import HelloWorld from 0x42

log(HelloWorld.hello())    // prints "Hello World!"
log(HelloWorld.greeting)   // prints "Hello World!"

// Invalid: Cannot call the init function after the contract has been created.
HelloWorld.init()    // Error
```

`pub`以外にも細かくアクセス制御ができる。詳細は https://developers.flow.com/cadence/language/access-control に記載されている。

pub / access(all) > access(account) > access(contract) > private

の順にスコープが狭くなる

## トランザクション

https://developers.flow.com/cadence/language/transactions

トランザクションとしてオンチェーンで実行させたいプログラム。取引に関係するアカウントのコントラクト（コード）を使ってプログラムが実装される。
このプログラムに対して秘密鍵による承認を実行することで、承認したアカウントのストレージへのアクセスを許可するという仕組み。承認者は authorizers や signers と呼ばれる。
例えばアカウント A とアカウント B で NFT の所有者を変更したい時には、アカウント A と B でトランザクションを承認(sign)する必要がある。

トランザクションコードの例：

```cadence
import HelloWorld from 0x01

transaction {
	prepare(acct: AuthAccount) {}

    // In execute, we simply call the hello function
    // of the HelloWorld contract and log the returned String.
	execute {
	  	log(HelloWorld.hello())
      log(HelloWorld.greeting)
	}
}
```

## リソース

リソースは、構造体や Class に似ている cadence 独自の考え方。
違いはコピー不可な点。コピーができないことで、所有権を表現することに使える。

リソースは以下のルールに従うよう作られている。

- １つの場所にだけ存在できる（コピーして同時に複数の場所に存在することはできない）
  - 場所とは、アカウントのストレージや、関数実行中の変数の中、コントラクトのストレージフィールドなどを指す
- リソースはアクセスがあったときに確実にある場所から他の場所への移動しなければならない（アクセスがあったとき？？？）
- リソースはスコープの外側には移動できない。どこかに保存するか、破壊するかを明示しなければならない。

このルールに従うことで、コーディングミスによるリソースの紛失やリソースのコピーを防ぎ、所有権の主張ができる状態を生み出している。

Cadence では、リソース（≒ アセット）をアカウントのストレージに保存し、アセットの所有権をアカウントに直接結びつけている。トランザクションが稼働するマシンのストレージを使わないため、アカウント間で自由にアセットを転送できる。イーサリアムなどでは、所有権がスマートコントラクトに保存されるため、アセットの追跡のために全てのスマートコントラクト（つまりトランザクション）を検索する必要がある。

リソースの実装のためには、

- `createXXX`
- Move operater `<-`
- [Account Storage API](https://developers.flow.com/cadence/language/accounts#account-storage-api)

を使える必要がある。

```cadence
pub contract HelloWorld {

    // Declare a resource that only includes one function.
    pub resource HelloAsset {

        // A transaction can call this function to get the "Hello, World!"
        // message from the resource.
        pub fun hello(): String {
            return "Hello, World!"
        }
    }

    // We're going to use the built-in create function to create a new instance
    // of the HelloAsset resource
    // HelloAssetのインスタンス化
    pub fun createHelloAsset(): @HelloAsset {
        return <-create HelloAsset()
    }

    init() {
        log("Hello Asset")
    }
}
```

### createXXX

コントラクトやリソース、構造体などの型定義の際には、その型をオブジェクトとして生み出したときに一度だけ実行できる処理`init`を持つことできる。
cadence では全ての型要素を初期化することを求めているため、型要素を持っているオブジェクトの場合は init にて初期化する実装が必要になる。

コントラクトはアカウントのストレージへの読み書きアクセスを `self.account` オブジェクトを使って実装できる。
このオブジェクトは `AuthAccount object`と呼ばれ、アカウントのストレージを操作するための関数にアクセスできる権限を持っている。

このリソースは定義されたスコープ内でのみインスタンス化できる。これは他の人がこの定義されたリソースをインスタンス化できないようにするための措置。

```
pub fun createHelloAsset(): @HelloAsset {
    return <-create HelloAsset()
}
```

@マークはそれがリソースオブジェクトであることを示している。

そして return の部分で、`create`を使って HelloAsset リソースをインスタンス化している。

### Move operater `<-`

`<-`によってコピーではなく、「移動」を表現している。

`<-`は以下のときに利用される。

- リソースが初期化（インスタンス化）されるとき
- リソースが別の変数に設定されるとき
- リソースが関数の引数として渡されるとき
- リソースが関数から返されるとき

```cadence
var fist_resource: @HogeResource <- create AnyResource()

var second_resource <- first_resource
```

上記の例の場合、second_resource にリソースインスタンスが格納されたら、first_resource には何も入っていない状態になる。

→ その場合 first_resource は None になるわけではなく、そもそも first_resource は存在しないことになり、アクセスできなくなる

### トランザクションでリソースを扱う

- ユーザーがデプロイしたコントラクトはあくまで関数を定義しただけで、リソースを生成したわけではない
- リソースの生成や移動はトランザクションで実装する必要がある

- 以下のコードでリソースを生成し、AuthAccount、つまり 0x01 に保存できる

  ```cadence
  import HelloWorld from 0x01

  transaction {
    prepare(acct: AuthAccount) {
      /* Assetを生成し、newHelloに格納 */
      let newHello <- HelloWorld.createHelloAsset()
      /* アカウントのストレージにnewHelloを移動する */
      acct.save<@HelloWorld.HelloAsset>(<-newHello, to: /storage/HelloAssetTutorial)
    }

    execute {
      log("Saved Hello Resource to account.")
    }
  }
  ```

- prepare について

  - prepare では、トランザクションを秘密鍵で承認したアカウントのストレージにアクセスできる
  - AuthAccount オブジェクトを通じてそのアカウントに何をするかをコーディングする
  - 上記では例えば、acct.save を使って、newHello というアセットを保存（移動）している
  - prepare では、capabilities が保存された `/private/`と`/public/`へのリンクを作ることもできる
  - capabilities には、そのアカウントに対して実行できる関数がコーディングされている

- リソースの移動について

  - ここでは AuthAccount のメソッドを使ってリソースを移動している
  - 使い方は `AuthAccount.save<T>(_ value: T, to: StoragePath)`
  - 詳細は、[account storage API](https://developers.flow.com/cadence/language/accounts#account-storage-api)に記載されている
  - T はリソースオブジェクトの型を設定しないといけないため、ここでは newHello の型、つまり `@HelloWorld.HelloAsset` になる
  - 指定した移動先にすでにデータが存在していたり、newHello にリソースが存在しない場合は、プログラムが止まるようになっている
  - そのためパスコンフリクトが置きないように、ユニークで明確なパス名を指定する必要がある

- アカウントに保存したリソースを読み込む

  ```cadence
  import HelloWorld from 0x01

  transaction {
      prepare(acct: AuthAccount) {
          /* ストレージからリソースを読み込み、helloResourceに移動する */
          let helloResource <- acct.load<@HelloWorld.HelloAsset>(from: /storage/HelloAssetTutorial)
          /* リソースのhelloメソッドを使ってみる
             この時、オプショナルチェイン（?）を使っており、値がloadできない場合はnilになる
          */
          log(helloResource?.hello()) // helloResourceがnilの場合はlogの結果もnilになる

          /* helloResourceはOptionalなのでnilの可能性がある
             !を使うことで、値があればそのまま実行し、nilであればトランザクション自体を止めることができる
          */
          acct.save(<-helloResource!, to: /storage/HelloAssetTutorial)
      }
  }

  ```

  ストレージからリソースを取得した時には、その値は optional 型で return される。optional 型とは、元々の値の型と nil のどちらも保持した型を指す。
  そのため、helloResource を使うときはオプショナルチェイン（?）を使って、helloResource を unwrap しないと hello()は使えない。
  ?をつけずに hello()を使おうとすると

  ```
  value of type `HelloWorld.HelloAsset?` has no member `hello`. unknown member
  ```

  というエラーが発生する。
  なぜなら optional 型としては hello 関数を持っておらず、optional 型の中の HelloWorld.HelloAsset が hello 関数を持っているだけだから。

  acct.save の時も同じく、helloResource の optional 型のまま save に引数として渡すと optional 型のままストレージに保存されてしまう。!を使って force-unwrap しないと元々の値をストレージに格納することにはならない。

## Capability

- Capability とは

  - アカウントのストレージにアクセスするには、そのアカウントの所有者から明示的に許可を取る必要がある
  - その許可は Capability という外部への公開 API のようなものを作ることで可能になる

- Capability の作り方

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

## Cadence における NFT

### 概要

- ユーザーは NFT を自分のアカウントに保存する（他の言語とは異なるところ）
- NFT は型によって下記のリソース利用のルールが強制される
  - リソースの所有者は 1 人だけ設定できる
  - 事故や故意に関わらず複製できない
  - 事故や故意に関わらず紛失できない
- 上記のように NFT は自分のアカウントに保存され、リソース利用のルールが適用されることから、所有者は自分の NFT が安全であり、ユニークな所有者であることを証明できる
- NFT は互換性があるため、発行元のアプリやスマートコントラクトとは異なるものでも利用できる
  - [NFT Token Standard](https://github.com/onflow/flow-nft)として Flow 上の NFT のプロパティが定義されているため、互換性がある
- NFT は名前や画像などのメタデータを持っており、一般的には off-chain に格納される

  - on-chain にはメタデータが格納されている URL が指定されていることが多い
  - ただし、Flow では全てのメタデータを on-chain に格納することを目指しているらしい

### 一般的な NFT デプロイの流れ

1. NFT のコントラクトとリソースタイプをデプロイ
2. NFT オブジェクトを生成しアカウントストレージに保存
3. NFT コレクションオブジェクトをアカウントに保存
4. NFT を mint
5. アカウントから別のアカウントへ token を送るためのコレクションの ref を生成
6. NFT を transfer
7. scripts を使って各アカウントにおける NFT の状況を確認

### NFT の生成と移動

```cadence
pub contract BasicNFT {

    /* NFTのリソースタイプを定義 */
    pub resource NFT {
        pub let id: UInt64
        pub var metadata: {String: String}
        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
        }
    }

    /* NFTを作るためのメソッドをpublicに公開 */
    pub fun createNFT(id: UInt64): @NFT {
        return <-create NFT(initID: id)
    }

    /* NFTをID:1で生成し、ストレージに保存
       AuthAccountオブジェクトにアクセスしsaveメソッドを呼び出している */
    init() {
        self.account.save<@NFT>(<-create NFT(initID: 1), to: /storage/BasicNFTPath)
    }
}
```

- NFT はそれぞれでユニークな ID を持たせる必要がある
  - そのため、コントラクトで許可されていない限り、複製や統合はできない
- 上記のコードをデプロイすることでデプロイしたアカウントのストレージに NFT が保存される
- その NFT を transaction で borrow して存在していることを確認できる

```cadence
import BasicNFT from 0x01

transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&BasicNFT.NFT>(from: /storage/BasicNFTPath) != nil {
            log("The token exists!")
        } else {
            log("No token found!")
        }
    }
}
```

- NFT を移動する
  - transaction への署名者間で NFT の移動を実現できる
  - 移動するときには AuthAccount オブジェクトの load()と save()メソッドを使う

```cadence
import BasicNFT from 0x01

transaction {
  prepare(signer1: AuthAccount, signer2: AuthAccount){
    let nft <- signer1.load<@BasicNFT.NFT>(from: /storage/BasicNFTPath)
          ?? panic("Could not load NFT")

    signer2.save<@BasicNFT.NFT>(<-nft, to: /storage/BasicNFTPath)
  }
}
```

### NFT のコレクション

- 複数の NFT を１つずつ別々でパス管理するのは手間がかかる
- NFT を束ねて管理するにはコレクションというオブジェクトを利用できる

- コレクションとは
  　- コレクションはリソースの Dictionaries という形

  - 辞書形式で複数の NFT を一括で管理することになり、全ての key, value が同じタイプである必要がある
  - NFT を格納した場合は、辞書自体もリソース型として扱うことになり、複製不可などのルールも適用される
  - 例: `let myNFTs: @{Int: BasicNFT.NFT} = {}`
  - つまり、リソースがリソースを内包する形になり、これは Cadence の特徴的な機能と言われている

- コレクションの生成（コメントとして説明も記載）

```cadence
pub contract ExampleNFT {

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    // Tracks the unique IDs of the NFT
    pub var idCount: UInt64

    // NFTの型を定義、ここではメタデータなし
    pub resource NFT {
        pub let id: UInt64
        init(initID: UInt64) {
            self.id = initID
        }
    }

    // コレクションの所有者以外がコレクションを操作できるようにするためにinterfaceを定義
    // interfaceに含まれている関数のみを外部から利用できる（Capabilityをborrowする形で利用できる）
    pub resource interface NFTReceiver {
        pub fun deposit(token: @NFT)
        pub fun getIDs(): [UInt64]
        pub fun idExists(id: UInt64): Bool
    }

    // コレクションの定義
    pub resource Collection: NFTReceiver {
        // 辞書型として複数のNFTトークンを格納できる箱を用意
        pub var ownedNFTs: @{UInt64: NFT}

        // init()はCollectionリソース生成時に自動的に稼働する
        // init()内にてCollection内の全ての変数を初期化する必要がある
        // 初期化していない変数がある場合は `missing initialization of field `XXX` in type `ExampleNFT.Collection`. not initialized` というエラーが発生する
        init () {
            self.ownedNFTs <- {}
        }

        // withdraw
        // コレクションからNFTを取り出す関数
        pub fun withdraw(withdrawID: UInt64): @NFT {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedNFTs.remove(key: withdrawID)
                ?? panic("Cannot withdraw the specified NFT ID")

            return <-token
        }

        // deposit
        // NFTをコレクションに格納する関数
        pub fun deposit(token: @NFT) {
            // <-! としているので、もし渡されたidにvalueが既に存在していたらfailしてrevertする
            self.ownedNFTs[token.id] <-! token
        }

        // 引数として指定したidのNFTが存在するかチェックする関数
        pub fun idExists(id: UInt64): Bool {
            return self.ownedNFTs[id] != nil
        }

        // getIDsの結果は可変長の配列になるため、returnの型としては[]で要素の型を囲む記載になる
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys // keys関数でDictionary型のkeyを全て取得できる
        }


        // pubなしでdestroyを定義
        // コレクションを destroy するときにはその中身のリソースの扱いも定義しないといけない
        // リソースも destroy するか、別の場所に移動するか、の選択肢がある
        // ここでは辞書ごとdestroyしている
        destroy() {
            destroy self.ownedNFTs
        }
    }

    // コレクションの初期化関数
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    // mintNFT
    // idでNFTを生成（mint）し、idをインクリメント
    // 通常、mintができるのはリソースの所有者だけにする
    // ここでは実験のためにpubにしている
    pub fun mintNFT(): @NFT {
        var newNFT <- create NFT(initID: self.idCount)

        // ここでインクリメントすることでNFTがmintされるたびにidが変わり重複がなくなる仕組み
        self.idCount = self.idCount + 1

        return <-newNFT
    }

  // ExampleNFTコントラクトをデプロイした時の初期化処理
	init() {
        // パスの初期化
        self.CollectionStoragePath = /storage/nftTutorialCollection
        self.CollectionPublicPath = /public/nftTutorialCollection
        self.MinterStoragePath = /storage/nftTutorialMinter

        // IDの初期化
        self.idCount = 1

        // コレクションを初期化し、ストレージに格納
        self.account.save(<-self.createEmptyCollection(), to: self.CollectionStoragePath)

        // Capabilityとしてreferenceをpublicストレージに配置
        self.account.link<&{NFTReceiver}>(self.CollectionPublicPath, target: self.CollectionStoragePath)
	}
}
```

- interface と pub の違い

  - 利用できる関数を interface で制限するんじゃなくて pub は外す、じゃだめなのか？
    - interface に入っている関数は AuthAccount ではなくても実行できる（scripts などから利用できる）
    - 入っていない関数はトランザクションで sign したアカウントだけが使える
    - 一方で pub はコントラクトコード以外からでも関数を使えるようにするための接頭語
    - 例えば withdraw を pub ではなく priv にすると、コントラクトのオーナーであってもトランザクションで withdraw を使えなくなる
    - その場合、`` cannot access `withdraw`: function has private access ``というエラーが発生する

- 生成したコレクションを使って NFT を生成（mint）

  - 通常、mint ができるのはリソースの所有者だけに絞る
  - ここでは実験のために mintNFT 関数を pub にしている
  - 以下例ではその mintNFT を使って NFT を生成している

```cadence
import ExampleNFT from 0x01

transaction {
    // NFTReceiverの型としてreveriverRefを定義
    let receiverRef: &{ExampleNFT.NFTReceiver}

    prepare(acct: AuthAccount) {
        // getCapabilityしてborrowまでワンラインで実施
        // 0x01以外のsignerだったらpanicになる
        self.receiverRef = acct.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
            .borrow()
            ?? panic("Could not borrow receiver reference")
    }

    execute {
        // mintNFTを使って新たなNFTを生成
        let newNFT <- ExampleNFT.mintNFT()
        // interfaceであるdepositを使ってコレクションに生成したNFTを移動する
        self.receiverRef.deposit(token: <-newNFT)
        log("NFT Minted and deposited to Account 1's Collection")
    }
}
```

- コレクションを scripts で確認
  - Capability を使ってコレクションの情報を確認する

```cadence
import ExampleNFT from 0x01

pub fun main() {
    // public account objectを取得
    let nftOwner = getAccount(0x01)
    // Capabilityを取得
    let capability = nftOwner.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
    // Capabilityからrefをborrowする
    let receiverRef = capability.borrow()
            ?? panic("Could not borrow receiver reference")
    log("Account 1 NFTs")
    log(receiverRef.getIDs()) // IDを確認
}
```

- コレクション内の NFT を移動

  - コレクションをアカウントから別のアカウントのストレージに移動する
  - その場合は、まず送り先のアカウントでもコレクションの箱を持っている必要がある
  - 以下のトランザクションを 0x02 のアカウントで sign し実行することでコレクションの箱を生成できる

  ```cadence
  import ExampleNFT from 0x01

  transaction {
      prepare(acct: AuthAccount) {
          /* コレクションをsignerのアカウントストレージで生成
           pubで公開しているためsignしているアカウントにて実行できる */
          let collection <- ExampleNFT.createEmptyCollection()
          acct.save<@ExampleNFT.Collection>(<-collection, to: ExampleNFT.CollectionStoragePath)
          log("Collection created for account 2")

          /* Capabilityを生成（refをpublicのストレージに配置 */
          acct.link<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
          log("Capability created")
      }
  }
  ```

  - その後、以下のトランザクションで NFT を移動できる

  ```cadence
  import ExampleNFT from 0x01

  transaction {
      let transferToken: @ExampleNFT.NFT

      prepare(acct: AuthAccount) {
          /* NFTの所有者であってもCapabilityをborrowして関数を使えるようにする */
          let collectionRef = acct.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath)
              ?? panic("Could not borrow a reference to the owner's collection")

          /* interfaceに定義されていない関数であってもsignerであればwithdraw関数は利用できる */
          self.transferToken <- collectionRef.withdraw(withdrawID: 1)
      }

      execute {
          let recipient = getAccount(0x02)
          /* 受け取る側のCapabilityをborrowし、depositでコレクションにNFTtokenを格納 */
          let receiverRef = recipient.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
              .borrow()
              ?? panic("Could not borrow receiver reference")
          receiverRef.deposit(token: <-self.transferToken)

          log("NFT ID 1 transferred from account 1 to account 2")
      }
  }
  ```

  - ただし、NFT の所有者 0x01 で実行しないといけない
  - 例えば 0x02 アカウントで実行しようとすると、withdraw の部分でエラーが発生する
  - エラー内容：`Error panic: Cannot withdraw the specified NFT ID`

## 開発する時には

### 参考にできるソースコード

- cadence で書かれた NFT マーケットプレイスのサンプルプロジェクト

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
