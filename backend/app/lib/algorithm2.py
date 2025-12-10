from typing import List, Dict, Tuple, Any
import json
from collections import defaultdict

# 送金結果を格納するデータ構造の型エイリアス
TransferResult = Dict[str, any]

def initialize_user_balances(data: List[Dict[str, any]]) -> Tuple[Dict[str, int], Dict[str, int]]:
    """
    入力データからプラス側（もらう側）とマイナス側（払う側）の残高を初期化する。

    Args:
        data: 入力JSONからロードされたリスト。

    Returns:
        (minus_users, plus_users): {user_id: amount} の辞書タプル。
            - minus_users: 払うべき金額 (正の値)
            - plus_users: もらうべき金額 (正の値)
    """
    plus_users = {item['user']: item['amount'] for item in data if item['amount'] > 0}
    # マイナス残高を正の値に変換
    minus_users = {item['user']: -item['amount'] for item in data if item['amount'] < 0} 
    return minus_users, plus_users

def _update_balances_and_results(
    payer: str, 
    receiver: str, 
    transfer_amount: int, 
    minus_users: Dict[str, int], 
    plus_users: Dict[str, int], 
    results: List[TransferResult]
) -> None:
    """
    送金処理を実行し、残高と結果リストを更新する。
    """
    if transfer_amount > 0:
        # 結果リストに追加
        results.append({
            "from_user": payer,
            "to_user": receiver,
            "amount": transfer_amount
        })

        # 残高を更新
        minus_users[payer] -= transfer_amount
        plus_users[receiver] -= transfer_amount

        # 残高がゼロになったユーザーを削除
        if minus_users[payer] == 0:
            del minus_users[payer]
        if plus_users[receiver] == 0:
            del plus_users[receiver]

def resolve_digit_conflicts_optimized(
    minus_users: Dict[str, int], 
    plus_users: Dict[str, int], 
    results: List[TransferResult], 
    power_of_10: int
) -> None:
    """
    紙幣・硬貨の移動最小化を目指し、特定の桁の金額のみを相殺する。
    桁の金額が大きい者同士を優先してマッチングさせる（貪欲法）。
    """
    
    # 1. 現在の桁の金額を抽出: (例: 残高 12345, power_of_10 1000 -> 2000)
    # 桁の金額がゼロのユーザーは対象外
    current_minus_amounts = {
        u: (a // power_of_10) * power_of_10 
        for u, a in minus_users.items() if (a // power_of_10) > 0
    }
    current_plus_amounts = {
        u: (a // power_of_10) * power_of_10 
        for u, a in plus_users.items() if (a // power_of_10) > 0
    }
    
    # 2. 桁の金額でユーザーをソート（貪欲法：大きい金額同士を優先）
    # ソートキーは桁の金額。例: 3000 > 2000 を優先
    sorted_minus = sorted(current_minus_amounts.items(), key=lambda item: item[1], reverse=True)
    sorted_plus = sorted(current_plus_amounts.items(), key=lambda item: item[1], reverse=True)

    # 3. マッチングと相殺処理
    for payer, payer_digit_amount in sorted_minus:
        
        # 既に残高がゼロになっていたらスキップ (外側の辞書をチェック)
        if payer not in minus_users:
            continue
            
        for receiver, receiver_digit_amount in sorted_plus:
            
            # 既に残高がゼロになっていたらスキップ (外側の辞書をチェック)
            if receiver not in plus_users:
                continue
                
            # 桁の金額がゼロになっていたらスキップ (この桁での相殺はもうできない)
            if current_minus_amounts[payer] == 0 or current_plus_amounts[receiver] == 0:
                continue

            # 相殺額の決定: 現在の桁の相殺可能金額のうち小さい方
            transfer_amount = min(current_minus_amounts[payer], current_plus_amounts[receiver])
            
            if transfer_amount > 0:
                
                # 総残高と結果リストの更新
                _update_balances_and_results(
                    payer, 
                    receiver, 
                    transfer_amount, 
                    minus_users, 
                    plus_users, 
                    results
                )

                # このマッチングで消費された「桁の金額」を内部的に更新
                current_minus_amounts[payer] -= transfer_amount
                current_plus_amounts[receiver] -= transfer_amount
                
                # payerのこの桁の金額が全て相殺されたら、次のpayerへ
                if current_minus_amounts[payer] == 0:
                    break


def solve(data: List[Dict[str, any]]) -> List[TransferResult]:
    """
    建て替え管理システムの相殺アルゴリズムを実行するメイン関数。
    """
    
    # 1. 初期化
    results: List[TransferResult] = []
    minus_users, plus_users = initialize_user_balances(data)
    
    # 2. 桁ごとの走査 (10万の位 -> 1の位)
    # 紙幣・硬貨の移動を最小化するため、大きい単位から優先的に処理
    # 金額の最大値: 999,999円を想定
    for power_of_10 in [100000, 10000, 1000, 100, 10, 1]:
        
        # 残高が残っているユーザーがいなければ終了
        if not minus_users or not plus_users:
            break

        # 各桁の相殺処理を実行
        resolve_digit_conflicts_optimized(minus_users, plus_users, results, power_of_10)

    return results

# --- 新規追加/変更部分 ---

def optimize_for_minimum_coins(final_results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    清算結果リストを精査し、4, 8, 9 の位の金額を「繰り上げ払い＋お釣り（逆方向支払い）」に変換することで
    硬貨・紙幣の枚数を最適化する。
    """
    optimized_results: List[Dict[str, Any]] = []
    
    # 処理する単位
    denominations = [10000, 1000, 100, 10, 1] 

    for original_transaction in final_results:
        # 現在の「支払う側」と「受け取る側」を変数で管理（途中で入れ替わるため）
        current_payer = original_transaction["paid_by"]
        current_receiver = original_transaction["paid_for"]
        remaining_amount = original_transaction["amount"]
        
        for d in denominations:
            if remaining_amount == 0:
                break
            
            # 現在の単位dでの商を計算 (例: 480 // 100 = 4)
            quotient = remaining_amount // d
            
            # 支払い額と、反転するかどうかのフラグ
            pay_amount = 0
            should_reverse = False
            
            if quotient == 4:
                # 4d -> 5d 支払って、差額を逆請求
                pay_amount = (quotient + 1) * d # 500
                should_reverse = True
                
            elif quotient == 8:
                # 8d -> 10d 支払って、差額を逆請求 (例: 800 -> 1000, お釣り200)
                pay_amount = (quotient + 2) * d 
                should_reverse = True

            elif quotient == 9:
                # 9d -> 10d 支払って、差額を逆請求
                pay_amount = (quotient + 1) * d 
                should_reverse = True
                
            else:
                # 4, 8, 9 以外は通常の支払い（反転なし）
                pay_amount = quotient * d
                should_reverse = False
            
            # 支払い処理
            if pay_amount > 0:
                optimized_results.append({
                    "amount": pay_amount, 
                    "paid_by": current_payer, 
                    "paid_for": current_receiver
                })
                
                if should_reverse:
                    # 繰り上げ払いした場合、払いすぎた分が「新しい残高」となり、方向が逆転する
                    # 例: 残480, 払500 -> 新残高 = 500 - 480 = 20
                    remaining_amount = pay_amount - remaining_amount
                    
                    # 支払い交代（次のお釣りは、相手から自分へ払う）
                    current_payer, current_receiver = current_receiver, current_payer
                else:
                    # 通常支払いの場合は単に減算
                    remaining_amount -= pay_amount

        # ループ終了後に端数が残っている場合（1の位など）
        if remaining_amount > 0:
            optimized_results.append({
                "amount": remaining_amount, 
                "paid_by": current_payer, 
                "paid_for": current_receiver
            })

    # 同一方向の取引をマージする（A->B 500 と A->B 10 など）
    # ※ A->B と B->A は別キーとして残るため、相殺されずに両方出力されます
    merged_results = defaultdict(int)
    for result in optimized_results:
        key = (result["paid_by"], result["paid_for"])
        merged_results[key] += result["amount"]
        
    final_output_list = []
    for ((from_user, to_user), amnt) in merged_results.items():
        if amnt > 0:
            final_output_list.append({
                "amount": amnt,
                "paid_by": from_user,
                "paid_for": to_user
            })
            
    return final_output_list


def load_data_from_json_string(json_data_str: str) -> List[Dict[str, Any]]:
    """
    JSON文字列から入力データをロードする。
    """
    try:
        return json.loads(json_data_str)
    except json.JSONDecodeError as e:
        print(f"JSONデコードエラー: {e}")
        return []

def format_results_to_json_string(results: List[Dict[str, Any]]) -> str:
    """
    結果リストをJSON文字列にフォーマットする。
    """
    # ensure_ascii=False で日本語なども適切に処理
    return json.dumps(results, indent=4, ensure_ascii=False)

def process_warikan_json(input_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    sagaku = defaultdict(float)

    payments_list = input_data.get("payments", [])

    for payment in payments_list:
        amount = payment.get("amount", 0)
        paid_by_user = payment.get("paid_by")
        paid_for_user = payment.get("paid_for")

        if amount == 0 or paid_by_user is None or paid_for_user is None:
            continue
        
        #支払った人は貸しだから残高をプラス
        sagaku[paid_by_user] += amount
        #支払ってもらった人は借りだから残高をマイナス
        sagaku[paid_for_user] -= amount
    
    solve_input_data = [
        {"user": user_id, "amount": int(round(amount))}
        for user_id, amount in sagaku.items() if abs(amount) > 0.5 # わずかな差額は無視
    ]
    
    # 1. 桁優先の清算アルゴリズムを実行
    torihiki = solve(solve_input_data)
    
    # 2. 統合処理 (第一段階: solveの結果を統合)
    merged_results_step1 = defaultdict(int)
    for result in torihiki:
        key = (result["from_user"], result["to_user"])
        merged_results_step1[key] += result["amount"]
        
    # 第一段階の統合結果をリストに変換 (optimize_for_minimum_coinsへの入力形式)
    output_json_list_step1 = []
    for ((from_user, to_user), amnt) in merged_results_step1.items():
        if amnt > 0:
            output_json_list_step1.append({
                "amount": amnt,
                "paid_by": from_user,
                "paid_for": to_user
            })

    # 3. 硬貨枚数最小化の最適化を実行
    final_results_optimized = optimize_for_minimum_coins(output_json_list_step1)
    
    # 4. 最終的なJSONリストを生成 (IDを振り直す)
    output_json_list = []
    for j, result in enumerate(final_results_optimized):
        output_json_list.append({
            "id": j,
            "amount": result["amount"],
            "paid_by": result["paid_by"],
            "paid_for": result["paid_for"]
        })
        
    return output_json_list