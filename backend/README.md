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

## サーバー起動方法

### 1. 仮想環境に入る

```bash
poetry env activate
```

上記コマンドの出力結果をターミナル上でそのまま入力し、仮想環境に入る

### 2. サーバーを起動

```bash
python3 manage.py runserver
```
### 3. 仮想環境から出る方法

```bash
deactivate
```