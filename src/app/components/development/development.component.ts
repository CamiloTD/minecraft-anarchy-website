import { Component, OnInit } from '@angular/core';
import { loadTokens, Tokens } from 'lib/tokens';
import { COMMON_BASE, UniswapV2Router02 } from 'lib/web3/web3';
import { TokenList } from 'tokens/tokenlist';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss']
})
export class DevelopmentComponent implements OnInit {
  
  tokenList: typeof TokenList.tokens = [];
  loading: boolean = true;
  constructor() { }

  async ngOnInit() {
    this.tokenList = await loadTokens();
    (window as any).$('.ui.dropdown').dropdown();

    this.loading = false;
  }

  async calculateAmountsOut (side: 'top' | 'bottom', amount: number) {
    if(!this.originAsset || !this.destinationAsset) return;

    if(side === "top") {
      const [,,amountsOut] = await UniswapV2Router02.methods.getAmountsOut(
        (window as any).Web3.utils.toWei(amount.toString()),
        [this.originAsset, COMMON_BASE, this.destinationAsset]
      ).call();

      (window as any).$('#destInput').val(amountsOut/10e17);
    } else {
      const [,,amountsOut] = await UniswapV2Router02.methods.getAmountsOut(
        (window as any).Web3.utils.toWei(amount.toString()),
        [this.destinationAsset, COMMON_BASE, this.originAsset]
      ).call();

      (window as any).$('#originInput').val(amountsOut/10e17);

    }
  }

  getValue(event: any): string | void {
    if(!event) return;
    return (event.target as HTMLInputElement).value;
  }

  get originAsset () {
    return (window as any).$('#originAsset').dropdown('get value')
  }

  get destinationAsset () {
    return (window as any).$('#destinationAsset').dropdown('get value')
  }

}
