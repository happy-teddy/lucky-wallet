import { Address, Cell, beginCell, toNano } from '@ton/core';
import { LuckyBank, RoyaltyParams } from '../wrappers/LuckyBank';
import { NetworkProvider } from '@ton/blueprint';
import { encodeOffChainContent } from '../utils/helpers';

export async function run(provider: NetworkProvider) {
    const owner: Address = Address.parse('0QBDxwiPuLOAdhz8We7O8G6RTWYrYK7L9DlG-wXRYyy7_sHq')
    const royalty: RoyaltyParams = {
        $$type: 'RoyaltyParams',
        numerator: 10n,
        denominator: 100n,
        destination: owner,
    }

    const contentString = "https://lucky-nft-ton.github.io/wallet/bank.json"
    let content: Cell = encodeOffChainContent(contentString);
    const baseString = "https://lucky-nft-ton.github.io/wallet/"
    let base: Cell = beginCell().storeBuffer(Buffer.from(baseString)).endCell()

    const luckyBank = provider.open(await LuckyBank.fromInit(
        owner,
        content,
        base,
        royalty
    ));

    await luckyBank.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null
    );

    await provider.waitForDeploy(luckyBank.address);

    console.log('toRawString', await luckyBank.address.toString());
}
