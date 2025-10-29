import json
import math
from itertools import combinations
from collections import defaultdict

#ステップ2用の関数を作っておく
def find_combinations(target_sum, items_dict):
    """
    item_dict(例えば{1:1000, 2:3000})の中から合計がtarget_sum(例えば合計4000なら[2,3])を探す
    """
    names = list(items_dict.keys())

    for i in range(2, len(names) + 1): #2人組、3人組...と探す
        for combo_names in combinations(names, i):
            current_sum = sum(items_dict[name] for name in combo_names)

            if math.isclose(current_sum, target_sum): #計算誤差が生じることがあるらしい?
                return list(combo_names)
    return None

#メインのアルゴリズム
def solve_warikan(sagaku):
    """
    入ってくるもの
    sagaku(dict):{ID:差額,...}
    マイナスは貸し(kashi)、プラスは借り(kari)
    返すもの
    list:[((from_user, to_user), amount), ...] 
    (from_user = 借りた人, to_user = 貸した人)
    """
    torihiki = []

    #貸しと借りに分割
    kashi = {name: -amount for name, amount in sagaku.items() if amount < 0}
    kari = {name: amount for name, amount in sagaku.items() if amount > 0}

    #ステップ1,1:1でプラマイゼロになるパターン
    kari_amounts = {}
    for name, amount in kari.items():
        kari_amounts.setdefault(amount, []).append(name)

    kashi_amounts = {}
    for name, amount in kashi.items():
        kashi_amounts.setdefault(amount, []).append(name)

    matched_amounts = set(kari_amounts.keys()) & set(kashi_amounts.keys())

    for amount in matched_amounts:
        while kari_amounts[amount] and kashi_amounts[amount]:
            kari_name = kari_amounts[amount].pop()
            kashi_name = kashi_amounts[amount].pop()

            torihiki.append(((kari_name, kashi_name), amount))

            del kari[kari_name]
            del kashi[kashi_name]

    #ステップ2,プラマイがN:1か1:Nで消滅
    kashi_copy = dict(kashi)
    for kashi2_name, kashi2_amount in kashi_copy.items():
        if kashi2_name not in kashi: continue

        matching_kari = find_combinations(kashi2_amount, kari)

        if matching_kari:
            for kari2_name in matching_kari:
                amount = kari[kari2_name]
                torihiki.append(((kari2_name, kashi2_name), amount))
                del kari[kari2_name]
            del kashi[kashi2_name]
    
    kari_copy = dict(kari)
    for kari2_name, kari2_amount in kari_copy.items():
        if kari2_name not in kari: continue

        matching_kashi = find_combinations(kari2_amount, kashi)

        if matching_kashi:
            for kashi2_name in matching_kashi:
                amount = kashi[kashi2_name]
                torihiki.append(((kari2_name, kashi2_name), amount))
                del kashi[kashi2_name]
            del kari[kari2_name]
    
    #ステップ3,貪欲法
    kari_list = sorted(kari.items(), key=lambda item: item[1], reverse=True)
    kashi_list = sorted(kashi.items(), key=lambda item: item[1], reverse=True)

    kari_index, kashi_index = 0, 0

    while kari_index < len(kari_list) and kashi_index < len(kashi_list):
        kari2_name, kari2_amount = kari_list[kari_index]
        kashi2_name, kashi2_amount = kashi_list[kashi_index]

        pay_amount = min(kari2_amount, kashi2_amount)

        if pay_amount > 1e-9:
            torihiki.append(((kari2_name, kashi2_name), pay_amount))

            kari_list[kari_index] = (kari2_name, kari2_amount - pay_amount)
            kashi_list[kashi_index] = (kashi2_name, kashi2_amount - pay_amount)

        if kari_list[kari_index][1] < 1e-9:
            kari_index += 1
        if kashi_list[kashi_index][1] < 1e-9:
            kashi_index += 1

    return torihiki

def process_warikan_json(input_data):
    sagaku = defaultdict(float)

    payments_list = input_data.get("payments", [])

    for payment in payments_list:
        amount = payment.get("amount", 0)
        paid_by_user = payment.get("paid_by")
        paid_for_user = payment.get("paid_for")

        if amount == 0 or paid_by_user is None or paid_for_user is None:
            continue
        
        #支払った人は貸しだから残高をマイナス
        sagaku[paid_by_user] -= amount
        #支払ってもらった人は借りだから残高をプラス
        sagaku[paid_for_user] += amount
    
    torihiki = solve_warikan(sagaku)

    output_json_list = []

    for j, (users, amount) in enumerate(torihiki):
        from_user = users[0] #借りた人(kari)
        to_user = users[1] #貸した人(kashi)

        output_json_list.append({
            "id": j,
            "amount": int(round(amount)),
            "paid_by": from_user,
            "paid_for": to_user
        })
    return output_json_list