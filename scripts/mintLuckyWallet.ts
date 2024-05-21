import { Address, toNano } from '@ton/core';
import { Referral } from '../wrappers/Referral';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const luckyBank = provider.open(Referral.fromAddress(
        Address.parse('EQBSJFjmxQaroq--g52UqojwSJJwA6JSqeYhJcfRrNwEqhiX')
    ));

    /*
     * Пример для найденного адреса из ./some/generateAddr.ts
     * Match: 61162393 for luckyBank is eqb8959hzs1u4vtxs3kc6zeames3tvphr_pecqvxpcsa-ton -> EQB8959hzs1U4vtXs3KC6ZeAMeS3TVphr_PecqVXPCsA-ton
     * 
    */

    await luckyBank.send(
        provider.sender(),
        {
            // Проверить текущую стоимость в приложении, указать с запасом - сдача будет возвращена
            value: toNano('2.75'),
        },
        {
            $$type: 'LuckyBuy',
            // Проверить что адрес не занят, если адрес занят - средства будут потеряны
            index: 61162393n,
        }
    );

    ui.write('Waiting for mint...');

}
