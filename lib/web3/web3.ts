const Web3 = (window as any).Web3;
import ABI_UniswapV2Factory from "./abi/UniswapV2Factory";
import ABI_UniswapV2Router02 from "./abi/UniswapV2Router02";
import ABI_UniswapV2Pair from "./abi/UniswapV2Pair";

export const web3 = new Web3((window as any).web3.currentProvider);
export const COMMON_BASE = "0xE2F7441c55fdd2A4D961cC25CdbB9a6289CE7632";
export const UniswapV2Factory = new web3.eth.Contract(ABI_UniswapV2Factory as any, "0xc35DADB65012eC5796536bD9864eD8773aBc74C4");
export const UniswapV2Router02 = new web3.eth.Contract(ABI_UniswapV2Router02 as any, "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506");

let isEnabled = false;

export interface TokenPrice {
    price: number,
    tokenBalance: number,
    baseBalance: number
}

export async function enableWeb3 () {
    if(isEnabled) return;
    
    isEnabled = true;

    await (<any>window).ethereum.enable();
}

export async function getPairAddress (token: string) {
    if (localStorage.getItem("pair:" + token))
        return localStorage.getItem("pair:" + token);
    
    await enableWeb3();
    
    const address = await UniswapV2Factory.methods.getPair(token, COMMON_BASE).call();

    if (address === "0x0000000000000000000000000000000000000000")
        return null;

    localStorage.setItem("pair:" + token, address);
    
    return address;
}

export async function getPair (token: string) {
    const addr = await getPairAddress(token);

    if(!addr) return null;

    return new web3.eth.Contract(ABI_UniswapV2Pair as any, addr);
}

export async function getPrice (token: string): Promise<TokenPrice | null> {
    const pair = await getPair(token);

    if(!pair) return null;
    const { 0: reserve0, 1: reserve1 } = await pair.methods.getReserves().call();
    if(await pair.methods.token0.call() === COMMON_BASE) return {
        price: reserve0 / reserve1,
        tokenBalance: reserve1/10e17,
        baseBalance: reserve0/10e17
    }
    
    return {
        price: reserve1 / reserve0,
        tokenBalance: reserve0/10e17,
        baseBalance: reserve1/10e17
    };
}

export async function getCurrentAddress () {
    await enableWeb3();

    return (await web3.eth.getAccounts())[0];
}