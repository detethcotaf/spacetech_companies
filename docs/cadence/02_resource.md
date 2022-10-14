# リソースオブジェクトの実装

※ リソースの概要は [01.Flow と Cadence](overview.md) に記載している

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
