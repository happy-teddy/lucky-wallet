import "./message.tact";
import "./imports/init_wallet.tact";
import "./referral.tact";
const increment: Int = ton("0.005");
const transferFee: Int = ton("0.099");
const referralCost: Int = ton("0.4");
const fullFee: Int = ton("0.2");
const minIndex: Int = 60000000;
const maxIndex: Int = 9007199253740991;
message(0x444) LuckyMint {
    index: Int as uint256;
}
message(0x777) LuckySend {
    to: Address;
    value: Int as coins;
    mode: Int as uint8;
    body: Cell?;
    code: Cell?;
    data: Cell?;
}

contract Sell {
    item_index: Int;
    mint_cost: Int as coins;
    owner: Address;
    bank: Address;
    mint: map<Address, Address>;
    init(bank: Address, owner: Address){
        self.item_index = 9007199254740991;
        self.mint_cost = ton("0.01");
        self.bank = bank;
        self.owner = owner;
    }

    receive(msg: Excesses){
        let sender: Address = sender();
        if (self.mint.get(sender) != null) {
            let new_owner: Address = self.mint.get(sender)!!;
            send(SendParameters{
                    to: sender,
                    value: 0,
                    bounce: false,
                    mode: SendRemainingValue,
                    body: Transfer{
                        query_id: 0,
                        new_owner: new_owner,
                        response_destination: new_owner,
                        custom_payload: null,
                        forward_amount: 0,
                        forward_payload: beginCell().storeInt(0, 1).endCell().asSlice()
                    }.toCell()
                }
            );
            self.mint.set(sender, null);
        } else {
            throw(1001);
        }
    }

    receive(msg: LuckyReferral){
        let ctx: Context = context();
        require(ctx.value > (referralCost + transferFee), "Insufficient value");
        let ref_init: StateInit = self.getReferralInit(sender());
        send(SendParameters{
                to: contractAddress(ref_init),
                value: transferFee,
                bounce: false,
                mode: SendIgnoreErrors,
                body: "Create Lucky Bank referral".asComment(),
                code: ref_init.code,
                data: ref_init.data
            }
        );
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

    receive(str: String){
        if (sender() == self.owner) {
            nativeReserve(minTonsForStorage, 0);
            send(SendParameters{to: sender(), value: 0, mode: SendRemainingBalance, body: "OK".asComment()});
        }
    }

    receive(msg: LuckyBuy){
        self.buy(sender(), (self.mint_cost + fullFee), msg.index);
    }

    receive(msg: LuckyRefBuy){
        let referral_address: Address = self.getReferralAddress(msg.owner);
        require(sender() == referral_address, "Insufficient referral");
        self.buy(msg.holder, self.mint_cost, msg.index);
    }

     fun buy(holder: Address, cost: Int, index: Int) {
        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        if (msgValue > (cost + transferFee)) {
            let item_index: Int = index;
            if (item_index < minIndex || item_index > maxIndex) {
                item_index = self.item_index;
            }
            self.mint.set(self.getAddress(item_index), holder);
            send(SendParameters{
                    to: self.bank,
                    value: (msgValue - cost),
                    mode: 0,
                    bounce: true,
                    body: LuckyMint{index: item_index}.toCell()
                }
            );
            self.item_index = (self.item_index - 1);
            self.mint_cost = (self.mint_cost + increment);
        }
    }

     fun getAddress(item_index: Int): Address {
        let initCode: StateInit = walletStateInit(self.bank, item_index);
        return contractAddress(initCode);
    }

     fun getCurrentAddress(): Address {
        return self.getAddress(self.item_index);
    }

     fun getReferralInit(referral: Address): StateInit {
        return initOf Referral(myAddress(), referral);
    }

     fun getReferralAddress(referral: Address): Address {
        let initCode: StateInit = self.getReferralInit(referral);
        return contractAddress(initCode);
    }

    get fun get_item_index(): Int {
        return self.item_index;
    }

    get fun get_mint_cost(): Int {
        return self.mint_cost;
    }

    get fun get_current_address(): Address {
        return self.getCurrentAddress();
    }

    get fun get_referral_address(referral: Address): Address {
        return self.getReferralAddress(referral);
    }
}