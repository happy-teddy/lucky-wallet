import "./message.tact";
import "./lucky_wallet.tact";
/*
  LUCKY BANK
  author: @a3_ton

  Коллекция Lucky Wallet
  
  https://github.com/lucky-nft-ton/lucky-wallet
  https://t.me/nft_avatarki/51

*/

message(0x444) LuckyMint {
    index: Int as uint256;
}

contract LuckyBank {
    owner_address: Address;
    collection_content: Cell;
    collection_base: Cell;
    royalty_params: RoyaltyParams;
    init(owner_address: Address, collection_content: Cell, collection_base: Cell, royalty_params: RoyaltyParams){
        self.owner_address = owner_address;
        self.collection_content = collection_content;
        self.collection_base = collection_base;
        self.royalty_params = royalty_params;
    }

    receive(){
        throw(0);
    }

    receive(msg: LuckyMint){
        require(sender() == self.owner_address, "Insufficient privelegies");
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        let tonBalanceBeforeMsg: Int = (myBalance() - msgValue);
        let storageFee: Int = (minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage));
        msgValue = (msgValue - (storageFee + gasConsumption));
        self.mint(ctx.sender, msgValue, msg.index);
    }

    receive(msg: EditContent){
        require(sender() == self.owner_address, "Insufficient privelegies");
        let content: Slice = msg.content.beginParse();
        self.collection_content = content.loadRef();
        self.collection_base = content.loadRef();
        let royalty: Slice = msg.royalty.beginParse();
        self.royalty_params = RoyaltyParams{
            numerator: royalty.loadUint(16),
            denominator: royalty.loadUint(16),
            destination: royalty.loadAddress()
        };
    }

    receive(msg: ChangeOwner){
        require(sender() == self.owner_address, "Insufficient privelegies");
        self.owner_address = msg.new_owner;
    }

    receive(msg: GetRoyaltyParams){
        let ctx: Context = context(); // get sender Info
        send(SendParameters{
                to: ctx.sender,
                value: 0,
                mode: 64,
                bounce: false,
                body: ReportRoyaltyParams{
                    query_id: msg.query_id,
                    numerator: self.royalty_params.numerator,
                    denominator: self.royalty_params.denominator,
                    destination: self.owner_address
                }.toCell()
            }
        );
    }

    // ------------------ Private  ------------------ //
     fun mint(sender: Address, msgValue: Int, itemIndex: Int) {
        let nft_init: StateInit = self.getNftItemInit(itemIndex);
        send(SendParameters{
                to: contractAddress(nft_init),
                value: msgValue,
                bounce: false,
                mode: SendIgnoreErrors,
                body: Transfer{
                    query_id: 0,
                    new_owner: sender,
                    response_destination: self.owner_address,
                    custom_payload: null,
                    forward_amount: 0,
                    forward_payload: beginCell().storeInt(0, 1).endCell().asSlice()
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            }
        );
    }

     fun getNftItemInit(item_index: Int): StateInit {
        return initOf LuckyWallet(myAddress(), item_index);
    }

    // ------------------ Getters  ------------------ //

    get fun get_collection_data(): CollectionData {
        return
            CollectionData{
                next_item_index: -(1),
                collection_content: self.collection_content,
                owner_address: self.owner_address
            };
    }

    get fun get_nft_address_by_index(item_index: Int): Address? {
        let initCode: StateInit = self.getNftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun get_nft_content(index: Int, individual_content: Cell): Cell {
        return
            beginCell().storeUint(1, 8).storeSlice(self.collection_base.beginParse()).storeRef(individual_content
            ).endCell();
    }

    get fun royalty_params(): RoyaltyParams {
        return self.royalty_params;
    }
}