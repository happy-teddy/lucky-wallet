import "./message.tact";
const referralFee: Int = ton("0.1");
message(0x888) LuckyBuy {
    index: Int as uint256;
}
message(0x333) LuckyRefBuy {
    owner: Address;
    holder: Address;
    index: Int as uint256;
}
message(0x555) LuckyReferral {
}

contract Referral {
    count: Int;
    sell: Address;
    owner: Address;
    init(sell: Address, owner: Address){
        self.count = 0;
        self.sell = sell;
        self.owner = owner;
    }

    receive(str: String){
        nativeReserve(minTonsForStorage, 0);
        send(SendParameters{to: self.owner, value: 0, mode: SendRemainingBalance, body: "OK".asComment()});
    }

    receive(msg: LuckyBuy){
        nativeReserve(minTonsForStorage, 0);
        send(SendParameters{
                to: self.owner,
                value: referralFee,
                mode: SendPayGasSeparately,
                body: "Lucky Bank referral payment".asComment()
            }
        );
        send(SendParameters{
                to: self.sell,
                value: 0,
                mode: SendRemainingBalance,
                body: LuckyRefBuy{holder: sender(), index: msg.index, owner: self.owner}.toCell()
            }
        );
        self.count = (self.count + 1);
    }

    receive(msg: LuckySend){
        require(sender() == self.owner, "Insufficient privelegies");
        send(SendParameters{
                to: msg.to,
                value: msg.value,
                mode: msg.mode,
                body: msg.body,
                code: msg.code,
                data: msg.data
            }
        );
    }

    get fun get_count(): Int {
        return self.count;
    }
}