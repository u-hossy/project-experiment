# バックエンド

## 環境構築方法

### 1. poetry をインストール

```bash
curl -sSL https://install.python-poetry.org/ | python3 -
```

### 2. 仮想環境への PATH を通す

```bash
cd backend
poetry env activate
```

上記コマンドの出力結果(`source`コマンド)をターミナル上でそのまま入力してください。
実行後`which python3`などの出力が`.venv`内のものになっているなど、普段と違う Python が使われていれば成功です。

### 3. 依存関係のインストール

```bash
poetry install
```

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

### 1. redis の起動

以下のコマンドで redis を起動します

```bash
sudo systemctl start redis-server
sudo systemctl status redis-server
```

以下のように表示されていることを確認してください

```bash
Active: active (running)
```

### 2. サーバーの起動

以下のコマンドでサーバーを起動します

```bash
daphne core.asgi:application
```

## 仮想環境の PATH を deactivate する

開発の終了時には以下のコマンドで仮想環境の PATH を deactivate してください。

```bash
deactivate
```

## models.py変更時

### 1. マイグレーションの作成

以下のコマンドを実行しマイグレーションファイルの作成

```bash
python3 manage.py makemigrations
```

出力文に問題がなければ以下のコマンドを実行してマイグレーションの適用

```bash
python3 manage.py migrate
```

以下のコマンドで管理者アカウントを作成

```bash
python3 manage.py createsuperuser
```
