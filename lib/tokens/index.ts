import { getCurrentAddress, getPrice, web3 } from "lib/web3/web3";
import { TokenList } from "tokens/tokenlist";
import ABI_ERC20 from "../web3/abi/ERC20";

let LoadPromise: Promise<any> | null = null;

export const TokenData: any = {};
export const TokenBalance: any = {};
export const Tokens = () => TokenList.tokens
    .filter(token => TokenData[token.address]);

export async function loadTokens () {
    if(LoadPromise) {
        await LoadPromise;
        return Tokens();
    }

    LoadPromise = Promise.all(TokenList.tokens.map(async token => {
        const prices = await getPrice(token.address);
        if(!prices) return;
        
        TokenData[token.address] = prices;
        TokenBalance[token.address] = await tokenBalance(token.address, await getCurrentAddress());
    }));

    await LoadPromise;

    return Tokens();
}

export async function tokenBalance (tokenAddress: string, userAddress: string) {
    const erc20 = new web3.eth.Contract(ABI_ERC20, tokenAddress);
    const balance = await erc20.methods.balanceOf(userAddress).call();

    return balance / 10e17;
}