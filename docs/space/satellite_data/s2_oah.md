# Sentinel-2 × Open Access Hub

# TODO: ファイル名とタイトルはちゃんと考える

- まずはメタデータを取得する

  パタメタとして

  - 座標情報（ベクターデータで指定）
  - 取得希望期間（日時情報）
  - 衛星
  - 処理レベル（L1C など）
  - 被雲率

  を指定できる。
  データ取得後の response のカラムは以下。

  ```
  Index(['title', 'link', 'link_alternative', 'link_icon', 'summary', 'ondemand',
        'datatakesensingstart', 'generationdate', 'beginposition',
        'endposition', 'ingestiondate', 'orbitnumber', 'relativeorbitnumber',
        'cloudcoverpercentage', 'sensoroperationalmode', 'level1cpdiidentifier',
        'tileid', 'hv_order_tileid', 'format', 'processingbaseline',
        'platformname', 'filename', 'instrumentname', 'instrumentshortname',
        'size', 's2datatakeid', 'producttype', 'platformidentifier',
        'orbitdirection', 'platformserialidentifier', 'processinglevel',
        'datastripidentifier', 'granuleidentifier', 'identifier', 'uuid',
        'geometry'],
        dtype='object')
  ```

- メタデータの中の UUID を指定して、衛星画像をダウンロードする

  ```python
  for uuid in products_gdf_sorted.uuid:
      api.download(uuid)
  ```

- ダウンロードデータの解凍結果

  ```sh
  $ tree
  .
  ├── AUX_DATA
  ├── DATASTRIP
  │   └── DS_2BPS_20220516T043617_S20220516T020809
  │       ├── MTD_DS.xml
  │       └── QI_DATA
  │           ├── FORMAT_CORRECTNESS.xml
  │           ├── GENERAL_QUALITY.xml
  │           ├── GEOMETRIC_QUALITY.xml
  │           ├── RADIOMETRIC_QUALITY.xml
  │           └── SENSOR_QUALITY.xml
  ├── GRANULE
  │   └── L1C_T52SEB_A027113_20220516T020809
  │       ├── AUX_DATA
  │       │   ├── AUX_CAMSFO
  │       │   └── AUX_ECMWFT
  │       ├── IMG_DATA
  │       │   ├── T52SEB_20220516T015649_B01.jp2
  │       │   ├── T52SEB_20220516T015649_B02.jp2
  │       │   ・・・（省略）
  │       │   ├── T52SEB_20220516T015649_B8A.jp2
  │       │   └── T52SEB_20220516T015649_TCI.jp2
  │       ├── MTD_TL.xml
  │       └── QI_DATA
  │           ├── FORMAT_CORRECTNESS.xml
  │           ├── GENERAL_QUALITY.xml
  │           ├── GEOMETRIC_QUALITY.xml
  │           ├── MSK_CLASSI_B00.jp2
  │           ├── MSK_DETFOO_B01.jp2
  │           ├── ・・・（省略）
  │           ├── MSK_QUALIT_B12.jp2
  │           ├── MSK_QUALIT_B8A.jp2
  │           ├── SENSOR_QUALITY.xml
  │           └── T52SEB_20220516T015649_PVI.jp2
  ├── HTML
  │   ├── UserProduct_index.html
  │   ├── UserProduct_index.xsl
  │   ├── banner_1.png
  │   ├── banner_2.png
  │   ├── banner_3.png
  │   └── star_bg.jpg
  ├── INSPIRE.xml
  ├── MTD_MSIL1C.xml
  ├── manifest.safe
  └── rep_info
      └── S2_User_Product_Level-1C_Metadata.xsd

  11 directories, 65 files
  ```

  複数のフォルダとファイルが存在する。

- 衛星画像データ jp2 の中身

  rasterio で読み込み、メタデータを確認

  ```py
  import rasterio as rio
  b4 = rio.open(path_b4)
  b4.meta
  ```

  出力

  ```
  {'driver': 'JP2OpenJPEG',
   'dtype': 'uint16',
   'nodata': None,
   'width': 10980,
   'height': 10980,
   'count': 1,
   'crs': CRS.from_epsg(32652),
   'transform': Affine(10.0, 0.0, 499980.0,
        0.0, -10.0, 3700020.0)}
  ```

  サイズが 1, 10980, 10980 であり、座標系が CRS.from_epsg(32652)

  サイズの数字はピクセル数を表すため、これと解像度をかけることで対象データの範囲がわかる

  → Sentinel2 は解像度 10m なので、10980 \* 10 ≒ 100km となる

- TIFF ファイルへの変換

複数バンドを組み合わせて１つの TIFF ファイルを作れる。

```python
# 読み込んだ各バンドのデータを元にTiff画像を作成
with rio.open(str(objname) +'.tiff','w',driver='Gtiff', width=b4.width, height=b4.height,
            count=3,crs=b4.crs,transform=b4.transform, dtype=b4.dtypes[0]) as rgb:
  rgb.write(b2.read(1),3)
  rgb.write(b3.read(1),2)
  rgb.write(b4.read(1),1)
  rgb.close()
```
