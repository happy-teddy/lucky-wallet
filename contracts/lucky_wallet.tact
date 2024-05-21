import "./message.tact";

/*
  LUCKY WALLET
  author: @a3_ton

  NFT Lucky Wallet - Ваш личный безопасный контейнер, для хранения TON, NFT и Jetton.
  
  https://github.com/lucky-nft-ton/lucky-wallet
  https://t.me/nft_avatarki/51

*/

message(0x777) LuckySend {
    to: Address;
    value: Int as coins;
    mode: Int as uint8;
    body: Cell?;
    code: Cell?;
    data: Cell?;
}

contract LuckyWallet {
    collection_address: Address;
    item_index: Int;
    is_initialized: Bool;
    owner: Address?;
    individual_content: Cell;
    init(collection_address: Address, item_index: Int){
        require(sender() == collection_address, "Not Lucky Bank");
        self.collection_address = collection_address;
        self.item_index = item_index;
        let sb: StringBuilder = beginString();
        sb.append("meta.json");
        self.individual_content = sb.toCell();
        self.is_initialized = false;
    }

    receive(){
        throw(0);
    }

    receive(msg: Slice){
        throw(0);
    }

    receive(str: String){
        if (sender() == self.owner) {
            nativeReserve(minTonsForStorage, 0);
            send(SendParameters{to: sender(), value: 0, mode: SendRemainingBalance, body: "OK".asComment()});
        }
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

    receive(msg: Transfer){
        let ctx: Context = context();
        let msgValue: Int = ctx.value; // Check the gasCost for storage
        let tonBalanceBeforeMsg: Int = (myBalance() - msgValue);
        let storageFee: Int = (minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage));
        msgValue = (msgValue - (storageFee + gasConsumption));
        if (self.is_initialized == false) {
            // Initial Transfer, aka the "Minting" of the NFT
            require(ctx.sender == self.collection_address, "Initialized need from Lucky Bank");
            self.is_initialized = true;
            self.owner = msg.new_owner;
            send(SendParameters{
                    to: msg.response_destination!!,
                    value: msgValue,
                    mode: SendPayGasSeparately,
                    body: Excesses{query_id: msg.query_id}.toCell()
                }
            );
        } else {
            require(ctx.sender == self.owner!!, "Not owner");
            self.owner = msg.new_owner; // Change current owner to the new_owner
            if (msg.forward_amount > 0) {
                send(SendParameters{
                        to: msg.new_owner,
                        value: msg.forward_amount,
                        mode: SendPayGasSeparately,
                        bounce: true,
                        body: OwnershipAssigned{
                            query_id: msg.query_id,
                            prev_owner: ctx.sender,
                            forward_payload: msg.forward_payload
                        }.toCell()
                    }
                );
            }
            msgValue = (msgValue - ctx.readForwardFee());
            if (msg.response_destination != null) {
                send(SendParameters{
                        to: msg.response_destination!!,
                        value: (msgValue - msg.forward_amount),
                        mode: SendPayGasSeparately,
                        bounce: true,
                        body: Excesses{query_id: msg.query_id}.toCell()
                    }
                );
            }
        }
    }

    receive(msg: GetStaticData){
        let ctx: Context = context();
        send(SendParameters{
                to: ctx.sender,
                value: 0,
                mode: 64, // (return msg amount except gas fees)
                bounce: true,
                body: ReportStaticData{
                    query_id: msg.query_id,
                    index_id: self.item_index,
                    collection: self.collection_address
                }.toCell()
            }
        );
    }

    // --------- Getters  --------- //
    get fun get_nft_data(): GetNftData {
        return
            GetNftData{
                is_initialized: self.is_initialized,
                index: self.item_index,
                collection_address: self.collection_address,
                owner_address: self.owner!!,
                individual_content: self.individual_content
            };
    }

    get fun lucky(): Bool {
        return true;
    }
}