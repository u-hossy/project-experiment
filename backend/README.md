# バックエンド

## 環境構築方法

### 1. poetry をインストール

```bash
curl -sSL https://install.python-poetry.org/ | python3 -
```

### 2. 依存関係のインストール

```bash
cd backend
poetry install
```

### 3. 仮想環境への PATH を通す

```bash
poetry env activate
```

上記コマンドの出力結果(`source`コマンド)をターミナル上でそのまま入力してください。
実行後`which python3`などの出力が`.venv`内のものになっているなど、普段と違う Python が使われていれば成功です。

### 4. `.env`ファイルを用意する

### `.env`ファイルの作成

以下のコマンドで`.env`ファイルを準備します。

```bash
cp .env.template .env
```

### `SECRET_KEY`の生成

> 必ず依存関係をインストールし、仮想環境に PATH を通してから実行してください

以下のコマンドを実行して生成されるものをそのままコピーして、`SECRET_KEY=`の右辺に貼り付けてください。

```bash
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## サーバー起動方法

> 必ず依存関係をインストールし、仮想環境に PATH を通してから実行してください

以下のコマンドでサーバーを起動します

```bash
python3 manage.py runserver
```

## 仮想環境の PATH を deactivate する

開発の終了時には以下のコマンドで仮想環境の PATH を deactivate してください。

```bash
deactivate
```
