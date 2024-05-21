import { Blockchain, printTransactionFees, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, Cell, toNano } from '@ton/core';
import { Sell } from '../wrappers/Sell';
import { LuckyBank, RoyaltyParams } from '../wrappers/LuckyBank';
import { LuckyWallet } from '../wrappers/LuckyWallet';
import { Referral } from '../build/Sell/tact_Referral';
import '@ton/test-utils';
import { encodeOffChainContent } from '../utils/helpers';

describe('Sell', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sell: SandboxContract<Sell>;
    let luckyBank: SandboxContract<LuckyBank>;
    let referral: SandboxContract<Referral>;
    let luckyWallet1: SandboxContract<LuckyWallet>;
    let luckyWallet2: SandboxContract<LuckyWallet>;
    let luckyWallet3: SandboxContract<LuckyWallet>;

    it('should deploy bank', async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');

        const owner: Address = deployer.address
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

        luckyBank = blockchain.openContract(await LuckyBank.fromInit(
            owner,
            content,
            base,
            royalty
        ));

        const deployResult = await luckyBank.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null
        );

        console.log(
            '+ should deploy bank',
            '\nbank address: ', luckyBank.address,
            '\ndeployer (admin) address: ', deployer.address,
        );

        printTransactionFees(deployResult.transactions);

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: luckyBank.address,
            deploy: true,
            success: true,
        })
    });

    it('should deploy sell', async () => {
        sell = blockchain.openContract(await Sell.fromInit(
            luckyBank.address,
            deployer.address,
        ));

        const deployResult = await sell.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            "Deploy"
        );

        console.log(
            '+ should deploy sell',
            '\nsell address: ', sell.address,
            '\ndeployer (admin) address: ', deployer.address,
        );

        printTransactionFees(deployResult.transactions);

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sell.address,
            deploy: true,
            success: true,
        })
    });

    it('should bank change owner', async () => {
        const txResult = await luckyBank.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'ChangeOwner',
                query_id: 0n,
                new_owner: sell.address
            }
        );

        const collectionData = await luckyBank.getGetCollectionData();
        const newOwner = collectionData.owner_address;

        console.log(
            '+ should bank change owner',
            '\nsell address: ', sell.address,
            '\nnewOwner address: ', newOwner,
            '\ndeployer (admin) address: ', deployer.address,
        );

        printTransactionFees(txResult.transactions);

        expect(txResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: luckyBank.address,
            success: true,
        })

        expect(newOwner.toString()).toBe(sell.address.toString());
    });

    it('should be right address', async () => {

        const itemIndex = await sell.getGetItemIndex();
        const currentAddress = await sell.getGetCurrentAddress();
        const itemAddress = await luckyBank.getGetNftAddressByIndex(itemIndex);
        const itemAddressStr = itemAddress === null ? '' : itemAddress.toString()

        console.log(
            '+ should be right address',
            '\nitem Index: ', itemIndex,
            '\ncurrent Address: ', currentAddress,
            '\nitem Address: ', itemAddress,
        );
        expect(currentAddress.toString()).toBe(itemAddressStr);
    });

    it('should buy', async () => {
        const wAddress = await sell.getGetCurrentAddress()

        const txResult = await sell.send(
            deployer.getSender(),
            {
                value: toNano('0.35'),
            },
            {
                $$type: 'LuckyBuy',
                index: 0n,
            }
        );

        console.log(
            '+ should buy',
            '\nsell address: ', sell.address,
            '\ndeployer (admin) address: ', deployer.address,
            '\nlucky wallet address: ', wAddress,
        );

        printTransactionFees(txResult.transactions);

        luckyWallet1 = blockchain.openContract(await LuckyWallet.fromAddress(
            wAddress
        ));

        expect(txResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sell.address,
            success: true,
        })

        expect(txResult.transactions).toHaveTransaction({
            from: wAddress,
            to: deployer.address,
            success: true,
        })

        expect(wAddress.toString()).toBe(luckyWallet1.address.toString());
    });

    it('should create referral', async () => {
        const txResult = await sell.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'LuckyReferral',
            }
        );

        const referralAddress = await sell.getGetReferralAddress(deployer.address)

        console.log(
            '+ should create referral',
            '\nsell address: ', sell.address,
            '\ndeployer (admin) address: ', deployer.address,
            '\nreferral address: ', referralAddress,
        );

        printTransactionFees(txResult.transactions);

        referral = blockchain.openContract(await Referral.fromAddress(
            referralAddress
        ));

        expect(txResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sell.address,
            success: true,
        })
        expect(referralAddress.toString()).toBe(referral.address.toString());
    });

    it('should referral buy', async () => {
        const wAddress = await sell.getGetCurrentAddress()

        const txResult = await referral.send(
            deployer.getSender(),
            {
                value: toNano('0.25'),
            },
            {
                $$type: 'LuckyBuy',
                index: 0n,
            }
        );

        console.log(
            '+ should referral buy',
            '\nsell address: ', sell.address,
            '\ndeployer (admin) address: ', deployer.address,
            '\nlucky wallet address: ', wAddress,
        );

        printTransactionFees(txResult.transactions);

        luckyWallet2 = blockchain.openContract(await LuckyWallet.fromAddress(
            wAddress
        ));

        expect(txResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: referral.address,
            success: true,
        })

        expect(txResult.transactions).toHaveTransaction({
            from: wAddress,
            to: deployer.address,
            success: true,
        })

        expect(wAddress.toString()).toBe(luckyWallet2.address.toString());
    });

    it('should referral custom buy', async () => {
        const custom = 60000001n
        const wAddress = await luckyBank.getGetNftAddressByIndex(custom)

        const txResult = await referral.send(
            deployer.getSender(),
            {
                value: toNano('0.25'),
            },
            {
                $$type: 'LuckyBuy',
                index: custom,
            }
        );

        console.log(
            '+ should referral buy',
            '\nsell address: ', sell.address,
            '\ndeployer (admin) address: ', deployer.address,
            '\nlucky wallet address: ', wAddress,
            '\ncustom index: ', custom,
        );

        printTransactionFees(txResult.transactions);



        expect(txResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: referral.address,
            success: true,
        })

        expect(wAddress).not.toBeNull();
        if (wAddress !== null) {
            luckyWallet3 = blockchain.openContract(await LuckyWallet.fromAddress(
                wAddress
            ));

            expect(wAddress.toString()).toBe(luckyWallet3.address.toString());
        }
    });
});
