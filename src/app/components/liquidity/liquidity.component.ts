import { Component, OnInit } from '@angular/core';
import { loadTokens, Tokens } from 'lib/tokens';
import { COMMON_BASE, createPair, getCurrentAddress, getPair, UniswapV2Router02 } from 'lib/web3/web3';
import { TokenList } from 'tokens/tokenlist';

@Component({
  selector: 'app-liquidity',
  templateUrl: './liquidity.component.html',
  styleUrls: ['./liquidity.component.scss']
})
export class LiquidityComponent implements OnInit {
  
  tokenList: typeof TokenList.tokens = [];
  loading: boolean = true;
  commonBase = "assets/imgs/icons/obsidian block.png";
  constructor() { }

  async ngOnInit() {
    this.tokenList = await loadTokens();
    (window as any).$('.ui.dropdown').dropdown();
    
    this.loading = false;
  }

  async calculateAmountsOut (side: 'top' | 'bottom', amount: number) {
    if(!this.originAsset) return;

    if (!await getPair(this.originAsset)) return;
  }

  getValue(event: any): string | void {
    if(!event) return;
    return (event.target as HTMLInputElement).value;
  }

  get originAsset () {
    return (window as any).$('#liquidity-originAsset').dropdown('get value')
  }

  get originAmount () {
    return +(window as any).$('#liquidity-originInput').val();
  }

  get destinationAmount () {
    return +(window as any).$('#liquidity-destinationInput').val();
  }

  toWei (num: number) {
    return (window as any).Web3.utils.toWei(num.toString());
  }
  
  async addLiquidity () {
    let amountA = this.toWei(this.originAmount);
    let amountB = this.toWei(this.destinationAmount);

    console.log("Before", {
      amountA, amountB
    });

    try {
      const quote = await UniswapV2Router02.methods.getAmountsOut(
        amountA,
        [this.originAsset, COMMON_BASE]
      ).call();

      amountB = quote;
    } catch (exc) {

    }

    console.log("After", 
      this.originAsset, // tokenA
      COMMON_BASE, // tokenB,

      amountA, // amountDesiredA
      amountB, // amountDesiredB

      this.toWei(this.originAmount * 0.9), // amountAMin
      this.toWei(this.destinationAmount * 0.9), // amountB
      await getCurrentAddress(), // to
      Date.now() + 3_600_000 // deadline
    );
    await UniswapV2Router02.methods.addLiquidity(
      this.originAsset, // tokenA
      COMMON_BASE, // tokenB,

      amountA, // amountDesiredA
      amountB, // amountDesiredB

      this.toWei(this.originAmount * 0.9), // amountAMin
      this.toWei(this.destinationAmount * 0.9), // amountB
      await getCurrentAddress(), // to
      Date.now() + 3_600_000 // deadline
    ).send({
      from: await getCurrentAddress()
    })
  }

}
