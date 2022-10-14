# Non Fungible Token の実装

## 概要

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

## 一般的な NFT デプロイの流れ

1. NFT のコントラクトとリソースタイプをデプロイ
2. NFT オブジェクトを生成しアカウントストレージに保存
3. NFT コレクションオブジェクトをアカウントに保存
4. NFT を mint
5. アカウントから別のアカウントへ token を送るためのコレクションの ref を生成
6. NFT を transfer
7. scripts を使って各アカウントにおける NFT の状況を確認

## NFT の生成と移動

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
       self.accountでデプロイするアカウントであるAuthAccountオブジェクトにアクセスしsaveメソッドを呼び出している */
    init() {
        self.account.save<@NFT>(<-create NFT(initID: 1), to: /storage/BasicNFTPath)
    }
}
```

- NFT はそれぞれでユニークな ID を持たせる必要がある
  - そのため、コントラクトで許可されていない限り、複製や統合はできない
- 上記のコードをデプロイすると、init()が一度だけ稼働し、デプロイしたアカウントのストレージに NFT が保存される
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

## NFT のコレクション

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
